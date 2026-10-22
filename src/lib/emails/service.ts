import { Resend } from 'resend';
import { DEPARTMENTS, getResendApiKey } from './config';
import { addEmail, StoredEmail } from './store';

export interface SendEmailPayload {
  fromEmail: string;
  to: string | string[];
  subject: string;
  body: string;
  isHtml?: boolean;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  email?: StoredEmail;
  error?: string;
  mode: 'resend-live' | 'simulation';
}

/**
 * Send an email from a department account using Resend
 */
export async function sendDepartmentEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const fromDept = DEPARTMENTS[payload.fromEmail.toLowerCase()];
  if (!fromDept) {
    return {
      success: false,
      error: `Invalid department account: ${payload.fromEmail}. Must be one of @ulbil.com accounts.`,
      mode: 'simulation'
    };
  }

  const recipients = Array.isArray(payload.to)
    ? payload.to.map((r) => r.trim()).filter(Boolean)
    : payload.to.split(/[,;]/).map((r) => r.trim()).filter(Boolean);

  if (recipients.length === 0) {
    return {
      success: false,
      error: 'Please specify at least one recipient email address.',
      mode: 'simulation'
    };
  }

  const apiKey = getResendApiKey();
  const formattedSender = `${fromDept.name} <${fromDept.email}>`;
  let messageId = `msg-${Date.now()}`;
  let mode: 'resend-live' | 'simulation' = 'simulation';

  // If Resend API key is configured, send through Resend
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const resendResponse = await resend.emails.send({
        from: formattedSender,
        to: recipients,
        subject: payload.subject,
        html: payload.isHtml ? payload.body : payload.body.replace(/\n/g, '<br/>'),
        text: payload.body,
        replyTo: fromDept.email
      });

      if (resendResponse.error) {
        console.error('Resend API returned error:', resendResponse.error);
        return {
          success: false,
          error: resendResponse.error.message || 'Resend failed to deliver the message.',
          mode: 'resend-live'
        };
      }

      if (resendResponse.data?.id) {
        messageId = resendResponse.data.id;
        mode = 'resend-live';
      }
    } catch (err: any) {
      console.error('Error invoking Resend API:', err);
      return {
        success: false,
        error: err.message || 'Failed to connect to Resend API.',
        mode: 'resend-live'
      };
    }
  }

  // 1. Record email in the sender department's 'sent' folder
  const savedSentEmail = addEmail({
    from: formattedSender,
    fromName: fromDept.name,
    to: recipients,
    subject: payload.subject,
    text: payload.body,
    html: payload.isHtml ? payload.body : payload.body.replace(/\n/g, '<br/>'),
    folder: 'sent',
    department: fromDept.email,
    isRead: true,
    isStarred: false
  });

  // 2. If any recipient is an internal @ulbil.com department, route to their inbox
  for (const recipient of recipients) {
    const cleanRecipient = recipient.toLowerCase().trim();
    if (DEPARTMENTS[cleanRecipient]) {
      addEmail({
        from: formattedSender,
        fromName: fromDept.name,
        to: [cleanRecipient],
        replyTo: fromDept.email,
        subject: payload.subject,
        text: payload.body,
        html: payload.isHtml ? payload.body : payload.body.replace(/\n/g, '<br/>'),
        folder: 'inbox',
        department: cleanRecipient,
        isRead: false,
        isStarred: false
      });
    }
  }

  return {
    success: true,
    messageId,
    email: savedSentEmail,
    mode
  };
}

/**
 * Process inbound email received from Resend Webhook
 */
export async function processInboundEmail(webhookData: any): Promise<{ received: number }> {
  // Resend inbound webhook payloads can contain:
  // { type: 'email.received', data: { from, to, subject, html, text, ... } }
  const data = webhookData.data || webhookData;
  const toList: string[] = Array.isArray(data.to) ? data.to : [data.to || ''];
  const from = data.from || 'unknown@sender.com';
  const subject = data.subject || '(No Subject)';
  const text = data.text || '';
  const html = data.html || '';

  let receivedCount = 0;

  for (const toAddress of toList) {
    // Extract raw email address from "Name <user@domain.com>" format
    const match = toAddress.match(/<([^>]+)>/);
    const rawTo = (match ? match[1] : toAddress).toLowerCase().trim();

    if (DEPARTMENTS[rawTo]) {
      addEmail({
        from,
        fromName: data.fromName || from,
        to: [rawTo],
        replyTo: data.replyTo || from,
        subject,
        text,
        html,
        folder: 'inbox',
        department: rawTo,
        isRead: false,
        isStarred: false
      });
      receivedCount++;
    }
  }

  return { received: receivedCount };
}

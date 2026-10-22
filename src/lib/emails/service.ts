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
        const msg = resendResponse.error.message || '';
        let userFriendlyError = msg;
        if (msg.toLowerCase().includes('not verified')) {
          userFriendlyError = `Resend Domain Not Verified: ${msg}. If DNS records were added in Hostinger, please click 'Verify' in your Resend Dashboard (https://resend.com/domains) or wait for DNS propagation.`;
        }
        return {
          success: false,
          error: userFriendlyError,
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
  const data = webhookData.data || webhookData;
  const apiKey = getResendApiKey();
  const emailId = data.email_id || data.id;

  let text = data.text || '';
  let html = data.html || '';
  let subject = data.subject || '(No Subject)';
  let from = data.from || 'unknown@sender.com';
  let toList: string[] = Array.isArray(data.to) ? data.to : [data.to || ''];

  // If body is missing, fetch full email payload from Resend receiving API
  if (apiKey && emailId && (!text && !html)) {
    try {
      const resend = new Resend(apiKey);
      const full = await resend.emails.receiving.get(emailId);
      if (full.data) {
        text = full.data.text || text;
        html = full.data.html || html;
        subject = full.data.subject || subject;
        from = full.data.from || from;
        if (Array.isArray(full.data.to) && full.data.to.length > 0) {
          toList = full.data.to;
        }
      }
    } catch (err) {
      console.error('Error fetching full email in webhook:', err);
    }
  }

  let receivedCount = 0;
  const recordId = emailId ? `resend-${emailId}` : undefined;

  for (const toAddress of toList) {
    const match = toAddress.match(/<([^>]+)>/);
    const rawTo = (match ? match[1] : toAddress).toLowerCase().trim();

    if (DEPARTMENTS[rawTo]) {
      addEmail({
        id: recordId,
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

/**
 * Poll / sync incoming emails from Resend Receiving API
 */
export async function syncInboundEmailsFromResend(): Promise<{ synced: number }> {
  const apiKey = getResendApiKey();
  if (!apiKey) return { synced: 0 };

  try {
    const resend = new Resend(apiKey);
    const listResult = await resend.emails.receiving.list();
    if (listResult.error || !listResult.data) {
      return { synced: 0 };
    }

    const receivedItems = (listResult.data as any)?.data || (Array.isArray(listResult.data) ? listResult.data : []);
    let count = 0;

    for (const item of receivedItems) {
      const emailId = `resend-${item.id}`;
      let text = item.text || '';
      let html = item.html || '';
      let subject = item.subject || '(No Subject)';
      let from = item.from || '';
      let toList = Array.isArray(item.to) ? item.to : [item.to || ''];

      // If full content is not in list item, retrieve with get()
      if (!text && !html) {
        try {
          const full = await resend.emails.receiving.get(item.id);
          if (full.data) {
            text = full.data.text || text;
            html = full.data.html || html;
            subject = full.data.subject || subject;
            from = full.data.from || from;
            toList = Array.isArray(full.data.to) ? full.data.to : toList;
          }
        } catch (err) {
          console.error('Error fetching email details:', err);
        }
      }

      for (const toAddress of toList) {
        const match = toAddress.match(/<([^>]+)>/);
        const rawTo = (match ? match[1] : toAddress).toLowerCase().trim();

        if (DEPARTMENTS[rawTo]) {
          addEmail({
            id: emailId,
            from,
            fromName: from,
            to: [rawTo],
            replyTo: from,
            subject,
            text,
            html,
            folder: 'inbox',
            department: rawTo,
            isRead: false,
            isStarred: false
          });
          count++;
        }
      }
    }

    return { synced: count };
  } catch (err) {
    console.error('Error syncing inbound emails from Resend:', err);
    return { synced: 0 };
  }
}

/**
 * WhatsApp Meta Cloud API OTP Dispatcher
 *
 * Supports Meta Graph API v21.0
 * Environment variables:
 * - WHATSAPP_TOKEN: System user or app access token from Meta for Developers
 * - WHATSAPP_PHONE_NUMBER_ID: Phone number ID from Meta WhatsApp Cloud App dashboard
 * - WHATSAPP_TEMPLATE_NAME: Optional template name (e.g. 'authentication_otp' or 'auth_code')
 */

export interface WhatsAppSendResult {
  success: boolean;
  simulated?: boolean;
  messageId?: string;
  error?: string;
}

export async function sendWhatsAppOtp(
  phone: string,
  otpCode: string
): Promise<WhatsAppSendResult> {
  const token = process.env.WHATSAPP_TOKEN || process.env.META_WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  // Clean and format phone number for WhatsApp
  // Indian numbers: ensure standard 91XXXXXXXXXX format
  let digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    digits = `91${digits}`;
  } else if (digits.length === 12 && digits.startsWith('91')) {
    // Already in 91XXXXXXXXXX format
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = `91${digits.slice(1)}`;
  }

  // If Meta API credentials are not yet configured in environment, simulate cleanly
  if (!token || !phoneNumberId) {
    console.log(`\n======================================================`);
    console.log(`[WhatsApp Meta Cloud API] SIMULATED OTP DISPATCH:`);
    console.log(`Recipient: +${digits}`);
    console.log(`Verification PIN: ${otpCode}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`To enable live WhatsApp delivery, add WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID to your environment variables.`);
    console.log(`======================================================\n`);
    return {
      success: true,
      simulated: true
    };
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

    let payload: Record<string, unknown>;

    if (templateName) {
      // Official Meta WhatsApp Authentication Template
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: digits,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: otpCode
                }
              ]
            },
            {
              type: 'button',
              sub_type: 'url',
              index: '0',
              parameters: [
                {
                  type: 'text',
                  text: otpCode
                }
              ]
            }
          ]
        }
      };
    } else {
      // Standard Direct WhatsApp Text Message
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: digits,
        type: 'text',
        text: {
          preview_url: false,
          body: `*Uluberia Institute & Library (Estd. 1902)*\n\nYour one-time reader verification code is: *${otpCode}*\n\nValid for 10 minutes. Please do not share this code with anyone.`
        }
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[WhatsApp Meta Cloud API Error]:', data);
      return {
        success: false,
        error: data?.error?.message || 'Failed to dispatch WhatsApp message via Meta Cloud API.'
      };
    }

    const messageId = data?.messages?.[0]?.id;
    return {
      success: true,
      simulated: false,
      messageId
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Network error communicating with Meta Cloud API';
    console.error('[WhatsApp Meta Cloud API Exception]:', errorMsg);
    return {
      success: false,
      error: errorMsg
    };
  }
}

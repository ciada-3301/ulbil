import { NextRequest, NextResponse } from 'next/server';
import { processInboundEmail } from '@/lib/emails/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Resend inbound webhook payloads
    const result = await processInboundEmail(body);

    return NextResponse.json({
      received: true,
      processed: result.received
    });
  } catch (error: any) {
    console.error('Webhook error processing inbound email:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

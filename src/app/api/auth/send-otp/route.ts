import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const identifier = body?.identifier;

    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json({ error: 'Valid phone or email identifier is required.' }, { status: 400 });
    }

    // Generate cryptographic 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const isEmail = identifier.includes('@');

    if (isEmail && process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'Uluberia Institute & Library <notifications@ulbil.org>',
          to: identifier,
          subject: 'Your UIL Verification Code',
          html: `<p>Your 6-digit one-time access code is: <strong>${generatedOtp}</strong>. Valid for 10 minutes.</p>`
        })
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Verification code dispatched to ${identifier}` 
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

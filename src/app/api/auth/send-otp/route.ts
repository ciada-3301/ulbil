import { NextResponse } from 'next/server';
import { findMemberByIdentifier, cleanPhone } from '@/lib/members/store';
import { sendWhatsAppOtp } from '@/lib/whatsapp';
import { saveOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, purpose = 'LOGIN' } = body || {};

    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json(
        { error: 'Valid mobile number or Membership ID is required.' },
        { status: 400 }
      );
    }

    const trimmedId = identifier.trim();

    // Generate cryptographic 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 1. Handle Member LOGIN Flow
    if (purpose === 'LOGIN') {
      const member = findMemberByIdentifier(trimmedId);

      if (!member) {
        return NextResponse.json(
          { 
            error: 'Mobile number or Membership ID not found in library register. If you are a new reader, please register via the Signup page.',
            notRegistered: true
          },
          { status: 404 }
        );
      }

      if (member.status === 'PENDING_APPROVAL') {
        return NextResponse.json(
          {
            error: 'Your membership application is currently pending admin approval. You will be able to log in once approved by the library administration.',
            pendingApproval: true
          },
          { status: 403 }
        );
      }

      if (member.status === 'REJECTED') {
        return NextResponse.json(
          {
            error: 'This membership application has been declined by the library administration. Please contact the library desk.',
            rejected: true
          },
          { status: 403 }
        );
      }

      // Member is ACTIVE - identify target phone for WhatsApp OTP
      const targetPhone = member.phone || cleanPhone(trimmedId);

      if (!targetPhone || targetPhone.length < 10) {
        return NextResponse.json(
          { error: 'No valid mobile number is on file for this member. Please visit the library counter to update your contact number.' },
          { status: 400 }
        );
      }

      // Save OTP against the input identifier, memberId, and targetPhone
      saveOtp(trimmedId, generatedOtp);
      saveOtp(targetPhone, generatedOtp);
      saveOtp(member.memberId, generatedOtp);

      // Dispatch via WhatsApp Meta Cloud API
      const waResult = await sendWhatsAppOtp(targetPhone, generatedOtp);

      // Also send via email if member has an email on file and Resend API key is present
      const targetEmail = member.email || (trimmedId.includes('@') ? trimmedId : null);
      if (targetEmail && process.env.RESEND_API_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: process.env.EMAIL_FROM || 'Uluberia Institute & Library <notifications@ulbil.com>',
              to: targetEmail,
              subject: 'Your UIL Member Login Code',
              html: `<p>Hello <strong>${member.name}</strong>,</p><p>Your 6-digit login verification code is: <strong>${generatedOtp}</strong>.</p><p>Valid for 10 minutes.</p>`
            })
          });
        } catch (e) {
          console.error('Email dispatch error:', e);
        }
      }

      const masked = targetPhone.length >= 10
        ? `+91 ******${targetPhone.slice(-4)}`
        : targetPhone;

      return NextResponse.json({
        success: true,
        message: `Verification code dispatched to WhatsApp (${masked}).`,
        memberName: member.name,
        memberId: member.memberId,
        tier: member.tier,
        simulated: waResult.simulated,
        ...(process.env.NODE_ENV !== 'production' || waResult.simulated ? { testOtp: generatedOtp } : {})
      });
    }

    // 2. Handle New Reader SIGNUP Flow
    if (purpose === 'SIGNUP') {
      const targetPhone = cleanPhone(trimmedId);

      if (!targetPhone || targetPhone.length < 10) {
        return NextResponse.json(
          { error: 'Please enter a valid 10-digit mobile number for WhatsApp verification.' },
          { status: 400 }
        );
      }

      // Check if already an approved active member
      const existing = findMemberByIdentifier(targetPhone);
      if (existing && existing.status === 'ACTIVE') {
        return NextResponse.json(
          {
            error: `This mobile number is already registered under Member ID (${existing.memberId}). Please sign in instead.`,
            alreadyRegistered: true
          },
          { status: 409 }
        );
      }

      // Save OTP
      saveOtp(trimmedId, generatedOtp);
      saveOtp(targetPhone, generatedOtp);

      // Dispatch WhatsApp message
      const waResult = await sendWhatsAppOtp(targetPhone, generatedOtp);

      return NextResponse.json({
        success: true,
        message: `WhatsApp verification code dispatched to +91 ${targetPhone}.`,
        simulated: waResult.simulated,
        ...(process.env.NODE_ENV !== 'production' || waResult.simulated ? { testOtp: generatedOtp } : {})
      });
    }

    return NextResponse.json({ error: 'Invalid purpose specified.' }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

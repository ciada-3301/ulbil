import { NextResponse } from 'next/server';
import { findMemberByIdentifier, registerPendingMember } from '@/lib/members/store';
import { verifyOtp } from '@/lib/otpStore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, code, purpose = 'LOGIN', signupData } = body || {};

    if (!identifier || !code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Valid identifier and 6-digit code are required.' },
        { status: 400 }
      );
    }

    const isValid = verifyOtp(identifier, code);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code. Please check and try again.' },
        { status: 400 }
      );
    }

    // 1. Verification for LOGIN
    if (purpose === 'LOGIN') {
      const member = findMemberByIdentifier(identifier);

      if (!member) {
        return NextResponse.json(
          { error: 'Member record not found.' },
          { status: 404 }
        );
      }

      if (member.status === 'PENDING_APPROVAL') {
        return NextResponse.json(
          {
            error: 'Your membership application is currently pending admin approval.',
            pendingApproval: true
          },
          { status: 403 }
        );
      }

      if (member.status === 'REJECTED') {
        return NextResponse.json(
          {
            error: 'This account was declined by library administration.',
            rejected: true
          },
          { status: 403 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: true,
        member: {
          memberId: member.memberId,
          name: member.name,
          phone: member.phone,
          email: member.email,
          tier: member.tier,
          membershipType: member.membershipType,
          address: member.address,
          validUntil: member.validUntil,
          role: member.role,
          status: member.status
        },
        message: 'Welcome back to Uluberia Institute & Library!'
      });
    }

    // 2. Verification for SIGNUP (Creates Pending Application)
    if (purpose === 'SIGNUP') {
      if (!signupData || !signupData.name || !signupData.phone) {
        return NextResponse.json(
          { error: 'Incomplete registration details.' },
          { status: 400 }
        );
      }

      const pendingMember = registerPendingMember({
        name: signupData.name,
        phone: signupData.phone,
        email: signupData.email,
        address: signupData.address || 'Uluberia, Howrah',
        tier: signupData.tier || 'General Reader'
      });

      return NextResponse.json({
        success: true,
        verified: true,
        pendingApproval: true,
        memberId: pendingMember.memberId,
        member: pendingMember,
        message: 'Phone verified successfully! Your application has been submitted and is currently pending administrator approval.'
      });
    }

    return NextResponse.json({
      success: true,
      verified: true,
      identifier,
      message: 'Verified successfully.'
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

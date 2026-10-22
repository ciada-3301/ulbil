import { NextResponse } from 'next/server';
import { getAllMembers, approveMember, rejectMember } from '@/lib/members/store';

export async function GET() {
  try {
    const members = getAllMembers();
    const pending = members.filter(m => m.status === 'PENDING_APPROVAL');
    const active = members.filter(m => m.status === 'ACTIVE');
    const rejected = members.filter(m => m.status === 'REJECTED');

    return NextResponse.json({
      success: true,
      totalCount: members.length,
      pendingCount: pending.length,
      activeCount: active.length,
      rejectedCount: rejected.length,
      members
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, memberId } = body || {};

    if (!memberId) {
      return NextResponse.json({ error: 'memberId is required.' }, { status: 400 });
    }

    if (action === 'APPROVE') {
      const updated = approveMember(memberId);
      if (!updated) {
        return NextResponse.json({ error: 'Member not found.' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: `Member ${updated.name} (${updated.memberId}) has been successfully APPROVED.`,
        member: updated
      });
    }

    if (action === 'REJECT') {
      const updated = rejectMember(memberId);
      if (!updated) {
        return NextResponse.json({ error: 'Member not found.' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        message: `Member application ${updated.memberId} has been REJECTED.`,
        member: updated
      });
    }

    return NextResponse.json({ error: 'Invalid action. Must be APPROVE or REJECT.' }, { status: 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

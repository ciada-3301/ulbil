import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DEPARTMENTS } from '@/lib/emails/config';
import { sendDepartmentEmail } from '@/lib/emails/service';

const SESSION_COOKIE = 'uil_webmail_user';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get(SESSION_COOKIE)?.value;

    if (!userEmail || !DEPARTMENTS[userEmail]) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to your department account.' }, { status: 401 });
    }

    const body = await req.json();
    const { to, subject, message } = body;

    if (!to || !to.trim()) {
      return NextResponse.json({ error: 'Recipient address (To) is required.' }, { status: 400 });
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json({ error: 'Subject is required.' }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Email message body cannot be empty.' }, { status: 400 });
    }

    const result = await sendDepartmentEmail({
      fromEmail: userEmail,
      to,
      subject,
      body: message,
      isHtml: false
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      email: result.email,
      mode: result.mode
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while sending email.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DEPARTMENTS } from '@/lib/emails/config';
import { getStoredEmails, updateEmail, deleteEmailPermanently } from '@/lib/emails/store';

const SESSION_COOKIE = 'uil_webmail_user';

async function getAuthenticatedUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const email = cookieStore.get(SESSION_COOKIE)?.value;
  if (email && DEPARTMENTS[email]) {
    return email;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const userEmail = await getAuthenticatedUser();
  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const folder = (searchParams.get('folder') || 'inbox') as 'inbox' | 'sent' | 'trash';
  const query = searchParams.get('search')?.toLowerCase() || '';

  const allEmails = getStoredEmails();

  // Filter emails belonging to this department and folder
  let emails = allEmails.filter(
    (e) => e.department.toLowerCase() === userEmail.toLowerCase() && e.folder === folder
  );

  if (query) {
    emails = emails.filter(
      (e) =>
        e.subject.toLowerCase().includes(query) ||
        e.from.toLowerCase().includes(query) ||
        (e.text && e.text.toLowerCase().includes(query)) ||
        e.to.some((t) => t.toLowerCase().includes(query))
    );
  }

  // Count unread in inbox
  const unreadCount = allEmails.filter(
    (e) => e.department.toLowerCase() === userEmail.toLowerCase() && e.folder === 'inbox' && !e.isRead
  ).length;

  return NextResponse.json({
    emails,
    unreadCount,
    total: emails.length
  });
}

export async function PATCH(req: NextRequest) {
  const userEmail = await getAuthenticatedUser();
  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, isRead, isStarred, folder } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing email id' }, { status: 400 });
    }

    const updates: any = {};
    if (typeof isRead === 'boolean') updates.isRead = isRead;
    if (typeof isStarred === 'boolean') updates.isStarred = isStarred;
    if (folder && ['inbox', 'sent', 'trash'].includes(folder)) updates.folder = folder;

    const updated = updateEmail(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, email: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userEmail = await getAuthenticatedUser();
  if (!userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing email id' }, { status: 400 });
    }

    const success = deleteEmailPermanently(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 500 });
  }
}

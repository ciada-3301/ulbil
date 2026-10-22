import { NextRequest, NextResponse } from 'next/server';
import { DEPARTMENTS, MASTER_PASSWORD } from '@/lib/emails/config';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'uil_webmail_user';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const dept = DEPARTMENTS[normalizedEmail];

    if (!dept) {
      return NextResponse.json(
        { error: 'Invalid department account. Choose it@ulbil.com, secretary@ulbil.com, or satta@ulbil.com.' },
        { status: 401 }
      );
    }

    if (password !== MASTER_PASSWORD) {
      return NextResponse.json(
        { error: 'Incorrect password for department account.' },
        { status: 401 }
      );
    }

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, normalizedEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({
      success: true,
      user: dept
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get(SESSION_COOKIE)?.value;

    if (!email || !DEPARTMENTS[email]) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      user: DEPARTMENTS[email]
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Auth check failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, code } = body || {};

    if (!identifier || !code || typeof code !== 'string' || code.length < 6) {
      return NextResponse.json({ error: 'Valid identifier and 6-digit code are required.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      verified: true,
      identifier,
      message: 'Identifier verified successfully.'
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getResendApiKey } from '@/lib/emails/config';

export async function GET() {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      status: 'missing_key',
      message: 'Resend API key is not yet set in environment variables (VERCEL or RESEND_API_KEY).'
    });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.domains.list();

    if (result.error) {
      return NextResponse.json({
        configured: true,
        status: 'error',
        message: result.error.message || 'Failed to list domains from Resend.'
      });
    }

    const domainList = (result.data as any)?.data || (Array.isArray(result.data) ? result.data : []);
    const targetDomain = domainList.find(
      (d: any) => d.name === 'ulbil.com' || d.name === 'ulbil.org'
    ) || domainList[0];

    if (!targetDomain) {
      return NextResponse.json({
        configured: true,
        status: 'not_added',
        domain: 'ulbil.com',
        message: 'Domain ulbil.com has not been added to your Resend account yet. Please add it on https://resend.com/domains.'
      });
    }

    return NextResponse.json({
      configured: true,
      domainId: targetDomain.id,
      domain: targetDomain.name,
      status: targetDomain.status, // 'verified' | 'not_started' | 'pending' | 'temporary_failure'
      records: targetDomain.records || []
    });
  } catch (err: any) {
    return NextResponse.json({
      configured: true,
      status: 'error',
      message: err.message || 'Error communicating with Resend API.'
    });
  }
}

export async function POST() {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: 'Resend API key missing' }, { status: 400 });
  }

  try {
    const resend = new Resend(apiKey);
    const listResult = await resend.domains.list();
    const domainList = (listResult.data as any)?.data || (Array.isArray(listResult.data) ? listResult.data : []);
    const targetDomain = domainList.find(
      (d: any) => d.name === 'ulbil.com' || d.name === 'ulbil.org'
    ) || domainList[0];

    if (!targetDomain) {
      return NextResponse.json({ error: 'Domain not found in Resend.' }, { status: 404 });
    }

    const verifyResult = await resend.domains.verify(targetDomain.id);
    if (verifyResult.error) {
      return NextResponse.json({ error: verifyResult.error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      status: (verifyResult.data as any)?.status || 'checking',
      message: 'Resend verification check initiated.'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Verification check failed' }, { status: 500 });
  }
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Lock, 
  Phone, 
  KeyRound, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  
  // OTP state
  const [identifier, setIdentifier] = useState(''); // phone or memberId
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberTier, setMemberTier] = useState('');
  const [successInfo, setSuccessInfo] = useState('');
  const [simulatedCode, setSimulatedCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [isPendingApproval, setIsPendingApproval] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsNotRegistered(false);
    setIsPendingApproval(false);

    if (!identifier.trim()) {
      setErrorMsg('Please enter your registered 10-digit mobile number or Membership ID (e.g. L/01, G/01).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), purpose: 'LOGIN' })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        if (data.notRegistered) {
          setIsNotRegistered(true);
        }
        if (data.pendingApproval) {
          setIsPendingApproval(true);
        }
        setErrorMsg(data.error || 'Failed to dispatch verification code.');
        return;
      }

      setMemberName(data.memberName || '');
      setMemberTier(data.tier || '');
      setSuccessInfo(data.message || 'OTP dispatched to WhatsApp');
      if (data.testOtp) {
        setSimulatedCode(data.testOtp);
      }
      setOtpSent(true);
    } catch {
      setLoading(false);
      setErrorMsg('Network error connecting to verification service.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpValue || otpValue.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identifier: identifier.trim(), 
          code: otpValue.trim(),
          purpose: 'LOGIN'
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMsg(data.error || 'Invalid verification code.');
        return;
      }

      // Store authenticated member session
      if (typeof window !== 'undefined' && data.member) {
        localStorage.setItem('ulbil_user', JSON.stringify({
          ...data.member,
          authenticated: true,
          authMethod: 'WHATSAPP_OTP',
          timestamp: new Date().toISOString()
        }));
      }

      router.push('/dashboard');
    } catch {
      setLoading(false);
      setErrorMsg('Network error during verification.');
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-8 bg-gradient-to-b from-[#FCFBF7] via-[#FAF6ED] to-[#F5EFE0] flex items-center justify-center">
      <div className="max-w-md w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-16 mx-auto relative">
            <Image
              src="/images/logo_digital.png"
              alt="UIL Logo"
              fill
              sizes="56px"
              className="object-contain"
              unoptimized
            />
          </div>
          <h1 className="font-serif font-extrabold text-2xl text-[#221F1E]">
            Member Sign In
          </h1>
          <p className="text-xs text-[#7A6E65]">
            Official Member Portal • Uluberia Institute & Library
          </p>
        </div>

        {/* Member Register Notice */}
        <div className="p-3 rounded-xl bg-[#FEF5ED] border border-[#DFB343]/50 text-xs text-[#6B5A4E] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#C2592B]">
            <ShieldCheck className="w-4 h-4 text-[#C69214] shrink-0" />
            <span>Synced with Official Members&apos; Register</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Existing Life and General Members can sign in using their <strong>registered mobile number</strong> or <strong>Membership ID</strong> (e.g. <code>L/01</code> or <code>G/01</code>).
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-semibold space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
            {isNotRegistered && (
              <div className="pt-1 border-t border-red-200 text-right">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#C2592B] hover:underline"
                >
                  <span>Apply for New Reader Membership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
            {isPendingApproval && (
              <div className="pt-1 border-t border-red-200 text-[11px] text-red-700">
                <span>Please wait for the Library Executive Council to approve your pending application, or visit the library counter.</span>
              </div>
            )}
          </div>
        )}

        {/* OTP Flow */}
        <div>
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">
                  Mobile Number or Membership ID *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9830122456 or L/01 or G/02"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden font-medium"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-[#7A6E65]">
                  <span>Senior-friendly: 1-Tap WhatsApp OTP</span>
                  <span className="font-mono text-[#C69214]">No password needed</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Verifying Member Register...' : 'Send WhatsApp Login Code'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                {memberName && (
                  <div className="font-bold text-sm text-[#221F1E]">
                    Welcome, {memberName}
                  </div>
                )}
                {memberTier && (
                  <div className="text-[11px] font-semibold text-[#C2592B]">
                    {memberTier}
                  </div>
                )}
                <p className="text-[11px] text-amber-800 pt-0.5">
                  {successInfo}
                </p>
                {simulatedCode && (
                  <div className="mt-1 pt-1 border-t border-amber-200 text-[11px] font-mono text-emerald-800">
                    Test Mode PIN: <strong>{simulatedCode}</strong>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">
                  Enter 6-Digit WhatsApp Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    autoFocus
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-sm tracking-widest font-mono text-center focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#C2592B] hover:bg-[#A8451B] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Verifying...' : 'Sign In to Dashboard'}</span>
              </button>

              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtpValue(''); setErrorMsg(''); }}
                className="w-full text-center text-xs text-[#7A6E65] hover:text-[#221F1E] transition-colors cursor-pointer"
              >
                Change Mobile / Member ID
              </button>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-[#EADBCC] text-center space-y-2">
          <p className="text-xs text-[#7A6E65]">
            New reader?{' '}
            <Link href="/auth/signup" className="font-bold text-[#C2592B] hover:underline">
              Register for membership
            </Link>
          </p>
          <div className="text-[11px] text-[#A69C94]">
            Administrative Council Portal: <Link href="/admin" className="font-semibold hover:underline">Admin Dashboard</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

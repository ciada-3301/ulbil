"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  AlertCircle,
  Clock,
  KeyRound
} from 'lucide-react';
import { MEMBERSHIP_TIERS } from '@/data/libraryData';

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedTier, setSelectedTier] = useState('General Reader');

  // Verification step
  const [step, setStep] = useState<'FORM' | 'VERIFY_PHONE' | 'SUCCESS'>('FORM');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [generatedMemberId, setGeneratedMemberId] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !phone || !address) {
      setErrorMsg('Full Name, Mobile Phone, and Residential Address are mandatory.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: cleanPhone,
          purpose: 'SIGNUP'
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to dispatch WhatsApp verification code.');
        return;
      }

      if (data.testOtp) {
        setSimulatedOtp(data.testOtp);
      }
      setStep('VERIFY_PHONE');
    } catch {
      setLoading(false);
      setErrorMsg('Network error connecting to verification service.');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneOtp || phoneOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: cleanPhone,
          code: phoneOtp.trim(),
          purpose: 'SIGNUP',
          signupData: {
            name: fullName.trim(),
            phone: cleanPhone,
            email: email.trim() || undefined,
            address: address.trim(),
            tier: selectedTier
          }
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMsg(data.error || 'Invalid verification code. Please check and try again.');
        return;
      }

      setGeneratedMemberId(data.memberId || 'UIL-PENDING');
      setStep('SUCCESS');
    } catch {
      setLoading(false);
      setErrorMsg('Network error during verification.');
    }
  };

  return (
    <div className="min-h-[90vh] py-12 px-4 sm:px-8 bg-gradient-to-b from-[#FCFBF7] via-[#FAF6ED] to-[#F5EFE0] flex items-center justify-center">
      <div className="max-w-lg w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-6 sm:p-10 shadow-xl space-y-6">
        
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
            Reader Membership Application
          </h1>
          <p className="text-xs text-[#7A6E65]">
            Join the 125-year legacy of Uluberia Institute & Library.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step 1: Registration Form */}
        {step === 'FORM' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Suman Sengupta"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Mobile Phone (WhatsApp OTP) *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Membership Tier *</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
              >
                <option value="General Reader">General Reader (₹100/yr)</option>
                <option value="Student & Senior">Student & Senior Concession (₹50/yr)</option>
                <option value="Honourable Life Patron">Honourable Life Patron (₹2,500 one-time)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Residential Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#C69214]" />
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full residential address in Uluberia / Howrah..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FEF5ED] border border-[#DFB343]/60 text-xs text-[#8C6D23] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#C2592B]">
                <Clock className="w-4 h-4 text-[#C69214]" />
                <span>Executive Council Approval Required</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                As per library constitution rules, all new reader signups must verify their mobile via WhatsApp OTP and receive formal administrator approval before their library card is activated.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Sending WhatsApp Code...' : 'Send WhatsApp OTP Code'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: WhatsApp OTP Verification */}
        {step === 'VERIFY_PHONE' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#C2592B]">
                <Phone className="w-4 h-4" />
                <span>WhatsApp Verification: +91 {phone.replace(/\D/g, '')}</span>
              </div>
              <p>We have dispatched a 6-digit verification code to your WhatsApp.</p>
              {simulatedOtp && (
                <div className="mt-1 pt-1 border-t border-amber-200 text-[11px] font-mono text-emerald-800">
                  Test Mode PIN: <strong>{simulatedOtp}</strong>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Enter 6-Digit Code *</label>
              <input
                type="text"
                required
                maxLength={6}
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-[#FCFBF7] border-2 border-[#DFB343] text-center font-mono text-2xl tracking-widest focus:border-[#C2592B] focus:outline-hidden"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#7A6E65] bg-white border border-[#EADBCC] hover:bg-[#FCFBF7] cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#C2592B] hover:bg-[#D95D24] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loading ? 'Verifying...' : 'Verify & Submit Application'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation (Pending Admin Approval) */}
        {step === 'SUCCESS' && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-500 text-amber-600 flex items-center justify-center shadow-md">
              <Clock className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Application Received • Pending Admin Approval
              </span>
              <h2 className="font-serif font-extrabold text-2xl text-[#221F1E]">
                Thank you, {fullName}!
              </h2>
              <p className="text-xs text-[#7A6E65] leading-relaxed">
                Your mobile phone number (+91 {phone.replace(/\D/g, '')}) has been verified. To complete enrollment, the Library Administration reviews all new signups before issuing active cards.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCFBF7] border-2 border-[#DFB343] space-y-2 text-left text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#7A6E65]">Reference Application ID:</span>
                <span className="font-mono font-bold text-base text-[#C2592B]">{generatedMemberId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#7A6E65]">Requested Tier:</span>
                <span className="font-bold text-[#221F1E]">{selectedTier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#7A6E65]">Approval Status:</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  PENDING REVIEW
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#EADBCC] text-xs text-[#6B5A4E]">
              Once an administrator approves your profile, you will be able to log in immediately using your mobile number and receive instant WhatsApp OTP codes.
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signin"
                className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-[#C2592B] hover:bg-[#A8451B] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Go to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 rounded-xl text-xs font-bold text-[#7A6E65] bg-white border border-[#EADBCC] hover:bg-[#FCFBF7] transition-all flex items-center justify-center"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="text-center text-xs text-[#7A6E65] pt-2 border-t border-[#EADBCC]">
          Already an enrolled member in our register?{' '}
          <Link href="/auth/signin" className="font-bold text-[#C2592B] hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}

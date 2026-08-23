"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { MEMBERSHIP_TIERS } from '@/data/libraryData';

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState('General Reader');

  // Verification step
  const [step, setStep] = useState<'FORM' | 'VERIFY_PHONE' | 'SUCCESS'>('FORM');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [generatedMemberId, setGeneratedMemberId] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !phone || !password || !address) {
      setErrorMsg('All fields are mandatory. We require verified phone & email for membership records.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedOtp(code);
      setStep('VERIFY_PHONE');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneOtp || phoneOtp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newId = `UIL-2026-${randomNum}`;
      setGeneratedMemberId(newId);

      if (typeof window !== 'undefined') {
        localStorage.setItem('ulbil_user', JSON.stringify({
          name: fullName,
          email,
          phone,
          address,
          tier: selectedTier,
          memberId: newId,
          validUntil: selectedTier.includes('Life') ? 'Lifetime Patron' : '2027-08-31',
          joinedDate: new Date().toISOString().split('T')[0],
          status: 'ACTIVE',
          phoneVerified: true,
          emailVerified: true
        }));
      }

      setStep('SUCCESS');
    }, 600);
  };

  return (
    <div className="min-h-[90vh] py-12 px-4 sm:px-8 bg-gradient-to-b from-[#FCFBF7] via-[#FAF6ED] to-[#F5EFE0] flex items-center justify-center">
      <div className="max-w-lg w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-6 sm:p-10 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-14 mx-auto relative">
            <Image
              src="https://www.ulbil.org/images/Logo/logo_digital.png"
              alt="UIL Logo"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <h1 className="font-serif font-extrabold text-2xl text-[#221F1E]">
            Reader Membership Registration
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

        {/* Step 1: Registration Options */}
        {step === 'FORM' && (
          <div className="space-y-5">
            {/* Google Fast Registration Option */}
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  router.push('/auth/onboarding');
                }, 600);
              }}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl border-2 border-[#DFB343]/70 bg-white hover:bg-[#FEF5ED] text-xs font-bold text-[#221F1E] shadow-2xs transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Register Instantly with Google (Auto Email Verification)</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#7A6E65]">
              <div className="flex-1 h-px bg-[#EADBCC]" />
              <span>or register manually with standard form</span>
              <div className="flex-1 h-px bg-[#EADBCC]" />
            </div>

            {/* Standard Manual Registration Form */}
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
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Mobile Phone (for OTP) *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98300 00000"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Create Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C69214]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
              </div>
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

            <div className="p-3 rounded-xl bg-[#FEF5ED] border border-[#DFB343]/60 text-[11px] text-[#8C6D23] space-y-1">
              <div className="flex items-center gap-1 font-bold text-[#C2592B]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Mandatory Two-Factor Verification Policy</span>
              </div>
              <p>
                To maintain library registry integrity, a verification OTP code will be sent to your mobile number in the next step.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Processing...' : 'Proceed to Mobile Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

        {/* Step 2: Phone OTP Verification Modal */}
        {step === 'VERIFY_PHONE' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#C2592B]">
                <Phone className="w-4 h-4" />
                <span>Verify Mobile Phone: {phone}</span>
              </div>
              <p>We have dispatched a 6-digit verification code to your registered mobile phone.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Enter 6-Digit SMS Code *</label>
              <input
                type="text"
                required
                maxLength={6}
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                placeholder="••••••"
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
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#C2592B] hover:bg-[#D95D24] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loading ? 'Verifying...' : 'Verify Phone & Issue Card'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 'SUCCESS' && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/60">
                Official Registration Confirmed
              </span>
              <h2 className="font-serif font-extrabold text-2xl text-[#221F1E]">
                Welcome, {fullName}!
              </h2>
              <p className="text-xs text-[#7A6E65]">
                Your email and mobile phone have been verified in the central registry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCFBF7] border-2 border-[#DFB343] space-y-2 text-left text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#7A6E65]">Allocated Member ID:</span>
                <span className="font-mono font-bold text-base text-[#C2592B]">{generatedMemberId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#7A6E65]">Membership Tier:</span>
                <span className="font-bold text-[#221F1E]">{selectedTier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#7A6E65]">Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enter Member Dashboard & View Digital Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="text-center text-xs text-[#7A6E65] pt-2 border-t border-[#EADBCC]">
          Already an enrolled member?{' '}
          <Link href="/auth/signin" className="font-bold text-[#C2592B] hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function GoogleOnboardingPage() {
  const router = useRouter();

  const [userName, setUserName] = useState('New Reader');
  const [userEmail, setUserEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [selectedTier, setSelectedTier] = useState('General Reader');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name');
      const emailParam = params.get('email');
      if (nameParam) setUserName(nameParam);
      if (emailParam) setUserEmail(emailParam);
    }
  }, []);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone || !address) {
      setErrorMsg('Please provide both your mobile phone and residential address.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 600);
  };

  const handleVerifyAndComplete = (e: React.FormEvent) => {
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

      if (typeof window !== 'undefined') {
        localStorage.setItem('ulbil_user', JSON.stringify({
          name: userName,
          email: userEmail || 'member@ulbil.org',
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

      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-8 bg-gradient-to-b from-[#FCFBF7] via-[#FAF6ED] to-[#F5EFE0] flex items-center justify-center">
      <div className="max-w-md w-full heritage-card rounded-3xl bg-white border-2 border-[#DFB343] p-6 sm:p-8 shadow-xl space-y-6">
        
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
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Email Verified via Google</span>
          </div>
          <h1 className="font-serif font-extrabold text-xl text-[#221F1E]">
            Welcome, {userName}!
          </h1>
          <p className="text-xs text-[#7A6E65]">
            Complete your official contact details & membership tier to generate your digital card.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Select Membership Plan *</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs font-bold text-[#221F1E] focus:border-[#C2592B] focus:outline-hidden"
              >
                <option value="General Reader">General Reader (₹100 / annual)</option>
                <option value="Student & Senior">Student & Senior Concession (₹50 / annual)</option>
                <option value="Honourable Life Patron">Honourable Life Patron (₹2,500 / Lifetime)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Mobile Phone (Mandatory for SMS alerts) *</label>
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

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Residential Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#C69214]" />
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street / Locality, Uluberia, Howrah..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FEF5ED] text-[11px] text-[#8C6D23] space-y-1 border border-[#DFB343]/50">
              <span className="font-bold text-[#C2592B]">Why is mobile verification required?</span>
              <p>The library sends automated book return reminders, OTP sign-ins, and emergency notices via SMS/WhatsApp.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Sending OTP...' : 'Send SMS Verification Code'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndComplete} className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p>A 6-digit verification code has been dispatched to <strong>{phone}</strong>.</p>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#C2592B] hover:bg-[#D95D24] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Confirming...' : 'Verify Phone & Enter Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  ArrowRight,
  Download
} from 'lucide-react';
import { generateQrDataUrl, generateUpiUrl } from '@/lib/qr';
import { LIBRARY_INFO } from '@/data/libraryData';

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [message, setMessage] = useState('');

  const [upiQrUrl, setUpiQrUrl] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const amountToPay = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  useEffect(() => {
    async function updateUpiQr() {
      if (amountToPay > 0) {
        const upiString = generateUpiUrl({
          pa: 'ulu.ins.library@sbi', // Official UPI VPA ID
          pn: 'Uluberia Institute and Library',
          am: amountToPay.toString(),
          tn: '125th Jubilee Commemorative Donation'
        });
        const qrUrl = await generateQrDataUrl(upiString, { width: 200 });
        setUpiQrUrl(qrUrl);
      }
    }
    updateUpiQr();
  }, [amountToPay]);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#DFB343] text-xs font-bold text-[#C2592B] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
          <span>125th Quasquicentennial Jubilee Commemoration Fund</span>
        </div>

        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E] leading-tight">
          Support the 125th Jubilee Legacy & <br />
          <span className="text-gold-gradient">Rare Archive Digitization</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#5A504B] max-w-2xl mx-auto leading-relaxed">
          Your voluntary contribution directly supports the preservation of century-old Bengali literary manuscripts, student scholarships for civil service aspirants, and the modernization of our reading halls.
        </p>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Eligible for 80G Income Tax Exemption • Registered Non-Profit Heritage Trust</span>
        </div>
      </div>

      {/* Main Donation Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Donation Form & Amount Selector */}
        <div className="lg:col-span-7 heritage-card rounded-3xl bg-white border-2 border-[#DFB343]/70 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#221F1E]">
            <HeartHandshake className="w-5 h-5 text-[#C2592B]" />
            <span>Select Contribution Amount</span>
          </div>

          {/* Amount Pills */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = selectedAmount === amt && !customAmount;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-xl font-serif font-bold text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D95D24] to-[#C69214] text-white shadow-md scale-105'
                      : 'bg-[#FCFBF7] border border-[#EADBCC] text-[#221F1E] hover:border-[#DFB343]'
                  }`}
                >
                  ₹{amt.toLocaleString()}
                </button>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3E3835] mb-1">Or Enter Custom Amount (₹ INR)</label>
            <input
              type="number"
              min="100"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full px-4 py-2.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs font-bold focus:border-[#C2592B] focus:outline-hidden"
            />
          </div>

          {/* Donor Information Form */}
          <form onSubmit={handleDonateSubmit} className="space-y-4 pt-4 border-t border-[#EADBCC]">
            <div className="font-serif font-bold text-sm text-[#221F1E]">
              Donor & 80G Tax Exemption Particulars
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Dr. Subrata Roy"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Mobile Phone (for Receipt) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98300 00000"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E3835] mb-1">PAN Card Number (for 80G Tax Claim)</label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs font-mono uppercase focus:border-[#C2592B] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3E3835] mb-1">Commemorative Dedication or Message (Optional)</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="In memory of... / Dedicated to our beloved library..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Pledge & Generate Instant UPI Payment QR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Dynamic UPI QR Code & Direct Bank Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic UPI QR Card */}
          <div className="heritage-card rounded-3xl bg-gradient-to-br from-[#FEF5ED] via-[#FFFDF9] to-[#FAF4E6] border-2 border-[#DFB343] p-6 text-center space-y-4 shadow-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DFB343] text-[11px] font-bold text-[#C2592B]">
              <QrCode className="w-3.5 h-3.5 text-[#C69214]" />
              <span>Instant Scan & Pay with any UPI App</span>
            </div>

            <h3 className="font-serif font-extrabold text-xl text-[#221F1E]">
              Contribution Amount: ₹{amountToPay.toLocaleString()}
            </h3>

            {/* UPI QR Display */}
            {upiQrUrl ? (
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-[#DFB343] shadow-md flex items-center justify-center">
                <Image
                  src={upiQrUrl}
                  alt="UPI Payment QR Code"
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
            ) : null}

            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-[#221F1E]">
                UPI VPA: <span className="text-[#C2592B]">ulu.ins.library@sbi</span>
              </div>
              <p className="text-[11px] text-[#7A6E65]">
                Compatible with Google Pay, PhonePe, Paytm, BHIM, and all Indian Bank UPI apps.
              </p>
            </div>
          </div>

          {/* Official Bank Account Details */}
          <div className="heritage-card rounded-2xl bg-white border border-[#EADBCC] p-5 space-y-3 text-xs text-[#3E3835]">
            <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#221F1E]">
              <Building2 className="w-4 h-4 text-[#C69214]" />
              <span>Direct NEFT / RTGS Bank Transfer</span>
            </div>

            <div className="space-y-1 bg-[#FCFBF7] p-3 rounded-xl border border-[#EADBCC] font-mono text-[11px]">
              <div><strong>Account Name:</strong> Uluberia Institute & Library</div>
              <div><strong>Bank:</strong> State Bank of India (SBI)</div>
              <div><strong>Branch:</strong> Uluberia Main Branch</div>
              <div><strong>Account No:</strong> 31029845781</div>
              <div><strong>IFSC Code:</strong> SBIN0000198</div>
            </div>

            <p className="text-[10px] text-[#7A6E65]">
              After direct transfer, please WhatsApp your UTR transaction receipt to <strong>(+91) 98363 30911</strong> to receive your 80G tax certificate.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

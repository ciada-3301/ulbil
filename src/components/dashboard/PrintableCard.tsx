"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Printer, ShieldCheck, Sparkles, QrCode } from 'lucide-react';
import { generateQrDataUrl } from '@/lib/qr';
import { Patron } from '@/data/mockStore';

interface PrintableCardProps {
  patron: Patron;
}

export default function PrintableCard({ patron }: PrintableCardProps) {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    async function loadQr() {
      const verifyUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/verify/${patron.memberId}`
        : `https://ulbil.org/verify/${patron.memberId}`;
      const dataUrl = await generateQrDataUrl(verifyUrl, { width: 140, margin: 1 });
      setQrUrl(dataUrl);
    }
    loadQr();
  }, [patron.memberId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Print Trigger Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-base text-[#221F1E]">Printable Physical Wallet Card</h3>
          <p className="text-xs text-[#7A6E65]">Standard wallet size with cutting guides for physical carry or lamination.</p>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Wallet Card Mockup with Cutting Guide */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-dashed border-[#DFB343] relative overflow-hidden">
        <div className="text-[10px] text-neutral-400 font-mono mb-2 text-center print:hidden">
          ✂️ CUT ALONG THE BORDER LINE AFTER PRINTING (SIZE: 85mm × 54mm)
        </div>

        {/* Physical Card Front */}
        <div className="w-full max-w-sm mx-auto bg-gradient-to-br from-[#FEF5ED] via-[#FFFDF9] to-[#FAF4E6] border-2 border-[#DFB343] rounded-xl p-4 shadow-md text-[#221F1E] space-y-3 relative overflow-hidden">
          
          {/* Card Top Header */}
          <div className="flex items-center justify-between border-b border-[#DFB343]/60 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-9 relative shrink-0">
                <Image
                  src="/images/logo_digital.png"
                  alt="UIL Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[11px] leading-tight text-[#221F1E]">
                  ULUBERIA INSTITUTE & LIBRARY
                </h4>
                <p className="text-[8px] text-[#8C6D23] font-semibold">Estd. 1902 • 125th Quasquicentennial Jubilee</p>
              </div>
            </div>

            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#D95D24] text-white">
              {patron.tier.toUpperCase()}
            </span>
          </div>

          {/* Card Body: Photo, Info, QR */}
          <div className="flex items-center gap-3">
            {/* Patron Photo / Avatar */}
            <div className="w-14 h-16 rounded-md overflow-hidden bg-white border border-[#DFB343] shrink-0 relative flex items-center justify-center">
              {patron.photoUrl ? (
                <Image
                  src={patron.photoUrl}
                  alt={patron.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span className="font-serif font-bold text-xl text-[#C2592B]">
                  {patron.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Patron Details */}
            <div className="flex-1 space-y-0.5 text-[10px]">
              <div className="font-serif font-bold text-xs text-[#221F1E] leading-tight">
                {patron.name}
              </div>
              <div className="font-mono text-[10px] font-bold text-[#C2592B]">
                ID: {patron.memberId}
              </div>
              <div className="text-[9px] text-[#5A504B]">
                Phone: {patron.phone}
              </div>
              <div className="text-[9px] text-[#7A6E65]">
                Valid: <strong>{patron.validUntil}</strong>
              </div>
            </div>

            {/* Official Verification QR Code */}
            {qrUrl && (
              <div className="w-14 h-14 bg-white p-0.5 rounded border border-[#DFB343]/60 shrink-0 relative flex items-center justify-center">
                <Image
                  src={qrUrl}
                  alt="Member Verification QR"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Card Footer Barcode & Hologram Seal */}
          <div className="pt-2 border-t border-[#DFB343]/50 flex items-center justify-between text-[8px] text-[#7A6E65]">
            <span className="flex items-center gap-1 font-semibold text-[#8C6D23]">
              <ShieldCheck className="w-3 h-3 text-[#C69214]" />
              Official Verified Digital Card
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#221F1E]">
              ||||| | |||| ||||| ||
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

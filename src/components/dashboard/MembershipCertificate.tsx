"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Download, Printer, ShieldCheck, QrCode, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { generateQrDataUrl } from '@/lib/qr';
import { Patron } from '@/data/mockStore';

interface MembershipCertificateProps {
  patron: Patron;
}

export default function MembershipCertificate({ patron }: MembershipCertificateProps) {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    async function loadQr() {
      const verifyUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/verify/${patron.memberId}`
        : `https://ulbil.org/verify/${patron.memberId}`;
      const dataUrl = await generateQrDataUrl(verifyUrl, { width: 160, margin: 1 });
      setQrUrl(dataUrl);
    }
    loadQr();
  }, [patron.memberId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EADBCC] shadow-2xs print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/60 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Official Identity & Membership Document</span>
          </div>
          <h3 className="font-serif font-bold text-base text-[#221F1E]">
            Official Certificate of Library Membership
          </h3>
          <p className="text-xs text-[#7A6E65]">
            Serves as an authentic physical proof of membership. The dynamic QR code can be scanned by staff or external authorities to verify authenticity.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Download / Print Official PDF</span>
        </button>
      </div>

      {/* Official A4 Document Paper Container */}
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-12 rounded-3xl border-4 border-[#DFB343] shadow-2xl relative text-[#221F1E] space-y-8 print:border-2 print:p-8 print:shadow-none print:max-w-none print:w-full print:rounded-none">
        
        {/* Subtle Ornamental Double Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#EADBCC] pointer-events-none rounded-2xl print:inset-2" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 relative z-10 border-b-2 border-[#DFB343]/60 pb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-16 relative shrink-0">
              <Image
                src="/images/logo_digital.png"
                alt="UIL Emblem"
                fill
                sizes="48px"
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#8C6D23] block">
                Government Registered Non-Profit Heritage Institution (Estd. 1902)
              </span>
              <h1 className="font-serif font-extrabold text-xl sm:text-3xl text-[#221F1E] tracking-tight">
                ULUBERIA INSTITUTE & LIBRARY
              </h1>
              <p className="font-serif italic text-xs text-[#C2592B] font-semibold">
                125th Quasquicentennial Jubilee Celebration (1902 – 2027)
              </p>
              <p className="text-[10px] text-[#7A6E65]">
                Institute Road, Uluberia, Howrah, West Bengal - 711315 • Reg. No. S/1902/WB
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center space-y-1 relative z-10">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-widest bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]">
            Certificate of Active Membership
          </span>
          <div className="text-[11px] font-mono text-[#7A6E65]">
            Certificate Serial: <strong className="text-[#221F1E]">UIL/CERT/2026/{patron.memberId.replace('UIL-', '')}</strong>
          </div>
        </div>

        {/* Formal Legal Declaration Body */}
        <div className="relative z-10 space-y-6 text-xs sm:text-sm text-[#221F1E] leading-relaxed">
          
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FEF5ED]/40 to-[#FCFBF7] border border-[#DFB343]/40 space-y-4">
            <p className="font-serif text-sm sm:text-base text-justify leading-relaxed">
              This is to officially certify that <strong>Shri / Smt. {patron.name}</strong>, residing at <strong>{patron.address}</strong>, is a duly registered and verified <strong>{patron.tier}</strong> of <strong>Uluberia Institute & Library</strong> holding Member Registration Identifier <strong className="font-mono text-[#C2592B]">{patron.memberId}</strong>.
            </p>

            <p className="text-xs sm:text-sm text-justify text-[#5A504B] leading-relaxed">
              The said patron is entitled to all institutional borrowing privileges, reading room access, archival reference rights, and participation in the cultural assemblies of the library in accordance with the charter established in 1902.
            </p>
          </div>

          {/* Member Credentials & QR Authentication Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center p-4 rounded-2xl bg-white border border-[#EADBCC]">
            
            {/* Patron Particulars */}
            <div className="sm:col-span-8 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#7A6E65] block">Membership Tier:</span>
                  <strong className="text-[#221F1E]">{patron.tier}</strong>
                </div>
                <div>
                  <span className="text-[#7A6E65] block">Enrolled Date:</span>
                  <strong className="text-[#221F1E]">{patron.joinedDate}</strong>
                </div>
                <div>
                  <span className="text-[#7A6E65] block">Registered Mobile:</span>
                  <strong className="font-mono text-[#221F1E]">{patron.phone} (Verified)</strong>
                </div>
                <div>
                  <span className="text-[#7A6E65] block">Validity Period:</span>
                  <strong className="text-[#C2592B]">{patron.validUntil}</strong>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Central Institutional Registry Status: ACTIVE & VERIFIED</span>
              </div>
            </div>

            {/* Scannable Authenticity QR Code */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#FAF7F0] border border-[#DFB343]/60">
              {qrUrl && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-1 rounded-lg border border-[#DFB343] shadow-xs flex items-center justify-center">
                  <Image
                    src={qrUrl}
                    alt="Digital Authenticity QR"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-[9px] font-bold text-[#8C6D23] uppercase mt-1 tracking-wider">
                Scan with Camera to Verify
              </span>
            </div>

          </div>

        </div>

        {/* Certificate Signatures & Official Seal */}
        <div className="relative z-10 pt-8 border-t border-[#DFB343]/60 grid grid-cols-2 sm:grid-cols-3 gap-4 items-end text-center text-[10px] text-[#5A504B]">
          
          {/* Official Emblem / Seal */}
          <div className="space-y-1">
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-dashed border-[#DFB343] flex items-center justify-center text-[#C2592B] font-serif font-bold text-[9px]">
              OFFICIAL<br/>SEAL
            </div>
            <p className="text-[9px] text-[#7A6E65]">UIL Seal & Stamp</p>
          </div>

          {/* Secretary Signature */}
          <div className="space-y-1">
            <div className="font-serif italic font-bold text-sm text-[#221F1E] border-b border-[#221F1E]/40 pb-1 max-w-[140px] mx-auto">
              Siddhartha Das
            </div>
            <strong className="block text-[#221F1E]">Sri Siddhartha Das</strong>
            <span>General Secretary</span>
          </div>

          {/* President Signature */}
          <div className="col-span-2 sm:col-span-1 space-y-1">
            <div className="font-serif italic font-bold text-sm text-[#221F1E] border-b border-[#221F1E]/40 pb-1 max-w-[140px] mx-auto">
              Manas Kr. Mondal
            </div>
            <strong className="block text-[#221F1E]">Sri Manas Kr. Mondal</strong>
            <span>SDO, Uluberia & President</span>
          </div>

        </div>

        {/* Footer Security Notice */}
        <div className="text-center text-[9px] text-[#7A6E65] border-t border-[#EADBCC] pt-2 relative z-10">
          This digital certificate is generated from the central cryptographic database of Uluberia Institute & Library. To authenticate this document, scan the QR code above or visit <span className="font-mono text-[#C2592B]">https://ulbil.org/verify/{patron.memberId}</span>.
        </div>

      </div>
    </div>
  );
}

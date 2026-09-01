"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Bell, FileText, Download, Calendar, Sparkles, X, Printer, ShieldCheck } from 'lucide-react';
import { RECENT_NOTICES } from '@/data/libraryData';

export default function NoticesPage() {
  const [selectedNotice, setSelectedNotice] = useState<typeof RECENT_NOTICES[0] | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#F5F0E8] border-b border-[#E8E0D4] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-white px-3.5 py-1 rounded-full border border-[#B8860B]/60 shadow-sm">
            Official Announcements
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#2C2420]">
            Notices & Circulars
          </h1>
          <p className="text-sm sm:text-base text-[#6B635D] leading-relaxed">
            Administrative circulars, 125th Jubilee schedules, cultural contests, and library operating notifications.
          </p>
        </div>
      </section>

      {/* Notices List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 space-y-4">
        {RECENT_NOTICES.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="heritage-card p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E0D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {notice.isNew && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#FEF0EA] text-[#D95D24] border border-[#B8860B]/60">
                    NEW
                  </span>
                )}
                <span className="text-sm font-bold text-[#8B6508] px-2.5 py-0.5 rounded-full bg-[#FAF7F0] border border-[#E8E0D4]">
                  {notice.category}
                </span>
                <span className="text-sm text-[#9A918A] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#B8860B]" />
                  <span>{notice.date}</span>
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-[#2C2420] group-hover:text-[#D95D24] transition-colors">
                {notice.title}
              </h3>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:opacity-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Read Official Circular</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Archival Note */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="p-6 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D4] text-sm text-[#6B635D] text-center space-y-1">
          <p><strong>Official Notice Board:</strong> Physical copies of all notices are affixed on the library ground-floor bulletin board.</p>
          <p>For official inquiries or tender documentation, contact the Secretary at <strong>ulu.ins.library@gmail.com</strong>.</p>
        </div>
      </section>

      {/* Official Notice Modal Reader */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#FFFDF9] rounded-2xl border-2 border-[#B8860B] p-6 sm:p-10 shadow-2xl space-y-6 my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white border border-[#E8E0D4] text-[#6B635D] hover:text-[#D95D24] hover:bg-[#FEF0EA] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letterhead Header */}
            <div className="text-center space-y-2 border-b-2 border-[#B8860B]/60 pb-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-12 relative shrink-0">
                  <Image
                    src="/images/logo_digital.png"
                    alt="UIL Logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="text-left">
                  <h2 className="font-serif font-extrabold text-lg text-[#2C2420] leading-tight">
                    ULUBERIA INSTITUTE & LIBRARY
                  </h2>
                  <p className="text-[10px] text-[#B8860B] font-semibold">
                    Estd. 1902 â€¢ 125th Quasquicentennial Jubilee (Reg. No. S/1902/WB)
                  </p>
                </div>
              </div>
            </div>

            {/* Notice Metadata */}
            <div className="flex flex-wrap items-center justify-between text-sm border-b border-[#E8E0D4] pb-3 text-[#9A918A]">
              <div>
                <span>Ref No: <strong>UIL/NOT/{selectedNotice.id.toUpperCase()}/2026</strong></span>
              </div>
              <div>
                <span>Date of Issue: <strong>{selectedNotice.date}</strong></span>
              </div>
            </div>

            {/* Notice Title & Subject */}
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF0EA] text-[#D95D24] border border-[#B8860B]/40">
                OFFICIAL CIRCULAR â€¢ {selectedNotice.category.toUpperCase()}
              </span>
              <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#2C2420]">
                {selectedNotice.title}
              </h3>
            </div>

            {/* Official Content Body */}
            <div className="text-sm sm:text-base text-[#4A4340] leading-relaxed space-y-3 font-serif bg-white p-5 rounded-2xl border border-[#E8E0D4]">
              <p>
                This is for the general information of all respected members, patrons, scholars, and citizens that the Governing Council of <strong>Uluberia Institute & Library</strong> has resolved the administrative schedule regarding the captioned subject.
              </p>
              <p>
                All concerned members and applicants are requested to adhere to the designated timelines and guidelines published by the office of the Secretary.
              </p>
              <p className="text-sm text-[#9A918A] italic">
                For further clarification or submission of representations, please visit the Library Circulation Counter during official hours (9:00 AM â€“ 12:00 PM & 4:00 PM â€“ 7:00 PM).
              </p>
            </div>

            {/* Signatory Footer */}
            <div className="flex items-end justify-between pt-4 border-t border-[#E8E0D4]">
              <div className="flex items-center gap-2 text-[11px] text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Executive Circular</span>
              </div>
              <div className="text-right space-y-0.5">
                <p className="font-serif font-bold text-sm text-[#2C2420]">Sri Siddhartha Das</p>
                <p className="text-[10px] text-[#9A918A]">General Secretary, Governing Council</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl text-sm font-bold text-[#8B6508] bg-white border border-[#B8860B] hover:bg-[#FEF0EA] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Notice</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


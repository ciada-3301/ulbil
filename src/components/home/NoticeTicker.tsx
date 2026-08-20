"use client";

import React from 'react';
import Link from 'next/link';
import { Bell, ChevronRight, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { RECENT_NOTICES } from '@/data/libraryData';

export default function NoticeTicker() {
  return (
    <div className="bg-[#FAF7F0] border-b border-[#EADBCC] py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        
        {/* Notice Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#D95D24] text-white font-bold text-xs shadow-2xs">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          <span>LATEST NOTICES</span>
        </div>

        {/* Ticker Ribbon */}
        <div className="overflow-hidden relative w-full flex items-center">
          <div className="flex items-center gap-8 animate-ticker">
            {RECENT_NOTICES.concat(RECENT_NOTICES).map((notice, idx) => (
              <a
                key={idx}
                href={notice.pdfUrl || '#'}
                target={notice.pdfUrl && notice.pdfUrl !== '#' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-[#3E3835] hover:text-[#C2592B] shrink-0 transition-colors group"
              >
                {notice.isNew && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#FEF5ED] text-[#D95D24] border border-[#DFB343]/60">
                    NEW
                  </span>
                )}
                <span className="font-semibold text-[#8C6D23]">[{notice.category}]</span>
                <span className="group-hover:underline">{notice.title}</span>
                <span className="text-[#A0720A] text-[11px]">({notice.date})</span>
                <ExternalLink className="w-3 h-3 text-[#C69214] opacity-70 group-hover:opacity-100" />
                <span className="text-[#EADBCC] ml-4 font-bold">•</span>
              </a>
            ))}
          </div>
        </div>

        {/* View All Notices Link */}
        <div className="shrink-0 hidden md:block">
          <Link
            href="/notices"
            className="text-xs font-bold text-[#C2592B] hover:text-[#D95D24] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

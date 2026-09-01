"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, BookOpen, ArrowRight, MessageSquareQuote } from 'lucide-react';

export default function JubileeCelebrationBanner() {
  return (
    <section className="py-16 bg-[#F5F0E8] border-b border-[#E8E0D4] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="heritage-card rounded-2xl p-8 sm:p-12 bg-white border border-[#D4C5B0]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 125th Celebration Info */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF0EA] text-[#D95D24] border border-[#D95D24]/20 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>1902 – 2027 • Quasquicentennial Commemoration</span>
              </div>

              <h2 className="font-indic text-2xl sm:text-4xl text-[#2C2420] leading-tight">
                Celebrating 125 Years of <br />
                <span className="text-burgundy-gradient bg-gradient-to-r from-[#D95D24] to-[#A94314] bg-clip-text text-transparent">
                  Mankind, Society & Culture
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#6B635D] leading-relaxed max-w-2xl">
                As Uluberia Institute & Library steps into its landmark 125th year, we invite members, researchers, students, and citizens across Bengal to participate in our year-long celebration programs, commemorative exhibitions, and memory archives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D4] flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#D95D24] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2420]">125th Souvenir & &apos;Satta&apos; Edition</h4>
                    <p className="text-[11px] text-[#9A918A]">Special anthology of essays, memoirs, and historic photographs.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8E0D4] flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2420]">Celebration Events Calendar</h4>
                    <p className="text-[11px] text-[#9A918A]">Seminars, youth recitation/art contests, and Basanta Utsab.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/anniversary"
                  className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#D95D24] hover:bg-[#A94314] transition-all flex items-center gap-2"
                >
                  <span>Visit 125th Jubilee Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/anniversary#memory-wall"
                  className="px-5 py-3 rounded-xl text-xs font-bold text-[#2C2420] bg-transparent border border-[#D4C5B0] hover:bg-[#FEF0EA] hover:text-[#D95D24] transition-colors flex items-center gap-2"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#D95D24]" />
                  <span>Share Your Memory & Wishes</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Commemorative 125th Jubilee Official Seal */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#F5F0E8] border border-[#D4C5B0] space-y-4">
              <div className="relative w-36 h-36 flex items-center justify-center p-1 bg-white rounded-2xl border border-[#D4C5B0]">
                <Image
                  src="/images/jubilee_125_logo.jpg"
                  alt="125th Anniversary Official Committee Logo"
                  fill
                  sizes="144px"
                  className="object-contain p-2 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <span className="font-indic text-xl font-bold text-[#D95D24] block">
                  আলোর পথে-১২৫
                </span>
                <span className="block font-serif font-bold text-xs uppercase tracking-widest text-[#8B6508]">
                  ১৯০২ — ২০২৬
                </span>
                <p className="text-[11px] text-[#6B635D]">125th Quasquicentennial Jubilee Celebration</p>
              </div>

              <div className="w-full pt-2 border-t border-[#E8E0D4]">
                <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider">
                  Uluberia • Howrah • West Bengal
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

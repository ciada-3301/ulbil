"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, BookOpen, Heart, ArrowRight, Download, MessageSquareQuote } from 'lucide-react';

export default function JubileeCelebrationBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FEF5ED] via-[#FDF9F0] to-[#FEF5ED] border-b border-[#EADBCC] relative overflow-hidden">
      {/* Decorative Shimmer Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#DFB343_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="heritage-card rounded-3xl p-8 sm:p-12 bg-white/90 backdrop-blur-xs border-2 border-[#DFB343]/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: 125th Celebration Info */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/60 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
                <span>1902 – 2027 • Quasquicentennial Commemoration</span>
              </div>

              <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E] leading-tight">
                Celebrating 125 Years of <br />
                <span className="text-gold-gradient">
                  Mankind, Society & Culture
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed max-w-2xl">
                As Uluberia Institute & Library steps into its landmark 125th year, we invite members, researchers, students, and citizens across Bengal to participate in our year-long celebration programs, commemorative exhibitions, and memory archives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#C2592B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#221F1E]">125th Souvenir & &apos;Satta&apos; Edition</h4>
                    <p className="text-[11px] text-[#7A6E65]">Special anthology of essays, memoirs, and historic photographs.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#C69214] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#221F1E]">Celebration Events Calendar</h4>
                    <p className="text-[11px] text-[#7A6E65]">Seminars, youth recitation/art contests, and Basanta Utsab.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/anniversary"
                  className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-sm transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Visit 125th Jubilee Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/anniversary#memory-wall"
                  className="px-5 py-3 rounded-xl text-xs font-bold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] hover:text-[#C2592B] transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#C2592B]" />
                  <span>Share Your Memory & Wishes</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Commemorative Seal Visual Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border border-[#DFB343] shadow-inner space-y-4">
              <div className="relative w-24 h-32 flex items-center justify-center">
                <Image
                  src="https://www.ulbil.org/images/Logo/logo_digital.png"
                  alt="125th Anniversary Crest"
                  width={80}
                  height={100}
                  className="object-contain drop-shadow-md"
                />
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-serif font-extrabold text-[#C2592B]">125</span>
                <span className="block font-serif font-bold text-xs uppercase tracking-widest text-[#8C6D23]">
                  Years of Illumination
                </span>
                <p className="text-[11px] text-[#7A6E65]">1902 — 2027</p>
              </div>

              <div className="w-full pt-2 border-t border-[#EADBCC]">
                <span className="text-[10px] font-bold text-[#C69214] uppercase tracking-wider">
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

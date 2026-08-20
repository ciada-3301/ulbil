"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Award, 
  BookOpen, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function HeroSection() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D95D24', '#DFB343', '#C69214', '#FBF4E4', '#8B263E']
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFBF7] via-[#FAF6ED] to-[#F7F2E6] border-b border-[#EADBCC] pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Subtle Background Pattern Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#DFB343_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#DFB343]/15 to-[#D95D24]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#C69214]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* 125th Anniversary Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DFB343] shadow-xs hover:border-[#C69214] transition-all">
            <span className="flex h-2 w-2 rounded-full bg-[#D95D24] animate-ping" />
            <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#C2592B]">
              125th Quasquicentennial Jubilee (1902 – 2027)
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#221F1E] tracking-tight leading-[1.15]">
            A Century & A Quarter of <br />
            <span className="bg-gradient-to-r from-[#D95D24] via-[#C69214] to-[#A0720A] bg-clip-text text-transparent">
              Knowledge, Culture & Community
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5A504B] max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>Uluberia Institute & Library</strong> — the historic sanctuary of literature, Bengali culture, and public learning in Howrah, fostering generations since 1902.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/anniversary"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#D95D24] via-[#C69214] to-[#B74715] hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Explore 125 Years Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/catalogue"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-[#3E3835] bg-white border border-[#DFB343]/80 hover:bg-[#FEF5ED] hover:text-[#C2592B] shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#C69214]" />
              <span>Search 55,000+ Books</span>
            </Link>

            <button
              onClick={triggerConfetti}
              className="px-4 py-3.5 rounded-xl text-xs font-semibold text-[#8C6D23] bg-[#FEF5ED] border border-[#DFB343]/60 hover:bg-[#FBF4E4] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Click to celebrate 125 years!"
            >
              <PartyPopper className="w-4 h-4 text-[#D95D24]" />
              <span>Celebrate!</span>
            </button>
          </div>

          {/* Motto Tagline Pill */}
          <div className="pt-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8C6D23] bg-white/80 px-4 py-1 rounded-full border border-[#EADBCC]">
              {LIBRARY_INFO.bengaliName} • {LIBRARY_INFO.bengaliTagline}
            </span>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {LIBRARY_INFO.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="heritage-card p-4 sm:p-5 rounded-2xl text-center flex flex-col items-center justify-center bg-white border border-[#EADBCC]/80 shadow-xs"
            >
              <span className="font-serif font-extrabold text-2xl sm:text-3xl text-[#C2592B]">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-[#221F1E] mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#7A6E65]">
                {stat.suffix}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  ArrowRight,
  Building2,
  BookOpen
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] border-b border-[#E8E0D4] pt-6 pb-10 sm:pt-7 sm:pb-12 lg:pt-8 lg:pb-14">
      
      {/* Subtle vintage parchment texture and ambient warmth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0] via-[#F5F0E8] to-[#EFE7DA] opacity-80 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[600px] h-[600px] bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-[500px] h-[500px] bg-[#D95D24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Full-Canvas Symbiotic 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Stately Editorial Typography & CTAs, optically centered */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left lg:pl-6 xl:pl-12 2xl:pl-16">
            
            {/* 125th Quasquicentennial Jubilee Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/95 border border-[#B8860B]/80 shadow-xs backdrop-blur-xs">
              <div className="relative w-5 h-5 shrink-0 rounded-full overflow-hidden border border-[#D4C5B0]">
                <Image
                  src="/images/jubilee_125_logo.jpg"
                  alt="125th Jubilee Official Logo"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#D95D24]">
                আলোর পথে-১২৫ (১৯০২-২০২৬) • Quasquicentennial Jubilee
              </span>
            </div>

            {/* Main Grand Title */}
            <h1 className="font-serif text-3.5xl sm:text-4xl lg:text-[44px] xl:text-[52px] 2xl:text-[58px] text-[#2C2420] tracking-tight leading-[1.14] font-bold">
              A Century & A Quarter of <br />
              <span className="bg-gradient-to-r from-[#D95D24] via-[#C2592B] to-[#A94314] bg-clip-text text-transparent">
                Knowledge, Culture & Community
              </span>
            </h1>

            {/* Subtitle / Chronicle Intro */}
            <p className="font-sans text-sm sm:text-base text-[#5A504B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Welcome to <strong>Uluberia Institute & Library</strong> — the historic sanctuary of literature, Bengal heritage, and public learning in Howrah, nurturing scholars and fostering generations since 1902.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-0.5">
              <Link
                href="/anniversary"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:bg-[#C2592B] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Explore 125 Years</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/catalogue"
                className="px-6 py-3 rounded-xl text-sm font-bold text-[#2C2420] bg-white/95 border border-[#D4C5B0] hover:bg-[#FEF0EA] hover:text-[#D95D24] hover:border-[#D95D24]/40 transition-all flex items-center gap-2 shadow-xs"
              >
                <Search className="w-4 h-4 text-[#B8860B]" />
                <span>Search 55,000+ Books</span>
              </Link>
            </div>

            {/* Bottom Integrated Trust & Heritage Badges */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-[#7A6E65]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-[#E8E0D4] font-medium shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Estd. 1902</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-[#E8E0D4] font-medium shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>55k+ Volumes</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-[#E8E0D4] font-medium text-[#8B6508] shadow-2xs">
                <span>{LIBRARY_INFO.bengaliName}</span>
              </span>
            </div>

          </div>

          {/* Right Column: Expansive, Beautifully Blended Heritage Lithograph */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative pr-0 lg:pr-2 xl:pr-6">
            
            {/* Background feathering ambient plate */}
            <div className="absolute inset-0 bg-[#F5F0E8]/60 rounded-3xl blur-xl pointer-events-none scale-95" />

            <div 
              className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-[680px] 2xl:max-w-[720px] aspect-[1024/736] max-h-[480px] xl:max-h-[520px] transition-all"
              style={{
                maskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 74%, rgba(0,0,0,0.65) 88%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 74%, rgba(0,0,0,0.65) 88%, transparent 100%)'
              }}
            >
              <Image
                src="/images/library_heritage_backdrop.jpg"
                alt="Uluberia Institute & Library Architectural Heritage (Estd. 1902)"
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 720px"
                priority
                className="object-contain object-center opacity-90 mix-blend-multiply filter contrast-[1.04] saturate-[0.98] transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ArrowUp
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F0] border-t-2 border-[#D4C5B0] text-[#4A4340] mt-16">
      {/* 125th Jubilee Commemorative Top Ribbon - Simple Brass Rule & Text */}
      <div className="border-b border-[#B8860B] py-3 px-5 sm:px-8 lg:px-12 xl:px-16 text-center text-sm font-serif font-bold text-[#B8860B] tracking-wide">
        <div className="w-full max-w-[1560px] mx-auto flex items-center justify-center">
          <span>1902 – 2027 • 125 Years of Public Service, Literacy & Culture</span>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="w-full max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Heritage Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 p-1 bg-white rounded-xl border border-[#D4C5B0] flex items-center justify-center shrink-0">
                <Image 
                  src="https://www.ulbil.org/images/Logo/logo_digital.png" 
                  alt="Uluberia Institute & Library Logo" 
                  width={38} 
                  height={50} 
                  className="object-contain"
                />
              </div>
              <div className="w-12 h-14 p-1 bg-white rounded-xl border border-[#D4C5B0] flex items-center justify-center shrink-0">
                <Image 
                  src="/images/jubilee_125_logo.jpg" 
                  alt="125th Jubilee Emblem" 
                  width={42} 
                  height={42} 
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#2C2420] leading-tight">
                  ULUBERIA INSTITUTE & LIBRARY
                </h3>
                <p className="text-[13px] text-[#B8860B] font-bold font-indic mt-0.5">আলোর পথে-১২৫ (১৯০২-২০২৭)</p>
              </div>
            </div>
            
            <p className="text-sm text-[#6B635D] leading-relaxed">
              A century-old hallowed ground for education, art, literature, and social values in Uluberia, Howrah. Mother institution to Uluberia College & Binapani Girls&apos; High School.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-[#FEF0EA] text-[#D95D24] border border-[#D4C5B0]/50">
                Motto: {LIBRARY_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#D95D24] border-b border-[#E8E0D4] pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/anniversary" className="hover:text-[#D95D24] transition-colors flex items-center gap-1.5 text-[#B8860B] font-semibold">125th Jubilee Celebration Hub</Link></li>
              <li><Link href="/about" className="hover:text-[#D95D24] transition-colors">History & Foundation of 1902</Link></li>
              <li><Link href="/leadership" className="hover:text-[#D95D24] transition-colors">Governing Council & Dignitary Messages</Link></li>
              <li><Link href="/catalogue" className="hover:text-[#D95D24] transition-colors">Search Book Catalogue (55k+ Volumes)</Link></li>
              <li><Link href="/services" className="hover:text-[#D95D24] transition-colors">Library Wings & Research Desks</Link></li>
              <li><Link href="/notices" className="hover:text-[#D95D24] transition-colors">Notices, Circulars & Newsletter</Link></li>
              <li><Link href="/membership" className="hover:text-[#D95D24] transition-colors">Online Membership Registration</Link></li>
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#D95D24] border-b border-[#E8E0D4] pb-2">
              Library Hours & Timing
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-white border border-[#E8E0D4] space-y-1.5">
                <div className="font-semibold text-[#8B6508] flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Daily Operating Schedule</span>
                </div>
                <div className="text-[#4A4340] pl-5">
                  <p><strong>Morning:</strong> {LIBRARY_INFO.timings.morning}</p>
                  <p><strong>Evening:</strong> {LIBRARY_INFO.timings.evening}</p>
                </div>
                <p className="text-xs text-[#9A918A] pt-1 pl-5">Open all 7 days (except notified holidays)</p>
              </div>

              <div className="pt-2">
                <a 
                  href="https://www.facebook.com/p/Uluberia-Institute-Library-61553707542427/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] font-semibold text-sm hover:bg-[#1877F2]/20 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Follow Official Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#D95D24] border-b border-[#E8E0D4] pb-2">
              Contact & Address
            </h4>
            <ul className="space-y-3 text-sm text-[#6B635D]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#D95D24] shrink-0 mt-0.5" />
                <span>{LIBRARY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-[#B8860B] shrink-0" />
                <a href="tel:+919836330911" className="hover:text-[#D95D24] font-medium">{LIBRARY_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-[#B8860B] shrink-0" />
                <a href="mailto:ulu.ins.library@ulbil.org" className="hover:text-[#D95D24]">{LIBRARY_INFO.emails[0]}</a>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="w-full py-2.5 rounded-xl bg-transparent border border-[#B8860B] hover:bg-[#F7F0E0] text-[#8B6508] font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright & Official Disclaimer */}
      <div className="bg-[#F5F0E8] border-t border-[#E8E0D4] py-8 px-4 sm:px-8 text-sm text-[#9A918A]">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <div className="max-w-3xl mx-auto text-xs leading-relaxed italic text-[#6B635D]">
            <strong>Copyright & Disclaimer:</strong> No part of this site may be reproduced in any form without written permission of the Secretary of Uluberia Institute & Library. While all efforts are made to keep information authentic and current, the authority holds no responsibility for inadvertent errors.
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8E0D4] text-xs">
            <p>© 1902–2027 Uluberia Institute & Library. All Rights Reserved.</p>
            <p>Modernized for the 125th Quasquicentennial Celebration</p>
            <p>Official Domain: <strong>ulbil.org</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

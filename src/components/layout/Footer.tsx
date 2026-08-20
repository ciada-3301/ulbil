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
  ArrowUp, 
  Sparkles,
  Share2
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F0] border-t-2 border-[#DFB343]/40 text-[#3E3835] mt-16">
      {/* 125th Jubilee Commemorative Top Ribbon */}
      <div className="bg-gradient-to-r from-[#C69214] via-[#D95D24] to-[#C69214] text-white py-3 px-4 sm:px-8 text-center text-xs sm:text-sm font-serif font-semibold tracking-wide shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>1902–2027 • Commemorating 125 Glorious Years of Public Service, Literacy & Culture in Uluberia</span>
          <Sparkles className="w-4 h-4 text-amber-200" />
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Heritage Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 p-1 bg-white rounded-lg border border-[#DFB343] shadow-xs flex items-center justify-center shrink-0">
                <Image 
                  src="https://www.ulbil.org/images/Logo/logo_digital.png" 
                  alt="Uluberia Institute & Library Logo" 
                  width={38} 
                  height={50} 
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#221F1E] leading-tight">
                  ULUBERIA INSTITUTE & LIBRARY
                </h3>
                <p className="text-xs text-[#C69214] font-semibold">Estd. 1902 • Quasquicentennial Jubilee</p>
              </div>
            </div>
            
            <p className="text-xs text-[#5A504B] leading-relaxed">
              A century-old hallowed ground for education, art, literature, and social values in Uluberia, Howrah. Mother institution to Uluberia College & Binapani Girls&apos; High School.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/50">
                Motto: {LIBRARY_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#C2592B] border-b border-[#EADBCC] pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/anniversary" className="hover:text-[#C2592B] transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-[#C69214]" />125th Jubilee Celebration Hub</Link></li>
              <li><Link href="/about" className="hover:text-[#C2592B] transition-colors">History & Foundation of 1902</Link></li>
              <li><Link href="/leadership" className="hover:text-[#C2592B] transition-colors">Governing Council & Dignitary Messages</Link></li>
              <li><Link href="/catalogue" className="hover:text-[#C2592B] transition-colors">Search Book Catalogue (55k+ Volumes)</Link></li>
              <li><Link href="/services" className="hover:text-[#C2592B] transition-colors">Library Wings & Research Desks</Link></li>
              <li><Link href="/notices" className="hover:text-[#C2592B] transition-colors">Notices, Circulars & Newsletter</Link></li>
              <li><Link href="/membership" className="hover:text-[#C2592B] transition-colors">Online Membership Registration</Link></li>
            </ul>
          </div>

          {/* Column 3: Hours & Operations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#C2592B] border-b border-[#EADBCC] pb-2">
              Library Hours & Timing
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-[#EADBCC] space-y-1">
                <div className="font-semibold text-[#8C6D23] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Daily Operating Schedule</span>
                </div>
                <div className="text-[#3E3835]">
                  <p><strong>Morning:</strong> {LIBRARY_INFO.timings.morning}</p>
                  <p><strong>Evening:</strong> {LIBRARY_INFO.timings.evening}</p>
                </div>
                <p className="text-[11px] text-[#7A6E65] pt-1">Open all 7 days (except notified holidays)</p>
              </div>

              <div className="pt-2">
                <a 
                  href="https://www.facebook.com/p/Uluberia-Institute-Library-61553707542427/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1877F2]/10 text-[#1877F2] font-semibold text-xs hover:bg-[#1877F2]/20 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Follow Official Facebook Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#C2592B] border-b border-[#EADBCC] pb-2">
              Contact & Address
            </h4>
            <ul className="space-y-2 text-xs text-[#5A504B]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C2592B] shrink-0 mt-0.5" />
                <span>{LIBRARY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C69214] shrink-0" />
                <a href="tel:+919836330911" className="hover:text-[#C2592B] font-medium">{LIBRARY_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C69214] shrink-0" />
                <a href="mailto:ulu.ins.library@ulbil.org" className="hover:text-[#C2592B]">{LIBRARY_INFO.emails[0]}</a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-2 rounded-lg bg-white border border-[#DFB343] hover:bg-[#FEF5ED] text-[#8C6D23] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright & Official Disclaimer */}
      <div className="bg-[#F3EFE6] border-t border-[#EADBCC] py-6 px-4 sm:px-8 text-xs text-[#7A6E65]">
        <div className="max-w-7xl mx-auto space-y-3 text-center">
          <div className="max-w-3xl mx-auto text-[11px] leading-relaxed italic bg-white/70 p-3 rounded-lg border border-[#EADBCC]">
            <strong>Copyright & Disclaimer:</strong> No part of this site may be reproduced in any form without written permission of the Secretary of Uluberia Institute & Library. While all efforts are made to keep information authentic and current, the authority holds no responsibility for inadvertent errors.
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EADBCC]/60 text-[11px]">
            <p>© 1902–2027 Uluberia Institute & Library. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              <span>Modernized for the 125th Quasquicentennial Celebration</span>
            </p>
            <p>Official Domain: <strong>ulbil.org</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

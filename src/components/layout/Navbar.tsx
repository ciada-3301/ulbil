"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Clock, 
  Phone, 
  Sparkles, 
  Award,
  BookOpen
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', bengaliLabel: 'হোম' },
    { href: '/anniversary', label: '125th Jubilee', bengaliLabel: '১২৫তম বর্ষপূর্তি', isHighlight: true },
    { href: '/about', label: 'About Us', bengaliLabel: 'আমাদের সম্পর্কে' },
    { href: '/leadership', label: 'Leadership', bengaliLabel: 'নেতৃত্ব ও বার্তা' },
    { href: '/catalogue', label: 'Catalogue', bengaliLabel: 'গ্রন্থ তালিকা' },
    { href: '/services', label: 'Wings & Services', bengaliLabel: 'বিভাগসমূহ' },
    { href: '/notices', label: 'Notices', bengaliLabel: 'বিজ্ঞপ্তি' },
    { href: '/gallery', label: 'Gallery', bengaliLabel: 'চিত্রশালা' },
    { href: '/membership', label: 'Membership', bengaliLabel: 'সদস্যতা' },
    { href: '/contact', label: 'Contact', bengaliLabel: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Heritage Utility Bar (Ultra-slim) */}
      <div className="bg-[#FAF7F0] border-b border-[#EADBCC] text-[11px] text-[#5A504B] py-0.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Timings & Real-time Clock */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 font-medium text-[#C2592B]">
              <Clock className="w-3 h-3" />
              <span>Timings: {LIBRARY_INFO.timings.morning} & {LIBRARY_INFO.timings.evening}</span>
            </div>
            {timeStr && (
              <span className="hidden md:inline text-neutral-300">|</span>
            )}
            {timeStr && (
              <span className="hidden md:inline font-mono text-[#8C6D23]">Live: {timeStr}</span>
            )}
          </div>

          {/* Right: Phone, Email & Language Switcher */}
          <div className="flex items-center gap-3">
            <a href="tel:+919836330911" className="hidden sm:flex items-center gap-1 hover:text-[#C2592B] transition-colors">
              <Phone className="w-2.5 h-2.5 text-[#C69214]" />
              <span>{LIBRARY_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
                className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white border border-[#DFB343] text-[#8C6D23] hover:bg-[#FEF5ED] transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                title="Toggle Bengali Script"
              >
                <span>{language === 'EN' ? 'বাংলা সংস্করণ' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Slim & Streamlined) */}
      <nav className={`bg-white/95 backdrop-blur-md border-b border-[#EADBCC] transition-shadow duration-300 ${
        isScrolled ? 'shadow-md shadow-[#C69214]/5' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-3">
          
          {/* Brand Logo & 125th Crest */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-10 shrink-0 flex items-center justify-center p-0.5 bg-gradient-to-b from-[#FEF5ED] to-white rounded-md border border-[#DFB343]/60 shadow-2xs group-hover:border-[#C69214] transition-all">
              <Image 
                src="https://www.ulbil.org/images/Logo/logo_digital.png" 
                alt="Uluberia Institute & Library Logo" 
                width={26} 
                height={34} 
                className="object-contain"
                priority
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm sm:text-base tracking-tight text-[#221F1E] group-hover:text-[#C2592B] transition-colors leading-tight">
                ULUBERIA INSTITUTE & LIBRARY
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-[#7A6E65] leading-none mt-0.5">
                <span className="font-semibold text-[#C69214]">Estd. 1902</span>
                <span>•</span>
                <span className="italic tracking-wider uppercase font-medium text-[#8C6D23]">
                  {language === 'BN' ? LIBRARY_INFO.bengaliTagline : LIBRARY_INFO.tagline}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-0.5 text-xs font-medium text-[#3E3835]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1 rounded-md transition-all relative ${
                    isActive 
                      ? 'text-[#C2592B] font-bold bg-[#FEF5ED]' 
                      : link.isHighlight 
                        ? 'text-[#C69214] font-bold hover:bg-[#FEF5ED]' 
                        : 'hover:text-[#C2592B] hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {link.isHighlight && <Sparkles className="w-2.5 h-2.5 text-[#C69214]" />}
                    {language === 'BN' ? link.bengaliLabel : link.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#C2592B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/membership"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:from-[#C2592B] hover:to-[#B0800F] shadow-2xs hover:shadow-xs transition-all flex items-center gap-1 active:scale-95"
            >
              <Award className="w-3 h-3" />
              <span>Join Library</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-1.5 rounded-md text-[#3E3835] hover:bg-[#FAF7F0] border border-[#EADBCC] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#C2592B]" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="xl:hidden bg-white border-t border-[#EADBCC] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EADBCC]/60">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-[#FEF5ED] text-[#C2592B] font-bold border-l-2 border-[#C2592B]' 
                        : link.isHighlight
                          ? 'bg-[#FBF4E4] text-[#C69214] font-bold'
                          : 'text-[#3E3835] hover:bg-[#FAF7F0]'
                    }`}
                  >
                    {language === 'BN' ? link.bengaliLabel : link.label}
                  </Link>
                );
              })}
            </div>
            
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/membership"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] shadow-sm"
              >
                Apply for Online Membership
              </Link>
              <div className="text-center text-[11px] text-[#7A6E65]">
                Helpline: (+91) 98363 30911
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSeniorMode } from '@/components/providers/SeniorModeProvider';
import { 
  Clock, 
  Phone, 
  Menu, 
  X, 
  User,
  HeartHandshake,
  Glasses
} from 'lucide-react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const { seniorMode, toggleSeniorMode } = useSeniorMode();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    { href: '/donate', label: '125th Fund', bengaliLabel: 'অনুদান', isHighlight: true },
    { href: '/contact', label: 'Contact', bengaliLabel: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Heritage Utility Bar (Ultra-slim) */}
      <div className="bg-[#FAF7F0] border-b border-[#E8E0D4] text-[11px] text-[#6B635D] py-0.5 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-[1560px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Timings */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 font-medium text-[#D95D24]">
              <Clock className="w-3 h-3" />
              <span>Timings: {LIBRARY_INFO.timings.morning} & {LIBRARY_INFO.timings.evening}</span>
            </div>
          </div>

          {/* Right: Senior Reader Mode, Phone & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSeniorMode}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                seniorMode 
                  ? 'bg-[#D95D24] text-white' 
                  : 'bg-white border border-[#B8860B] text-[#8B6508] hover:bg-[#FEF0EA]'
              }`}
              title="Toggle Large Text / Senior Reader Accessibility"
            >
              <Glasses className="w-3 h-3" />
              <span>{seniorMode ? 'সহজ পাঠ (ON)' : 'সহজ পাঠ'}</span>
            </button>

            <span className="hidden sm:inline text-neutral-300">|</span>

            <a href="tel:+919836330911" className="hidden sm:flex items-center gap-1 hover:text-[#D95D24] transition-colors">
              <Phone className="w-2.5 h-2.5 text-[#B8860B]" />
              <span>{LIBRARY_INFO.phone}</span>
            </a>

            <span className="hidden sm:inline text-neutral-300">|</span>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'BN' : 'EN')}
                className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white border border-[#B8860B] text-[#8B6508] hover:bg-[#FEF0EA] transition-all flex items-center gap-1 cursor-pointer"
                title="Toggle Bengali Script"
              >
                <span>{language === 'EN' ? 'বাংলা সংস্করণ' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Heritage Navbar */}
      <nav className={`bg-white/95 backdrop-blur-md border-b border-[#E8E0D4] transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}>
        <div className="w-full max-w-[1560px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between py-2 sm:py-2.5">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-10 shrink-0 flex items-center justify-center p-0.5 bg-[#FEF0EA] rounded-md border border-[#D4C5B0] transition-all">
              <Image 
                src="/images/logo_digital.png" 
                alt="Uluberia Institute & Library Logo" 
                width={28} 
                height={34} 
                className="object-contain w-auto h-auto" 
                priority
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight text-[#2C2420] group-hover:text-[#D95D24] transition-colors leading-tight">
                ULUBERIA INSTITUTE & LIBRARY
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#9A918A] leading-none mt-0.5">
                <span>Estd. 1902</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2 text-sm font-medium text-[#4A4340]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1 rounded-md transition-all relative ${
                    isActive 
                      ? 'text-[#D95D24] font-bold bg-[#FEF0EA]' 
                      : link.isHighlight 
                        ? 'text-[#B8860B] font-bold hover:bg-[#F7F0E0]' 
                        : 'hover:text-[#D95D24] hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {language === 'BN' ? link.bengaliLabel : link.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#D95D24] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons: Sign In / Dashboard & Donate */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/auth/signin"
              className="px-3 py-1.5 rounded-xl text-sm font-bold text-[#D95D24] border border-[#D4C5B0] hover:bg-[#FEF0EA] transition-colors flex items-center gap-1"
            >
              <User className="w-4 h-4" />
              <span>Member Sign In</span>
            </Link>

            <Link
              href="/donate"
              className="px-4 py-1.5 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:bg-[#A94314] transition-all flex items-center gap-1 active:scale-95"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>125th Fund</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-1.5 rounded-md text-[#4A4340] hover:bg-[#FAF7F0] border border-[#E8E0D4] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#D95D24]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Full Overlay Menu */}
        {isOpen && (
          <div className="xl:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto pb-20 animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-4">
              <div className="grid grid-cols-1 gap-2 pb-6 border-b border-[#E8E0D4]">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? 'bg-[#FEF0EA] text-[#D95D24] font-bold border-l-4 border-[#D95D24]' 
                          : link.isHighlight
                            ? 'bg-[#F7F0E0] text-[#B8860B] font-bold'
                            : 'text-[#4A4340] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      {language === 'BN' ? link.bengaliLabel : link.label}
                    </Link>
                  );
                })}
              </div>
              
              <div className="pt-2 flex flex-col gap-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-bold text-[#D95D24] border border-[#D4C5B0]"
                >
                  Member Sign In
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-bold text-[#D95D24] bg-[#FEF0EA] border border-[#D95D24]/40"
                >
                  My Member Card
                </Link>

                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-[#D95D24]"
                >
                  Contribute to 125th Jubilee Fund
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#9A918A] pt-4 px-1">
                  <Link href="/librarian" onClick={() => setIsOpen(false)} className="hover:underline">
                    Librarian Desk
                  </Link>
                  <span>•</span>
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="hover:underline">
                    Admin Portal
                  </Link>
                  <span>•</span>
                  <span>(+91) 98363 30911</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

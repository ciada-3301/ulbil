import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  GraduationCap, 
  HeartHandshake, 
  Clock, 
  BookOpen, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar
} from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import NoticeTicker from '@/components/home/NoticeTicker';
import StatsStrip from '@/components/home/StatsStrip';
import HeritageCarousel from '@/components/home/HeritageCarousel';
import JubileeCelebrationBanner from '@/components/home/JubileeCelebrationBanner';
import WingsGrid from '@/components/home/WingsGrid';
import CatalogueSpotlight from '@/components/home/CatalogueSpotlight';
import EminentVoices from '@/components/home/EminentVoices';
import SectionDivider from '@/components/shared/SectionDivider';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function Home() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section (Clean Text on Left + Picture on Right) */}
      <HeroSection />

      {/* 2. Live Notice Ribbon */}
      <NoticeTicker />

      {/* 3. Heritage Stats Strip */}
      <StatsStrip />
      
      {/* 4. Living Heritage Showcase & Photo Slideshow */}
      <HeritageCarousel />
      <SectionDivider />

      {/* 5. 125th Jubilee Celebration Callout */}
      <JubileeCelebrationBanner />

      {/* 6. Historic Impact Banner: Mothers of Uluberia College & Binapani High */}
      <section className="py-14 bg-white border-b border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#FEF0EA] via-[#FAF7F0] to-[#F7F0E0] border border-[#D4C5B0] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D4C5B0] text-xs font-bold text-[#D95D24]">
                  <GraduationCap className="w-4 h-4 text-[#B8860B]" />
                  <span>Historic Educational Impact</span>
                </div>
                <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2C2420]">
                  A Mother Institution of Regional Education
                </h3>
                <p className="text-sm text-[#6B635D] leading-relaxed">
                  Beyond being a sanctuary of books, <strong>Uluberia Institute & Library</strong> served as the cradle for higher education and women&apos;s empowerment in Howrah. Its visionaries spearheaded the foundation of <strong>Uluberia College (1948)</strong> and <strong>Binapani Girls&apos; High School (1955)</strong>.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm font-semibold text-[#8B6508]">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#B8860B]" /> Uluberia College (Estd. 1948)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#B8860B]" /> Binapani Girls&apos; High School (Estd. 1955)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#B8860B]" /> &apos;Satta&apos; Literary Journal</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/about"
                  className="w-full text-center px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:bg-[#A94314] shadow-sm transition-all"
                >
                  Read Historical Chronicle
                </Link>
                <Link
                  href="/anniversary"
                  className="w-full text-center px-5 py-3 rounded-xl text-sm font-bold text-[#D95D24] bg-white border border-[#D4C5B0] hover:bg-[#FEF0EA] transition-colors"
                >
                  View 125-Year Timeline
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 7. Library Wings & Sections Grid */}
      <WingsGrid />

      <SectionDivider />

      {/* 8. Searchable Catalogue Spotlight */}
      <CatalogueSpotlight />

      <SectionDivider />

      {/* 9. Eminent Voices & Leadership */}
      <EminentVoices />

      {/* 10. Call to Action: Join as Member / Support the 125th Fund */}
      <section className="py-16 bg-gradient-to-b from-[#FAF7F0] to-[#F5F0E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEF0EA] border border-[#D4C5B0] text-sm font-bold text-[#D95D24] shadow-sm">
            <HeartHandshake className="w-4 h-4 text-[#B8860B]" />
            <span>Community & Heritage Stewardship</span>
          </div>

          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#2C2420]">
            Become a Part of Our 125-Year Legacy
          </h2>

          <p className="text-sm text-[#6B635D] max-w-2xl mx-auto leading-relaxed">
            Whether you are a student preparing for career examinations, a scholar conducting research on Bengal history, or a bibliophile, Uluberia Institute & Library welcomes you with open arms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/membership"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:bg-[#A94314] shadow-md transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Apply for Membership</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-[#D95D24] bg-white border border-[#D4C5B0] hover:bg-[#FEF0EA] transition-colors"
            >
              Plan Your Visit & Hours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

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
import JubileeCelebrationBanner from '@/components/home/JubileeCelebrationBanner';
import WingsGrid from '@/components/home/WingsGrid';
import CatalogueSpotlight from '@/components/home/CatalogueSpotlight';
import EminentVoices from '@/components/home/EminentVoices';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function Home() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Notice Ribbon */}
      <NoticeTicker />

      {/* 3. 125th Jubilee Celebration Callout */}
      <JubileeCelebrationBanner />

      {/* 4. Historic Impact Banner: Mothers of Uluberia College & Binapani High */}
      <section className="py-14 bg-white border-b border-[#EADBCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FEF5ED] via-[#FCFBF7] to-[#FAF6ED] border-2 border-[#DFB343]/70 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DFB343]/60 text-[11px] font-bold text-[#C2592B]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C69214]" />
                  <span>Historic Educational Impact</span>
                </div>
                <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E]">
                  A Mother Institution of Regional Education
                </h3>
                <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
                  Beyond being a sanctuary of books, <strong>Uluberia Institute & Library</strong> served as the cradle for higher education and women&apos;s empowerment in Howrah. Its visionaries spearheaded the foundation of <strong>Uluberia College (1948)</strong> and <strong>Binapani Girls&apos; High School (1955)</strong>.
                </p>
                
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#8C6D23]">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#C2592B]" /> Uluberia College (Estd. 1948)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#C2592B]" /> Binapani Girls&apos; High School (Estd. 1955)</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#C2592B]" /> &apos;Satta&apos; Literary Journal</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/about"
                  className="w-full text-center px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-xs transition-all"
                >
                  Read Historical Chronicle
                </Link>
                <Link
                  href="/anniversary"
                  className="w-full text-center px-5 py-3 rounded-xl text-xs font-bold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FAF7F0] transition-colors"
                >
                  View 125-Year Timeline
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Library Wings & Sections Grid */}
      <WingsGrid />

      {/* 6. Searchable Catalogue Spotlight */}
      <CatalogueSpotlight />

      {/* 7. Eminent Voices & Leadership */}
      <EminentVoices />

      {/* 8. Call to Action: Join as Member / Support the 125th Fund */}
      <section className="py-16 bg-gradient-to-b from-[#FAF7F0] to-[#F3EFE6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#DFB343] text-xs font-bold text-[#C2592B] shadow-2xs">
            <HeartHandshake className="w-4 h-4 text-[#C69214]" />
            <span>Community & Heritage Stewardship</span>
          </div>

          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E]">
            Become a Part of Our 125-Year Legacy
          </h2>

          <p className="text-xs sm:text-sm text-[#5A504B] max-w-2xl mx-auto leading-relaxed">
            Whether you are a student preparing for career examinations, a scholar conducting research on Bengal history, or a bibliophile, Uluberia Institute & Library welcomes you with open arms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/membership"
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-md transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Apply for Membership</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-[#3E3835] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] hover:text-[#C2592B] transition-colors"
            >
              Plan Your Visit & Hours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


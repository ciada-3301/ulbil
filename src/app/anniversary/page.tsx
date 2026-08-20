import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Award, 
  Download, 
  Image as ImageIcon, 
  FileText, 
  MessageSquareQuote,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import TimelineJourney from '@/components/anniversary/TimelineJourney';
import MemoryWall from '@/components/anniversary/MemoryWall';
import { GALLERY_SLIDES } from '@/data/libraryData';

export const metadata = {
  title: "125th Quasquicentennial Jubilee (1902–2027)",
  description: "Explore 125 years of glorious history, milestones, digital archives, commemorative souvenir publications, and patron memories.",
};

export default function AnniversaryPage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border-b border-[#EADBCC] py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#DFB343] text-xs font-bold text-[#C2592B] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
            <span>1902 — 2027 • Quasquicentennial Milestone</span>
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E] leading-tight">
            125 Years of Illuminating <br />
            <span className="text-gold-gradient">Mankind, Society & Culture</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#5A504B] max-w-2xl mx-auto leading-relaxed">
            From our founding on the second floor of Uluberia High English School in 1902 to our standing today as a premier centre of Bengal intellect and heritage, we celebrate a glorious century and a quarter of public service.
          </p>
        </div>
      </section>

      {/* 2. Interactive Milestone Timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-[#FEF5ED] px-3.5 py-1 rounded-full border border-[#DFB343]/50">
            Historical Progression
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E] mt-3">
            The 125-Year Journey (1902–Present)
          </h2>
          <p className="text-xs sm:text-sm text-[#5A504B] mt-2">
            Click on the historical categories below to filter key turning points in our institution&apos;s heritage.
          </p>
        </div>

        <TimelineJourney />
      </section>

      {/* 3. Commemorative Souvenir & Publications */}
      <section className="bg-[#FAF7F0] border-y border-[#EADBCC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
                Commemorative Releases
              </span>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E]">
                125th Quasquicentennial Souvenir & &apos;Satta&apos; Special Volume
              </h2>
              <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
                Featuring handwritten letters from eminent historians, rare archival photographs of Uluberia from 1902–1950, articles on Bengal literature, and personal memoirs by our longest-serving patrons and teachers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-[#EADBCC] text-xs space-y-1">
                  <div className="font-bold text-[#221F1E] flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-[#C2592B]" />
                    <span>Hardbound Jubilee Volume</span>
                  </div>
                  <p className="text-[11px] text-[#7A6E65]">250+ Pages with rare manuscript plates & essays.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#EADBCC] text-xs space-y-1">
                  <div className="font-bold text-[#221F1E] flex items-center gap-1">
                    <FileText className="w-4 h-4 text-[#C69214]" />
                    <span>Digital E-Book Edition</span>
                  </div>
                  <p className="text-[11px] text-[#7A6E65]">Available for free scholarly reading & download.</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.ulbil.org/home/Publications.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Publication Circular (PDF)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="p-8 rounded-3xl bg-white border-2 border-[#DFB343] shadow-md text-center max-w-sm w-full space-y-4">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#FEF5ED] border border-[#DFB343]/60 flex items-center justify-center text-[#C2592B]">
                  <Award className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#221F1E]">125th Souvenir Volume</h3>
                  <p className="text-xs text-[#C69214] font-semibold">Uluberia Institute & Library Editorial Council</p>
                </div>
                <p className="text-xs text-[#7A6E65] italic">
                  &ldquo;A document preserving the living soul and literary pulse of Uluberia across twelve decades.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Digital Heritage Photo Gallery Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-[#FEF5ED] px-3.5 py-1 rounded-full border border-[#DFB343]/50">
              Photographic Archives
            </span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E] mt-2">
              Vintage & Commemorative Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-bold text-[#C2592B] hover:text-[#D95D24] flex items-center gap-1"
          >
            <span>View All 50+ Slides & Archives</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_SLIDES.slice(0, 4).map((slide) => (
            <div key={slide.id} className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#EADBCC] group">
              <div className="relative h-44 w-full bg-[#FAF7F0]">
                <Image
                  src={slide.url}
                  alt={slide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold text-[#C69214] uppercase tracking-wider">{slide.year}</span>
                <h4 className="font-serif font-bold text-xs text-[#221F1E] line-clamp-1 mt-0.5">{slide.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Memory Wall & Guestbook */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-[#FEF5ED] px-3.5 py-1 rounded-full border border-[#DFB343]/50">
            Voices of Patrons & Alumni
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E] mt-2">
            125th Jubilee Memory Wall
          </h2>
          <p className="text-xs sm:text-sm text-[#5A504B] mt-1">
            Leave your wishes, recount memories of studying in our reading rooms, or honor past librarians and patrons.
          </p>
        </div>

        <MemoryWall />
      </section>

    </div>
  );
}

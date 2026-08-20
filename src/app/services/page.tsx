import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Shield, 
  Smile, 
  Briefcase, 
  Feather, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LIBRARY_WINGS, LIBRARY_INFO } from '@/data/libraryData';

export const metadata = {
  title: "Wings & Services",
  description: "Explore all sections of Uluberia Institute & Library: Lending section, Reference hall, Rare archives, Children's wing, Career hub, and Cultural hall.",
};

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-8 h-8 text-[#C2592B]" />,
  Search: <Search className="w-8 h-8 text-[#C69214]" />,
  Shield: <Shield className="w-8 h-8 text-[#D95D24]" />,
  Smile: <Smile className="w-8 h-8 text-[#C69214]" />,
  Briefcase: <Briefcase className="w-8 h-8 text-[#C2592B]" />,
  Feather: <Feather className="w-8 h-8 text-[#D95D24]" />
};

export default function ServicesPage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border-b border-[#EADBCC] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
            Infrastructure & Divisions
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E]">
            Library Wings & Facilities
          </h1>
          <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
            Spanning two stories equipped with specialized reading bays, digital repositories, research desks, and an auditorium for cultural programs.
          </p>
        </div>
      </section>

      {/* Wings Detail Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-10">
        {LIBRARY_WINGS.map((wing, idx) => (
          <div
            key={wing.id}
            id={wing.id}
            className="heritage-card p-6 sm:p-10 rounded-3xl bg-white border border-[#EADBCC] scroll-mt-28"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Icon & Title Info */}
              <div className="lg:col-span-5 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F0] border border-[#DFB343]/60 flex items-center justify-center shadow-xs">
                  {iconMap[wing.icon] || <BookOpen className="w-8 h-8 text-[#C2592B]" />}
                </div>

                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/40">
                    {wing.booksCount}
                  </span>
                  <h2 className="font-serif font-bold text-2xl text-[#221F1E] mt-1">
                    {wing.title}
                  </h2>
                  <p className="text-xs font-semibold text-[#8C6D23]">
                    {wing.bengaliTitle}
                  </p>
                </div>

                <div className="pt-2 text-xs text-[#7A6E65] space-y-1">
                  <p className="flex items-center gap-1.5 font-medium text-[#3E3835]">
                    <Clock className="w-3.5 h-3.5 text-[#C69214]" />
                    <span>{LIBRARY_INFO.timings.morning} & {LIBRARY_INFO.timings.evening}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C2592B]" />
                    <span>Main Building, Uluberia Institute & Library</span>
                  </p>
                </div>
              </div>

              {/* Description & Features */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
                  {wing.description}
                </p>

                <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] space-y-2">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#C2592B]">
                    Wing Highlights & Facilities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3E3835]">
                    {wing.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C69214] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C2592B] hover:text-[#D95D24]"
                  >
                    <span>Browse Books in this Wing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/membership"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FEF5ED] text-[#8C6D23] border border-[#DFB343]/50 hover:bg-[#FBF4E4]"
                  >
                    Access with Membership
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

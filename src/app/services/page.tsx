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
  BookOpen: <BookOpen className="w-8 h-8 text-[#D95D24]" />,
  Search: <Search className="w-8 h-8 text-[#B8860B]" />,
  Shield: <Shield className="w-8 h-8 text-[#D95D24]" />,
  Smile: <Smile className="w-8 h-8 text-[#B8860B]" />,
  Briefcase: <Briefcase className="w-8 h-8 text-[#D95D24]" />,
  Feather: <Feather className="w-8 h-8 text-[#D95D24]" />
};

export default function ServicesPage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D4] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-white px-3.5 py-1 rounded-full border border-[#D4C5B0]/60 ">
            Infrastructure & Divisions
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#2C2420]">
            Library Wings & Facilities
          </h1>
          <p className="text-sm sm:text-base text-[#6B635D] leading-relaxed">
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
            className="heritage-card p-6 sm:p-10 rounded-2xl bg-white border border-[#E8E0D4] scroll-mt-28"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Icon & Title Info */}
              <div className="lg:col-span-5 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F0] border border-[#D4C5B0]/60 flex items-center justify-center shadow-xs">
                  {iconMap[wing.icon] || <BookOpen className="w-8 h-8 text-[#D95D24]" />}
                </div>

                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF0EA] text-[#D95D24] border border-[#D4C5B0]/40">
                    {wing.booksCount}
                  </span>
                  <h2 className="font-serif font-bold text-2xl text-[#2C2420] mt-1">
                    {wing.title}
                  </h2>
                  <p className="text-sm font-semibold text-[#8B6508]">
                    {wing.bengaliTitle}
                  </p>
                </div>

                <div className="pt-2 text-sm text-[#9A918A] space-y-1">
                  <p className="flex items-center gap-1.5 font-medium text-[#4A4340]">
                    <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>{LIBRARY_INFO.timings.morning} & {LIBRARY_INFO.timings.evening}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D95D24]" />
                    <span>Main Building, Uluberia Institute & Library</span>
                  </p>
                </div>
              </div>

              {/* Description & Features */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm sm:text-base text-[#6B635D] leading-relaxed">
                  {wing.description}
                </p>

                <div className="p-4 rounded-xl bg-[#F5F0E8] border border-[#E8E0D4] space-y-2">
                  <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-[#D95D24]">
                    Wing Highlights & Facilities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#4A4340]">
                    {wing.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D95D24] hover:text-[#D95D24]"
                  >
                    <span>Browse Books in this Wing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/membership"
                    className="px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-[#FEF0EA] text-[#8B6508] border border-[#D4C5B0]/50 hover:bg-[#F7F0E0]"
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

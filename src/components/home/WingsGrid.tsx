"use client";

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
  ArrowRight 
} from 'lucide-react';
import { LIBRARY_WINGS } from '@/data/libraryData';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-6 h-6 text-[#C2592B]" />,
  Search: <Search className="w-6 h-6 text-[#C69214]" />,
  Shield: <Shield className="w-6 h-6 text-[#D95D24]" />,
  Smile: <Smile className="w-6 h-6 text-[#C69214]" />,
  Briefcase: <Briefcase className="w-6 h-6 text-[#C2592B]" />,
  Feather: <Feather className="w-6 h-6 text-[#D95D24]" />
};

export default function WingsGrid() {
  return (
    <section className="py-16 bg-[#FCFBF7] border-b border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-[#FEF5ED] px-3.5 py-1 rounded-full border border-[#DFB343]/50">
              Divisions & Wings
            </span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E] mt-3">
              Explore Our Library Sections
            </h2>
            <p className="text-xs sm:text-sm text-[#5A504B] mt-1">
              Customized learning, research, preservation, and cultural wings serving all age groups.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C2592B] hover:text-[#D95D24] shrink-0"
          >
            <span>View All Facilities & Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Wings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIBRARY_WINGS.map((wing) => (
            <div
              key={wing.id}
              className="heritage-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon & Count Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#DFB343]/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {iconMap[wing.icon] || <BookOpen className="w-6 h-6 text-[#C2592B]" />}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/40">
                    {wing.booksCount}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#221F1E] group-hover:text-[#C2592B] transition-colors">
                    {wing.title}
                  </h3>
                  <p className="text-xs font-medium text-[#8C6D23] mt-0.5">
                    {wing.bengaliTitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5A504B] leading-relaxed">
                  {wing.description}
                </p>

                {/* Features list */}
                <ul className="space-y-1.5 pt-2 border-t border-[#EADBCC]/60 text-xs text-[#7A6E65]">
                  {wing.features.slice(0, 3).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C69214] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-4 border-t border-[#EADBCC]/40 flex items-center justify-between">
                <Link
                  href={`/services#${wing.id}`}
                  className="text-xs font-bold text-[#C2592B] hover:text-[#D95D24] flex items-center gap-1 group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-[11px] font-semibold text-[#8C6D23]">Open Daily</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

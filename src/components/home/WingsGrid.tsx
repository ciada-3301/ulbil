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
  BookOpen: <BookOpen className="w-6 h-6 text-[#D95D24]" />,
  Search: <Search className="w-6 h-6 text-[#B8860B]" />,
  Shield: <Shield className="w-6 h-6 text-[#D95D24]" />,
  Smile: <Smile className="w-6 h-6 text-[#B8860B]" />,
  Briefcase: <Briefcase className="w-6 h-6 text-[#D95D24]" />,
  Feather: <Feather className="w-6 h-6 text-[#B8860B]" />
};

export default function WingsGrid() {
  return (
    <section className="py-16 bg-[#FAF7F0] border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-[#FEF0EA] px-3.5 py-1 rounded-full border border-[#D4C5B0]">
              Divisions & Wings
            </span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#2C2420] mt-3">
              Explore Our Library Sections
            </h2>
            <p className="text-sm text-[#6B635D] mt-1">
              Customized learning, research, preservation, and cultural wings serving all age groups.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D95D24] hover:text-[#A94314] shrink-0"
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
                  <div className="w-12 h-12 rounded-xl bg-[#F5F0E8] border border-[#D4C5B0] flex items-center justify-center shadow-sm">
                    {iconMap[wing.icon] || <BookOpen className="w-6 h-6 text-[#D95D24]" />}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FEF0EA] text-[#D95D24] border border-[#D95D24]/20">
                    {wing.booksCount}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2C2420] group-hover:text-[#D95D24] transition-colors">
                    {wing.title}
                  </h3>
                  <p className="text-sm font-medium text-[#8B6508] mt-0.5">
                    {wing.bengaliTitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-[#6B635D] leading-relaxed">
                  {wing.description}
                </p>

                {/* Features list */}
                <ul className="space-y-1.5 pt-2 border-t border-[#E8E0D4] text-sm text-[#9A918A]">
                  {wing.features.slice(0, 3).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 mt-4 border-t border-[#E8E0D4] flex items-center justify-between">
                <Link
                  href={`/services#${wing.id}`}
                  className="text-sm font-bold text-[#D95D24] hover:text-[#A94314] flex items-center gap-1 group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-xs font-semibold text-[#8B6508]">Open Daily</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

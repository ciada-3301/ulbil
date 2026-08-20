"use client";

import React, { useState } from 'react';
import { 
  Scroll, 
  Flame, 
  GraduationCap, 
  Heart, 
  BookOpen, 
  Award, 
  Cpu, 
  Sparkles,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { TIMELINE_MILESTONES } from '@/data/libraryData';

const iconMap: Record<string, React.ReactNode> = {
  Scroll: <Scroll className="w-5 h-5 text-[#C2592B]" />,
  Flame: <Flame className="w-5 h-5 text-[#D95D24]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[#C69214]" />,
  Heart: <Heart className="w-5 h-5 text-[#D95D24]" />,
  BookOpen: <BookOpen className="w-5 h-5 text-[#C2592B]" />,
  Award: <Award className="w-5 h-5 text-[#C69214]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#8C6D23]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#C69214]" />
};

export default function TimelineJourney() {
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags = ['All', 'Foundation', 'Heritage', 'Education Pillar', 'Women Empowerment', 'Literature & Art', 'Centenary', '125th Jubilee'];

  const filteredMilestones = TIMELINE_MILESTONES.filter(
    (m) => activeTag === 'All' || m.tag === activeTag
  );

  return (
    <div className="space-y-10">
      {/* Tag Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTag === tag
                ? 'bg-[#C2592B] text-white shadow-xs'
                : 'bg-white border border-[#EADBCC] text-[#5A504B] hover:border-[#DFB343] hover:text-[#C2592B]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-[#DFB343]/60 ml-4 sm:ml-32 md:ml-40 space-y-10 py-4">
        {filteredMilestones.map((milestone, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 group">
            
            {/* Year Node Badge (Left for larger screens) */}
            <div className="hidden sm:block absolute -left-32 md:-left-40 top-0 w-28 md:w-36 text-right pr-4">
              <span className="font-serif font-extrabold text-sm md:text-base text-[#C2592B] group-hover:text-[#D95D24] transition-colors">
                {milestone.year}
              </span>
            </div>

            {/* Glowing Timeline Marker Circle */}
            <div className="absolute -left-3.5 top-1 w-7 h-7 rounded-full bg-white border-2 border-[#DFB343] flex items-center justify-center shadow-xs group-hover:border-[#C2592B] group-hover:scale-110 transition-all">
              <span className="w-2 h-2 rounded-full bg-[#D95D24]" />
            </div>

            {/* Content Card */}
            <div className="heritage-card p-6 rounded-2xl bg-white border border-[#EADBCC] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="sm:hidden font-serif font-extrabold text-sm text-[#C2592B]">
                  {milestone.year}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/40">
                  {milestone.tag}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#EADBCC] flex items-center justify-center">
                  {iconMap[milestone.iconName] || <Scroll className="w-4 h-4 text-[#C2592B]" />}
                </div>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-[#221F1E] group-hover:text-[#C2592B] transition-colors">
                  {milestone.title}
                </h3>
                {milestone.bengaliTitle && (
                  <p className="text-xs font-semibold text-[#8C6D23] mt-0.5">
                    {milestone.bengaliTitle}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
                {milestone.description}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

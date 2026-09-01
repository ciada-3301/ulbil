"use client";

import React from 'react';
import { LIBRARY_INFO } from '@/data/libraryData';

export default function StatsStrip() {
  return (
    <section className="py-8 sm:py-10 bg-[#FAF7F0] border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {LIBRARY_INFO.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="heritage-card p-4 sm:p-5 rounded-xl text-center flex flex-col items-center justify-center bg-white border border-[#E8E0D4] shadow-xs"
            >
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#D95D24]">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-[#6B635D] mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#9A918A]">
                {stat.suffix}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

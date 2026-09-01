"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowRight, FileText, ChevronRight, Award } from 'lucide-react';
import { EMINENT_PERSONS } from '@/data/libraryData';

export default function EminentVoices() {
  const [selectedPersonId, setSelectedPersonId] = useState(EMINENT_PERSONS[0].id);

  const selectedPerson = EMINENT_PERSONS.find(p => p.id === selectedPersonId) || EMINENT_PERSONS[0];

  return (
    <section className="py-16 bg-[#FAF7F0] border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-[#FEF0EA] px-3.5 py-1 rounded-full border border-[#D4C5B0] shadow-sm">
            Guiding Lights & Leadership
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#2C2420] mt-3">
            Eminent Voices on the 125th Milestone
          </h2>
          <p className="text-sm text-[#6B635D] mt-2">
            Messages of encouragement and pride from our esteemed patrons, administrators, and cultural luminaries.
          </p>
        </div>

        {/* Selected Highlight Message Card */}
        <div className="heritage-card rounded-2xl p-6 sm:p-10 mb-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Dignitary Photo & Credentials */}
            <div className="lg:col-span-4 flex flex-col items-center text-center sm:text-left sm:flex-row lg:flex-col gap-5 border-b lg:border-b-0 lg:border-r border-[#E8E0D4] pb-6 lg:pb-0 lg:pr-8">
              <div className="relative w-36 h-44 sm:w-32 sm:h-40 rounded-xl overflow-hidden border-2 border-[#D4C5B0] shadow-md shrink-0 bg-[#FAF7F0]">
                <Image
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF0EA] text-[#D95D24] border border-[#D95D24]/20">
                  {selectedPerson.roleInLibrary}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#2C2420]">
                  {selectedPerson.name}
                </h3>
                <p className="text-sm font-semibold text-[#8B6508]">
                  {selectedPerson.designation}
                </p>
                {selectedPerson.subDesignation && (
                  <p className="text-xs text-[#9A918A]">
                    {selectedPerson.subDesignation}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Message Body */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[#B8860B]">
                <Quote className="w-8 h-8 opacity-80" />
                <span className="font-serif font-bold text-sm uppercase tracking-wider text-[#8B6508]">
                  Official 125th Jubilee Message
                </span>
              </div>
              
              <p className="font-serif text-base text-[#4A4340] leading-relaxed italic bg-[#F5F0E8] p-5 rounded-xl border border-[#E8E0D4]">
                &ldquo;{selectedPerson.message}&rdquo;
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-sm font-semibold text-[#9A918A]">
                  Archived for the 125th Quasquicentennial Souvenir
                </span>
                {selectedPerson.fullMessageUrl && (
                  <a
                    href={selectedPerson.fullMessageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-bold text-[#8B6508] bg-white border border-[#B8860B] hover:bg-[#FEF0EA] hover:text-[#D95D24] transition-colors shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Official Signed PDF</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {EMINENT_PERSONS.map((person) => {
            const isSelected = person.id === selectedPersonId;
            return (
              <button
                key={person.id}
                onClick={() => setSelectedPersonId(person.id)}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  isSelected 
                    ? 'bg-[#FEF0EA] border-[#D95D24] shadow-sm ring-2 ring-[#D95D24]/20' 
                    : 'bg-white border-[#E8E0D4] hover:border-[#D4C5B0] hover:bg-[#FAF7F0]'
                }`}
              >
                <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-[#E8E0D4] bg-[#FAF7F0]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-xs font-bold text-[#2C2420] leading-tight line-clamp-1">
                  {person.name.replace('SRI ', '').replace('SMT. ', '').replace('PROFESSOR ', '')}
                </div>
                <div className="text-[10px] text-[#8B6508] line-clamp-1">
                  {person.designation.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* View Full Leadership Directory Link */}
        <div className="text-center mt-8">
          <Link
            href="/leadership"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D95D24] hover:text-[#A94314] transition-colors group"
          >
            <span>View Full Governing Council & Historic Sub-Committees</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

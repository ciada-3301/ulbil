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
    <section className="py-16 bg-[#FAF7F0] border-b border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
            Guiding Lights & Leadership
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E] mt-3">
            Eminent Voices on the 125th Milestone
          </h2>
          <p className="text-xs sm:text-sm text-[#5A504B] mt-2">
            Messages of encouragement and pride from our esteemed patrons, administrators, and cultural luminaries.
          </p>
        </div>

        {/* Selected Highlight Message Card */}
        <div className="heritage-card rounded-2xl bg-white border border-[#EADBCC] p-6 sm:p-10 mb-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Dignitary Photo & Credentials */}
            <div className="lg:col-span-4 flex flex-col items-center text-center sm:text-left sm:flex-row lg:flex-col gap-5 border-b lg:border-b-0 lg:border-r border-[#EADBCC] pb-6 lg:pb-0 lg:pr-8">
              <div className="relative w-36 h-44 sm:w-32 sm:h-40 rounded-xl overflow-hidden border-2 border-[#DFB343] shadow-md shrink-0 bg-[#FAF7F0]">
                <Image
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/40">
                  {selectedPerson.roleInLibrary}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#221F1E]">
                  {selectedPerson.name}
                </h3>
                <p className="text-xs font-semibold text-[#8C6D23]">
                  {selectedPerson.designation}
                </p>
                {selectedPerson.subDesignation && (
                  <p className="text-[11px] text-[#7A6E65]">
                    {selectedPerson.subDesignation}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Message Body */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[#C69214]">
                <Quote className="w-8 h-8 opacity-80" />
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#A0720A]">
                  Official 125th Jubilee Message
                </span>
              </div>
              
              <p className="font-serif text-sm sm:text-base text-[#3E3835] leading-relaxed italic bg-[#FCFBF7] p-5 rounded-xl border border-[#EADBCC]/60">
                &ldquo;{selectedPerson.message}&rdquo;
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="text-xs font-semibold text-[#7A6E65]">
                  Archived for the 125th Quasquicentennial Souvenir
                </span>
                {selectedPerson.fullMessageUrl && (
                  <a
                    href={selectedPerson.fullMessageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] hover:text-[#C2592B] transition-colors shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
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
                    ? 'bg-[#FEF5ED] border-[#C2592B] shadow-xs ring-2 ring-[#C2592B]/20' 
                    : 'bg-white border-[#EADBCC] hover:border-[#DFB343] hover:bg-[#FAF7F0]'
                }`}
              >
                <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-[#EADBCC] bg-[#FAF7F0]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-[11px] font-bold text-[#221F1E] leading-tight line-clamp-1">
                  {person.name.replace('SRI ', '').replace('SMT. ', '').replace('PROFESSOR ', '')}
                </div>
                <div className="text-[9px] text-[#8C6D23] line-clamp-1">
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
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C2592B] hover:text-[#D95D24] transition-colors group"
          >
            <span>View Full Governing Council & Historic Sub-Committees</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

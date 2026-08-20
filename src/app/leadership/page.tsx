import React from 'react';
import Image from 'next/image';
import { Quote, FileText, Award, ShieldCheck, Mail } from 'lucide-react';
import { EMINENT_PERSONS } from '@/data/libraryData';

export const metadata = {
  title: "Leadership & Dignitaries",
  description: "Executive Council, President, Secretary, and messages from eminent leadership of Uluberia Institute & Library.",
};

export default function LeadershipPage() {
  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FCFBF7] to-[#FAF6ED] border-b border-[#EADBCC] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
            Governing Council & Patrons
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#221F1E]">
            Leadership & Dignitaries
          </h1>
          <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed">
            Distinguished representatives guiding the governance, modernization, and cultural legacy of Uluberia Institute & Library.
          </p>
        </div>
      </section>

      {/* Dignitaries & Executive Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        {EMINENT_PERSONS.map((person) => (
          <div
            key={person.id}
            className="heritage-card p-6 sm:p-8 rounded-3xl bg-white border border-[#EADBCC] shadow-xs hover:border-[#DFB343] transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Photo & Identity */}
              <div className="md:col-span-4 flex flex-col items-center text-center sm:text-left sm:flex-row md:flex-col gap-4 border-b md:border-b-0 md:border-r border-[#EADBCC] pb-6 md:pb-0 md:pr-6">
                <div className="relative w-32 h-40 rounded-2xl overflow-hidden border-2 border-[#DFB343] shadow-md shrink-0 bg-[#FAF7F0]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/40">
                    {person.roleInLibrary}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#221F1E]">
                    {person.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C6D23]">
                    {person.designation}
                  </p>
                  {person.subDesignation && (
                    <p className="text-[11px] text-[#7A6E65]">
                      {person.subDesignation}
                    </p>
                  )}
                </div>
              </div>

              {/* Dignitary Message Body */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-[#C69214]">
                  <Quote className="w-6 h-6 opacity-80" />
                  <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#A0720A]">
                    Official Signed Message
                  </span>
                </div>

                <p className="font-serif text-xs sm:text-sm text-[#3E3835] leading-relaxed italic bg-[#FCFBF7] p-5 rounded-2xl border border-[#EADBCC]/60">
                  &ldquo;{person.message}&rdquo;
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-[#7A6E65]">
                    Archived & Authenticated on Uluberia Institute & Library Council Record
                  </span>
                  {person.fullMessageUrl && (
                    <a
                      href={person.fullMessageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#8C6D23] bg-white border border-[#DFB343] hover:bg-[#FEF5ED] hover:text-[#C2592B] transition-colors shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Official Letter (PDF)</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </section>

      {/* Sub-Committees Structure Summary */}
      <section className="bg-[#FAF7F0] border-y border-[#EADBCC] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
              Governance Structure
            </span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#221F1E] mt-2">
              8 Dedicated Sub-Committees
            </h2>
            <p className="text-xs text-[#5A504B] mt-1">
              Ensuring specialized administration across all civic, cultural, and scholastic endeavors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              '1. Library Acquisition & Cataloguing',
              '2. Rare Manuscripts & Conservation',
              '3. \'Satta\' Literary Magazine Council',
              '4. Youth Drama & Cultural Wing',
              '5. Children & Young Readers Academy',
              '6. Competitive Career Desk',
              '7. Finance, Audit & 125th Fund',
              '8. IT, Digitization & Web Outreach'
            ].map((comm, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#EADBCC] text-xs font-bold text-[#3E3835] text-center shadow-2xs">
                {comm}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

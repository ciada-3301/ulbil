import React from 'react';
import { Search, Book, Sparkles, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import CatalogueExplorer from '@/components/catalogue/CatalogueExplorer';

export const metadata = {
  title: "Book Catalogue (55,000+ Volumes)",
  description: "Search the digital accession index of Uluberia Institute & Library. Browse literature, history, science, competitive exams, and rare archives.",
};

export default function CataloguePage() {
  return (
    <div className="py-12 space-y-12">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#F5F0E8] border-b border-[#E8E0D4] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#B8860B] text-sm font-bold text-[#D95D24] shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Digital Accession Index & Repository</span>
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#2C2420]">
            Library Book Catalogue
          </h1>

          <p className="text-sm sm:text-base text-[#6B635D] max-w-2xl mx-auto leading-relaxed">
            Search our holdings of over <strong>55,000 physical and digitized volumes</strong> across Bengali literature, Indian history, pure sciences, reference encyclopedias, and competitive career resources.
          </p>
        </div>
      </section>

      {/* Main Explorer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <CatalogueExplorer />
      </section>

      {/* Accession & Lending Rules Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F0] border border-[#E8E0D4] grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-[#D95D24]">Circulation & Borrowing</h4>
            <p className="text-[#6B635D]">Active library members can borrow up to 2â€“4 books simultaneously for a lending duration of 14 days, renewable online or in person.</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-[#D95D24]">Rare Manuscript Consultation</h4>
            <p className="text-[#6B635D]">Volumes marked &apos;Rare Heritage Archive&apos; are non-circulating and available exclusively for in-library reading room reference under librarian supervision.</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-sm text-[#D95D24]">Inter-Library & Research Desk</h4>
            <p className="text-[#6B635D]">Scholars seeking specific volume scans or thesis citations can place a dedicated archival assistance request at our helpdesk.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

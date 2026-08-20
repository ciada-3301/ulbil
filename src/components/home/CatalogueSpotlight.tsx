"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Book, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { SAMPLE_CATALOGUE } from '@/data/libraryData';

export default function CatalogueSpotlight() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Poetry & Literature', 'Classic Fiction', 'History & Heritage', 'Rare Archives'];

  const filteredBooks = SAMPLE_CATALOGUE.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.bengaliTitle && book.bengaliTitle.includes(searchTerm));
    const matchesCategory = selectedCategory === 'All' || book.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  }).slice(0, 6);

  return (
    <section className="py-16 bg-[#FAF7F0] border-b border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C2592B] bg-white px-3.5 py-1 rounded-full border border-[#DFB343]/60 shadow-2xs">
            Curated Collections
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E] mt-3">
            Catalogue Spotlight
          </h2>
          <p className="text-xs sm:text-sm text-[#5A504B] mt-2">
            Explore masterpieces from Tagore, Bankim Chandra, rare colonial documents, and contemporary academic volumes.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C69214]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by book title, Bengali name (e.g. গীতাঞ্জলি), author (e.g. Tagore)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border-2 border-[#DFB343]/60 focus:border-[#C2592B] focus:outline-hidden text-sm shadow-xs transition-all text-[#221F1E]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C2592B] text-white shadow-xs'
                    : 'bg-white border border-[#EADBCC] text-[#5A504B] hover:border-[#DFB343] hover:text-[#C2592B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="heritage-card p-5 rounded-2xl flex flex-col justify-between group bg-white border border-[#EADBCC]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#EADBCC] text-[#7A6E65]">
                    {book.accessionNo}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    book.isRare 
                      ? 'bg-[#FEF0EA] text-[#D95D24] border border-[#D95D24]/30' 
                      : book.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {book.isRare ? 'Rare Heritage' : book.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-[#221F1E] group-hover:text-[#C2592B] transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  {book.bengaliTitle && (
                    <p className="text-xs font-semibold text-[#C69214] mt-0.5">
                      {book.bengaliTitle}
                    </p>
                  )}
                </div>

                <div className="text-xs text-[#5A504B] space-y-1">
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Category:</strong> {book.category}</p>
                  <p><strong>Language:</strong> {book.language} {book.year ? `(${book.year})` : ''}</p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#EADBCC]/60 flex items-center justify-between">
                <Link
                  href="/catalogue"
                  className="text-xs font-bold text-[#C2592B] hover:text-[#D95D24] flex items-center gap-1 group/btn"
                >
                  <span>Request / Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-[10px] text-[#7A6E65]">UIL Accession</span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Catalog Link */}
        <div className="text-center mt-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-sm hover:shadow-md transition-all"
          >
            <span>Search Complete 55,000+ Catalogue Database</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

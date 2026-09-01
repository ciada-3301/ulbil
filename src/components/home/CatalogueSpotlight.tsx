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
    <section className="py-16 bg-[#FAF7F0] border-b border-[#E8E0D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-[#FEF0EA] px-3.5 py-1 rounded-full border border-[#D4C5B0] shadow-sm">
            Curated Collections
          </span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#2C2420] mt-3">
            Catalogue Spotlight
          </h2>
          <p className="text-sm text-[#6B635D] mt-2">
            Explore masterpieces from Tagore, Bankim Chandra, rare colonial documents, and contemporary academic volumes.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8860B]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by book title, Bengali name (e.g. গীতাঞ্জলি), author (e.g. Tagore)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border-2 border-[#D4C5B0] focus:border-[#D95D24] focus:outline-hidden text-sm shadow-sm transition-all text-[#2C2420]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D95D24] text-white shadow-sm'
                    : 'bg-white border border-[#E8E0D4] text-[#6B635D] hover:border-[#D4C5B0] hover:text-[#D95D24]'
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
              className="heritage-card p-5 rounded-xl flex flex-col justify-between group bg-white"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#E8E0D4] text-[#9A918A]">
                    {book.accessionNo}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    book.isRare 
                      ? 'bg-[#FEF0EA] text-[#D95D24] border border-[#D95D24]/20' 
                      : book.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {book.isRare ? 'Rare Heritage' : book.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-[#2C2420] group-hover:text-[#D95D24] transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  {book.bengaliTitle && (
                    <p className="text-sm font-semibold text-[#B8860B] mt-0.5">
                      {book.bengaliTitle}
                    </p>
                  )}
                </div>

                <div className="text-sm text-[#6B635D] space-y-1">
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Category:</strong> {book.category}</p>
                  <p><strong>Language:</strong> {book.language} {book.year ? `(${book.year})` : ''}</p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#E8E0D4] flex items-center justify-between">
                <Link
                  href="/catalogue"
                  className="text-sm font-bold text-[#D95D24] hover:text-[#A94314] flex items-center gap-1 group/btn"
                >
                  <span>Request / Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-[10px] text-[#9A918A]">UIL Accession</span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Catalog Link */}
        <div className="text-center mt-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#D95D24] hover:opacity-95 shadow-sm hover:shadow-md transition-all"
          >
            <span>Search Complete 55,000+ Catalogue Database</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

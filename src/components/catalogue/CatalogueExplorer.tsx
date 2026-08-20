"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  X,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { SAMPLE_CATALOGUE, BookItem } from '@/data/libraryData';

export default function CatalogueExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [activeBook, setActiveBook] = useState<BookItem | null>(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const categories = [
    'All',
    'Poetry & Literature',
    'Classic Fiction',
    'History & Heritage',
    'History & Politics',
    'Mystery & Detective',
    'Science Fiction',
    'Law & Governance',
    'Competitive Examinations',
    'Rare Archives',
    'Souvenirs & Publications'
  ];

  const languages = ['All', 'Bengali', 'English', 'Sanskrit'];

  const filteredBooks = SAMPLE_CATALOGUE.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.accessionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.bengaliTitle && book.bengaliTitle.includes(searchTerm));
    
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'All' || book.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const handleHoldRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setActiveBook(null);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Search & Filter Controls */}
      <div className="heritage-card p-6 rounded-2xl bg-white border border-[#EADBCC] space-y-5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C69214]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, Bengali title (e.g. পথের পাঁচালী), or Accession number (e.g. UIL-LIT-00104)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#FCFBF7] border-2 border-[#DFB343]/60 focus:border-[#C2592B] focus:outline-hidden text-sm transition-all text-[#221F1E]"
          />
        </div>

        {/* Category & Language Filters */}
        <div className="space-y-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6E65] block mb-1.5">
              Category Filter
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#C2592B] text-white shadow-xs'
                      : 'bg-[#FCFBF7] border border-[#EADBCC] text-[#5A504B] hover:border-[#DFB343] hover:text-[#C2592B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#EADBCC]/40">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6E65]">Language:</span>
            <div className="flex items-center gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#8C6D23] text-white'
                      : 'bg-[#FCFBF7] border border-[#EADBCC] text-[#5A504B] hover:bg-[#FEF5ED]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#7A6E65] px-1">
        <span>Showing <strong>{filteredBooks.length}</strong> catalogued volumes</span>
        <span>Total Library Collection: <strong>55,000+</strong></span>
      </div>

      {/* Books Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="heritage-card p-5 rounded-2xl bg-white border border-[#EADBCC] flex flex-col justify-between group"
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
              <button
                onClick={() => setActiveBook(book)}
                className="text-xs font-bold text-[#C2592B] hover:text-[#D95D24] flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details & Request</span>
              </button>
              <span className="text-[10px] font-mono text-[#8C6D23]">{book.language}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#EADBCC] space-y-3">
          <Book className="w-10 h-10 text-[#C69214] mx-auto opacity-50" />
          <h3 className="font-serif font-bold text-base text-[#221F1E]">No volumes matched your search</h3>
          <p className="text-xs text-[#7A6E65]">Try adjusting keywords or selecting a broader category filter.</p>
        </div>
      )}

      {/* Book Detail / Reservation Modal */}
      {activeBook && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-[#DFB343] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#EADBCC] text-[#7A6E65]">
                  Accession: {activeBook.accessionNo}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#221F1E] mt-1">
                  {activeBook.title}
                </h3>
                {activeBook.bengaliTitle && (
                  <p className="text-xs font-semibold text-[#C69214]">
                    {activeBook.bengaliTitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveBook(null)}
                className="p-1.5 rounded-lg text-[#7A6E65] hover:bg-[#FAF7F0] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#EADBCC] text-xs space-y-1.5 text-[#3E3835]">
              <p><strong>Author:</strong> {activeBook.author}</p>
              <p><strong>Category:</strong> {activeBook.category}</p>
              <p><strong>Language:</strong> {activeBook.language}</p>
              {activeBook.year && <p><strong>Publication Year:</strong> {activeBook.year}</p>}
              <p><strong>Current Status:</strong> <span className="font-bold text-[#C2592B]">{activeBook.status}</span></p>
              {activeBook.isRare && (
                <p className="text-[#D95D24] font-semibold flex items-center gap-1 pt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rare Heritage Archive: Consult at Reference Desk under supervision.</span>
                </p>
              )}
            </div>

            {requestSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reservation request submitted! Please present your member card at the counter.</span>
              </div>
            ) : (
              <form onSubmit={handleHoldRequest} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#3E3835]">Your Membership Card Number / Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UIL-M-2024-884 or Your Full Name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#FCFBF7] border border-[#EADBCC] text-xs focus:border-[#C2592B] focus:outline-hidden"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveBook(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#5A504B] hover:bg-[#FAF7F0] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#D95D24] to-[#C69214] hover:opacity-95 shadow-xs cursor-pointer"
                  >
                    Submit Hold / Issue Inquiry
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

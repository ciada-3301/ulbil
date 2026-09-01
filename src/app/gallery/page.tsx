"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Sparkles, Filter, X, ZoomIn } from 'lucide-react';
import { GALLERY_SLIDES } from '@/data/libraryData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_SLIDES[0] | null>(null);

  const categories = ['All', 'Anniversary Celebrations', 'Cultural Events', 'Youth Drama', 'Library Reading Room', 'Centenary Jubilee'];

  const filteredPhotos = GALLERY_SLIDES.filter(
    (photo) => selectedCategory === 'All' || photo.category === selectedCategory
  );

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F5F0E8] to-[#F5F0E8] border-b border-[#E8E0D4] py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-[#D95D24] bg-white px-3.5 py-1 rounded-full border border-[#B8860B]/60 shadow-sm">
            Visual Heritage
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#2C2420]">
            Photo Gallery & Digital Archives
          </h1>
          <p className="text-sm sm:text-base text-[#6B635D] leading-relaxed">
            Photographic records of landmark commemorations, literary seminars, annual drama festivals, and daily reading room life.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D95D24] text-white shadow-xs'
                  : 'bg-white border border-[#E8E0D4] text-[#6B635D] hover:border-[#B8860B] hover:text-[#D95D24]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="heritage-card rounded-2xl overflow-hidden bg-white border border-[#E8E0D4] group cursor-pointer"
            >
              <div className="relative h-56 w-full bg-[#FAF7F0] overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-white/90 text-sm font-bold text-[#2C2420] flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Enlarge</span>
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#B8860B] uppercase tracking-wider">{photo.year}</span>
                  <span className="text-[#9A918A]">{photo.category}</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#2C2420] group-hover:text-[#D95D24] transition-colors line-clamp-1">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Fullscreen Photo Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden border-2 border-[#B8860B] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-80 sm:h-96 w-full bg-neutral-900">
              <Image
                src={activePhoto.url}
                alt={activePhoto.title}
                fill
                className="object-contain"
                unoptimized
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#D95D24] uppercase tracking-wider">
                  {activePhoto.year} â€¢ {activePhoto.category}
                </span>
                <span className="text-sm text-[#9A918A]">Archived at Uluberia Institute & Library</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2C2420]">
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

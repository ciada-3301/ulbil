"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Sparkles, 
  Maximize2, 
  X, 
  Camera, 
  ArrowRight,
  ImageIcon
} from 'lucide-react';
import { GALLERY_SLIDES } from '@/data/libraryData';

export default function HeritageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = GALLERY_SLIDES;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const activeSlide = slides[currentIndex];

  return (
    <section className="py-12 bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAF6ED] border-b border-[#EADBCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF5ED] text-[#C2592B] border border-[#DFB343]/60 text-xs font-bold shadow-2xs mb-2">
              <Camera className="w-3.5 h-3.5 text-[#C69214]" />
              <span>Library Glimpses & Living Heritage</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#221F1E]">
              Moments from Our 125-Year Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#5A504B] mt-1">
              A visual chronicle of historic building facades, bustling reading rooms, cultural festivals, and youth academies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="text-xs font-bold text-[#C2592B] hover:text-[#D95D24] flex items-center gap-1 shrink-0"
            >
              <span>View Full Photo Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Showcase Player */}
        <div className="heritage-card rounded-3xl overflow-hidden bg-[#221F1E] border-2 border-[#DFB343]/70 shadow-xl relative group">
          
          {/* Main Photo Viewport */}
          <div className="relative w-full h-72 sm:h-96 md:h-[460px] lg:h-[500px] overflow-hidden bg-neutral-900">
            <Image
              src={activeSlide.url}
              alt={activeSlide.title}
              fill
              className="object-cover transition-all duration-700 ease-out"
              priority
              unoptimized
            />
            
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Top Bar Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-amber-300 border border-amber-400/40 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeSlide.year}</span>
                <span className="text-white/60">•</span>
                <span className="text-white font-medium">{activeSlide.category}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                  title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-[#C2592B] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer z-10 opacity-80 hover:opacity-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-[#C2592B] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer z-10 opacity-80 hover:opacity-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-10 text-white space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold tracking-wider uppercase">
                <span>Slide {currentIndex + 1} of {slides.length}</span>
                <span>•</span>
                <span>Uluberia Institute & Library Collection</span>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-2xl lg:text-3xl text-white leading-tight drop-shadow-md">
                {activeSlide.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 line-clamp-2 drop-shadow-sm font-light">
                Preserving authentic records of community lectures, reader study sessions, and milestone celebrations since 1902.
              </p>
            </div>

            {/* Auto-play Progress Bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  key={currentIndex}
                  className="h-full bg-gradient-to-r from-[#DFB343] to-[#D95D24] animate-progress"
                  style={{ animationDuration: '5000ms' }}
                />
              </div>
            )}

          </div>

          {/* Thumbnail Carousel Strip */}
          <div className="bg-[#1C1816] p-3 sm:p-4 border-t border-[#DFB343]/30">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#DFB343]/40">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all cursor-pointer border-2 ${
                      isActive 
                        ? 'border-[#DFB343] scale-105 ring-2 ring-[#DFB343]/50 opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-85'
                    }`}
                  >
                    <Image
                      src={slide.url}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-0.5 right-1 text-[9px] font-bold text-white bg-black/60 px-1 rounded">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border-2 border-[#DFB343] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-80 sm:h-[480px] w-full bg-black">
              <Image
                src={activeSlide.url}
                alt={activeSlide.title}
                fill
                className="object-contain"
                unoptimized
              />
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#FAF7F0] border-t border-[#EADBCC] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#C2592B] uppercase tracking-wider">
                  {activeSlide.year} • {activeSlide.category}
                </span>
                <span className="text-[#7A6E65]">Slide {currentIndex + 1} of {slides.length}</span>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#221F1E]">
                {activeSlide.title}
              </h3>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-[#DFB343] text-[#8C6D23] hover:bg-[#FEF5ED] cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextSlide}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-[#DFB343] text-[#8C6D23] hover:bg-[#FEF5ED] cursor-pointer"
                  >
                    Next
                  </button>
                </div>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#C2592B] hover:bg-[#D95D24] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

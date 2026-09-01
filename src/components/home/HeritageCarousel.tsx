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
  ArrowRight
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
    <section className="py-8 sm:py-10 bg-gradient-to-b from-[#FAF7F0] via-white to-[#F5F0E8] border-b border-[#E8E0D4]">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FEF0EA] text-[#D95D24] border border-[#D95D24]/20 text-xs font-bold shadow-2xs mb-1.5">
              <Camera className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Library Glimpses & Living Heritage</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2C2420]">
              Moments from Our 125-Year Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#6B635D] mt-0.5">
              A visual chronicle of historic building facades, bustling reading rooms, cultural festivals, and youth academies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="text-xs font-bold text-[#D95D24] hover:text-[#A94314] flex items-center gap-1 shrink-0"
            >
              <span>View Full Photo Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Showcase Player (Compact Scale) */}
        <div className="heritage-card rounded-2xl overflow-hidden bg-[#1C1816] border border-[#D4C5B0] shadow-lg relative group">
          
          {/* Main Photo Viewport */}
          <div className="relative w-full h-60 sm:h-72 md:h-[340px] lg:h-[380px] overflow-hidden bg-neutral-900">
            <Image
              src={activeSlide.url}
              alt={activeSlide.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              className="object-cover transition-all duration-700 ease-out"
              priority
              unoptimized
            />
            
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Top Bar Controls */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/60 text-[#B8860B] border border-[#B8860B]/40 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>{activeSlide.year}</span>
                <span className="text-white/60">•</span>
                <span className="text-white font-medium">{activeSlide.category}</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                  title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-[#D95D24] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer z-10 opacity-80 hover:opacity-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-[#D95D24] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer z-10 opacity-80 hover:opacity-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-6 z-10 text-white space-y-1 max-w-xl">
              <div className="flex items-center gap-1.5 text-[11px] text-[#B8860B] font-semibold tracking-wider uppercase">
                <span>Slide {currentIndex + 1} of {slides.length}</span>
                <span>•</span>
                <span>Uluberia Institute & Library</span>
              </div>
              <h3 className="font-serif font-bold text-base sm:text-xl lg:text-2xl text-white leading-tight drop-shadow-md">
                {activeSlide.title}
              </h3>
              <p className="text-xs text-neutral-200 line-clamp-1 drop-shadow-sm font-light">
                Preserving authentic records of community lectures, reader study sessions, and milestone celebrations since 1902.
              </p>
            </div>

            {/* Auto-play Progress Bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  key={currentIndex}
                  className="h-full bg-gradient-to-r from-[#B8860B] to-[#D95D24] animate-progress"
                  style={{ animationDuration: '5000ms' }}
                />
              </div>
            )}

          </div>

          {/* Compact Thumbnail Strip */}
          <div className="bg-[#1C1816] p-2.5 sm:p-3 border-t border-[#D4C5B0]/30">
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-[#B8860B]/40">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className={`relative shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-md overflow-hidden transition-all cursor-pointer border-2 ${
                      isActive 
                        ? 'border-[#B8860B] scale-105 ring-2 ring-[#B8860B]/50 opacity-100' 
                        : 'border-transparent opacity-50 hover:opacity-85'
                    }`}
                  >
                    <Image
                      src={slide.url}
                      alt={slide.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-white/90 bg-black/60 px-1 rounded-xs">
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF0EA] text-[#D95D24]">
                {activeSlide.year}
              </span>
              <span className="text-sm font-serif font-bold">{activeSlide.title}</span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative w-full h-[65vh] my-auto">
            <Image
              src={activeSlide.url}
              alt={activeSlide.title}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="flex items-center justify-between text-white/80 max-w-4xl mx-auto w-full text-xs">
            <button
              onClick={prevSlide}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="font-mono">
              Photo {currentIndex + 1} of {slides.length} • {activeSlide.category}
            </span>
            <button
              onClick={nextSlide}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

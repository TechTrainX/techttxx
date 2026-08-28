import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_DATA } from '../data/galleryData.js';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Eye, Play, Pause } from 'lucide-react';
import { getOptimizedImageUrl } from '../services/imagekitService.js';

export const CampusGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Campus & Labs', 'Hackathons', 'Certifications', 'Placement Celebrations'];

  const filteredItems = GALLERY_DATA.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  // Smooth Auto-Scrolling Carousel Loop (Right-to-Left)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || isPaused) return;

    let animationFrameId: number;
    const speed = 0.75;

    const step = () => {
      if (el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, filteredItems]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 380;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleLightboxNav = (direction: 'prev' | 'next') => {
    if (activeLightboxIndex === null) return;
    if (direction === 'prev') {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    } else {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f8fafc] px-4 py-14 text-slate-950 sm:py-20 lg:px-8">
      {/* Premium white-blue-black background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8fafc]" />
        <div className="absolute -left-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-[#0066cc]/[0.08] blur-3xl" />
        <div className="absolute -right-32 top-[-8rem] h-[28rem] w-[28rem] rounded-[42%] border border-[#0066cc]/10 bg-[#0066cc]/[0.05] shadow-[0_20px_90px_rgba(0,102,204,0.12)] rotate-12" />
        <div className="absolute bottom-[-15rem] left-[12%] h-[28rem] w-[68rem] rounded-[50%] border border-[#0066cc]/10 bg-white/70 shadow-[0_-25px_80px_rgba(15,23,42,0.08)] rotate-[-5deg]" />
        <div className="absolute left-[7%] top-[28%] h-0 w-0 border-l-[3.5rem] border-r-[3.5rem] border-b-[6rem] border-l-transparent border-r-transparent border-b-[#0066cc]/[0.10]" />
        <div className="absolute right-[10%] top-[48%] h-16 w-16 rotate-45 rounded-2xl border border-[#0066cc]/10 bg-white/60 shadow-[0_14px_35px_rgba(15,23,42,0.08)]" />
        <div className="absolute inset-0 opacity-[0.18] bg-tech-grid" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-9">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-slate-300/80 pb-7 md:flex-row md:items-end">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0066cc]/15 bg-[#0066cc]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0066cc]">
              <Sparkles className="h-3.5 w-3.5 text-[#0066cc]" />
              <span>TechTrainX Campus Life</span>
            </span>
            <h2 className="font-luxury-title text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Labs & <span className="font-normal italic text-[#0066cc]">Hackathons</span>
            </h2>
            <p className="max-w-lg text-sm leading-6 text-slate-600">
              Coding workbenches, IoT hardware labs, and placement celebrations.
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-700 shadow-sm transition-all hover:border-[#0066cc] hover:bg-[#0066cc] hover:text-white hover:shadow-[0_10px_24px_rgba(0,102,204,0.2)] active:scale-95 cursor-pointer"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5 text-slate-400" />}
              <span>{isPaused ? 'Auto Play' : 'Pause'}</span>
            </button>

            <button
              onClick={() => handleManualScroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:border-[#0066cc] hover:bg-[#0066cc] hover:text-white hover:shadow-[0_10px_24px_rgba(0,102,204,0.2)] active:scale-95 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:border-[#0066cc] hover:bg-[#0066cc] hover:text-white hover:shadow-[0_10px_24px_rgba(0,102,204,0.2)] active:scale-95 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 whitespace-nowrap rounded-full border px-4 text-[10px] font-bold uppercase tracking-[0.08em] transition-all duration-300 active:scale-95 cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#0066cc] bg-[#0066cc] text-white shadow-[0_10px_24px_rgba(0,102,204,0.2)]'
                  : 'border-slate-300 bg-white/90 text-slate-600 shadow-sm hover:border-[#0066cc] hover:text-[#0066cc] hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Continuous Horizontal Auto-Running Carousel */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex select-none items-stretch gap-6 overflow-x-auto pb-5 pt-1 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative flex w-[320px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#0066cc]/50 hover:shadow-[0_24px_60px_rgba(0,102,204,0.18)] sm:w-[380px]"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={getOptimizedImageUrl(item.imageUrl, { width: 800 })}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover grayscale-[12%] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Category Pill */}
                <div className="absolute left-3.5 top-3.5 z-10">
                  <span className="rounded-full border border-white/40 bg-[#050d24]/75 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Quick Expand Icon */}
                <div className="absolute right-3.5 top-3.5 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#050d24]/75 text-white shadow-lg backdrop-blur-md transition-all hover:bg-[#0066cc] hover:text-white hover:shadow-[0_8px_20px_rgba(0,102,204,0.35)]">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Bottom Detail Strip */}
                <div className="absolute inset-x-0 bottom-0 z-10 space-y-1 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-4 pb-4 pt-12 text-white">
                  <div className="flex items-center gap-2 font-mono text-[10px] font-medium text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span>{item.date || 'Lab Session'}</span>
                  </div>
                  <h3 className="font-sans text-sm font-bold leading-snug text-white drop-shadow-sm">{item.title}</h3>
                  <p className="line-clamp-1 font-sans text-[11px] text-slate-300 opacity-90 transition-all duration-300 group-hover:line-clamp-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal with Next / Prev Navigation */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <div
              className="relative w-full max-w-4xl space-y-4 overflow-hidden rounded-3xl border border-white/15 bg-[#111111] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/65 p-2 text-white shadow-lg transition-colors hover:bg-white hover:text-slate-950 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Prev / Next Lightbox Controls */}
              <button
                onClick={() => handleLightboxNav('prev')}
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg transition-colors hover:bg-white hover:text-slate-950 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleLightboxNav('next')}
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg transition-colors hover:bg-white hover:text-slate-950 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Large Image Viewport */}
              <div className="flex h-96 w-full items-center justify-center overflow-hidden bg-black sm:h-[450px]">
                <img
                  src={getOptimizedImageUrl(activeItem.imageUrl, { width: 1400 })}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Lightbox Metadata Strip */}
              <div className="space-y-3 border-t border-white/10 bg-[#111111] p-6 text-white">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-200">
                    {activeItem.category}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{activeItem.date || 'Lab Verification'}</span>
                </div>
                <h3 className="font-luxury-title text-lg font-bold text-white sm:text-xl">{activeItem.title}</h3>
                <p className="font-sans text-xs leading-relaxed text-slate-400 sm:text-sm">{activeItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

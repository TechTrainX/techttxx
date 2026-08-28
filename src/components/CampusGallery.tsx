import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_DATA } from '../data/galleryData';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Eye, Play, Pause } from 'lucide-react';
import { getOptimizedImageUrl } from '../services/imagekitService';

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
    const speed = 0.75; // pixels per frame for luxurious, non-rushed gliding

    const step = () => {
      if (el) {
        el.scrollLeft += speed;
        // If reached end, reset to start smoothly
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
    <section id="gallery" className="py-14 sm:py-20 px-4 bg-white border-b border-gray-100 relative overflow-hidden bg-tech-grid">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-aura-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200/80 pb-5">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f0f8ff] text-[#0066cc] text-[10px] font-bold uppercase tracking-[0.14em] border border-blue-200/80">
              <Sparkles className="w-3 h-3 text-[#0066cc]" />
              <span>Campus Life</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-[#0a0a0f] tracking-tight">
              Labs & <span className="text-[#0066cc] italic font-normal">Hackathons</span>
            </h2>
            <p className="text-xs text-slate-600 font-sans max-w-md">
              Coding workbenches, IoT hardware labs, and placement celebrations.
            </p>
          </div>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 h-[38px] rounded-full border border-gray-200 hover:border-[#0066cc] bg-white text-gray-700 hover:text-[#0066cc] text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#0066cc]" /> : <Pause className="w-3.5 h-3.5 text-gray-500" />}
              <span>{isPaused ? 'Auto Play' : 'Pause'}</span>
            </button>

            <button
              onClick={() => handleManualScroll('left')}
              className="w-[38px] h-[38px] rounded-full border border-gray-200 hover:border-[#0066cc] bg-white text-gray-700 hover:text-[#0066cc] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="w-[38px] h-[38px] rounded-full border border-gray-200 hover:border-[#0066cc] bg-white text-gray-700 hover:text-[#0066cc] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-[36px] px-4 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer border active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm shadow-blue-500/20'
                  : 'bg-white text-[#4b5563] hover:bg-blue-50/50 hover:text-[#0066cc] border-gray-200/80'
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
          className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setActiveLightboxIndex(idx)}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200/90 group cursor-pointer relative shadow-sm hover:shadow-xl hover:border-[#0066cc] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container with Consistent Aspect Ratio */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={getOptimizedImageUrl(item.imageUrl, { width: 800 })}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Always-on Top Floating Category Pill */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-white/95 backdrop-blur-md text-[#0066cc] text-[9px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider border border-white/40">
                    {item.category}
                  </span>
                </div>

                {/* Top-Right Quick Expand Icon */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:bg-[#0066cc] transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* High-Contrast Bottom Detail Strip (Guaranteed Pure Legibility) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-12 pb-4 px-4 text-white z-10 space-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 text-[10px] text-blue-300 font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066cc] animate-pulse" />
                    <span>{item.date || 'Lab Session'}</span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug text-white drop-shadow-sm font-sans">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-sans line-clamp-1 opacity-90 group-hover:line-clamp-2 transition-all duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal with Next / Prev Navigation */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setActiveLightboxIndex(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-[#0a0a0f] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#0066cc] cursor-pointer shadow-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Lightbox Controls */}
              <button
                onClick={() => handleLightboxNav('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-[#0066cc] flex items-center justify-center cursor-pointer shadow-lg transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleLightboxNav('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-[#0066cc] flex items-center justify-center cursor-pointer shadow-lg transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Large Image Viewport */}
              <div className="h-96 sm:h-[450px] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={getOptimizedImageUrl(activeItem.imageUrl, { width: 1400 })}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Lightbox Metadata Strip */}
              <div className="p-6 bg-[#0f1422] border-t border-slate-800 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#0066cc] uppercase tracking-[0.16em] bg-blue-950/80 border border-blue-800/80 px-3 py-1 rounded-full">
                    {activeItem.category}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {activeItem.date || 'Lab Verification'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-luxury-title font-bold text-white">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


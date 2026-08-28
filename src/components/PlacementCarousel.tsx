import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Sparkles, Building2, 
  TrendingUp, Award, CheckCircle2, ArrowRight
} from 'lucide-react';
import { PLACEMENTS_LIST } from '../data/placementsData';

interface PlacementCarouselProps {
  onOpenEnrollment?: (courseTitle?: string) => void;
}

export const PlacementCarousel: React.FC<PlacementCarouselProps> = ({
  onOpenEnrollment
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      title: 'Recent Alumni Placements',
      items: PLACEMENTS_LIST.slice(0, 3)
    },
    {
      title: 'Full-Stack & Cloud Engineers',
      items: PLACEMENTS_LIST.slice(3, 6)
    },
    {
      title: 'AI, Data & Embedded Systems',
      items: PLACEMENTS_LIST.slice(6, 9)
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0066cc] bg-blue-50 px-2.5 py-0.5 rounded-full">
            Verified Placements
          </span>
          <h3 className="text-lg sm:text-xl font-luxury-title font-bold text-[#0a0a0f] mt-1">
            {currentSlide.title}
          </h3>
        </div>

        {/* Prev / Next Arrows - Rounded Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#0066cc] text-[#333] hover:text-[#0066cc] bg-white transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#0066cc] text-[#333] hover:text-[#0066cc] bg-white transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid - Rounded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentSlide.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#f7f9fc] p-4 rounded-xl border border-gray-200/80 hover:border-[#0066cc] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-bold text-xs sm:text-sm text-[#0a0a0f] font-sans">
                  {item.name}
                </span>
                <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {item.packageLPA} LPA
                </span>
              </div>

              <div className="space-y-1 text-xs font-sans">
                <div className="flex items-center gap-1.5 text-[#0066cc] font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{item.company}</span>
                </div>
                <p className="text-[#4b5563] font-medium text-[11px]">
                  {item.role}
                </p>
                <p className="text-[#6b7280] text-[10px]">
                  Batch: {item.batchYear} • {item.collegeName}
                </p>
              </div>
            </div>

            <div className="pt-3 mt-2.5 border-t border-gray-200 flex items-center justify-between text-[10px] font-sans">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
              </span>
              <span className="text-[#666]">
                {item.courseTaken}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rounded Pill Indicators */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx ? 'w-6 bg-[#0066cc]' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default PlacementCarousel;

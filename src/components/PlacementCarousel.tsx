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
    <div className="w-full bg-white border border-blue-100 rounded-[20px] p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066cc]">
            Verified Placements
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#00061a] mt-0.5">
            {currentSlide.title}
          </h3>
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-200 hover:border-[#0066cc] text-[#333] hover:text-[#0066cc] bg-white transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-200 hover:border-[#0066cc] text-[#333] hover:text-[#0066cc] bg-white transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {currentSlide.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#f0f8ff] p-5 rounded-[16px] border border-blue-100/80 hover:border-[#0066cc] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-[#00061a]">
                  {item.name}
                </span>
                <span className="bg-[#0066cc] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {item.packageLPA} LPA
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-[#0066cc] font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{item.company}</span>
                </div>
                <p className="text-[#555] font-medium">
                  {item.role}
                </p>
                <p className="text-[#777] text-[11px]">
                  Batch: {item.batchYear} • {item.collegeName}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-blue-200/50 flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Offer Verified
              </span>
              <span className="text-[#666]">
                {item.courseTaken}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentIndex === idx ? 'w-6 bg-[#0066cc]' : 'w-2 bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default PlacementCarousel;

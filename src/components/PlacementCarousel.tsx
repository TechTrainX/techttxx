import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Pause,
  Play
} from 'lucide-react';
import { PLACEMENTS_LIST } from '../data/placementsData';

interface PlacementCarouselProps {
  onOpenEnrollment?: (courseTitle?: string) => void;
}

export const PlacementCarousel: React.FC<PlacementCarouselProps> = ({
  onOpenEnrollment
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Group placements into presentation slides of 3 cards each (or responsive chunks)
  const slides = [
    {
      badge: 'TOP CTC RECORD HOLDERS',
      title: 'High-Impact Placements & Tier-1 Hires',
      description: 'Our industrial interns transition directly into top product companies and high-growth engineering firms.',
      items: PLACEMENTS_LIST.slice(0, 3)
    },
    {
      badge: 'PRODUCT & ENTERPRISE TRACKS',
      title: 'Full-Stack & Cloud Engineers',
      description: 'Mastery over production backends, distributed microservices, and modern web architectures.',
      items: PLACEMENTS_LIST.slice(3, 6)
    },
    {
      badge: 'AI, DATA & SYSTEM ARCHITECTS',
      title: 'Deep-Tech & Machine Learning Roles',
      description: 'Practical training with real datasets, model deployment pipelines, and enterprise automation.',
      items: PLACEMENTS_LIST.slice(6, 9)
    }
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
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

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-3xl p-4 sm:p-7 relative overflow-hidden backdrop-blur-sm shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of Carousel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-black tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentSlide.badge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentSlide.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {currentSlide.description}
          </p>
        </div>

        {/* Carousel Slide Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60 text-xs flex items-center gap-1"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel Cards Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {currentSlide.items.map((student) => (
          <div
            key={student.id}
            className="group relative rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Header with Photo & Package Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={student.photoUrl}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-cyan-500/30"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                      {student.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      <span className="font-medium text-slate-300">{student.company}</span>
                    </p>
                  </div>
                </div>

                {/* Package Pill */}
                <div className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-400 font-black text-xs shrink-0 flex items-center gap-1 shadow-sm">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>{student.packageLPA} LPA</span>
                </div>
              </div>

              {/* Role & Tech Stack */}
              <div className="space-y-1.5 mb-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-cyan-400" />
                    Role:
                  </span>
                  <span className="font-semibold text-white text-[11px]">{student.role}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Award className="w-3 h-3 text-indigo-400" />
                    Training:
                  </span>
                  <span className="font-medium text-slate-300 text-[11px] truncate max-w-[140px]">{student.courseTaken}</span>
                </div>
              </div>

              {/* Quote / Experience */}
              <p className="text-xs text-slate-400 italic line-clamp-2 mb-3">
                "{student.quote}"
              </p>
            </div>

            {/* Card Action */}
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-semibold">{student.batchYear} Cohort</span>
              {onOpenEnrollment && (
                <button
                  onClick={() => onOpenEnrollment(student.courseTaken)}
                  className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors group-hover:translate-x-0.5"
                >
                  <span>Apply for this track</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementCarousel;

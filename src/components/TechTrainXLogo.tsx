import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface TechTrainXLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  customLogoUrl?: string;
  onClick?: () => void;
}

export const TechTrainXLogo: React.FC<TechTrainXLogoProps> = ({
  size = 'md',
  showTagline = true,
  showText = true,
  theme = 'light',
  className = '',
  customLogoUrl,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);
  const isDark = theme === 'dark';

  // Determine active logo source: prop -> companyConfig -> fallback vector
  const effectiveLogoUrl = customLogoUrl || COMPANY_CONFIG.logoImageUrl;

  // Sizing configurations
  const dimensions = {
    sm: {
      icon: 'w-7 h-7 sm:w-8 sm:h-8',
      text: 'text-base sm:text-lg',
      subText: 'text-[9px] sm:text-[10px]'
    },
    md: {
      icon: 'w-8 h-8 sm:w-9 sm:h-9',
      text: 'text-lg sm:text-xl',
      subText: 'text-[9px] sm:text-[10px]'
    },
    lg: {
      icon: 'w-10 h-10 sm:w-11 sm:h-11',
      text: 'text-xl sm:text-2xl',
      subText: 'text-[10px] sm:text-[11px]'
    },
    xl: {
      icon: 'w-12 h-12 sm:w-14 sm:h-14',
      text: 'text-2xl sm:text-3xl',
      subText: 'text-xs sm:text-sm'
    }
  }[size];

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group cursor-pointer ${className}`}
    >
      {/* Dynamic Brand Logo (From /public or CDN or High-Precision Vector Emblem) */}
      {effectiveLogoUrl && !imageError ? (
        <img
          src={effectiveLogoUrl}
          alt={COMPANY_CONFIG.brandName}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${dimensions.icon} object-contain rounded-xl`}
        />
      ) : (
        <div className={`relative ${dimensions.icon} shrink-0`}>
          {/* Subtle Ambient Energy Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#0066cc] via-[#00c2ff] to-[#7fffd4] rounded-xl blur-[2px] opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Main Vector Emblem Container */}
          <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#000d2b] to-[#000511] p-[1.5px] shadow-sm overflow-hidden border border-white/10 flex items-center justify-center">
            
            {/* SVG Precision Tech Mark */}
            <svg
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full p-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            >
              <defs>
                <radialGradient id="ttxBgGrad" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#0c1938" />
                  <stop offset="60%" stopColor="#050a17" />
                  <stop offset="100%" stopColor="#020409" />
                </radialGradient>
                <linearGradient id="ttxBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="ttxLetterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="ttxLaserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="50%" stopColor="#4facfe" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>

              {/* Base Squircle Border */}
              <rect x="24" y="24" width="464" height="464" rx="100" ry="100" fill="url(#ttxBgGrad)" stroke="url(#ttxBorderGrad)" strokeWidth="16" />

              {/* Cyber Accents */}
              <path d="M 70 160 L 70 100 L 130 100" fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>
              <path d="M 442 352 L 442 412 L 382 412" fill="none" stroke="#818cf8" strokeWidth="8" strokeLinecap="round" opacity="0.7"/>

              {/* Core TTX Monogram Mark */}
              <g transform="translate(18, 12)">
                {/* First 'T' */}
                <path d="M 80 160 L 210 160 L 210 205 L 165 205 L 165 350 L 115 350 L 115 205 L 80 205 Z" fill="url(#ttxLetterGrad)"/>

                {/* Second 'T' (Offset & Layered) */}
                <path d="M 190 160 L 305 160 L 305 205 L 268 205 L 268 350 L 218 350 L 218 205 L 190 205 Z" fill="#e2e8f0" opacity="0.95"/>

                {/* High-Energy Cyber 'X' */}
                <polygon points="275,160 345,160 435,350 365,350" fill="url(#ttxLaserGrad)"/>
                <polygon points="435,160 365,160 275,350 345,350" fill="url(#ttxLaserGrad)"/>
                
                {/* Central Energy Core Spark */}
                <circle cx="355" cy="255" r="18" fill="#ffffff"/>
                <circle cx="355" cy="255" r="28" fill="#00f2fe" opacity="0.4"/>
              </g>
            </svg>

          </div>
        </div>
      )}

      {/* Brand Typography & Parent Organization Affiliation */}
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          
          {/* Main Wordmark */}
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight ${isDark ? 'text-white' : 'text-[#00061a]'} ${dimensions.text}`}>
              TechTrain<span className="text-[#0066cc] group-hover:text-[#0052a3] transition-colors">X</span>
            </span>
            
            {/* Active Lab Pulse Dot */}
            <span 
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isDark ? 'bg-[#7fffd4] shadow-[0_0_6px_#7fffd4]' : 'bg-[#0066cc] shadow-[0_0_4px_#0066cc]'
              } animate-pulse`} 
              title="Live Operational Labs"
            />
          </div>

          {/* Subtitle */}
          {showTagline && (
            <span className={`font-semibold tracking-[0.12em] uppercase mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#666666]'} ${dimensions.subText}`}>
              A unit of Xnava Enterprises.
            </span>
          )}

        </div>
      )}
    </div>
  );
};

export default TechTrainXLogo;

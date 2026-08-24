import React from 'react';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface TechTrainXLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const TechTrainXLogo: React.FC<TechTrainXLogoProps> = ({
  size = 'md',
  showTagline = true,
  theme = 'light',
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm',
    lg: 'w-10 h-10 sm:w-11 sm:h-11 text-sm sm:text-base'
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl'
  }[size];

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none ${className}`}>
      {COMPANY_CONFIG.logoImageUrl ? (
        <img
          src={COMPANY_CONFIG.logoImageUrl}
          alt={COMPANY_CONFIG.brandName}
          referrerPolicy="no-referrer"
          className={`${size === 'lg' ? 'h-10' : size === 'md' ? 'h-8' : 'h-7'} w-auto object-contain rounded-lg`}
        />
      ) : (
        <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-[#0066cc] to-[#00061a] p-[2px] shadow-sm shrink-0`}>
          <div className="w-full h-full bg-[#0066cc] rounded-[9px] flex items-center justify-center relative overflow-hidden">
            <div className="relative flex items-center font-bold tracking-tighter text-white">
              <span className="text-[12px] sm:text-[13px] font-black">TT</span>
              <span className="text-[#7fffd4] text-[13px] sm:text-[14px] font-black -ml-0.5">X</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight ${isDark ? 'text-white' : 'text-[#00061a]'} ${titleSizes}`}>
            TechTrain<span className="text-[#0066cc]">X</span>
          </span>
          
        </div>
        {showTagline && (
          <span className={`text-[10px] font-semibold tracking-wide uppercase ${isDark ? 'text-slate-400' : 'text-[#666666]'}`}>
            Training & Placement Labs
          </span>
        )}
      </div>
    </div>
  );
};

export default TechTrainXLogo;

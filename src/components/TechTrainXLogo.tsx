import React from 'react';
import { COMPANY_CONFIG } from '../config/companyConfig';

interface TechTrainXLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const TechTrainXLogo: React.FC<TechTrainXLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base'
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer group ${className}`}>
      {COMPANY_CONFIG.logoImageUrl ? (
        <img
          src={COMPANY_CONFIG.logoImageUrl}
          alt={COMPANY_CONFIG.brandName}
          referrerPolicy="no-referrer"
          className={`${size === 'lg' ? 'h-10' : size === 'md' ? 'h-8' : 'h-7'} w-auto object-contain rounded-lg`}
        />
      ) : (
        <div className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/35 transition-all duration-300 shrink-0`}>
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-indigo-500/20" />
            <div className="relative flex items-center font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-sky-200">
              <span className="text-[11px] sm:text-xs font-black">TT</span>
              <span className="text-cyan-400 text-[13px] sm:text-sm font-extrabold -ml-0.5">X</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors ${titleSizes}`}>
            TechTrain<span className="text-cyan-400">X</span>
          </span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/30 text-[9px] font-black text-cyan-300 tracking-wider">
            FOUNDRY
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] sm:text-[9.5px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
            PLACEMENT & INTERNSHIP LABS
          </span>
        )}
      </div>
    </div>
  );
};

export default TechTrainXLogo;

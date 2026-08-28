import React from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface ValidatedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  icon?: LucideIcon;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const ValidatedSelect: React.FC<ValidatedSelectProps> = ({
  label,
  value,
  onChange,
  required = false,
  icon: Icon,
  hint,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      <label className="block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1 font-bold">*</span>}
      </label>

      <div className="relative flex items-center rounded-lg bg-white border border-slate-200/90 hover:border-slate-300 focus-within:border-[#0066cc] focus-within:ring-2 focus-within:ring-[#0066cc]/10 shadow-2xs transition-all duration-200">
        {Icon && (
          <div className="pl-3.5 pr-1 text-slate-400 shrink-0">
            <Icon className="w-4 h-4 text-[#0066cc]" />
          </div>
        )}

        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-2.5 px-3 text-xs text-slate-800 bg-transparent outline-none appearance-none font-normal cursor-pointer pr-9 ${
            Icon ? 'pl-2' : 'pl-3.5'
          } ${disabled ? 'opacity-60 bg-slate-50 cursor-not-allowed' : ''}`}
          {...props}
        >
          {children}
        </select>

        <div className="absolute right-3 text-slate-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {hint && <p className="text-[11px] text-slate-400 font-sans">{hint}</p>}
    </div>
  );
};

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
      <label className="block text-xs font-bold text-[#00061a]">
        {label}
        {required && <span className="text-red-500 ml-1 font-black">*</span>}
      </label>

      <div className="relative flex items-center rounded-xl bg-white border border-gray-300 hover:border-gray-400 focus-within:border-[#0066cc] focus-within:ring-3 focus-within:ring-blue-500/15 shadow-xs transition-all duration-200">
        {Icon && (
          <div className="pl-3.5 pr-1 text-gray-400 shrink-0">
            <Icon className="w-4 h-4 text-[#0066cc]" />
          </div>
        )}

        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-2.5 px-3 text-xs sm:text-sm text-[#00061a] bg-transparent outline-none appearance-none font-medium cursor-pointer pr-9 ${
            Icon ? 'pl-2' : 'pl-3.5'
          } ${disabled ? 'opacity-60 bg-gray-50 cursor-not-allowed' : ''}`}
          {...props}
        >
          {children}
        </select>

        <div className="absolute right-3 text-gray-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {hint && <p className="text-[11px] text-gray-500">{hint}</p>}
    </div>
  );
};

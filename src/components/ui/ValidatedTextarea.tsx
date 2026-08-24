import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ValidatedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  isValid?: boolean;
  required?: boolean;
  hint?: string;
  minLen?: number;
  maxLen?: number;
}

export const ValidatedTextarea: React.FC<ValidatedTextareaProps> = ({
  label,
  value,
  onChange,
  error,
  isValid,
  required = false,
  hint,
  placeholder,
  rows = 3,
  disabled,
  minLen = 10,
  maxLen = 1000,
  className = '',
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const showError = touched && !!error;
  const showSuccess = touched && isValid && value.trim().length >= minLen && !error;

  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      {/* Label and Live Character Count */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#00061a]">
          {label}
          {required && <span className="text-red-500 ml-1 font-black">*</span>}
        </label>
        <span className={`text-[10px] font-mono ${
          value.length > maxLen ? 'text-red-500 font-bold' : value.length >= minLen ? 'text-emerald-600' : 'text-gray-400'
        }`}>
          {value.length}/{maxLen} chars {minLen > 0 && `(min ${minLen})`}
        </span>
      </div>

      {/* Textarea Wrapper */}
      <div
        className={`relative rounded-xl bg-white border transition-all duration-200 ${
          showError
            ? 'border-red-400 ring-2 ring-red-400/20 bg-red-50/20'
            : showSuccess
            ? 'border-emerald-400 ring-2 ring-emerald-400/20'
            : focused
            ? 'border-[#0066cc] ring-3 ring-blue-500/15 shadow-xs'
            : 'border-gray-300 hover:border-gray-400 shadow-xs'
        } ${disabled ? 'opacity-60 bg-gray-50 cursor-not-allowed' : ''}`}
      >
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLen))}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full py-2.5 px-3.5 text-xs sm:text-sm text-[#00061a] placeholder-gray-400 outline-none bg-transparent resize-y font-normal"
          {...props}
        />

        {/* Trailing Icon for status */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
          {showSuccess && (
            <div className="text-emerald-500 animate-in zoom-in duration-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}

          {showError && (
            <div className="text-red-500 animate-in zoom-in duration-200">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Error / Hint */}
      {showError ? (
        <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
};

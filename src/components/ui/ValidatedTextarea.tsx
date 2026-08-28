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
        <label className="block text-xs font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </label>
        <span className={`text-[10px] font-sans font-medium ${
          value.length > maxLen ? 'text-red-500 font-bold' : value.length >= minLen ? 'text-emerald-600' : 'text-slate-400'
        }`}>
          {value.length}/{maxLen} chars {minLen > 0 && `(min ${minLen})`}
        </span>
      </div>

      {/* Textarea Wrapper */}
      <div
        className={`relative rounded-lg bg-white border transition-all duration-200 ${
          showError
            ? 'border-red-400 ring-2 ring-red-400/15 bg-red-50/20'
            : showSuccess
            ? 'border-emerald-400 ring-2 ring-emerald-400/15'
            : focused
            ? 'border-[#0066cc] ring-2 ring-[#0066cc]/10 shadow-xs'
            : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
        } ${disabled ? 'opacity-60 bg-slate-50 cursor-not-allowed' : ''}`}
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
          className="w-full py-2.5 px-3.5 text-xs text-slate-800 placeholder:text-slate-400/40 placeholder:font-light outline-none bg-transparent resize-y font-normal"
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
        <p className="text-[11px] font-medium text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200 font-sans">
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-slate-400 font-sans">{hint}</p>
      ) : null}
    </div>
  );
};

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X, LucideIcon } from 'lucide-react';

interface ValidatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  isValid?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  hint?: string;
  showSuccessIcon?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  value,
  onChange,
  error,
  isValid,
  required = false,
  icon: Icon,
  hint,
  showSuccessIcon = true,
  placeholder,
  type = 'text',
  disabled,
  className = '',
  maxLength,
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const showError = touched && !!error;
  const showSuccess = touched && isValid && showSuccessIcon && value.trim().length > 0 && !error;

  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      {/* Label and Character / Status Counter */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#00061a] transition-colors">
          {label}
          {required && <span className="text-red-500 ml-1 font-black">*</span>}
        </label>
        {maxLength && (
          <span className="text-[10px] text-gray-400 font-mono">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {/* Input Box Wrapper */}
      <div
        className={`relative flex items-center rounded-xl bg-white border transition-all duration-200 ${
          showError
            ? 'border-red-400 ring-2 ring-red-400/20 bg-red-50/20'
            : showSuccess
            ? 'border-emerald-400 ring-2 ring-emerald-400/20'
            : focused
            ? 'border-[#0066cc] ring-3 ring-blue-500/15 shadow-xs'
            : 'border-gray-300 hover:border-gray-400 shadow-xs'
        } ${disabled ? 'opacity-60 bg-gray-50 cursor-not-allowed' : ''}`}
      >
        {/* Leading Icon */}
        {Icon && (
          <div className="pl-3.5 pr-1 text-gray-400 shrink-0">
            <Icon className={`w-4 h-4 transition-colors ${focused ? 'text-[#0066cc]' : ''}`} />
          </div>
        )}

        {/* Real Input Element */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full py-2.5 px-3 text-xs sm:text-sm text-[#00061a] placeholder-gray-400 outline-none bg-transparent font-medium ${
            Icon ? 'pl-2' : 'pl-3.5'
          } ${showSuccess || showError || value.length > 0 ? 'pr-8' : 'pr-3.5'}`}
          {...props}
        />

        {/* Trailing Status & Action Icons */}
        <div className="absolute right-2.5 flex items-center gap-1 shrink-0">
          {value.length > 0 && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => {
                onChange('');
                setTouched(false);
              }}
              className="p-1 rounded-full text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

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

      {/* Inline Feedback Helper or Error */}
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

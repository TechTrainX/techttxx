import React, { useState } from 'react';
import { Phone, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { validatePhoneNumber } from '../../utils/validators';

interface ValidatedPhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export const ValidatedPhoneInput: React.FC<ValidatedPhoneInputProps> = ({
  label = 'WhatsApp Mobile Number',
  value,
  onChange,
  required = true,
  hint,
  disabled = false,
  className = ''
}) => {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  // Evaluate validation
  const validation = validatePhoneNumber(value);
  const rawDigits = value.replace(/[^0-9]/g, '');

  const showError = touched && (!validation.isValid || (required && !value));
  const showSuccess = touched && validation.isValid && rawDigits.length >= 10;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Extract numbers only
    let digits = input.replace(/[^0-9]/g, '');

    // If starts with 91 and user is typing Indian number, strip leading 91 for the input field
    if (countryCode === '+91' && digits.startsWith('91') && digits.length > 10) {
      digits = digits.substring(2);
    }

    // Strictly limit to 10 digits for India or 15 for international
    const maxLen = countryCode === '+91' ? 10 : 15;
    digits = digits.slice(0, maxLen);

    onChange(digits);
  };

  const handleClear = () => {
    onChange('');
    setTouched(false);
  };

  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      {/* Label and Character / Status Counter */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-[#00061a]">
          {label}
          {required && <span className="text-red-500 ml-1 font-black">*</span>}
        </label>
        <span className="text-[10px] text-gray-400 font-mono">
          {rawDigits.length}/{countryCode === '+91' ? '10' : '15'} digits
        </span>
      </div>

      {/* Input Box with Integrated Country Code Badge */}
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
        {/* Country Code Selector / Indicator */}
        <div className="flex items-center gap-1.5 pl-3 pr-2 py-2 border-r border-gray-200 bg-gray-50/80 rounded-l-xl select-none">
          <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
          <select
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              // Clean value if changing
              if (e.target.value === '+91') {
                onChange(value.replace(/[^0-9]/g, '').slice(0, 10));
              }
            }}
            disabled={disabled}
            className="text-xs font-bold text-gray-700 bg-transparent outline-none cursor-pointer pr-1"
          >
            <option value="+91">🇮🇳 +91 (IN)</option>
            <option value="+1">🇺🇸 +1 (US/CA)</option>
            <option value="+44">🇬🇧 +44 (UK)</option>
            <option value="+971">🇦🇪 +971 (UAE)</option>
            <option value="+65">🇸🇬 +65 (SG)</option>
            <option value="+61">🇦🇺 +61 (AU)</option>
            <option value="+49">🇩🇪 +49 (DE)</option>
            <option value="+33">🇫🇷 +33 (FR)</option>
            <option value="+81">🇯🇵 +81 (JP)</option>
          </select>
        </div>

        {/* Real Phone Input */}
        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          disabled={disabled}
          placeholder={countryCode === '+91' ? '98765 43210' : 'Mobile number'}
          maxLength={countryCode === '+91' ? 10 : 15}
          className="w-full py-2.5 px-3 text-xs sm:text-sm text-[#00061a] placeholder-gray-400 outline-none bg-transparent font-mono tracking-wide"
        />

        {/* Trailing Clear and Feedback Status */}
        <div className="absolute right-2.5 flex items-center gap-1 shrink-0">
          {value.length > 0 && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="p-1 rounded-full text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Clear phone"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {showSuccess && (
            <div className="text-emerald-500 animate-in zoom-in duration-200" title="Valid mobile number">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}

          {showError && (
            <div className="text-red-500 animate-in zoom-in duration-200" title="Invalid phone number">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Error / Validation Feedback */}
      {showError ? (
        <p className="text-[11px] font-semibold text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <span>{validation.error || 'Please enter a valid 10-digit mobile number.'}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
};

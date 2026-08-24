/**
 * TechTrainX Enterprise Input Validation & Sanitization Engine
 * 
 * Strict, production-grade validation utilities for all user-facing
 * forms, inputs, data formatting, and anti-spam verification.
 */

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  sanitized: string;
}

export interface PhoneValidationResult {
  isValid: boolean;
  error: string | null;
  formatted: string;
  rawDigits: string;
  countryCode: string;
}

/**
 * Sanitize plain text strings:
 * - Trims whitespace
 * - Strips control characters and dangerous script injection characters
 * - Collapses multiple spaces into single space
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // strip control chars
    .replace(/[<>]/g, '') // strip angle brackets to prevent HTML injection
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Validate Candidate / Client Full Name:
 * - Must be between 2 and 60 characters
 * - Only alphabetic characters, spaces, periods, apostrophes, and hyphens allowed
 * - Blocks numeric spam and symbol injection
 */
export function validateFullName(input: string): ValidationResult {
  const sanitized = sanitizeText(input);

  if (!sanitized) {
    return {
      isValid: false,
      error: 'Full name is required.',
      sanitized: ''
    };
  }

  if (sanitized.length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters long.',
      sanitized
    };
  }

  if (sanitized.length > 60) {
    return {
      isValid: false,
      error: 'Name cannot exceed 60 characters.',
      sanitized: sanitized.substring(0, 60)
    };
  }

  // Name regex allowing international letters and standard name characters
  const nameRegex = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s.'-]+$/;
  if (!nameRegex.test(sanitized)) {
    return {
      isValid: false,
      error: 'Name can only contain letters, spaces, hyphens, and dots.',
      sanitized
    };
  }

  // Check that it's not all non-letter characters
  const letterCount = (sanitized.match(/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g) || []).length;
  if (letterCount < 2) {
    return {
      isValid: false,
      error: 'Please enter a valid full name.',
      sanitized
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized
  };
}

/**
 * Validate Email Address:
 * - Strict RFC 5322 compliant regex
 * - Domain validation
 * - Auto-lowercasing and whitespace trimming
 */
export function validateEmail(input: string): ValidationResult {
  const sanitized = (input || '').trim().toLowerCase();

  if (!sanitized) {
    return {
      isValid: false,
      error: 'Email address is required.',
      sanitized: ''
    };
  }

  if (sanitized.length > 100) {
    return {
      isValid: false,
      error: 'Email address cannot exceed 100 characters.',
      sanitized
    };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(sanitized)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address (e.g. name@gmail.com).',
      sanitized
    };
  }

  const parts = sanitized.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid email format.', sanitized };
  }

  const domain = parts[1];
  if (!domain.includes('.') || domain.endsWith('.') || domain.startsWith('.')) {
    return {
      isValid: false,
      error: 'Please enter a valid domain (e.g. gmail.com, yahoo.com).',
      sanitized
    };
  }

  const tld = domain.split('.').pop() || '';
  if (tld.length < 2) {
    return {
      isValid: false,
      error: 'Please enter a complete email domain extension.',
      sanitized
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized
  };
}

/**
 * Format and Validate Phone Numbers:
 * - Extracts pure numeric digits
 * - Detects country prefix or defaults to India (+91)
 * - Restricts Indian mobile numbers to 10 digits starting with 6, 7, 8, 9
 * - Restricts international numbers to 10-15 digits
 * - Specifically rejects spam sequences like repeating 54455555555555555644444444
 */
export function validatePhoneNumber(input: string, defaultCountry = 'IN'): PhoneValidationResult {
  if (!input) {
    return {
      isValid: false,
      error: 'Phone number is required.',
      formatted: '',
      rawDigits: '',
      countryCode: '+91'
    };
  }

  // Extract raw digits
  const rawDigits = input.replace(/[^0-9]/g, '');

  if (rawDigits.length === 0) {
    return {
      isValid: false,
      error: 'Please enter numbers only for phone.',
      formatted: '',
      rawDigits: '',
      countryCode: '+91'
    };
  }

  // Reject spam repeating digit strings (e.g. 55555555555555, 0000000000, 1111111111)
  const isAllSameDigit = /^(\d)\1+$/.test(rawDigits);
  if (isAllSameDigit && rawDigits.length >= 7) {
    return {
      isValid: false,
      error: 'Invalid phone number pattern. Please enter your real mobile number.',
      formatted: rawDigits,
      rawDigits,
      countryCode: '+91'
    };
  }

  // Handling Indian (+91) Numbers
  let clean10 = rawDigits;
  let countryCode = '+91';

  if (rawDigits.startsWith('91') && rawDigits.length === 12) {
    clean10 = rawDigits.substring(2);
    countryCode = '+91';
  } else if (rawDigits.startsWith('0') && rawDigits.length === 11) {
    clean10 = rawDigits.substring(1);
    countryCode = '+91';
  }

  // Check 10-digit Indian Mobile Pattern
  if (clean10.length === 10) {
    const firstDigit = clean10.charAt(0);
    if (!['6', '7', '8', '9'].includes(firstDigit)) {
      return {
        isValid: false,
        error: 'Indian mobile numbers must start with 6, 7, 8, or 9.',
        formatted: `${clean10.slice(0, 5)} ${clean10.slice(5)}`,
        rawDigits: clean10,
        countryCode
      };
    }

    const formatted = `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}`;
    return {
      isValid: true,
      error: null,
      formatted,
      rawDigits: `91${clean10}`,
      countryCode: '+91'
    };
  }

  // Under length check
  if (rawDigits.length < 10) {
    return {
      isValid: false,
      error: `Phone number is too short (${rawDigits.length}/10 digits entered).`,
      formatted: rawDigits,
      rawDigits,
      countryCode: '+91'
    };
  }

  // Over length check (>15 digits is invalid globally, >10 without international code is invalid)
  if (rawDigits.length > 15) {
    return {
      isValid: false,
      error: 'Phone number is too long (maximum 10 digits for India or 15 for international).',
      formatted: rawDigits.substring(0, 15),
      rawDigits: rawDigits.substring(0, 15),
      countryCode
    };
  }

  // International format check (10-15 digits starting with country code)
  if (rawDigits.length >= 10 && rawDigits.length <= 15) {
    const formatted = `+${rawDigits}`;
    return {
      isValid: true,
      error: null,
      formatted,
      rawDigits,
      countryCode: `+${rawDigits.slice(0, 2)}`
    };
  }

  return {
    isValid: false,
    error: 'Please enter a valid 10-digit mobile number.',
    formatted: rawDigits,
    rawDigits,
    countryCode: '+91'
  };
}

/**
 * Clean phone input as user types, enforcing maximum 15 characters
 */
export function formatPhoneAsYouType(input: string): string {
  const digits = input.replace(/[^0-9]/g, '').slice(0, 15);
  
  if (digits.length <= 5) {
    return digits;
  }
  if (digits.length <= 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  if (digits.startsWith('91') && digits.length <= 12) {
    const local = digits.slice(2);
    if (local.length <= 5) {
      return `+91 ${local}`;
    }
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return `+${digits}`;
}

/**
 * Validate Message / Textarea Content:
 * - Trims input
 * - Enforces minimum and maximum characters
 */
export function validateTextMessage(input: string, min = 10, max = 1000): ValidationResult {
  const sanitized = sanitizeText(input);

  if (!sanitized) {
    return {
      isValid: false,
      error: 'Please enter your message or query.',
      sanitized: ''
    };
  }

  if (sanitized.length < min) {
    return {
      isValid: false,
      error: `Please provide more details (minimum ${min} characters, currently ${sanitized.length}).`,
      sanitized
    };
  }

  if (sanitized.length > max) {
    return {
      isValid: false,
      error: `Message exceeds maximum allowed limit of ${max} characters.`,
      sanitized: sanitized.substring(0, max)
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized
  };
}

/**
 * Validate College Name or Organization:
 * - Optional or required
 * - Max length 120 chars
 */
export function validateCollegeOrOrg(input: string, required = false): ValidationResult {
  const sanitized = sanitizeText(input);

  if (!sanitized) {
    if (required) {
      return {
        isValid: false,
        error: 'College or organization name is required.',
        sanitized: ''
      };
    }
    return {
      isValid: true,
      error: null,
      sanitized: ''
    };
  }

  if (sanitized.length < 2) {
    return {
      isValid: false,
      error: 'Please enter a valid institution name.',
      sanitized
    };
  }

  if (sanitized.length > 120) {
    return {
      isValid: false,
      error: 'Institution name cannot exceed 120 characters.',
      sanitized: sanitized.substring(0, 120)
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized
  };
}

/**
 * Validate City Name:
 */
export function validateCity(input: string, required = false): ValidationResult {
  const sanitized = sanitizeText(input);

  if (!sanitized) {
    if (required) {
      return {
        isValid: false,
        error: 'Delivery city is required.',
        sanitized: ''
      };
    }
    return {
      isValid: true,
      error: null,
      sanitized: ''
    };
  }

  if (sanitized.length < 2 || sanitized.length > 50) {
    return {
      isValid: false,
      error: 'Please enter a valid city name (2-50 characters).',
      sanitized
    };
  }

  if (!/^[a-zA-Z\s.-]+$/.test(sanitized)) {
    return {
      isValid: false,
      error: 'City name can only contain letters and spaces.',
      sanitized
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized
  };
}

/**
 * Validate Certificate ID:
 * - Must be alphanumeric
 * - 6 to 25 characters
 */
export function validateCertificateId(input: string): ValidationResult {
  const sanitized = (input || '').replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase();

  if (!sanitized) {
    return {
      isValid: false,
      error: 'Certificate ID is required.',
      sanitized: ''
    };
  }

  if (sanitized.length < 6 || sanitized.length > 25) {
    return {
      isValid: false,
      error: 'Certificate ID must be between 6 and 25 alphanumeric characters.',
      sanitized
    };
  }

  return {
    isValid: true,
    error: null,
    sanitized
  };
}

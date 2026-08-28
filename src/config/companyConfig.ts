/**
 * TechTrainX Platform - Global Company & Branding Configuration
 * 
 * You can edit the company logo, name, emails, phone numbers, and copyright text directly here.
 */

export interface CompanyConfig {
  /** Platform & Brand Name */
  brandName: string;
  /** Legal Organization Name */
  legalName: string;
  /** Parent Company Name */
  parentCompanyName: string;
  /** Parent Company URL */
  parentCompanyUrl: string;
  /** Parent Company Domain */
  parentCompanyDomain: string;
  /** Tagline / Division Badge */
  tagline: string;
  /** Primary Copyright notice */
  copyright: string;

  /**
   * Custom Favicon URL
   * You can place your custom favicon file directly in the `/public` folder
   * (for example `/favicon.svg`, `/favicon.png`, or `/favicon.ico`)
   * or provide an external image URL.
   */
  faviconUrl: string;

  /** 
   * Custom Logo Image URL
   * You can place your custom logo file inside the `/public` folder
   * (for example `/logo.png`, `/logo.svg`, or `/logo.jpg`)
   * or provide a remote image URL.
   * If left as '' or if the image fails to load, it automatically falls back to the built-in precision vector logo.
   */
  logoImageUrl: string;

  /** Helpline & Admissions Phone */
  phone: string;
  phoneDisplay: string;
  /** WhatsApp Hotline */
  whatsappNumber: string;
  /** Email addresses */
  admissionsEmail: string;
  ttxEmail: string;
  infoEmail: string;
  supportEmail: string;
  contactEmail: string;
  /** Campus address */
  campusAddress: string;
  campusCity: string;
  /** Website domain */
  websiteUrl: string;
}

export const COMPANY_CONFIG: CompanyConfig = {
  brandName: 'TechTrainX',
  legalName: 'TechTrainX — A Unit of Xnava Enterprise',
  parentCompanyName: 'Xnava Enterprise',
  parentCompanyUrl: 'https://xnava.in',
  parentCompanyDomain: 'xnava.in',
  tagline: 'A unit of Xnava Enterprises.',
  copyright: '© 2026-27 TechTrainX — A Unit of Xnava Enterprises. All rights reserved.',
  
  /** 
   * FAVICON & LOGO CONFIGURATION:
   * 1. Favicon: Put your icon in `/public/favicon.svg` or `/public/favicon.png` and set here.
   * 2. Logo: Put your logo in `/public/logo.png` or `/public/logo.svg` and set here.
   */
  faviconUrl: '/favicon.svg',
  logoImageUrl: '/logo.svg',

  phone: '+918545092070',
  phoneDisplay: '+91 8545092070',
  whatsappNumber: '+918545092070',

  admissionsEmail: 'admission@xnava.in',
  ttxEmail: 'info@xnava.in',
  infoEmail: 'info@xnava.in',
  supportEmail: 'info@xnava.in',
  contactEmail: 'info@xnava.in',

  campusAddress: 'Malhour Near, Amity University Rd, Malhour, Lucknow, Nijampur Malhaur, Uttar Pradesh 226028',
  campusCity: 'Lucknow',
  websiteUrl: 'https://techtrainx.online'
};

export default COMPANY_CONFIG;

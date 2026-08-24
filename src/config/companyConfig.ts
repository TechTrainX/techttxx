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
  /** Custom logo image URL (set to empty string '' or a direct URL if using a custom PNG/SVG logo) */
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
  legalName: 'TechTrainX (A Unit of xnava enterprises)',
  parentCompanyName: 'xnava enterprises',
  parentCompanyUrl: 'https://www.xnava.in',
  parentCompanyDomain: 'xnava.in',
  tagline: 'PLACEMENT & INDUSTRIAL INTERNSHIP FOUNDRY',
  copyright: '© 2026 TechTrainX (A Unit of xnava enterprises). All rights reserved.',
  
  // Custom company logo (leave '' to use vector logo)
  logoImageUrl: '',

  phone: '+918545092070',
  phoneDisplay: '+91 8545092070',
  whatsappNumber: '+918545092070',

  admissionsEmail: 'admission@xnava.in',
  ttxEmail: 'ttx@xnava.in',
  infoEmail: 'info@xnava.in',
  supportEmail: 'ttx@xnava.in',
  contactEmail: 'info@xnava.in',

  campusAddress: 'TechTrainX Innovation Campus & Deep-Tech Labs, Cyber Hub Complex, India',
  campusCity: 'National Tech Campus & Live Hybrid Labs',
  websiteUrl: 'https://techtrainx.online'
};

export default COMPANY_CONFIG;

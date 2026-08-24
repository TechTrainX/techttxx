import { SiteConfig } from '../types';
import { COMPANY_CONFIG } from '../config/companyConfig';

export const SITE_CONFIG: SiteConfig = {
  brandName: COMPANY_CONFIG.brandName,
  parentCompany: COMPANY_CONFIG.legalName,
  tagline: 'Where Engineers Ship Real Software & Secure High-Impact Placements',
  contact: {
    primaryPhone: COMPANY_CONFIG.phoneDisplay,
    secondaryPhone: '+91 8545092070',
    whatsappNumber: COMPANY_CONFIG.whatsappNumber,
    primaryEmail: COMPANY_CONFIG.admissionsEmail,
    supportEmail: COMPANY_CONFIG.supportEmail,
    address: COMPANY_CONFIG.campusAddress,
    workingHours: 'Mon–Sat: 9:00 AM – 8:00 PM IST',
    googleMapEmbedUrl: 'https://www.google.com/maps?q=techtrainx&z=14&t=m&hl=en&output=embed'
  },
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/techtrainx',
    github: 'https://github.com/TechTrainX',
    instagram: 'https://www.linkedin.com/company/techtrainx',
    youtube: 'https://www.youtube.com/@techtrainx'
  },
  announcement: {
    badge: 'PLACEMENT COHORTS OPEN',
    text: 'Summer 2026 Industrial Training & Placement Batches open — 5 hrs/day hands-on engineering, 1-on-1 mentorship & placement drives.',
    ctaText: 'Explore Batches',
    link: '#batches'
  },
  hero: {
    badge: 'DEEP-TECH INDUSTRIAL TRAINING & PLACEMENT ACADEMY',
    headline: 'Build Production Code. Master Tech Stacks.',
    highlightedText: 'Crack Top Tier-1 Tech Placements',
    subheadline: 'An advanced engineering training foundry built around one core mission: you learn to code by shipping real, scalable software and graduate directly into high-paying engineering roles with top tech recruiters.',
    stats: [
      { label: 'Highest Package', value: '₹18.5 LPA' },
      { label: 'Average Package', value: '₹7.8 LPA' },
      { label: 'Hiring Partners', value: '120+' },
      { label: 'Daily Coding Practice', value: '5 Hrs/Day' }
    ]
  },
  keyFeatures: [
    {
      title: 'Real Production Code, Not Slide Lectures',
      description: 'Every sprint culminates in live, deployable microservices, web apps, or AI pipelines running on cloud infrastructure.',
      icon: 'Terminal'
    },
    {
      title: 'Digital Cryptographic Verification',
      description: 'Every certificate carries a tamper-proof unique registration ID recognized by top employers and engineering universities worldwide.',
      icon: 'Award'
    },
    {
      title: 'Taught by Senior Tech Architects',
      description: 'Mentors build and architect enterprise-scale distributed systems — you master real-world production engineering practices.',
      icon: 'Code2'
    },
    {
      title: 'Guaranteed Placement Assistance & Referrals',
      description: 'Rigorous DSA mock interviews, resume refinement sessions, system design sprints, and direct recruiter referral pipelines.',
      icon: 'TrendingUp'
    }
  ],
  faq: [
    {
      question: 'How many hours a day is the industrial training & internship?',
      answer: 'Tracks run 5 hours a day, structured into live architectural breakdowns, pair-programming sprints, and intensive hands-on lab implementation where you ship working software modules daily.'
    },
    {
      question: 'Will my university accept TechTrainX training for mandatory industrial/academic credits?',
      answer: 'Yes. TechTrainX certificates and internship letters are university-approved and recognized across premier engineering institutions (AKTU, BTEUP, IET, NITs, Central Universities) with verifiable digital credentials and comprehensive project documentation.'
    },
    {
      question: 'Can I join in Online or Live Hybrid mode if I cannot attend the physical campus?',
      answer: 'Yes. All tracks are available in Interactive Live Hybrid mode with real-time screen shares, 1-on-1 code reviews, cloud lab environments, and recordings accessible 24/7.'
    },
    {
      question: 'How do employers verify a candidate\'s TechTrainX credentials?',
      answer: 'Employers can instantly verify credentials by entering the unique Certificate ID directly on our real-time Verification Portal (techtrainx.online) or by contacting admission@xnava.in.'
    }
  ]
};

export default SITE_CONFIG;

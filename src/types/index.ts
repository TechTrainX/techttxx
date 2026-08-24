/**
 * TechTrainX - Enterprise Data Models
 * Company: TechTrainX (A Unit of xnava enterprises)
 * Domain: techtrainx.online | Parent: xnava.in
 * Mail: ttx@xnava.in | admission@xnava.in | info@xnava.in
 */

export type CourseCategory = 
  | 'Web Development' 
  | 'Programming & Backend' 
  | 'Mobile & Cross Platform' 
  | 'AI & Data Science' 
  | 'DevOps & Cyber Security' 
  | 'CAD & Engineering Design';

export type ProgramType = 
  | 'Summer Training' 
  | 'Industrial Training' 
  | 'Apprenticeship (6 Months)' 
  | 'Syllabus Training' 
  | 'Vocational Training' 
  | 'Corporate Training'
  | 'Summer Industrial Internship'
  | '6-Month Placement Apprenticeship'
  | 'University Industrial Training'
  | 'DSA & Core Engineering Track'
  | 'Institutional & Tech Bootcamps'
  | string;

export interface SyllabusModule {
  weekOrDay: string;
  title: string;
  topics: string[];
  handsOnProject?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentsEnrolled: number;
  bannerImage: string;
  technologies: string[];
  keyHighlights: string[];
  prerequisites: string[];
  syllabus: SyllabusModule[];
  careerRoles: string[];
  isFeatured?: boolean;
}

export interface TrainingProgram {
  id: string;
  slug: string;
  title: ProgramType | string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  targetAudience: string[];
  keyBenefits: string[];
  includedCourses: string[];
  badgeText: string;
  iconName: string;
}

export interface BatchSchedule {
  id: string;
  courseTitle: string;
  programType: string;
  startDate: string;
  timing: string;
  mode: 'Offline (Center)' | 'Online Live' | 'Hybrid';
  totalSeats: number;
  seatsFilled: number;
  instructorName: string;
  instructorExp: string;
  status: 'Filling Fast' | 'Almost Full' | 'Seats Available';
}

export interface CertificateData {
  certificateId: string;
  studentName: string;
  courseName: string;
  programType: string;
  issueDate: string;
  expiryDate?: string;
  grade: string;
  verificationCode: string;
  isVerified: boolean;
  issuedBy: string;
  skillsCertified: string[];
}

export interface PlacementRecord {
  id: string;
  studentName: string;
  avatarUrl: string;
  companyName: string;
  companyLogo: string;
  role: string;
  packageLPA: string;
  courseTaken: string;
  collegeName: string;
  testimonialSnippet: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus & Labs' | 'Hackathons' | 'Certifications' | 'Industrial Visits' | 'Placement Celebrations';
  imageUrl: string;
  date: string;
  description: string;
}

export interface ServiceQuoteRequest {
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  projectType: 'Web Application' | 'Mobile App (iOS/Android)' | 'Enterprise ERP/CRM' | 'AI Integration' | 'Cloud Infrastructure';
  budgetRange: string;
  projectDetails: string;
}

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
  whatsappPhone: string;
  collegeName: string;
  branchYear: string;
  selectedCourseOrProgram: string;
  trainingMode: 'Offline (Tech Foundry Campus)' | 'Online Live Interactive' | string;
  preferredTiming: 'Morning (9 AM - 2 PM)' | 'Evening (2 PM - 7 PM)' | 'Weekend Special';
  queryOrNotes?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  purpose: 'Course Admission' | 'Software Service Inquiry' | 'Corporate Training' | 'College Partnership / MoU';
}

export type HardwareProjectCategory = 
  | 'Robotics & RC Vehicles' 
  | 'Arduino Uno Projects' 
  | 'IoT & Home Automation' 
  | 'Smart Agriculture & Environment' 
  | 'Drones & Aeromodelling' 
  | 'Healthcare & Security Systems';

export interface PinoutItem {
  pin: string;
  componentPin: string;
  description: string;
}

// export interface HardwareProject {
//   id: string;
//   slug: string;
//   title: string;
//   category: HardwareProjectCategory;
//   microcontroller: 'Arduino Uno R3/R4' | 'ESP32 IoT' | 'NodeMCU ESP8266' | 'Raspberry Pi Pico' | 'Multi-Controller';
//   level: 'Beginner' | 'Intermediate' | 'Advanced';
//   tagline: string;
//   shortDescription: string;
//   fullDescription: string;
//   imageUrl: string;
//   circuitDiagramUrl?: string;
//   circuitSummary?: string;
//   embeddedConcepts?: string[];
//   pinoutTable?: PinoutItem[];
//   badge?: string;
//   targetBranch: string[];
//   hardwareComponents: string[];
//   deliverablesIncluded: string[];
//   features: string[];
//   assistanceOverview: string;
//   pricingNote: string;
// }

// types.ts (add this interface)
export interface HardwareProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  imageUrl: string;
  circuitDiagramUrl?: string;
  circuitSummary?: string;
  pinoutTable?: { pin: string; componentPin: string; description: string }[];
  microcontroller: string;
  badge?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  hardwareComponents: string[];
  embeddedConcepts?: string[];
  targetBranch: string[];
  deliverablesIncluded: string[];
  assistanceOverview: string;
}

export interface HardwareProjectInquiry {
  fullName: string;
  email: string;
  phone: string;
  whatsappPhone?: string;
  collegeName: string;
  branchYear: string;
  selectedProjectTitle: string;
  kitCustomizationNeeds?: string;
  deliveryCity: string;
  preferredAssistanceMode: 'Online 1-on-1 Mentorship' | 'Offline Center Lab Assistance' | 'Complete Tested & Pre-Assembled Model';
}

export interface SiteConfig {
  brandName: string;
  parentCompany: string;
  tagline: string;
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    whatsappNumber: string;
    primaryEmail: string;
    supportEmail: string;
    address: string;
    workingHours: string;
    googleMapEmbedUrl: string;
  };
  socialLinks: {
    linkedin: string;
    github: string;
    instagram: string;
    youtube: string;
  };
  announcement: {
    badge: string;
    text: string;
    ctaText: string;
    link: string;
  };
  hero: {
    badge: string;
    headline: string;
    highlightedText: string;
    subheadline: string;
    stats: Array<{ label: string; value: string }>;
  };
  keyFeatures: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}



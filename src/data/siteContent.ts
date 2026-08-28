import { SiteConfig } from '../types';
import { COMPANY_CONFIG } from '../config/companyConfig.js';

export const SITE_CONFIG: SiteConfig = {
  brandName: COMPANY_CONFIG.brandName,
  parentCompany: COMPANY_CONFIG.legalName,
  tagline: 'Practical Software Training for Career-Focused Students',
  contact: {
    primaryPhone: COMPANY_CONFIG.phoneDisplay,
    secondaryPhone: '+91 8545092070',
    whatsappNumber: COMPANY_CONFIG.whatsappNumber,
    primaryEmail: COMPANY_CONFIG.admissionsEmail,
    supportEmail: COMPANY_CONFIG.supportEmail,
    address: COMPANY_CONFIG.campusAddress,
    workingHours: 'Mon–Sat: 9:00 AM – 8:00 PM IST',
    googleMapEmbedUrl: 'https://www.google.com/maps?q=techtrainX&amp;z=14&amp;t=m&amp;hl=en&amp;output=embed'
  },
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/techtrainx',
    github: 'https://github.com/TechTrainX',
    instagram: '',
    youtube: ''
  },
  announcement: {
    badge: 'NEW OFFLINE BATCHES OPEN',
    text: '2026–27 industrial training and placement-oriented batches are now open for enquiry.',
    ctaText: 'Explore Batches',
    link: '#batches'
  },
  hero: {
    badge: 'OFFLINE SOFTWARE TRAINING IN LUCKNOW',
    headline: 'Learn Practical Development Skills.',
    highlightedText: 'Prepare for Your First Tech Role.',
    subheadline: 'TechTrainX helps B.Tech, M.Tech, BCA, MCA, and Diploma Computer Science students build coding fundamentals, practical projects, interview confidence, and job-ready portfolios through structured offline training near Amity University Lucknow.',
    stats: [
      { label: 'Recent Learners Placed', value: '2–3' },
      { label: 'Batch Size', value: 'Up to 30' },
      { label: 'Free Demo', value: '1 Week' },
      { label: 'Learning Mode', value: 'Offline' }
    ]
  },
  keyFeatures: [
    {
      title: 'Practical Coding, Not Only Lectures',
      description: 'Learn through guided coding practice, assignments, code reviews, and projects that help you understand how software is built and delivered.',
      icon: 'Terminal'
    },
    {
      title: 'Projects You Can Explain in Interviews',
      description: 'Build portfolio projects such as full-stack web applications, AI/ML projects, and other software modules with clear documentation and deployment guidance.',
      icon: 'Code2'
    },
    {
      title: 'Mentorship in an Offline Classroom',
      description: 'Get regular support from trainers, ask questions face to face, and learn with other serious, career-focused students from Lucknow and nearby areas.',
      icon: 'Users'
    },
    {
      title: 'Placement Preparation and Career Support',
      description: 'Prepare with DSA practice, technical interview sessions, resume guidance, communication practice, and mock interviews. Placement support is provided according to each learner’s preparation and eligibility.',
      icon: 'TrendingUp'
    }
  ],
  faq: [
    {
      question: 'How many hours a day is the industrial training and internship?',
      answer: 'The daily schedule depends on the selected track and batch timetable. During the enquiry, our team will share the exact class hours, practice schedule, project work, and attendance expectations for your course.'
    },
    {
      question: 'Can this training be used for mandatory industrial or academic credit?',
      answer: 'We provide course or internship documentation wherever applicable. Acceptance of certificates, letters, or project reports depends on your college or university, so students should confirm the required format with their department before enrolling.'
    },
    {
      question: 'Can I join if I cannot attend every day?',
      answer: 'Our main offering is structured offline training at the Lucknow centre. Please contact the admissions team for the current batch timetable, attendance requirements, and any available support for students with a genuine scheduling constraint.'
    },
    {
      question: 'How do employers verify a candidate’s TechTrainX credentials?',
      answer: 'Students can share their certificate or internship details with an employer. Verification is handled through the contact details and process provided with the issued document. Please use the official contact information shown on this website rather than relying on an unverified third-party link.'
    }
  ]
};

export default SITE_CONFIG;
import { PlacementRecord } from '../types';

export interface ExtendedPlacementRecord {
  id: string;
  name: string;
  photoUrl: string;
  company: string;
  companyLogo?: string;
  role: string;
  packageLPA: string;
  courseTaken: string;
  collegeName: string;
  quote: string;
  batchYear: string;
}

export const PLACEMENTS_LIST: ExtendedPlacementRecord[] = [
  {
    id: 'pl-1',
    name: 'Aman Srivastava',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    company: 'Amazon Web Services',
    role: 'Cloud Support Associate / SDE',
    packageLPA: '18.5',
    courseTaken: 'Full Stack MERN & Cloud Systems',
    collegeName: 'National Institute of Technology (NIT)',
    quote: 'The 5-hour daily hands-on sprints at TechTrainX gave me the exact distributed architecture confidence needed to clear AWS multi-tier interview rounds.',
    batchYear: '2025'
  },
  {
    id: 'pl-2',
    name: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    company: 'Microsoft IDC',
    role: 'Software Engineer (Full Stack)',
    packageLPA: '14.2',
    courseTaken: 'Java Spring Boot & Microservices',
    collegeName: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    quote: 'Rather than theoretical slide decks, we deployed real REST microservices with Docker and Redis. The mentors conducted targeted mock interviews that changed my career.',
    batchYear: '2025'
  },
  {
    id: 'pl-3',
    name: 'Rohan Verma',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    company: 'Oracle Financial Services',
    role: 'Application Developer Trainee',
    packageLPA: '12.0',
    courseTaken: 'Python Full Stack & Django 5',
    collegeName: 'Institute of Engineering & Technology (IET)',
    quote: 'The real-world database tuning and async query optimizations taught in the Python track helped me crack the Oracle technical coding test on my first attempt.',
    batchYear: '2025'
  },
  {
    id: 'pl-4',
    name: 'Sneha Patel',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    company: 'Razorpay',
    role: 'Frontend Software Engineer',
    packageLPA: '11.5',
    courseTaken: 'Modern React, TypeScript & Next.js',
    collegeName: 'SRM Institute of Science & Technology',
    quote: 'Building production-grade fintech checkout flows and handling complex global state with Redux Toolkit was the highlight of my TechTrainX training.',
    batchYear: '2025'
  },
  {
    id: 'pl-5',
    name: 'Kartik Mishra',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    company: 'TCS Digital',
    role: 'Systems Engineer (Digital Cadre)',
    packageLPA: '9.0',
    courseTaken: 'Full Stack MERN & DSA Sprints',
    collegeName: 'Babu Banarasi Das University (BBDU)',
    quote: 'The daily DSA whiteboard sessions and project architecture defense gave me the edge to upgrade from Ninja to the prestigious TCS Digital cadre.',
    batchYear: '2025'
  },
  {
    id: 'pl-6',
    name: 'Ananya Gupta',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    company: 'Zomato Engineering',
    role: 'Mobile Software Engineer',
    packageLPA: '10.8',
    courseTaken: 'Flutter & Dart Cross-Platform Engineering',
    collegeName: 'Amity University',
    quote: 'We published real cross-platform mobile apps with live backend integrations. TechTrainX mock tests prepared me for fast-paced startup technical rounds.',
    batchYear: '2025'
  },
  {
    id: 'pl-7',
    name: 'Vikas Pandey',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    company: 'Infosys Specialist Programmer',
    role: 'Specialist Programmer (Power Programmer)',
    packageLPA: '9.5',
    courseTaken: 'Java Spring Boot & Competitive DSA',
    collegeName: 'Kamla Nehru Institute of Technology (KNIT)',
    quote: 'Hands down the most rigorous practical coding institute. Mentors genuinely inspect your Git commits and teach you clean architectural design patterns.',
    batchYear: '2025'
  },
  {
    id: 'pl-8',
    name: 'Divya Nair',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    company: 'Capgemini Invent',
    role: 'Analyst Software Engineer',
    packageLPA: '7.5',
    courseTaken: 'AI, Machine Learning & Python Analytics',
    collegeName: 'Shri Ramswaroop Memorial University (SRMU)',
    quote: 'My minor and major projects were completely built and demonstrated at TechTrainX. I defended my university viva with top marks and received 2 corporate offers.',
    batchYear: '2025'
  },
  {
    id: 'pl-9',
    name: 'Aditya Raj',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    company: 'Cognizant GenC Next',
    role: 'Full Stack Java Engineer',
    packageLPA: '8.2',
    courseTaken: 'Java Enterprise & Spring Data JPA',
    collegeName: 'Integral University',
    quote: 'The digital verified certificate and project code repository on GitHub helped me bypass initial screenings and jump straight into technical rounds.',
    batchYear: '2025'
  }
];

export const PLACEMENTS_DATA: PlacementRecord[] = PLACEMENTS_LIST.map((p) => ({
  id: p.id,
  studentName: p.name,
  avatarUrl: p.photoUrl,
  companyName: p.company,
  companyLogo: p.companyLogo || '',
  role: p.role,
  packageLPA: `${p.packageLPA} LPA`,
  courseTaken: p.courseTaken,
  collegeName: p.collegeName,
  testimonialSnippet: p.quote
}));

export const RECRUITER_PARTNERS: string[] = [
  'Amazon',
  'Microsoft',
  'Oracle',
  'TCS Digital',
  'Infosys',
  'Razorpay',
  'Zomato',
  'Capgemini',
  'Cognizant',
  'Wipro Turbo',
  'HCL Tech',
  'LTIMindtree'
];

export default PLACEMENTS_DATA;

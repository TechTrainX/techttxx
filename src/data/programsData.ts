import { TrainingProgram } from '../types';

/**
 * ==============================================================================
 * TECHTRAINX — TRAINING & PLACEMENT INTERNSHIP PROGRAMS
 * ==============================================================================
 */
export const TRAINING_PROGRAMS_DATA: TrainingProgram[] = [
  {
    id: 'prog-summer',
    slug: 'summer-training-program',
    title: 'Summer Industrial Internship',
    subtitle: '4–6 Week Intensive Production Program for B.Tech / BCA / MCA / Diploma Students',
    description: 'Built for fast-track career momentum: daily 5-hour hands-on sprints with tech leads, two deployable production projects, and verified credentials recognized across global IT employers.',
    duration: '45 Days (5 Hrs Daily Hands-on)',
    price: '₹5,999 – ₹6,999',
    targetAudience: ['B.Tech (CS/IT/ECE/EE/ME)', 'BCA & MCA Students', 'Polytechnic Diploma Students'],
    keyBenefits: [
      'Verifiable digital credential with unique cryptographically signed ID',
      'Production-grade GitHub repo and deployed live URL for portfolio',
      '5 hours daily intensive hands-on lab sprints, campus or live hybrid',
      'DSA sprint, resume roast & direct recruiter placement referrals'
    ],
    includedCourses: ['MERN Stack', 'Python with Django', 'Java Spring Boot', 'Flutter', 'AI & Data Science', '.NET Core'],
    badgeText: 'Most Popular Placement Track',
    iconName: 'Sun'
  },
  {
    id: 'prog-apprenticeship',
    slug: '6-month-apprenticeship-program',
    title: '6-Month Placement Apprenticeship',
    subtitle: 'For Final-Year Students & Recent Graduates Aiming for Product Companies',
    description: 'An advanced, real-world industry track: work directly with senior software architects on live production engineering pipelines, ship scalable microservices, and secure placement letters with tier-1 hiring networks.',
    duration: '6 Months (Full-Time Immersive)',
    price: '₹19,999',
    targetAudience: ['B.Tech / MCA Final Years', 'Recent Graduates Seeking High-Package Roles'],
    keyBenefits: [
      'Formal experience letter & software engineer apprenticeship credential',
      '1-on-1 mentorship from senior tech architects & FAANG mentors',
      'Live contribution to high-throughput production cloud applications',
      '100% placement drive access with 120+ partnered tech recruiters'
    ],
    includedCourses: ['Full Stack Web Development', 'DevOps & Docker Deployment', 'Distributed System Design', 'Agile/Jira Sprint Workflow'],
    badgeText: 'Highest Placement Conversion',
    iconName: 'Briefcase'
  },
  {
    id: 'prog-industrial',
    slug: 'industrial-training-program',
    title: 'University Industrial Training',
    subtitle: '6–8 Week Project & Placement Foundation Track for Academic Mandates',
    description: 'Designed to excel in university industrial training requirements while building competitive interview-ready engineering competencies.',
    duration: '6–8 Weeks',
    price: '₹5,999',
    targetAudience: ['3rd/4th Year Engineering Students', 'University Mandated Internship Students'],
    keyBenefits: [
      'Comprehensive project synopsis, thesis report, and viva defense mentorship',
      'Technical interview & coding round mock assessments',
      'Digitally authenticated certificate accepted across all universities',
      'Clean architecture GitHub portfolio you can explain with confidence'
    ],
    includedCourses: ['MERN Stack', 'Python Full Stack', 'Java Spring Boot', 'AI/ML Fundamentals'],
    badgeText: 'University & Viva Ready',
    iconName: 'Building2'
  },
  {
    id: 'prog-syllabus',
    slug: 'syllabus-training-program',
    title: 'DSA & Core Engineering Track',
    subtitle: '30-Day Intensive Coding Foundation for Technical Placement Rounds',
    description: 'For students who want rock-solid algorithmic foundations in C++, Java, Data Structures, and problem-solving to ace technical screening rounds.',
    duration: '30 Days',
    price: '₹3,999',
    targetAudience: ['1st, 2nd & 3rd Year CS/IT Students', 'Competitive Programming Aspirants'],
    keyBenefits: [
      'LeetCode & CodeChef style curated problem sets',
      'Time/space complexity analysis & whiteboard problem solving',
      'Live code review and algorithmic optimization drills',
      'Certificate of Algorithmic Mastery'
    ],
    includedCourses: ['Data Structures & Algorithms', 'C++ & STL', 'Core Java', 'System Fundamentals'],
    badgeText: 'Coding Round Focus',
    iconName: 'BookOpen'
  },
  {
    id: 'prog-corporate',
    slug: 'corporate-training-program',
    title: 'Institutional & Tech Bootcamps',
    subtitle: 'Customized High-Velocity Workshops for Engineering Colleges & Tech Teams',
    description: 'Targeted upskilling bootcamps and faculty development programs tailored to cloud computing, modern full-stack development, and artificial intelligence.',
    duration: 'Custom Scoped (1–4 Weeks)',
    price: 'Custom Institutional Quote',
    targetAudience: ['Engineering Institutions', 'Tech Startups', 'Corporate Engineering Teams'],
    keyBenefits: [
      'Curated curriculum aligned with enterprise technology stacks',
      'On-campus lab deployment or live cloud sandbox environments',
      'Rigorous project evaluations and benchmark skill reporting',
      'Official TechTrainX Institutional Partnership'
    ],
    includedCourses: ['Cloud Native & Kubernetes', 'Applied GenAI & LLMs', 'Microservices Architecture', 'TypeScript & React'],
    badgeText: 'For Colleges & Teams',
    iconName: 'Building'
  }
];

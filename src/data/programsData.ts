import { TrainingProgram } from '../types';

/**
 * TechTrainX — Training and Placement-Oriented Programs
 * Practical program descriptions for students and institutional partners.
 * Verify prices, schedules, delivery mode, and documentation before publishing.
 */
export const TRAINING_PROGRAMS_DATA: TrainingProgram[] = [
  {
    id: 'prog-summer',
    slug: 'summer-training-program',
    title: 'Summer Industrial Internship',
    subtitle: '45 Days of Guided Project Work for B.Tech, BCA, MCA, and Diploma Students',
    description: 'A structured practical program with guided sessions, coding practice, project work, and interview preparation. Students work toward portfolio projects they can understand and explain, rather than relying only on a certificate.',
    duration: '45 Days',
    price: '₹5,999 – ₹6,999',
    targetAudience: ['B.Tech CS/IT and related branches', 'BCA and MCA Students', 'Polytechnic Diploma Students'],
    keyBenefits: [
      'Certificate issued according to course completion requirements',
      'Guided project work with documentation and deployment support',
      'Hands-on lab practice according to the batch timetable',
      'DSA practice and resume guidance for early career preparation'
    ],
    includedCourses: ['MERN Stack', 'Python with Django', 'Java Spring Boot', 'Flutter', 'AI and Data Science', '.NET Core'],
    badgeText: 'Popular Summer Batch',
    iconName: 'Sun'
  },
  {
    id: 'prog-winter',
    slug: 'winter-training-program',
    title: 'Winter Industrial Training',
    subtitle: 'Short-Term Practical Training for B.Tech, BCA, MCA, and Diploma Students',
    description: 'Use the winter break to strengthen your coding basics, complete a guided project, and prepare for upcoming technical interviews. The program combines classroom learning, hands-on practice, project guidance, and career preparation in a structured schedule.',
    duration: '4–6 Weeks',
    price: 'Contact for Current Batch Fee',
    targetAudience: ['B.Tech and BCA Students', 'MCA and Diploma CS Students', 'Students Using the Winter Break for Skill Building'],
    keyBenefits: [
      'Offline classroom learning with guided coding practice',
      'One practical project with documentation and presentation support',
      'Revision of programming, SQL, Git, and interview fundamentals',
      'Resume guidance, mock interview practice, and career counselling'
    ],
    includedCourses: ['Programming and DSA Basics', 'Full-Stack Web Development', 'Python Development', 'Java Development', 'AI and Data Fundamentals'],
    badgeText: 'Winter Break Skill Program',
    iconName: 'Snowflake'
  },
  {
    id: 'prog-apprenticeship',
    slug: '6-month-apprenticeship-program',
    title: '6-Month Placement Apprenticeship',
    subtitle: 'A Longer Learning Track for Final-Year Students and Recent Graduates',
    description: 'A six-month, structured learning track for students who want consistent practice in software development, teamwork, project delivery, and interview preparation. The exact schedule, project scope, and documentation are shared before enrolment.',
    duration: '6 Months',
    price: '₹19,999',
    targetAudience: ['B.Tech and MCA Final-Year Students', 'Recent Graduates Building Software Skills'],
    keyBenefits: [
      'Course or apprenticeship documentation according to the selected track',
      'Mentor support for projects, coding practice, and technical questions',
      'Practice with cloud, APIs, version control, and software workflows',
      'Mock interviews, resume guidance, and placement preparation support'
    ],
    includedCourses: ['Full-Stack Web Development', 'DevOps and Docker Basics', 'System Design Fundamentals', 'Agile and Jira Workflow'],
    badgeText: 'For Consistent Learners',
    iconName: 'Briefcase'
  },
  {
    id: 'prog-industrial',
    slug: 'industrial-training-program',
    title: 'University Industrial Training',
    subtitle: 'Project-Based Training for Students Completing an Internship Requirement',
    description: 'Build a guided project, prepare a synopsis and report, and practise explaining your work for the viva. Students should confirm certificate and report requirements with their college or university before enrolment.',
    duration: '6–8 Weeks',
    price: '₹5,999',
    targetAudience: ['Third- and Fourth-Year Engineering Students', 'Students with a University Internship Requirement'],
    keyBenefits: [
      'Guidance for project synopsis, report structure, and viva preparation',
      'Basic technical interview and coding-round practice',
      'Course documentation provided according to the selected program',
      'A clear project repository that the student can explain confidently'
    ],
    includedCourses: ['MERN Stack', 'Python Full Stack', 'Java Spring Boot', 'AI and ML Fundamentals'],
    badgeText: 'For Academic Internship Work',
    iconName: 'Building2'
  },
  {
    id: 'prog-syllabus',
    slug: 'syllabus-training-program',
    title: 'DSA and Core Engineering Track',
    subtitle: '30 Days of Problem-Solving Practice for Technical Screening Preparation',
    description: 'Learn programming logic, data structures, algorithms, and complexity through step-by-step explanations and regular coding practice in C++ and Java.',
    duration: '30 Days',
    price: '₹3,999',
    targetAudience: ['First-, Second-, and Third-Year CS/IT Students', 'Students Preparing for Coding Assessments'],
    keyBenefits: [
      'Guided problem sets covering common coding patterns',
      'Time and space complexity explained with practical examples',
      'Live code review and feedback on approach and optimisation',
      'A completion certificate subject to the program requirements'
    ],
    includedCourses: ['Data Structures and Algorithms', 'C++ and STL', 'Core Java', 'Computer Science Fundamentals'],
    badgeText: 'For Coding-Round Preparation',
    iconName: 'BookOpen'
  },
  {
    id: 'prog-corporate',
    slug: 'corporate-training-program',
    title: 'Institutional and Tech Bootcamps',
    subtitle: 'Custom Workshops for Engineering Colleges and Technology Teams',
    description: 'A custom training option for colleges and teams that need a workshop around a specific learner group, technology stack, or project objective. Scope, delivery mode, duration, and evaluation method are agreed before the program begins.',
    duration: 'Custom Scope: 1–4 Weeks',
    price: 'Custom Institutional Quote',
    targetAudience: ['Engineering Institutions', 'Technology Startups', 'Corporate Engineering Teams'],
    keyBenefits: [
      'Curriculum aligned with the agreed learning objectives',
      'On-campus sessions or a live online lab setup, as applicable',
      'Project evaluation and a documented learning summary',
      'A formal institutional engagement with defined deliverables'
    ],
    includedCourses: ['Cloud and Kubernetes Basics', 'Applied Generative AI', 'Microservices Fundamentals', 'TypeScript and React'],
    badgeText: 'For Colleges and Teams',
    iconName: 'Building'
  }
];

export default TRAINING_PROGRAMS_DATA;
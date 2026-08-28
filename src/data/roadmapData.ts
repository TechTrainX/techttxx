import { FrontierTechRoadmapTrack } from '../types';

/**
 * TechTrainX — Career Roadmaps
 * Practical learning tracks for CS-family students in Lucknow.
 * Package figures and placement outcomes are intentionally not published here
 * unless supported by dated, verifiable records.
 */
export const FRONTIER_TECH_ROADMAPS_DATA: FrontierTechRoadmapTrack[] = [
  {
    id: 'dsa_oops_foundations',
    title: 'DSA, OOPs & Programming Foundations',
    badge: 'MOST REQUESTED',
    iconName: 'binary',
    punchline: 'Build a strong foundation in C++, Java, and Python with problem-solving practice, OOPs concepts, and interview-focused coding. Best fit: B.Tech CSE, MCA, BCA, M.Tech CSE, and Diploma CSE students.',
    estimatedDuration: '12 Weeks Hands-On',
    isPopular: true,
    coreKeywords: [
      'C++ / Java / Python',
      'DSA: Arrays to Graphs',
      'OOPs Concepts',
      'Time and Space Complexity',
      'Problem-Solving Practice',
      'Interview Problem Patterns'
    ],
    skills: [
      {
        title: 'Programming Fundamentals',
        tags: ['C++ STL / Java Collections', 'Python Basics', 'OOPs: Inheritance, Polymorphism, Encapsulation']
      },
      {
        title: 'Core DSA',
        tags: ['Arrays, Strings, and Recursion', 'Trees and Graphs', 'Sorting and Searching Patterns']
      },
      {
        title: 'Interview Preparation',
        tags: ['Guided Coding Problems', 'Time and Space Complexity Analysis', 'Mock Coding Rounds']
      }
    ],
    capstone: 'Library or Inventory Management System in C++ or Java using OOPs and DSA concepts'
  },
  {
    id: 'software_dev_engineering',
    title: 'Software Development & Engineering',
    badge: 'FULL-STACK PATH',
    iconName: 'binary',
    punchline: 'Learn the fundamentals of frontend, backend, APIs, databases, and deployment while building projects for your portfolio. Best fit: B.Tech CSE, MCA, BCA, M.Tech CSE, and Diploma CSE students.',
    estimatedDuration: '12 Weeks Hands-On',
    isPopular: true,
    coreKeywords: [
      'React + Node.js',
      'Java Spring Boot',
      'REST APIs',
      'PostgreSQL and Database Design',
      'Flutter / Android Basics',
      'Docker and CI/CD Basics'
    ],
    skills: [
      {
        title: 'Frontend Development',
        tags: ['React Hooks and Context', 'Responsive Layouts', 'State Management Basics']
      },
      {
        title: 'Backend and APIs',
        tags: ['Spring Boot / Express REST Services', 'SQL Schema and ORM Basics', 'Authentication and Access Control']
      },
      {
        title: 'Mobile Fundamentals',
        tags: ['Flutter Cross-Platform Basics', 'REST API Consumption', 'Firebase Authentication and Firestore Basics']
      },
      {
        title: 'System Design and Deployment',
        tags: ['HLD and LLD Fundamentals', 'Docker Basics', 'GitHub Actions Fundamentals']
      }
    ],
    capstone: 'Full-stack web application with dashboard, API integration, documentation, and deployment guidance'
  },
  {
    id: 'data_analytics_applied_ai',
    title: 'Data, Analytics & Applied AI',
    badge: 'DATA & AI PATH',
    iconName: 'brain',
    punchline: 'Learn SQL, Python-based data analysis, dashboards, and responsible AI application development through practical exercises. Best fit: BCA, MCA, B.Tech CSE, M.Tech CSE, and Diploma CSE students.',
    estimatedDuration: '10 Weeks Hands-On',
    isPopular: true,
    coreKeywords: [
      'SQL',
      'Python with Pandas and NumPy',
      'Power BI / Tableau Basics',
      'LLM API Integration',
      'RAG Fundamentals',
      'Prompt Design'
    ],
    skills: [
      {
        title: 'SQL and Data Modeling',
        tags: ['Window Functions and CTEs', 'Relational Data Modeling', 'Query Performance Basics']
      },
      {
        title: 'Python Analytics and BI',
        tags: ['Pandas Data Wrangling', 'Basic Statistical Reasoning', 'Power BI DAX Fundamentals']
      },
      {
        title: 'Applied AI Development',
        tags: ['LLM API Integration', 'Vector Search Concepts', 'LangChain Fundamentals']
      }
    ],
    capstone: 'Sales analytics dashboard with data insights and an optional question-and-answer assistant'
  },
  {
    id: 'cloud_devops_quality_eng',
    title: 'Cloud, DevOps & Quality Engineering',
    badge: 'CLOUD & AUTOMATION PATH',
    iconName: 'bot',
    punchline: 'Understand cloud services, containers, CI/CD, Linux, networking, and software testing through guided labs. Best fit: B.Tech CSE, M.Tech CSE, MCA, BCA, and Diploma CSE students.',
    estimatedDuration: '10 Weeks Hands-On',
    coreKeywords: [
      'AWS EC2 / S3 / IAM Basics',
      'Docker and Kubernetes Fundamentals',
      'CI/CD with GitHub Actions or Jenkins',
      'Selenium / Playwright Basics',
      'API Testing',
      'Linux and Networking Basics'
    ],
    skills: [
      {
        title: 'Cloud and Containers',
        tags: ['AWS Core Services', 'Docker Images and Containers', 'Kubernetes Concepts']
      },
      {
        title: 'CI/CD and Infrastructure Basics',
        tags: ['GitHub Actions Pipelines', 'Infrastructure-as-Code Concepts', 'Monitoring and Alerting Basics']
      },
      {
        title: 'Test Automation and QA',
        tags: ['Playwright or Selenium Basics', 'Postman API Test Suites', 'CI-Triggered Test Reports']
      },
      {
        title: 'Networking and Linux',
        tags: ['OSI and TCP/IP Basics', 'Linux Users and Permissions', 'DNS, DHCP, and Firewall Basics']
      }
    ],
    capstone: 'CI/CD workflow with automated tests deploying a containerised application to a cloud environment'
  }
];

export default FRONTIER_TECH_ROADMAPS_DATA;



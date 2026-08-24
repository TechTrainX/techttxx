import { Course } from '../types';

/**
 * ==============================================================================
 * TECHTRAINX — COURSES CATALOG
 * ==============================================================================
 */
export const COURSES_DATA: Course[] = [
  {
    id: 'course-mern',
    slug: 'mern-stack-development',
    title: 'MERN Full Stack Development',
    category: 'Web Development',
    shortDescription: 'MongoDB, Express, React, and Node — build and deploy a working full-stack app from scratch.',
    fullDescription: 'A hands-on track for anyone who wants to build with the JavaScript stack: a React front end talking to a real Node/Express API, backed by MongoDB, with auth, deployment, and the production details most courses skip.',
    duration: '6 Weeks (5 Days/Week, 4–5 Hrs Daily)',
    level: 'Intermediate',
    price: 6499,
    originalPrice: 10999,
    rating: 4.7,
    reviewCount: 96,
    studentsEnrolled: 380,
    bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'JWT Auth', 'Redux Toolkit'],
    keyHighlights: [
      'Two full projects built and deployed, not just demoed',
      'Daily Git commits — you leave with a real, readable GitHub history',
      'Auth, validation, and error handling done the way production code does it',
      'Resume + mock interview support at the end of the track'
    ],
    prerequisites: ['Basic computer literacy', 'HTML/CSS basics helpful but taught from the ground up'],
    syllabus: [
      { weekOrDay: 'Week 1', title: 'HTML, CSS & Layout Fundamentals', topics: ['Semantic HTML', 'Flexbox & Grid', 'Responsive layout basics', 'CSS organization for larger projects'], handsOnProject: 'Static Landing Page Rebuild' },
      { weekOrDay: 'Week 2', title: 'Modern JavaScript & the DOM', topics: ['ES6+ syntax', 'Promises & async/await', 'Fetch API', 'DOM events without a framework'], handsOnProject: 'Interactive To-Do Dashboard' },
      { weekOrDay: 'Week 3', title: 'React Fundamentals', topics: ['Components & props', 'useState / useEffect', 'Custom hooks', 'React Router'], handsOnProject: 'Multi-Page Task Manager' },
      { weekOrDay: 'Week 4', title: 'Node & Express APIs', topics: ['Express routing & middleware', 'REST conventions', 'JWT-based auth', 'Password hashing with bcrypt'], handsOnProject: 'User Auth Microservice' },
      { weekOrDay: 'Week 5', title: 'MongoDB & Mongoose', topics: ['Schema design', 'CRUD operations', 'Population & relationships', 'Basic aggregation'], handsOnProject: 'Inventory API with Real Data' },
      { weekOrDay: 'Week 6', title: 'Integration & Deployment', topics: ['Connecting React to your API', 'Environment configs', 'Deploying to Vercel + a cloud DB', 'Basic rate limiting & security hygiene'], handsOnProject: 'Deployed E-Commerce Storefront' }
    ],
    careerRoles: ['Full Stack Developer', 'Frontend (React) Developer', 'Backend (Node) Developer'],
    isFeatured: true
  },
  {
    id: 'course-python-django',
    slug: 'python-django-fullstack',
    title: 'Python Full Stack with Django',
    category: 'Programming & Backend',
    shortDescription: 'Python from first principles through Django, PostgreSQL, and a working REST API you build yourself.',
    fullDescription: 'Starts from zero — no prior coding assumed — and takes you through Python fundamentals, object-oriented design, Django\'s MVT pattern, and a real REST API backed by PostgreSQL.',
    duration: '6 Weeks (5 Days/Week, 4–5 Hrs Daily)',
    level: 'Beginner',
    price: 5999,
    originalPrice: 9999,
    rating: 4.7,
    reviewCount: 88,
    studentsEnrolled: 310,
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
    technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'HTML/CSS', 'Git'],
    keyHighlights: [
      'No prior coding experience required',
      'One CMS-style app and one REST API, both deployed',
      'JWT-authenticated API with Swagger docs you write yourself',
      'Deployment on a real Linux server, not just localhost'
    ],
    prerequisites: ['None — taught from scratch'],
    syllabus: [
      { weekOrDay: 'Week 1', title: 'Python Fundamentals', topics: ['Data types & control flow', 'Functions & modules', 'File & exception handling', 'List comprehensions'], handsOnProject: 'Command-Line Expense Tracker' },
      { weekOrDay: 'Week 2', title: 'Object-Oriented Python', topics: ['Classes & inheritance', 'Encapsulation', 'Decorators', 'Basic data structures in Python'], handsOnProject: 'Simple Bank Account Simulator' },
      { weekOrDay: 'Week 3', title: 'Django Basics', topics: ['MVT architecture', 'URLs & views', 'Templates & static files', 'Admin panel'], handsOnProject: 'Mini Blog / CMS' },
      { weekOrDay: 'Week 4', title: 'Models, PostgreSQL & Forms', topics: ['Model relationships', 'QuerySets', 'PostgreSQL setup', 'ModelForms'], handsOnProject: 'Student Records Portal' },
      { weekOrDay: 'Week 5', title: 'Django REST Framework', topics: ['Serializers', 'ViewSets & routers', 'JWT auth', 'API documentation'], handsOnProject: 'REST API for the Records Portal' },
      { weekOrDay: 'Week 6', title: 'Deployment & Wrap-Up', topics: ['Gunicorn + Nginx basics', 'Environment variables & secrets', 'Basic CI with GitHub Actions'], handsOnProject: 'Deployed Job-Listing Application' }
    ],
    careerRoles: ['Python Developer', 'Django Backend Developer', 'API Developer'],
    isFeatured: true
  },
  {
    id: 'course-java-fullstack',
    slug: 'java-spring-boot-fullstack',
    title: 'Java Backend with Spring Boot',
    category: 'Programming & Backend',
    shortDescription: 'Core Java, Spring Boot, and Spring Security — built around one solid capstone service.',
    fullDescription: 'Focused on the Java stack most enterprise teams run: core language fundamentals, Spring Boot REST services, JPA/Hibernate, and Spring Security with JWT, capped by one capstone service built end to end.',
    duration: '6 Weeks (5 Days/Week)',
    level: 'Intermediate',
    price: 6499,
    originalPrice: 10999,
    rating: 4.6,
    reviewCount: 74,
    studentsEnrolled: 260,
    bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=85',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'Spring Security', 'PostgreSQL', 'Maven'],
    keyHighlights: [
      'Core Java and collections covered properly before Spring is introduced',
      'One capstone service, built incrementally, not disconnected demos',
      'JWT auth and role-based access done hands-on',
      'Basic Docker packaging for your finished service'
    ],
    prerequisites: ['Comfort with basic programming logic'],
    syllabus: [
      { weekOrDay: 'Week 1', title: 'Core Java & OOP', topics: ['Classes & interfaces', 'Collections framework', 'Streams API basics', 'Exception handling'], handsOnProject: 'Console-Based Library System' },
      { weekOrDay: 'Week 2', title: 'Database Access with JPA', topics: ['Relational schema design', 'Hibernate entity mapping', 'Spring Data repositories', 'JPQL basics'], handsOnProject: 'Data Layer for a Library API' },
      { weekOrDay: 'Week 3', title: 'Spring Boot REST Services', topics: ['Dependency injection', 'REST controllers & DTOs', 'Validation', 'Exception handling patterns'], handsOnProject: 'Book Inventory REST Service' },
      { weekOrDay: 'Week 4', title: 'Spring Security & JWT', topics: ['Security filter chain', 'UserDetailsService', 'JWT issuing & validation', 'Role-based access'], handsOnProject: 'Secure Login for the Inventory Service' },
      { weekOrDay: 'Weeks 5–6', title: 'Capstone & Packaging', topics: ['Pulling the pieces together', 'Basic Docker packaging', 'Deployment walkthrough'], handsOnProject: 'Deployed Library Management Service' }
    ],
    careerRoles: ['Java Backend Developer', 'Spring Boot Developer', 'Software Engineer'],
    isFeatured: true
  },
  {
    id: 'course-ai-ml',
    slug: 'ai-machine-learning-data-science',
    title: 'AI, Machine Learning & Data Analytics',
    category: 'AI & Data Science',
    shortDescription: 'Python for data work, core ML algorithms, and one deployed AI-powered mini-app by the end.',
    fullDescription: 'Covers the practical path from data analysis to machine learning to a small deployed AI application — grounded in the math you need, not more, not less.',
    duration: '6 Weeks',
    level: 'Advanced',
    price: 6999,
    originalPrice: 11999,
    rating: 4.75,
    reviewCount: 61,
    studentsEnrolled: 205,
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    technologies: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'TensorFlow', 'OpenCV', 'Basic NLP'],
    keyHighlights: [
      'Statistics and data cleaning covered before any modeling',
      'Classical ML and a first neural network, from scratch and via libraries',
      'One end-to-end AI mini-app, deployed with Streamlit or Flask',
      'Focus on explaining what your model does, for interviews'
    ],
    prerequisites: ['Basic Python', 'Comfortable with high-school-level math'],
    syllabus: [
      { weekOrDay: 'Week 1', title: 'Python for Data Analysis', topics: ['NumPy & Pandas', 'Data cleaning', 'Visualization with Matplotlib/Seaborn', 'Basic statistics'], handsOnProject: 'Sales Data Analysis Report' },
      { weekOrDay: 'Weeks 2–3', title: 'Machine Learning Foundations', topics: ['Linear & logistic regression', 'Decision trees & random forests', 'Clustering basics', 'Model evaluation metrics'], handsOnProject: 'Customer Churn Predictor' },
      { weekOrDay: 'Week 4', title: 'Neural Networks', topics: ['Perceptrons & backpropagation', 'Building a network in TensorFlow/Keras', 'Basic tuning'], handsOnProject: 'Simple Image Classifier' },
      { weekOrDay: 'Weeks 5–6', title: 'Applied AI & Deployment', topics: ['Basic NLP (tokenization, TF-IDF)', 'Using pretrained models sensibly', 'Deploying a small model as a web app'], handsOnProject: 'Deployed AI Mini-App' }
    ],
    careerRoles: ['ML Engineer (Junior)', 'Data Analyst', 'AI Application Developer'],
    isFeatured: true
  },
  {
    id: 'course-flutter-android',
    slug: 'flutter-android-app-development',
    title: 'Mobile App Development with Flutter',
    category: 'Mobile & Cross Platform',
    shortDescription: 'One codebase, two platforms — build and ship a real Flutter app backed by Firebase.',
    fullDescription: 'Covers Dart, Flutter\'s widget system, state management, and a Firebase-backed app you build feature by feature, ending with a Play Store-ready build.',
    duration: '6 Weeks',
    level: 'Intermediate',
    price: 5999,
    originalPrice: 9999,
    rating: 4.6,
    reviewCount: 47,
    studentsEnrolled: 165,
    bannerImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=85',
    technologies: ['Dart', 'Flutter', 'Firebase', 'Provider', 'REST APIs'],
    keyHighlights: [
      'Single codebase, Android & iOS both covered conceptually',
      'Firebase auth, Firestore, and push notifications, hands-on',
      'State management done properly, not just setState everywhere',
      'Walkthrough of the Play Store submission process'
    ],
    prerequisites: ['Basic OOP concepts'],
    syllabus: [
      { weekOrDay: 'Week 1', title: 'Dart & Flutter Basics', topics: ['Dart syntax & null safety', 'Flutter widget tree', 'Hot reload workflow'], handsOnProject: 'Simple Calculator App' },
      { weekOrDay: 'Week 2', title: 'Layouts & UI', topics: ['Stateless vs. stateful widgets', 'Common layout widgets', 'Theming'], handsOnProject: 'Shopping UI Clone' },
      { weekOrDay: 'Week 3', title: 'State Management', topics: ['App state vs. local state', 'Provider pattern', 'Local storage basics'], handsOnProject: 'Cart & Wishlist Feature' },
      { weekOrDay: 'Weeks 4–6', title: 'Firebase & Shipping', topics: ['Firebase auth', 'Firestore', 'REST API integration', 'Push notifications', 'Play Store packaging'], handsOnProject: 'Deployed Task/Delivery Tracking App' }
    ],
    careerRoles: ['Flutter Developer', 'Mobile App Developer'],
    isFeatured: false
  },
  {
    id: 'course-dotnet-core',
    slug: 'dotnet-core-mvc-web-api',
    title: '.NET Core & C# Web API',
    category: 'Programming & Backend',
    shortDescription: 'C#, ASP.NET Core, and Entity Framework — built for students aiming at corporate/enterprise dev roles.',
    fullDescription: 'A focused track on the Microsoft stack: C# fundamentals, ASP.NET Core MVC, Entity Framework Core, and a REST API secured with JWT.',
    duration: '6 Weeks',
    level: 'Intermediate',
    price: 5999,
    originalPrice: 9999,
    rating: 4.55,
    reviewCount: 39,
    studentsEnrolled: 120,
    bannerImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=85',
    technologies: ['C#', '.NET Core', 'ASP.NET Core MVC', 'EF Core', 'SQL Server', 'Web API'],
    keyHighlights: [
      'C# fundamentals for students coming from C/C++/Java',
      'MVC and Web API both covered, not just one',
      'EF Core migrations done hands-on against a real SQL Server DB',
      'JWT-secured API by the end of the track'
    ],
    prerequisites: ['Basic programming in any C-family language'],
    syllabus: [
      { weekOrDay: 'Weeks 1–2', title: 'C# & .NET Fundamentals', topics: ['C# syntax & generics', 'LINQ', 'Async/await', 'OOP in C#'], handsOnProject: 'Payroll Calculator Console App' },
      { weekOrDay: 'Weeks 3–4', title: 'ASP.NET Core MVC & EF Core', topics: ['MVC routing', 'EF Core code-first', 'SQL Server integration', 'Dependency injection'], handsOnProject: 'Simple Hospital Records Portal' },
      { weekOrDay: 'Weeks 5–6', title: 'Web API & Security', topics: ['Building REST controllers', 'JWT auth', 'Swagger docs', 'Basic cloud/IIS deployment'], handsOnProject: 'Deployed Records API' }
    ],
    careerRoles: ['.NET Developer', 'C# Backend Developer'],
    isFeatured: false
  }
];
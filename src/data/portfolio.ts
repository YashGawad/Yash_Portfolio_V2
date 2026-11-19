export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  category: 'Client Work' | 'AI & Cloud' | 'Full-Stack Platform'
  status?: string
  isInProgress?: boolean
  description: string
  fullOverview: string
  technologies: string[]
  highlights: string[]
  liveUrl: string
  githubUrl?: string
  image: string
  architecture: {
    frontend: string
    backend: string
    database: string
    cloudOrAi?: string
    flow: string[]
  }
  workflows?: {
    title: string
    description: string
  }[]
}

export interface Capability {
  id: string
  number: string
  title: string
  description: string
  details: string[]
  iconName: string
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  aggregate?: string
  description: string
}

export interface CertificationItem {
  title: string
  issuer: string
  year?: string
  skillsCovered: string[]
}

export interface SkillCategory {
  category: string
  description: string
  skills: { name: string; tag: string }[]
}

export const PORTFOLIO_DATA = {
  identity: {
    name: 'Yash Gawad',
    title: 'Software Developer',
    specialization: 'Full-Stack Development',
    supportingAreas: [
      'Web Application Development',
      'Backend & REST API Development',
      'Database Management',
      'AI Integration & Automation',
    ],
    headline: 'I build digital products that solve real problems.',
    introduction:
      "I'm Yash, a Software Developer focused on building full-stack web applications, backend APIs and database-driven systems. I enjoy solving practical problems through modern technologies and exploring AI-powered applications, generative AI and automation.",
    aboutBio:
      "I'm a Computer Engineering student and Software Developer interested in building practical software products. I enjoy working across frontend interfaces, backend development, database systems and AI integrations. I focus on continuously improving my engineering skills by building real applications.",
    email: 'gawadyash32@gmail.com',
    emailSendHref: 'mailto:gawadyash32@gmail.com?subject=Portfolio%20Enquiry%20-%20Yash%20Gawad',
    gmailComposeHref:
      'https://mail.google.com/mail/?view=cm&fs=1&to=gawadyash32@gmail.com&su=Portfolio%20Enquiry%20-%20Yash%20Gawad',
    phone: '+91 93222 68479',
    phoneHref: 'tel:+919322268479',
    github: 'https://github.com/YashGawad',
    linkedin: 'https://www.linkedin.com/in/yash-gawad',
    status: 'Available for software development opportunities',
    resumePdf: 'Yash_Gawad_Resume.pdf',
    profileImage: 'images/yash-gawad.jpg',
  },

  projects: [
    {
      id: 'smart-electricals',
      number: '01',
      title: 'Smart Electricals',
      subtitle: 'B2B Heater Manufacturing & Commerce Platform',
      category: 'Client Work',
      status: 'Real Client Project',
      isInProgress: true,
      description:
        'Developing a B2B heater manufacturing website with a customer-facing storefront and an administration panel.',
      fullOverview:
        'Developing a dedicated B2B website for an industrial heating equipment client, incorporating a customer-facing storefront and an administrative management panel. The system automates quotes, specifications, order workflows, and manufacturing lead times.',
      technologies: [
        'React.js',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'REST APIs',
        'Vercel',
        'Render',
      ],
      highlights: [
        'Customer accounts & industrial product catalogue',
        'Backend REST APIs with PostgreSQL integration for product and order management',
        'Order confirmation and manufacturing lead-time workflows',
        'Admin-managed expected dispatch dates and customer credit-policy rules',
        'AI-powered chatbot currently in development to assist customers with product enquiries',
        'Customer-facing frontend deployed on Vercel; backend services & database on Render',
      ],
      liveUrl: 'https://smart-electrical-heater.vercel.app/',
      image: 'images/smart-electricals.webp',
      architecture: {
        frontend: 'Customer & Admin React Web Application (Vercel)',
        backend: 'Node.js & Express RESTful API Services (Render)',
        database: 'PostgreSQL Relational Storage (Render Cloud)',
        cloudOrAi: 'AI Assistant Service (In Active Development)',
        flow: [
          'Customer Storefront / Admin Console (React)',
          'Secure REST Endpoints & Authentication Middleware (Express)',
          'Relational Schema & Transactional Ledger (PostgreSQL)',
        ],
      },
      workflows: [
        {
          title: 'Customer Commercial Flow',
          description:
            'Authenticated corporate buyers explore heating element specifications, configure power ratings, review customized pricing schedules, submit orders, and track real-time dispatch dates.',
        },
        {
          title: 'Admin Manufacturing Control',
          description:
            'Factory administrators adjust inventory quotas, evaluate pending industrial orders, manage production lead times, and update delivery schedules based on factory capacity.',
        },
      ],
    },
    {
      id: 'food-nutrition-estimator',
      number: '02',
      title: 'AI-Based Food Nutrition Estimator',
      subtitle: 'Cloud Deep Learning Dietary Analysis Pipeline',
      category: 'AI & Cloud',
      status: 'Independent Project Development',
      isInProgress: false,
      description:
        'Developed a cloud-based full-stack application that analyzes uploaded food images using a CNN/transfer-learning deep learning model to estimate calories and nutritional information.',
      fullOverview:
        'An end-to-end cloud-based dietary intelligence platform. Built RESTful APIs connecting the React.js frontend with a Python/TensorFlow deep learning microservice, persisting application data in MySQL, and hosting scalable services across AWS infrastructure.',
      technologies: [
        'React.js',
        'Python',
        'TensorFlow',
        'MySQL',
        'AWS EC2',
        'AWS RDS',
        'AWS S3',
        'AWS IAM',
        'Docker',
        'REST APIs',
      ],
      highlights: [
        'React.js frontend with drag-and-drop food image upload',
        'RESTful APIs bridging the client with a Python/TensorFlow deep learning microservice',
        'CNN/transfer-learning model for accurate dietary image classification',
        'Application and nutritional data managed through structured MySQL',
        'AWS cloud deployment: React on Vercel, backend/AI on EC2, MySQL on RDS, images in S3',
        'Dockerized AI inference container configured with AWS IAM-based access controls',
      ],
      liveUrl: 'https://food-nutrition-estimator-three.vercel.app/',
      githubUrl: 'https://github.com/YashGawad/food-nutrition-estimator',
      image: 'images/food-nutrition.webp',
      architecture: {
        frontend: 'Interactive React SPA (Vercel)',
        backend: 'Python REST API & Inference Microservice',
        database: 'MySQL Relational Database (AWS RDS)',
        cloudOrAi: 'TensorFlow CNN Model, AWS S3, EC2 & Docker',
        flow: [
          'Client UI Upload (React / Vercel)',
          'Image Ingestion & Storage (AWS S3 via IAM)',
          'Inference Pipeline (TensorFlow Deep Learning in Docker on EC2)',
          'Nutritional Lookup & Persistence (MySQL on AWS RDS)',
        ],
      },
      workflows: [
        {
          title: 'Multimodal Image Analysis',
          description:
            'The client uploads meal photography directly to AWS S3. The Python inference pipeline processes the image through a trained CNN to classify dish contents.',
        },
        {
          title: 'Macronutrient Estimation',
          description:
            'Predicted categories query calibrated nutritional lookup tables in MySQL to calculate total calories, protein, carbohydrates, and fats.',
        },
      ],
    },
    {
      id: 'localcommerce',
      number: '03',
      title: 'LocalCommerce – Multi-Tenant Local Commerce Platform',
      subtitle: 'Multi-Tenant Local Trade & Delivery Ecosystem',
      category: 'Full-Stack Platform',
      status: 'Independent Project Development',
      isInProgress: false,
      description:
        'A multi-tenant local-commerce platform with independent experiences for customers, businesses, delivery personnel and administrators.',
      fullOverview:
        'A scalable multi-tenant platform designed for independent local businesses. Provisions dedicated experiences for Customer, Business, Delivery Partner, and Platform Admin, with store-scoped inventory, localized pricing, pickup/delivery workflows, and JWT authentication.',
      technologies: [
        'React.js',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'REST APIs',
        'JWT Auth',
        'Vercel',
        'Render',
      ],
      highlights: [
        'Separate Customer, Business, Delivery, and Admin experiences for local commerce',
        'Store-scoped management for products, inventory, orders, staff, fulfillment, and reviews',
        'Global product and store-specific listing model enabling localized discovery with isolated pricing',
        'Node.js/Express REST API with PostgreSQL and JWT authentication for catalog and order management',
        'Flexible order fulfillment supporting both in-store pickup and local delivery',
        'Frontend deployed on Vercel with backend services and PostgreSQL database on Render',
      ],
      liveUrl: 'https://localcommerce-pearl.vercel.app/',
      githubUrl: 'https://github.com/YashGawad/localcommerce',
      image: 'images/localcommerce.webp',
      architecture: {
        frontend: 'Multi-Role React Web Application (Vercel)',
        backend: 'Express.js Multi-Tenant REST API (Render)',
        database: 'PostgreSQL with Tenant-Scoped Schemas',
        cloudOrAi: 'JWT Security & Delivery Dispatch Workflow',
        flow: [
          'Role-Segmented Client Portals (React)',
          'Token Verification & Tenant Isolation Gateway (Express)',
          'Store-Scoped Inventory & Order Tables (PostgreSQL)',
        ],
      },
      workflows: [
        {
          title: 'Multi-Tenant Store Isolation',
          description:
            'Every store operates with isolated catalog records, localized delivery radiuses, and bespoke inventory counts while sharing an optimized backend schema.',
        },
        {
          title: 'End-to-End Fulfillment Lifecycle',
          description:
            'Customer places order -> Merchant approves and packs -> Delivery driver receives pickup notification -> Status updates live until final handover.',
        },
      ],
    },
  ] as Project[],

  capabilities: [
    {
      id: 'fullstack-web',
      number: '01',
      title: 'Full-Stack Web Development',
      description:
        'Responsive web applications using React and modern JavaScript with component-driven architecture.',
      details: [
        'Component architecture with React and modern JavaScript',
        'Responsive layout engineering and state handling with Redux',
        'Performance optimization and modern accessibility standards',
        'Clean client-server contracts and error boundaries',
      ],
      iconName: 'Layout',
    },
    {
      id: 'backend-apis',
      number: '02',
      title: 'Backend & REST API Development',
      description:
        'Backend application development, API design and server-side workflows using Node.js and Express.',
      details: [
        'API design and request routing with Node.js and Express',
        'JWT authentication, authorization, and route security',
        'Input validation, error middleware, and logging',
        'Service-to-service communication and RESTful design',
      ],
      iconName: 'Server',
    },
    {
      id: 'database-design',
      number: '03',
      title: 'Database Design & Management',
      description:
        'Structured data, PostgreSQL, MySQL and database-driven application architectures.',
      details: [
        'Relational modeling in PostgreSQL and MySQL',
        'Schema normalization, indexing, and foreign keys',
        'Multi-tenant data isolation and role access controls',
        'Query design, data integrity, and transactional reliability',
      ],
      iconName: 'Database',
    },
    {
      id: 'ai-automation',
      number: '04',
      title: 'AI Integration & Automation',
      description:
        'AI-powered application integrations, Python, TensorFlow and exploration of generative AI.',
      details: [
        'Computer vision inference workflows using Python & TensorFlow',
        'Cloud-hosted containerized AI services with Docker',
        'RESTful AI endpoint orchestration',
        'Exploration of generative AI, prompt integration, and automated pipelines',
      ],
      iconName: 'Cpu',
    },
  ] as Capability[],

  techArsenal: [
    {
      category: 'Frontend',
      description: 'Building performant, dynamic interfaces with modern web standards',
      skills: [
        { name: 'React.js', tag: 'Core UI' },
        { name: 'JavaScript', tag: 'Language' },
        { name: 'Redux', tag: 'State' },
        { name: 'HTML', tag: 'Structure' },
        { name: 'CSS', tag: 'Styling' },
      ],
    },
    {
      category: 'Backend',
      description: 'Server architectures and dependable REST API endpoints',
      skills: [
        { name: 'Node.js', tag: 'Runtime' },
        { name: 'Express.js', tag: 'Framework' },
        { name: 'REST API Development', tag: 'Architecture' },
      ],
    },
    {
      category: 'Programming Languages',
      description: 'Core languages across systems, object-oriented, and script development',
      skills: [
        { name: 'JavaScript', tag: 'Full-Stack' },
        { name: 'Python', tag: 'AI & Data' },
        { name: 'Java', tag: 'OOP' },
        { name: 'C', tag: 'Systems' },
        { name: 'C++', tag: 'Algorithms' },
        { name: 'SQL', tag: 'Querying' },
      ],
    },
    {
      category: 'Databases',
      description: 'Relational data modeling, querying and schema management',
      skills: [
        { name: 'PostgreSQL', tag: 'Relational' },
        { name: 'MySQL', tag: 'Relational' },
      ],
    },
    {
      category: 'Cloud & Deployment',
      description: 'Containerization, cloud infrastructure and CI/CD pipelines',
      skills: [
        { name: 'AWS EC2', tag: 'Compute' },
        { name: 'AWS RDS', tag: 'Database' },
        { name: 'AWS S3', tag: 'Storage' },
        { name: 'AWS IAM', tag: 'Security' },
        { name: 'Docker', tag: 'Containers' },
        { name: 'Vercel', tag: 'Deployment' },
        { name: 'Render', tag: 'Backend Host' },
        { name: 'Git & GitHub', tag: 'Version Control' },
      ],
    },
    {
      category: 'Tools',
      description: 'Developer utilities for debugging, coding and workflows',
      skills: [
        { name: 'Postman', tag: 'API Testing' },
        { name: 'VS Code', tag: 'Editor' },
        { name: 'Claude Code', tag: 'Workflow' },
        { name: 'Google Antigravity', tag: 'Agentic Tooling' },
      ],
    },
  ] as SkillCategory[],

  marqueeSkills: [
    'React',
    'JavaScript',
    'Redux',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MySQL',
    'Python',
    'Java',
    'AWS',
    'Docker',
    'Vercel',
    'GitHub',
  ],

  education: [
    {
      degree: 'B.E. in Computer Engineering',
      institution: 'St. John Institute of Technology and Management',
      period: '2024 – 2027',
      description:
        'Pursuing Bachelor of Engineering with focus on advanced computing, software engineering systems, relational database architecture, algorithms, and distributed computing.',
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'Pravin Patil Polytechnic College',
      period: '2021 – 2024',
      aggregate: '83.09%',
      description:
        'Graduated with distinction (83.09% aggregate), building core proficiencies in object-oriented programming, systems development, computer networks, and full-stack software practices.',
    },
  ] as EducationItem[],

  certifications: [
    {
      title: 'React.js & Redux',
      issuer: 'Knowledge Gate',
      skillsCovered: [
        'React Component Lifecycle',
        'State Management with Redux',
        'Hooks & Performance Optimization',
        'Single Page Applications',
      ],
    },
    {
      title: 'Certification in SQL and .NET',
      issuer: 'KantaScript | St. John College of Engineering',
      skillsCovered: [
        'Relational Database Queries',
        'Schema Normalization',
        '.NET Application Architecture',
        'Backend Data Integration',
      ],
    },
    {
      title: 'AR/VR Development',
      issuer: 'IOFT',
      skillsCovered: [
        'Immersive Technologies',
        'Spatial Computing Concepts',
        'Interactive 3D Environments',
      ],
    },
  ] as CertificationItem[],
}

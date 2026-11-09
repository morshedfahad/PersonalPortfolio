export const profile = {
  name: "Fahad Morshed",
  roles: ["Software Engineer", "AI Researcher", "Oracle APEX Developer", "DevOps Engineer"],
  tagline:
    "I build AI products that reach production — and enterprise systems that stay there. 5+ years across machine learning, full-stack development, Oracle APEX, and PL/SQL.",
  summary:
    "My work spans the full spectrum: an LLM-powered learning platform live at campus365.app, a Springer-published engagement-detection system, and Oracle applications serving 5+ enterprise clients with zero data loss. I represented Bangladesh in a European Commission Erasmus+ research project, and I ship everything myself — Docker, Kubernetes, CI/CD — certified by Oracle Cloud and Red Hat.",
  location: "Dhaka, Bangladesh",
  email: "morshedfahad@yahoo.com",
  phone: "+880 1829-626805",
  website: "https://fahadmorshed.com",
  github: "https://github.com/morshedfahad",
  linkedin: "https://linkedin.com/in/morshedfahad",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 5, suffix: "+", label: "Enterprise Clients Served" },
  { value: 6, suffix: "", label: "Major Projects Shipped" },
  { value: 1, suffix: "", label: "Springer Publication" },
];

export interface Experience {
  role: string;
  type?: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    role: "Technology Consultant",
    type: "Part-time",
    company: "Skoder Technologies",
    location: "Dhaka, Bangladesh",
    period: "Mar 2023 — Present",
    current: true,
    highlights: [
      "Conceived and led the technology strategy for two AI-powered EdTech products, driving them from ideation to deployment.",
      "Built CampusMate — an LLM-powered academic assistant that evolved into the full Campus365 platform.",
      "Developed LEMate, a multimodal learner-engagement detection prototype, resulting in a peer-reviewed Springer publication (TCCE 2023).",
    ],
  },
  {
    role: "Assistant Programmer",
    company: "Beximco Computers Limited",
    location: "Dhaka, Bangladesh",
    period: "Sep 2020 — Present",
    current: true,
    highlights: [
      "Developed and maintained enterprise applications for 5+ clients using Oracle APEX, JavaScript, and PL/SQL within a collaborative engineering team.",
      "Owned the account-management module covering customer accounts, balance operations, and full transaction history.",
      "Administered server infrastructure including hardware configuration, software setup, and continuous system monitoring.",
      "Managed database backup and point-in-time recovery pipelines, maintaining zero data loss and high availability.",
      "Integrated RESTful web services between application modules using ORDS and Oracle APIs.",
    ],
  },
];

export interface Project {
  title: string;
  badge?: string;
  description: string;
  tech: string[];
  period: string;
  link?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    title: "Campus365 — Personalized Learning Platform",
    badge: "Flagship",
    description:
      "Full-scale evolution of CampusMate — an AI-powered learning platform for assessments, tailored course recommendations, and self-paced mastery. Architected the complete stack with containerised deployment, automated CI/CD pipelines, and cloud infrastructure management.",
    tech: ["LLM", "LangChain", "Ollama", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "CI/CD"],
    period: "Feb 2025 — Present",
    link: "https://campus365.app",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    title: "LEMate — Learner Engagement Detection",
    badge: "Published",
    description:
      "Research prototype detecting student engagement in real time from multimodal inputs — mouse, keyboard, facial expression, eye gaze, and heart rate. Built for low-resource classrooms and published in Springer LNNS, Vol. 1208.",
    tech: ["AI/ML", "Computer Vision", "Multimodal", "Python"],
    period: "Mar 2023 — Present",
    accent: "from-violet-400 to-purple-500",
  },
  {
    title: "CampusMate — AI Academic Assistant",
    badge: "Evolved into Campus365",
    description:
      "Early-stage AI chat assistant for university students in Bangladesh — the prototype that laid the foundation for Campus365. Delivered contextual academic guidance and curriculum support using LangChain and Ollama.",
    tech: ["LLM", "LangChain", "Ollama", "Python"],
    period: "May 2024 — Feb 2025",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    title: "Team 360 — HR Management System",
    badge: "Live in Production",
    description:
      "Full-featured web-based HRM platform covering the employee lifecycle, attendance tracking, leave management, and organizational reporting. Conceived, built, and currently live in production.",
    tech: ["Oracle APEX", "PL/SQL", "JavaScript", "HTML/CSS"],
    period: "Feb 2025 — Present",
    accent: "from-amber-400 to-orange-500",
  },
  {
    title: "e-KYC — Digital Onboarding System",
    description:
      "Mobile-integrated digital KYC solution for banks and NBFIs, enabling paperless client onboarding connected to an Oracle Database.",
    tech: ["Android", "Oracle APEX", "PL/SQL"],
    period: "Oct 2021 — Nov 2023",
    accent: "from-rose-400 to-pink-500",
  },
  {
    title: "Transport Management System",
    description:
      "Centralized web-based transport solution with Oracle database integration and REST API endpoints, deployable across organization types.",
    tech: ["Oracle 12c", "APEX", "PL/SQL", "JavaScript", "ORDS"],
    period: "2021 — 2022",
    accent: "from-sky-400 to-indigo-500",
  },
];

export const publication = {
  title:
    "LEMate: An Early Prototype of an AI-Powered Learner Engagement Detection System for Low-Resource Classrooms",
  authors: "Morshed, F. et al.",
  venue: "Springer LNNS, Vol. 1208 · TCCE 2023",
  date: "Jun 2025",
  citations: 1,
  doi: "10.1007/978-981-96-0185-1_35",
  doiUrl: "https://doi.org/10.1007/978-981-96-0185-1_35",
};

export const researchInterests = [
  "Multimodal Learning Analytics",
  "Affective Computing",
  "LLMs in Education",
  "Computer Vision",
  "Low-Resource AI Systems",
];

export const engagement = {
  title: "DIVERSASIA Project",
  badge: "Erasmus+ · EU Funded",
  org: "Nottingham Trent University, UK",
  date: "May 2023",
  points: [
    "Invited as the Bangladeshi delegate to a European Commission Erasmus+ funded research project on inclusive AI education across Asia.",
    "Presented research on AI-powered learner engagement detection.",
    "Collaborated with academics from the UK, Bulgaria, Belgium, Latvia, Turkey, Serbia, India and Bangladesh.",
  ],
};

export const skillGroups = [
  { label: "Languages", skills: ["Python", "TypeScript", "PL/SQL", "JavaScript"] },
  { label: "Backend & API", skills: ["FastAPI", "ORDS", "REST", "SOAP", "HTTP/2", "Android"] },
  { label: "Databases", skills: ["Oracle", "PostgreSQL", "MySQL", "SQLite", "Oracle APEX"] },
  { label: "AI / ML", skills: ["LangChain", "Ollama", "Deep Learning", "Predictive ML", "Data Modeling"] },
  { label: "DevOps", skills: ["Docker", "Kubernetes", "CI/CD", "Git", "Linux"] },
];

export const education = {
  degree: "B.Sc. Information & Communication Engineering",
  school: "Bangladesh University of Professionals",
  period: "2016 — 2020",
};

export const certifications = [
  "Oracle APEX Cloud Developer Certified Professional",
  "Oracle Cloud Infrastructure 2023 DevOps Professional",
  "Oracle Cloud Infrastructure 2023 Foundations Associate",
  "Red Hat Certified Engineer (RHCE)",
  "Red Hat Certified System Administrator (RHCSA)",
  "Red Hat Certified Specialist in Virtualization",
];

export interface JourneyStep {
  year: string;
  title: string;
  org: string;
  detail: string;
}

export const journey: JourneyStep[] = [
  {
    year: "2016",
    title: "Started B.Sc. in ICE",
    org: "Bangladesh University of Professionals",
    detail: "Information & Communication Engineering — graduated in 2020.",
  },
  {
    year: "2020",
    title: "Assistant Programmer",
    org: "Beximco Computers Limited",
    detail: "Enterprise Oracle APEX & PL/SQL applications for 5+ clients.",
  },
  {
    year: "2021",
    title: "Shipped e-KYC & Transport Systems",
    org: "Banks, NBFIs & enterprises",
    detail: "Paperless digital onboarding and a centralized transport platform.",
  },
  {
    year: "2023",
    title: "Technology Consultant",
    org: "Skoder Technologies",
    detail: "Leading AI EdTech strategy — began LEMate engagement-detection research.",
  },
  {
    year: "2023",
    title: "EU Erasmus+ Delegate",
    org: "Nottingham Trent University, UK",
    detail: "Bangladeshi delegate at DIVERSASIA — inclusive AI education across Asia.",
  },
  {
    year: "2024",
    title: "Built CampusMate",
    org: "AI Academic Assistant",
    detail: "LLM-powered academic guidance with LangChain & Ollama.",
  },
  {
    year: "2025",
    title: "Campus365 & Team 360 Live",
    org: "AI learning platform + HRM in production",
    detail: "Containerised full-stack platform with automated CI/CD pipelines.",
  },
  {
    year: "2025",
    title: "Published in Springer",
    org: "LNNS Vol. 1208 · TCCE 2023",
    detail: "LEMate — AI-powered learner engagement detection, peer-reviewed.",
  },
];

export const languages = [
  { name: "Bengali", level: 5 },
  { name: "English", level: 4 },
];

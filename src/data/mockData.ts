
// src/data/mockData.ts
import type { Timestamp } from 'firebase/firestore'; // Import Timestamp

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  tags: string[];
  imageUrl: string;
  imageHint: string;
  githubLink?: string | null;
  liveLink?: string | null;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: Timestamp | Date | string; // Allow Firestore Timestamp, JS Date or string for display
  read?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured online store with product listings, cart functionality, and user accounts. Built with modern frontend and backend technologies for a seamless shopping experience.",
    category: "Web Application",
    technologies: ["React", "Node.js", "Firebase", "Stripe"],
    tags: ["E-commerce", "React", "Full-stack"],
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "online store",
    githubLink: null,
    liveLink: null,
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative tool to organize tasks, set deadlines, and track progress effectively. Features include boards, lists, and cards, similar to Trello.",
    category: "Web Application",
    technologies: ["Next.js", "Tailwind CSS", "Supabase", "Zustand"],
    tags: ["Productivity", "Next.js", "Collaboration"],
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "task app",
    githubLink: null,
    liveLink: null,
  },
  {
    id: "3",
    title: "Personal Blog",
    description: "A content-focused platform for sharing articles and insights with a clean reading experience. Supports Markdown and code highlighting.",
    category: "Web Application",
    technologies: ["Gatsby", "Markdown", "Netlify", "GraphQL"],
    tags: ["Writing", "Gatsby", "CMS"],
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "blog interface",
    githubLink: null,
    liveLink: null,
  },
  {
    id: "4",
    title: "Mobile Weather App",
    description: "A cross-platform mobile application providing real-time weather forecasts, alerts, and historical data. User-friendly interface and customizable locations.",
    category: "Mobile App",
    technologies: ["React Native", "Expo", "OpenWeatherMap API"],
    tags: ["Mobile", "React Native", "Utility"],
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mobile weather",
    githubLink: null,
    liveLink: null,
  },
  {
    id: "5",
    title: "Data Dashboard Pro",
    description: "A powerful data visualization dashboard providing real-time insights and analytics. Customizable widgets and reporting features for business intelligence.",
    category: "Data Science",
    technologies: ["Python", "Flask", "D3.js", "PostgreSQL"],
    tags: ["Analytics", "Python", "Visualization"],
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    githubLink: null,
    liveLink: null,
  },
  {
    id: "6",
    title: "Open Source Library",
    description: "A utility library for developers, simplifying common tasks and improving code efficiency. Actively maintained with community contributions and comprehensive documentation.",
    category: "Tooling",
    technologies: ["JavaScript", "Jest", "Webpack", "Babel"],
    tags: ["Development", "JavaScript", "Utility"],
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "code library",
    githubLink: null,
    liveLink: null,
  },
];

// messagesData is now for initial structure reference, actual messages will come from Firestore
export const messagesData: Message[] = [
  {
    id: "msg1",
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Project Inquiry",
    message: "Hello AliAlaa, I'm very impressed with your portfolio and would like to discuss a potential project. Are you available for a quick chat next week? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2024-07-28T10:30:00Z", // Will be Firestore Timestamp in reality
    read: false,
  },
  {
    id: "msg2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Collaboration Opportunity",
    message: "Hi AliAlaa, I found your work on GitHub and I'm looking for a skilled developer to collaborate on an open-source project. It's a great opportunity to build something impactful. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2024-07-27T15:45:00Z", // Will be Firestore Timestamp in reality
    read: true,
  },
];

export const filterCategories = ["All", ...new Set(projectsData.map(p => p.category))];

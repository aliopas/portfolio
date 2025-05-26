
// Mock data for the entire application

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  tags: string[]; // Ensure tags is always an array
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
  date: string;
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
    githubLink: null, // Use null for consistency
    liveLink: null,  // Use null for consistency
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

export const messagesData: Message[] = [
  {
    id: "msg1",
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Project Inquiry",
    message: "Hello AliAlaa, I'm very impressed with your portfolio and would like to discuss a potential project. Are you available for a quick chat next week? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2024-07-28T10:30:00Z",
    read: false,
  },
  {
    id: "msg2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Collaboration Opportunity",
    message: "Hi AliAlaa, I found your work on GitHub and I'm looking for a skilled developer to collaborate on an open-source project. It's a great opportunity to build something impactful. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2024-07-27T15:45:00Z",
    read: true,
  },
  {
    id: "msg3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    subject: "Question about your Blog Post",
    message: "Great article on Next.js! I had a follow-up question regarding server components. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2024-07-26T09:12:00Z",
    read: false,
  },
  {
    id: "msg4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    subject: "Feedback on Portfolio",
    message: "Your portfolio looks fantastic! Very clean design and impressive projects. One small suggestion: maybe add a bit more detail to the project descriptions. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2024-07-25T12:00:00Z",
    read: true,
  },
];

export const filterCategories = ["All", ...new Set(projectsData.map(p => p.category))];

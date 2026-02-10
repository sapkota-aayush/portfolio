export const personalInfo = {
  name: "Aayush Sapkota",
  title: "Software Developer • Toastmaster Public Speaker",
  location: "Canada • Kingston • St. Lawrence College",
  email: "aayush@aayussh.com",
  photo: "/au.jpeg",
  about: "Curious and confused.",
};

export const socialLinks = {
  github: "https://github.com/sapkota-aayush",
  linkedin: "https://www.linkedin.com/in/aayush-sapkota/",
  youtube: "https://www.youtube.com/@AayuSapkota",
  email: "aayush@aayussh.com",
};

export const education = {
  institution: "St. Lawrence College",
  location: "Kingston, ON",
  degree: "Advanced Diploma, Computer Programming and Analysis",
  period: "Sep 2023 – Apr 2026",
  status: "Current",
};

export const experience = [
  {
    title: "Software Development Intern (Co-op)",
    company: "Empire Life",
    location: "Kingston, ON (Hybrid)",
    period: "Aug 2025 – Present",
    type: "Internship",
    description: [
      "Modernized legacy Pentaho ETL workflows for annual tax slip generation (T4, T3, etc.)",
      "Converted workflows into containerized Spring Boot microservices on Docker",
      "Automated job execution using container orchestration",
      "Migrated data pipelines and storage to GCP (Cloud Storage, Cloud SQL, Pub/Sub)",
    ],
  },
  {
    title: "Peer Tutor",
    company: "Self-Employed",
    location: "Remote",
    period: "Oct 2024 – Present",
    type: "Freelance",
    description: [
      "Tutored students in Arduino and programming fundamentals",
      "Assisted in project development and troubleshooting",
    ],
  },
  {
    title: "Website Coordinator",
    company: "Sustainable Kingston",
    location: "Hybrid",
    period: "Aug 2024 – Apr 2025",
    type: "Contract",
    description: [
      "Managed website content, design, and technical issues",
      "Handled analytics and community engagement",
    ],
  },
];

export const projects = [
  {
    name: "SLC Indoor Navigation",
    period: "Ongoing",
    description: "Graph-based indoor navigation system for multi-floor college buildings, with AI-powered natural language processing.",
    technologies: ["Flask", "React", "OpenAI GPT-4", "BFS", "Dijkstra's Algorithm", "Graph Algorithms", "Python"],
    github: "https://github.com/sapkota-aayush",
    liveDemo: "https://slcnavigation.aayussh.com/",
    image: "", // No image preview
    video: "", // Add video URL when available
    logo: "/slc-navigation.jpg", // Floating logo
    featured: false,
  },
  {
    name: "Vojur",
    period: "Ongoing",
    description: "Voice-first journaling app using OpenAI Realtime API for natural conversations with an AI companion.",
    technologies: ["Next.js", "OpenAI Realtime API", "Supabase", "mem0", "TypeScript"],
    github: "https://github.com/sapkota-aayush",
    liveDemo: "https://voice.aayussh.com/",
    image: "", // Add image path when available
    video: "", // Add video URL when available
    logo: "/vojurlogo.png", // Floating logo
    featured: true, // Main project
    beta: true, // Beta version
  },
  {
    name: "Dumps.online",
    period: "2025",
    description: [
      "An anonymous platform built for St. Lawrence College students.",
      "Used by 100+ students during launch.",
      "Got banned due to college code violation.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    github: "https://github.com/sapkota-aayush",
    liveDemo: "https://dumps.online",
    image: "", // Add image path when available
    video: "", // Add video URL when available
    logo: "/dumpsonline.png", // Floating logo
    featured: true, // Main project
  },
  {
    name: "Folderly-Prototype",
    period: "2025",
    description: "Console Python package for AI-powered file organization using natural language commands.",
    technologies: ["Python", "OpenAI GPT-3", "Poetry", "Threading", "OS File Management"],
    github: "https://github.com/sapkota-aayush/Folderly-Prototype",
    downloadLink: "https://github.com/sapkota-aayush/Folderly-Prototype",
    video: "", // Add video recording URL when available
    image: "", // Add screenshot/image when available
    logo: "/folderly.png", // Floating logo
  },
];

export const openSource = [
  {
    name: "Numaflow",
    description: "Open source contribution to Numaflow project. Key contributions include: Docker file optimization, gRPC server error handling, documentation bug fixes, Python SDK improvements.",
    technologies: ["Python SDK", "Go", "Rust", "Kubernetes", "Docker"],
    github: "https://github.com/sapkota-aayush/numaflow",
    type: "Open Source Contributions",
    prLinks: [
      {
        title: "Fix: Make Tags mandatory in ForwardConditions",
        url: "https://github.com/numaproj/numaflow/pull/2970",
      },
      {
        title: "Docker image optimization",
        url: "https://github.com/numaproj/numaflow-python/pull/232",
      },
      {
        title: "Additional contribution",
        url: "https://github.com/numaproj/numaflow/pull/2744",
      },
    ],
  },
];

export interface HackathonItem {
  name: string;
  hackathon: string;
  period: string;
  description: string | string[];
  technologies: string[];
  image: string;
  projectLink?: string;
  devPostLink?: string;
  github?: string;
  video?: string;
  achievement?: string; // Make achievement an optional string
}

export const hackathons: HackathonItem[] = [
  {
    name: "Pinpoint",
    hackathon: "QHACKS at Queen's University",
    period: "Feb 2026",
    description: "Winner at QHacks for Pinpoint, a map-based housing platform, securing a pitch for $10,000.",
    technologies: [],
    image: "/original.png",
    projectLink: "https://usepinpoint.vercel.app",
    github: "https://lnkd.in/ezaRiQmp",
    devPostLink: "https://lnkd.in/e_rsPCP6",
    video: "",
    achievement: "🏆 Winner, QHacks (Secured pitch for $10,000)",
  },
  {
    name: "Kingston 311 AI Assistant",
    hackathon: "King's Hack by The AI Collective Kingston (Mayor's Cup)",
    period: "Jan 2026",
    description: "A prototype AI chat assistant for Kingston 311 information, with accessibility features and official source citations.",
    technologies: ["LangChain", "mem0", "AI", "React", "TypeScript", "Accessibility"],
    image: "/city of kingston.webp",
    projectLink: "https://lnkd.in/eGeVAups",
    devPostLink: "",
    github: "",
  },
  {
    name: "McHacks X Backboard",
    hackathon: "McHacks",
    period: "2026",
    description: "Voice-first journaling app (similar to Vojur) developed for McHacks.",
    technologies: ["Next.js", "OpenAI Realtime API", "Supabase", "mem0", "TypeScript"],
    image: "/vojurlogo.png",
    projectLink: "https://youtu.be/wQ7zC5duaws?si=eGpU1GCfERASJAPf",
    devPostLink: "",
    github: "https://github.com/sapkota-aayush",
    video: "",
  },
  {
    name: "Love Is Blind (RedFlagr)",
    hackathon: "Queen's Stupid Hackathon",
    period: "Nov 2025",
    description: "A dating app that matches people based on their worst traits and red flags.",
    technologies: ["FastAPI", "Next.js", "Python", "React", "Tailwind", "TypeScript"],
    image: "/LoveIsBlind.png",
    projectLink: "",
    devPostLink: "https://devpost.com/software/love-is-blind-f35x4z",
    github: "",
  },
  {
    name: "NGMI",
    hackathon: "Toronto Stupid Ideas Hackathon",
    period: "Oct 2025",
    description: "An anti-productivity app that disrupts focus with popups, memes, and chaos.",
    technologies: ["Python", "Tkinter", "easygui", "AppleScript", "psutil", "AppKit"],
    image: "/NGMI.png",
    projectLink: "",
    devPostLink: "https://devpost.com/software/ngmi",
    github: "",
  },
];

export const leadership = [
  {
    organization: "HackSLC",
    role: "Team Lead & Organizer",
    period: "Nov 2025",
    description: "Organized St. Lawrence College's first-ever student-led hackathon, managing event planning and securing sponsorship.",
    image: "/hackslc.jpeg",
    eventLink: "https://luma.com/j0itjwh2",
    devPostLink: "https://hackslc.devpost.com/",
    articleLink: "https://www.stlawrencecollege.ca/blog/hackslc-first-student-led-hackathon",
  },
  {
    organization: "Toastmasters International",
    role: "Member",
    period: "Oct 2024",
    description: "Joined Toastmasters International to develop public speaking and leadership skills.",
  },
  {
    organization: "Toastmasters International",
    role: "VP of Membership & Speaker",
    period: "Oct 2024 – Jul 2025",
    description: "Managed member recruitment and retention, and developed speaking programs.",
  },
  {
    organization: "Toastmasters International",
    role: "President",
    period: "Jul 2025 – Present",
    description: "Led the local Toastmasters chapter, managing people, budgets, and events.",
    achievement: "Came third at our Toastmasters area contest delivering international speech of 7 min.",
  },
];

// Floating Logos Configuration
// Add your logo images to the /public folder and update the paths below
export const floatingLogos = [
  // Add floating logos here for other sections
  // Example:
  // {
  //   src: "/logos/react.svg",
  //   alt: "React",
  //   size: 60,
  //   top: "10%",
  //   left: "5%",
  //   delay: 0,
  //   duration: 4,
  // },
];


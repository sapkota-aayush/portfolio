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
  period: "Sep 2023 – Dec 2025",
  status: "Current",
};

export const experience = [
  {
    title: "Software Development Intern (Co-op)",
    company: "Empire Life",
    location: "Kingston, ON (Hybrid)",
    period: "Aug 2025 – Present",
    type: "Internship",
    description: "Pipelines, containers, and cloud migration.",
  },
  {
    title: "Peer Tutor",
    company: "Self-Employed",
    location: "Remote",
    period: "Oct 2024 – Present",
    type: "Freelance",
    description: "Arduino and programming fundamentals, remote.",
  },
  {
    title: "Website Coordinator",
    company: "Sustainable Kingston",
    location: "Hybrid",
    period: "Aug 2024 – Apr 2025",
    type: "Contract",
    description: "Site content, design, analytics, and community engagement.",
  },
];

export const projects = [
  {
    name: "SLC Indoor Navigation",
    period: "Ongoing",
    description: "Indoor nav for multi-floor campuses with graph search and NLP.",
    technologies: ["Flask", "React", "OpenAI", "Python"],
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
    description: "Voice-first journaling with realtime AI conversation.",
    technologies: ["Next.js", "OpenAI Realtime", "Supabase", "TypeScript"],
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
    description:
      "Anonymous SLC student platform; 100+ users at launch; later shut down.",
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
    description: "CLI tool: natural-language file organization.",
    technologies: ["Python", "OpenAI", "Poetry"],
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
    description:
      "PRs: Docker, gRPC handling, docs, and Python SDK improvements.",
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
    description: "Map-based housing; QHacks winner, $10K pitch.",
    technologies: [],
    image: "/original.png",
    projectLink: "https://usepinpoint.vercel.app",
    github: "https://lnkd.in/ezaRiQmp",
    devPostLink: "https://lnkd.in/e_rsPCP6",
    video: "",
    achievement: "🏆 Winner, QHacks (Secured pitch for $10,000)",
  },
  {
    name: "Pinpoint",
    hackathon: "Mayor's Innovation Challenge",
    period: "2026",
    description: "City pitch competition; our segment ~13:00 in the recording.",
    technologies: [],
    image: "/mic.jpeg",
    projectLink: "",
    devPostLink: "",
    github: "",
    video: "https://www.youtube.com/live/_fb5Xqjcm-U?si=RMwEq9-tGipTapWM&t=780",
  },
  {
    name: "Kingston 311 AI Assistant",
    hackathon: "King's Hack by The AI Collective Kingston (Mayor's Cup)",
    period: "Jan 2026",
    description: "311 info chatbot with citations and accessibility.",
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
    description: "Realtime voice journaling (Vojur-style) for McHacks.",
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
    description: "Dating app matching on worst traits / red flags.",
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
    description: "Anti-productivity chaos: popups, memes, distraction.",
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
    description: "First student-led SLC hackathon — planning and sponsorships.",
    image: "/hackslc.jpeg",
    eventLink: "https://luma.com/j0itjwh2",
    devPostLink: "https://hackslc.devpost.com/",
    articleLink: "https://www.stlawrencecollege.ca/blog/hackslc-first-student-led-hackathon",
  },
  {
    organization: "Toastmasters International",
    role: "Member",
    period: "Oct 2024",
    description: "Public speaking and leadership development.",
  },
  {
    organization: "Toastmasters International",
    role: "VP of Membership & Speaker",
    period: "Oct 2024 – Jul 2025",
    description: "Membership, recruitment, and speaking programs.",
  },
  {
    organization: "Toastmasters International",
    role: "President",
    period: "Jul 2025 – Present",
    description:
      "Chapter lead; 3rd at area contest (7 min international speech).",
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


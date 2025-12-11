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
    name: "Dumps.online",
    description: [
      "An anonymous platform built for St. Lawrence College students",
      "Used by 100+ students during launch",
      "Got banned due to college code violation lol",
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
    description: "Console Python package for AI-powered file organization using natural language. Uses OpenAI function calling, threading, and OS file management for intelligent file path handling and organization.",
    technologies: ["Python", "OpenAI GPT-3", "Poetry", "Threading", "OS File Management"],
    github: "https://github.com/sapkota-aayush/Folderly-Prototype",
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

export const hackathons = [
  {
    name: "Love Is Blind (RedFlagr)",
    hackathon: "Queen's Stupid Hackathon",
    description: "A dating app that matches people based on their worst traits and red flags. Users swipe through unfiltered profiles, select fun badges, and embrace honesty over perfection.",
    technologies: ["FastAPI", "Next.js", "Python", "React", "Tailwind", "TypeScript"],
    image: "/LoveIsBlind.png",
    projectLink: "",
    devPostLink: "https://devpost.com/software/love-is-blind-f35x4z",
    github: "",
  },
  {
    name: "NGMI",
    hackathon: "Toronto Stupid Ideas Hackathon",
    description: "An anti-productivity app that destroys your focus with popups, memes, and chaos. Built to fight back against hustle culture by interrupting workflows and hijacking attention.",
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
    description: "Organized St. Lawrence College's first-ever student-led hackathon. Led a team of 5 organizers to create a full-day event with 25+ participants across multiple programs. Managed event planning, secured sponsorship from Student Association ($550 prize pool), coordinated judges and mentors. The event was featured on the St. Lawrence College website.",
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
    description: "Served as VP of Membership & Speaker with focus areas: Member recruitment and retention. Speaking development programs. Supporting member growth and development.",
  },
  {
    organization: "Toastmasters International",
    role: "President",
    period: "Jul 2025 – Present",
    description: "Leading the local Toastmasters chapter with key responsibilities: Managing people, budgets, marketing, and events. Developing strong leadership and public speaking skills. Fostering a supportive learning environment.",
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


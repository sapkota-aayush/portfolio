export const profile = {
  name: "Aayush Sapkota",
  shortName: "Aayush",
  headline: "Building, speaking, sharing.",
  intro:
    "Computer Programming and Analysis student at St. Lawrence College in Kingston, building AI tools, web apps, and community projects.",
  email: "aayush@aayussh.com",
  linkedin: "https://www.linkedin.com/in/aayush-sapkota/",
  github: "https://github.com/sapkota-aayush",
  x: "https://www.youtube.com/@AayuSapkota",
  instagram: "https://www.youtube.com/@AayuSapkota",
  photo: "/au.jpeg",
  photoAlt: "Portrait of Aayush Sapkota.",
};

export const socialLinks = [
  { href: profile.linkedin, label: "LinkedIn", icon: "linkedin" as const },
  { href: profile.instagram, label: "Instagram", icon: "instagram" as const },
  { href: profile.x, label: "X", icon: "x" as const },
  { href: profile.github, label: "GitHub", icon: "github" as const },
  { href: `mailto:${profile.email}`, label: "Email", icon: "mail" as const },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  logo: string;
  logoAlt: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Empire Life",
    role: "Software Development Intern (Co-op)",
    period: "Aug 2025 – Present",
    logo: "/empirelife.png",
    logoAlt: "Empire Life logo",
    highlights: [
      "Working across pipelines, containers, and cloud migration work.",
      "Bringing a practical developer mindset to enterprise software systems.",
    ],
  },
  {
    company: "Pinpoint",
    role: "Founder",
    period: "2026 – Present",
    logo: "/pinpoint.svg",
    logoAlt: "Pinpoint logo",
    highlights: [
      "Building a student housing startup from a QHacks idea.",
      "Accepted into Kingston Economic Development's Summer Company program with up to $3,000 in funding.",
    ],
  },
  {
    company: "Self-Employed",
    role: "Peer Tutor",
    period: "Oct 2024 – Present",
    logo: "/33-335657_tutoring-clipart-tutor-icon-png.png",
    logoAlt: "Tutoring icon",
    highlights: [
      "Tutoring Arduino, programming fundamentals, and software problem solving remotely.",
      "Helping students turn confusing concepts into things they can actually build with.",
    ],
  },
  {
    company: "Sustainable Kingston",
    role: "Software Developer",
    period: "Aug 2024 – Apr 2025",
    logo: "/sustainablekingston.png",
    logoAlt: "Sustainable Kingston logo",
    highlights: [
      "Worked on website development, design updates, analytics, and community engagement.",
      "Worked where tech, local impact, and communication all overlap.",
    ],
  },
  {
    company: "Toastmasters International",
    role: "President / VP Membership / Speaker",
    period: "Oct 2024 – Present",
    logo: "/toastmasters.jpeg",
    logoAlt: "Toastmasters logo",
    highlights: [
      "Leading, recruiting, and speaking through the Toastmasters program.",
      "Won an Area Contest with a seven-minute international speech.",
    ],
  },
];

export const education = {
  institution: "St. Lawrence College",
  location: "Kingston, ON",
  program: "Computer Programming and Analysis",
  period: "Sep 2023 – Apr 2026",
  credential: "Advanced Diploma",
};

export const currentFocus = [
  {
    title: "Pinpoint",
    description:
      "Student housing startup accepted into Kingston Economic Development's Summer Company program with up to $3,000 in funding.",
  },
  {
    title: "2026 Awards Night",
    description:
      "Received the Innovation & Initiative Award, Student Association Award, and High-Impact Event Award at St. Lawrence College.",
  },
  {
    title: "Vojur",
    description:
      "Voice-first journaling with realtime AI conversation, built with Next.js, OpenAI Realtime, Supabase, and TypeScript.",
  },
  {
    title: "EarthPulse",
    description:
      "3D climate impact globe that surfaces real stressed sites with before/after satellite-style views and local reports.",
  },
];

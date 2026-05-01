/**
 * Optional LinkedIn-style content feed. The visible carousel currently uses
 * `components/notebook/split/LinkedInPage.tsx`; this data stays available if
 * the page is later switched back to text cards.
 */

export type LinkedInPost = {
  id: string;
  hook: string;
  body: string;
  date: string;
  reactions?: number;
  comments?: number;
  url: string;
  accent?: string;
};

export const linkedinPosts: LinkedInPost[] = [
  {
    id: "student-association-awards",
    hook: "Three awards in one night at the 2026 Student Association Awards Night.",
    body: `Innovation & Initiative Award, Student Association Award, and High-Impact Event Award. Different parts of the same story: building, showing up, and creating things that mattered on campus.`,
    date: "2026-04-01",
    url: "https://www.linkedin.com/in/aayush-sapkota/",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "pinpoint-summer-company",
    hook: "Pinpoint was accepted into Kingston Economic Development's Summer Company program.",
    body: `Up to $3,000 in funding to build Pinpoint. It started at QHacks as a student housing idea, then grew through realtor conversations, CFRC Radio, and the Mayor's Innovation Challenge.`,
    date: "2026-05-01",
    url: "https://www.usepinpoint.ca/",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "vojur",
    hook: "Vojur is voice-first journaling with realtime AI conversation.",
    body: `The bet: journaling feels more natural when you can talk first and organize later.`,
    date: "2026-01-01",
    url: "https://voice.aayussh.com/",
    accent: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "slc-navigation",
    hook: "SLC Indoor Navigation helps people find their way across campus.",
    body: `Multi-floor indoor navigation with graph search, NLP, Flask, React, OpenAI, and Python.`,
    date: "2025-01-01",
    url: "https://slcnavigation.aayussh.com/",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
];

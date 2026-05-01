import { z } from "zod";

export const toolSchemas = {
  showAbout: {
    description:
      "Display Aayush's personal About page. Call this when the user asks an open-ended 'tell me about yourself' / 'who are you' / 'what's your story' style question, or when they explicitly ask for /about. Prefer this over a text bio.",
    parameters: z.object({}),
  },
  showExperience: {
    description:
      "Display Aayush's work experience timeline. Call this when the user asks about jobs, companies, where he's worked, internships, or work history.",
    parameters: z.object({}),
  },
  showEducation: {
    description:
      "Display Aayush's education page. Call this when the user asks about school, college, St. Lawrence College, degree, diploma, studies, or graduation.",
    parameters: z.object({}),
  },
  showProjects: {
    description:
      "Display Aayush's projects page. Call this when the user asks about projects, builds, apps, Vojur, Pinpoint, EarthPulse, Numaflow, open source, NFC cards, SLC Indoor Navigation, Dumps.online, or Folderly.",
    parameters: z.object({}),
  },
  showHackathons: {
    description:
      "Display Aayush's hackathons page. Call this when the user asks about hackathons, QHacks, King's Hack, McHacks, Stupid Hackathon, NGMI, RedFlagr, or hackathon builds.",
    parameters: z.object({}),
  },
  showLeadership: {
    description:
      "Display Aayush's leadership and awards page. Call this when the user asks about leadership, awards, Toastmasters, Student Association awards, HackSLC, organizing, or speaking.",
    parameters: z.object({}),
  },
  showContact: {
    description:
      "Display contact information. Call this when the user wants to reach out.",
    parameters: z.object({}),
  },
  showLinkedIn: {
    description:
      "Display a stacked-deck carousel of Aayush's project and community highlights. Call this when the user asks about LinkedIn, highlights, projects, posts, or public work.",
    parameters: z.object({}),
  },
} as const;

export type ToolName = keyof typeof toolSchemas;

export const toolNames = Object.keys(toolSchemas) as ToolName[];

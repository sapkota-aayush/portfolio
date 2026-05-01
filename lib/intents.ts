import type { ToolName } from "./tools";

type Intent = {
  tool: ToolName;
  args?: Record<string, unknown>;
  reply: string;
};

/**
 * Client-side intent matcher. If a user message matches one of these
 * patterns, dispatch the tool locally without hitting the LLM. This
 * covers the recruiter "6 second" path for free and — more importantly
 * — skips the class of LLM bug where tool calls land without any text
 * content (empty bot bubble, user sees the page open but no reply).
 *
 * Patterns are split into:
 *   - EXACT/SHORT patterns     (slash commands, bare nouns, "tell me X")
 *   - NAV_PHRASE + TOPIC combo (matches any "can I see experience" /
 *                               "i want to view his work" / "show me
 *                               his career" style phrasing)
 *
 * The NAV_PHRASE list is intentionally permissive — false positives
 * (e.g. matching "I want to see his experience" when the user meant
 * something conversational) just open a view that's safe to show.
 * False negatives (letter the LLM through for a simple nav request)
 * are worse because the LLM sometimes omits the text one-liner and
 * the user sees a blank bubble.
 */

// Phrases that signal "I want to VIEW a page" — restricted to explicit
// command/viewing verbs. Questions about the underlying info ("where has
// he worked", "tell me about aayush") are left to the LLM so it can give a
// conversational answer and optionally nudge the user toward the full
// page. Anchored to message start so "I don't want to see X" and
// similar negations don't match.
//
// Exception: "how (do|can|should) i (contact|reach|email|message|dm|get
// in touch)" — structurally a question but its answer is entirely the
// contact page, so route it. Narrow on purpose: the verb list is only
// contact-related, so "how do I make pasta" / "how can I help" stay LLM.
const NAV_PHRASE =
  /^\s*(\/?(show|see|view|read|open|pull\s+up|take\s+me\s+to|go\s+to)\s+(me\s+|us\s+)?|(can|could|will|would)\s+(i|you|we)\s+(see|show|view|look\s+at|check|read|pull\s+up|open)\s+(me\s+|us\s+)?|(let|lemme)\s+me?\s+(see|view|check|read|look\s+at)\s+|(i|we)('?ll|\s+will|\s+would\s+like|\s+want|\s+wanna|\s+need|'?d\s+like)(\s+to)?\s+(see|view|look\s+at|check|read|open)\s+|how\s+(do|can|should|would|to)\s+(i|we|one)?\s*(contact|reach|email|message|dm|get\s+in\s+touch)\s+)/i;

const TOPIC_PATTERNS: Record<ToolName, RegExp> = {
  showAbout:
    /\b(about\s+(yourself|aayush|you|page|section)|who\s+(are|is)\s+(you|aayush)|your\s+story|his\s+story|bio|who\s+he\s+is|who\s+you\s+are)\b/i,
  showExperience:
    /\b(experience|work(\s+history|ed)?|jobs?|companies|career|background|roles?|what\s+(he'?s|aayush\s+has|aayush'?s|you'?ve)\s+(done|built|worked\s+on)|his\s+jobs?|his\s+career|his\s+work|internships?)\b/i,
  showEducation:
    /\b(education|school|college|st\.?\s*lawrence|slc|degree|diploma|stud(y|ies|ied|ent)|graduat(e|ion))\b/i,
  showProjects:
    /\b(projects?|builds?|apps?|portfolio|vojur|pinpoint|folderly|earthpulse|numaflow|open\s*source|nfc|smart\s+cards?|dumps|navigation)\b/i,
  showHackathons:
    /\b(hackathons?|qhacks?|king'?s\s+hack|mchacks?|stupid\s+hackathon|ngmi|redflagr|love\s+is\s+blind)\b/i,
  showLeadership:
    /\b(leadership|awards?|toastmasters|student\s+association|high-impact|initiative|organizing|speaker|speaking|hackslc)\b/i,
  showContact:
    /\b(contact|email|reach(\s+out|\s+him|\s+aayush)?|get\s+in\s+touch|dm|message\s+(him|aayush)|how\s+to\s+reach)\b/i,
  showLinkedIn:
    /\b(linkedin|highlights?|posts?|writing|articles?|(what|things)\s+(he'?s|you'?ve)\s+written)\b/i,
};

// Bare topic words / slash commands — match without needing a command
// verb in front. These are things a user types as a search shortcut
// (e.g. someone types just "experience" in the input). Must match the
// WHOLE trimmed message, so "experience was great" stays LLM.
//
// Intentionally does NOT include conversational phrases like "who is
// aayush", "what's his deal", "his work history" — those are questions
// the LLM should answer, not navigation intents.
const EXACT_PATTERNS: Record<
  ToolName,
  RegExp
> = {
  showAbout: /^\/about$|^about\??$/i,
  showExperience:
    /^\/experience$|^(experience|jobs?|companies|career|resume|internships?)\??$/i,
  showEducation:
    /^\/education$|^(education|school|college|degree|diploma|studies|graduation)\??$/i,
  showProjects:
    /^\/projects$|^(projects?|builds?|apps?)\??$/i,
  showHackathons:
    /^\/hackathons$|^(hackathons?|qhacks?|mchacks?)\??$/i,
  showLeadership:
    /^\/leadership$|^(leadership|awards?|toastmasters|speaking)\??$/i,
  showContact: /^\/contact$|^(contact|email)\??$/i,
  showLinkedIn:
    /^\/(linkedin|posts|writing|highlights)$|^(linkedin|posts?|writing|highlights?)\??$/i,
};

const REPLIES: Record<
  ToolName,
  string
> = {
  showAbout: "Cool — pulling up the about page.",
  showExperience: "Pulling up the timeline now.",
  showEducation: "Pulling up the education page.",
  showProjects: "Opening the projects page.",
  showHackathons: "Opening the hackathons page.",
  showLeadership: "Opening leadership and awards.",
  showContact: "Easiest way: LinkedIn DM. Here's everything.",
  showLinkedIn:
    "Flipping through the highlights. Click a card to open the link.",
};

const TOOL_ORDER: ToolName[] = [
  // Order matters: exact/short commands are checked in this order too.
  // Keep projects before highlights so `/projects` cannot be swallowed by
  // the highlights carousel.
  "showProjects",
  "showHackathons",
  "showLeadership",
  "showContact",
  "showLinkedIn",
  "showEducation",
  "showExperience",
  "showAbout",
];

export function matchIntent(message: string): Intent | null {
  const trimmed = message.trim();

  // 1. Exact/short patterns — match even without a nav phrase.
  for (const tool of TOOL_ORDER) {
    if (EXACT_PATTERNS[tool].test(trimmed)) {
      return { tool, reply: REPLIES[tool] };
    }
  }

  // 2. Nav phrase + topic keyword combo.
  if (NAV_PHRASE.test(trimmed)) {
    for (const tool of TOOL_ORDER) {
      if (TOPIC_PATTERNS[tool].test(trimmed)) {
        return { tool, reply: REPLIES[tool] };
      }
    }
  }

  return null;
}

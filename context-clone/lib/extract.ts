import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { scrapeUrlToMarkdown, truncateMarkdown } from "./scrape";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ExtractResult = {
  url: string;
  finalUrl: string;
  title: string | null;
  data: unknown;
  pagesUsed: string[];
  extractedAt: string;
};

function stripCodeFences(text: string): string {
  const trimmed = text.trim();
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/);
  return fence ? fence[1].trim() : trimmed;
}

export async function extractStructuredData(input: {
  url: string;
  schema: Record<string, unknown>;
  instructions?: string;
}): Promise<ExtractResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const scraped = await scrapeUrlToMarkdown(input.url);
  const content = truncateMarkdown(scraped.markdown);

  const system = `You extract structured data from web page content.
Return ONLY valid JSON matching the provided JSON Schema.
Use null for missing fields when the schema allows it.
Do not invent data that is not supported by the page content.`;

  const user = [
    `Starting URL: ${input.url}`,
    input.instructions ? `Instructions: ${input.instructions}` : null,
    `JSON Schema:\n${JSON.stringify(input.schema, null, 2)}`,
    `Page title: ${scraped.title ?? "unknown"}`,
    `--- PAGE CONTENT (Markdown) ---`,
    content,
  ]
    .filter(Boolean)
    .join("\n\n");

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system,
    prompt: user,
    temperature: 0,
  });

  let data: unknown;
  try {
    data = JSON.parse(stripCodeFences(text));
  } catch {
    throw new Error("Model returned invalid JSON. Try a simpler schema or clearer instructions.");
  }

  return {
    url: input.url,
    finalUrl: scraped.finalUrl,
    title: scraped.title,
    data,
    pagesUsed: [scraped.finalUrl],
    extractedAt: new Date().toISOString(),
  };
}

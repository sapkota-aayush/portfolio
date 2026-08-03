import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import TurndownService from "turndown";

const USER_AGENT =
  "Mozilla/5.0 (compatible; WebContext/1.0; +https://github.com/webcontext)";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

turndown.remove(["script", "style", "noscript", "iframe"]);

export type ScrapeResult = {
  url: string;
  finalUrl: string;
  title: string | null;
  markdown: string;
  excerpt: string | null;
  wordCount: number;
  fetchedAt: string;
};

export async function scrapeUrlToMarkdown(url: string): Promise<ScrapeResult> {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": USER_AGENT,
    },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL (${response.status} ${response.statusText})`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
    throw new Error(`URL did not return HTML (content-type: ${contentType || "unknown"})`);
  }

  const html = await response.text();
  const finalUrl = response.url || url;
  const dom = new JSDOM(html, { url: finalUrl });
  const doc = dom.window.document;

  const readable = new Readability(doc.cloneNode(true) as Document);
  const article = readable.parse();

  const sourceHtml = article?.content ?? doc.body?.innerHTML ?? html;
  const markdown = turndown.turndown(sourceHtml).trim();
  const title = article?.title ?? doc.title ?? null;
  const excerpt = article?.excerpt ?? null;
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;

  if (!markdown) {
    throw new Error("No readable content found on this page");
  }

  return {
    url,
    finalUrl,
    title,
    markdown,
    excerpt,
    wordCount,
    fetchedAt: new Date().toISOString(),
  };
}

export function truncateMarkdown(markdown: string, maxChars = 24_000): string {
  if (markdown.length <= maxChars) return markdown;
  return `${markdown.slice(0, maxChars)}\n\n...[truncated for model context]`;
}

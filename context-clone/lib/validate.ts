import { z } from "zod";

const BLOCKED_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

export function parseHttpUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new Error("Invalid URL. Include http:// or https://");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https URLs are supported");
  }

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (BLOCKED_HOSTS.has(host) || host.endsWith(".local")) {
    throw new Error("Local and private URLs are not allowed");
  }

  return url;
}

export const scrapeRequestSchema = z.object({
  url: z.string().min(1),
});

export const extractRequestSchema = z.object({
  url: z.string().min(1),
  schema: z
    .custom<Record<string, unknown>>(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { message: "schema must be a JSON object" },
    ),
  instructions: z.string().max(2000).optional(),
});

export type ScrapeRequest = z.infer<typeof scrapeRequestSchema>;
export type ExtractRequest = z.infer<typeof extractRequestSchema>;

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

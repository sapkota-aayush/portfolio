import { NextRequest } from "next/server";
import { scrapeUrlToMarkdown } from "@/lib/scrape";
import {
  jsonError,
  parseHttpUrl,
  scrapeRequestSchema,
} from "@/lib/validate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = scrapeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Request body must include a url string", 400);
    }

    const url = parseHttpUrl(parsed.data.url);
    const result = await scrapeUrlToMarkdown(url.toString());

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Scrape failed";
    const status = message.includes("Invalid URL") ? 400 : 502;
    return jsonError(message, status);
  }
}

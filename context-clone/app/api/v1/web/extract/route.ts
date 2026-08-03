import { NextRequest } from "next/server";
import { extractStructuredData } from "@/lib/extract";
import {
  extractRequestSchema,
  jsonError,
  parseHttpUrl,
} from "@/lib/validate";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = extractRequestSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError("Body must include url (string) and schema (object)", 400);
    }

    const url = parseHttpUrl(parsed.data.url);
    const result = await extractStructuredData({
      url: url.toString(),
      schema: parsed.data.schema,
      instructions: parsed.data.instructions,
    });

    return Response.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Extract failed";
    let status = 502;
    if (message.includes("Invalid URL") || message.includes("schema")) {
      status = 400;
    }
    if (message.includes("OPENAI_API_KEY")) {
      status = 503;
    }
    return jsonError(message, status);
  }
}

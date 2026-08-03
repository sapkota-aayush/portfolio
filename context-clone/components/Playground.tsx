"use client";

import { useState } from "react";

type Tab = "scrape" | "extract";

const DEFAULT_SCHEMA = `{
  "type": "object",
  "properties": {
    "company_name": { "type": "string", "description": "Company or product name" },
    "tagline": { "type": "string", "description": "Main headline or tagline" },
    "pricing_plans": {
      "type": "array",
      "description": "Pricing tiers if visible",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "price": { "type": "string" }
        }
      }
    }
  }
}`;

export function Playground() {
  const [tab, setTab] = useState<Tab>("scrape");
  const [url, setUrl] = useState("https://stripe.com");
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [instructions, setInstructions] = useState("Focus on homepage hero and pricing if linked.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string>("");

  async function runScrape() {
    setLoading(true);
    setError(null);
    setOutput("");

    try {
      const res = await fetch("/api/v1/scrape/markdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Scrape failed");
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  async function runExtract() {
    setLoading(true);
    setError(null);
    setOutput("");

    let parsedSchema: Record<string, unknown>;
    try {
      parsedSchema = JSON.parse(schema);
    } catch {
      setLoading(false);
      setError("Schema must be valid JSON");
      return;
    }

    try {
      const res = await fetch("/api/v1/web/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          schema: parsedSchema,
          instructions: instructions || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Extract failed");
      setOutput(JSON.stringify(data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-3">
        <p className="text-sm font-medium tracking-wide text-indigo-400 uppercase">
          YC rebuild · Episode 1
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          WebContext
        </h1>
        <p className="max-w-2xl text-base text-zinc-400 leading-relaxed">
          Minimal clone of{" "}
          <a
            href="https://www.context.dev/"
            className="text-indigo-400 underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Context.dev
          </a>
          : turn any URL into LLM-ready Markdown, or extract schema-validated JSON.
        </p>
      </header>

      <div className="flex gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-1 w-fit">
        {(["scrape", "extract"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-indigo-600 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {t === "scrape" ? "Scrape Markdown" : "Extract JSON"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-300">URL</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-indigo-500"
              placeholder="https://example.com"
            />
          </label>

          {tab === "scrape" ? (
            <p className="rounded-lg border border-emerald-900/40 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-200">
              Scrape does <strong>not</strong> need an API key. Paste a URL and click Scrape page.
            </p>
          ) : (
            <p className="rounded-lg border border-amber-900/40 bg-amber-950/30 px-3 py-2 text-sm text-amber-200">
              Extract needs <code className="text-amber-100">OPENAI_API_KEY</code> in{" "}
              <code className="text-amber-100">context-clone/.env.local</code>, then restart{" "}
              <code className="text-amber-100">npm run dev</code>.
            </p>
          )}

          {tab === "extract" && (
            <>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-zinc-300">JSON Schema</span>
                <textarea
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  rows={14}
                  className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-xs text-zinc-100 outline-none focus:border-indigo-500"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-zinc-300">
                  Instructions (optional)
                </span>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-indigo-500"
                />
              </label>
            </>
          )}

          <button
            type="button"
            disabled={loading || !url.trim()}
            onClick={tab === "scrape" ? runScrape : runExtract}
            className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Working…" : tab === "scrape" ? "Scrape page" : "Extract data"}
          </button>

          {!url.trim() && (
            <p className="text-xs text-zinc-500">Enter a URL above to enable the button.</p>
          )}

          {error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

        <div className="flex min-h-[420px] flex-col rounded-xl border border-zinc-800 bg-zinc-950/80">
          <div className="border-b border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-400">
            Response
          </div>
          <pre className="flex-1 overflow-auto p-4 text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap break-words">
            {output || (loading ? "Fetching and processing…" : "Run a request to see JSON output.")}
          </pre>
        </div>
      </div>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 text-sm text-zinc-400 leading-relaxed">
        <p className="font-medium text-zinc-200 mb-2">API endpoints</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <code className="text-indigo-300">POST /api/v1/scrape/markdown</code> —{" "}
            <code className="text-zinc-500">{`{ "url": "..." }`}</code>
          </li>
          <li>
            <code className="text-indigo-300">POST /api/v1/web/extract</code> —{" "}
            <code className="text-zinc-500">{`{ "url", "schema", "instructions?" }`}</code>
          </li>
        </ul>
        <p className="mt-3">
          <strong className="text-zinc-300">Scrape</strong> — no API key.{" "}
          <strong className="text-zinc-300">Extract</strong> — needs{" "}
          <code className="text-zinc-500">OPENAI_API_KEY</code> in{" "}
          <code className="text-zinc-500">.env.local</code>. v1 uses fetch + Readability (no JS rendering).
        </p>
      </section>
    </div>
  );
}

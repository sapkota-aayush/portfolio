# WebContext — Context.dev clone (MVP)

Minimal learning clone of [Context.dev](https://www.context.dev/) (YC S26): a **Web Context API** that turns URLs into agent-ready Markdown and schema-driven JSON.

## What works in v1

| Feature | Context.dev | This clone |
| --- | --- | --- |
| Scrape → Markdown | ✅ | ✅ `POST /api/v1/scrape/markdown` |
| Schema extract | ✅ multi-page crawl | ✅ single-page + LLM |
| JS rendering / anti-bot | ✅ | ❌ v2 |
| Brand intelligence | ✅ | ❌ v2 |
| MCP server | ✅ | ❌ v2 |
| Monitors / webhooks | ✅ | ❌ v2 |

## Quick start

```bash
cd context-clone
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) and use **Scrape Markdown** — no API key needed.

For **Extract JSON** only, add your key:

```bash
cp .env.example .env.local   # set OPENAI_API_KEY=sk-...
# restart npm run dev after editing .env.local
```

## API

### Scrape Markdown

```bash
curl -X POST http://localhost:3001/api/v1/scrape/markdown \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Extract structured data

```bash
curl -X POST http://localhost:3001/api/v1/web/extract \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://stripe.com",
    "instructions": "Focus on homepage messaging",
    "schema": {
      "type": "object",
      "properties": {
        "company_name": { "type": "string" },
        "tagline": { "type": "string" }
      }
    }
  }'
```

## Architecture

```
URL → fetch HTML → Mozilla Readability → Turndown → Markdown
                                              ↓
                         Extract: Markdown + JSON Schema → GPT-4o-mini → JSON
```

## v2 roadmap

- Playwright for JS-heavy sites
- Multi-page crawl (sitemap / link follow)
- Brand endpoint (logo, colors from meta/CSS)
- MCP server exposing scrape + extract tools
- API key auth + credit metering

## Learnings (Episode 1)

- Context.dev's wedge is **one API** for scrape + extract + brand + monitors
- Schema-driven extraction beats hand-written parsers for agent pipelines
- MCP lets Cursor/Leo call web context without custom infra

Built as part of a YC rebuild learning series.

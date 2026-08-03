# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router) portfolio website — the "product" is the
site itself, rendered as an interactive notebook/journal. There is one optional
feature: an AI chatbot exposed at `POST /api/chat`.

### Services and how to run them

There is only one service. Standard scripts live in `package.json`:

- Dev server: `npm run dev` (serves on `http://localhost:3000`).
- Lint: `npm run lint` (ESLint, flat config via `.eslintrc.json`).
- Build: `npm run build` (production build; also type-checks).
- Smoke test for the chat API: `npm run smoke` (hits `http://localhost:3000/api/chat`;
  requires the dev server to already be running).

### Non-obvious notes

- The site renders and navigates fully WITHOUT any environment variables. Redis
  (`lib/redis.ts`) and rate limiting degrade to no-ops when Upstash env vars are
  unset, so the portfolio works out of the box.
- The AI chat feature is the ONLY thing that needs an external secret. Default
  provider is GitHub Models (`LLM_PROVIDER=github`), which needs `GITHUB_TOKEN`
  (a fine-grained PAT with "Models: read"). Without a token, `/api/chat` returns
  HTTP 500 with an explanatory JSON error — this is expected, not a setup bug.
  Other providers are selectable via `LLM_PROVIDER` (`openai`→`OPENAI_API_KEY`,
  `claude`→`ANTHROPIC_API_KEY`, `ollama`→`OLLAMA_*`). Put secrets in `.env.local`.
- `npm run smoke` therefore expects one failure locally: the "normal request
  streams" case fails without an LLM token. All validation cases still pass. The
  rate-limit case warns (not fails) when Upstash is unset locally.
- Optional integrations: Supabase (see `supabase-hearts-setup.sql`) for a hearts
  counter, Upstash Redis for rate limiting. Neither is required to run/develop.

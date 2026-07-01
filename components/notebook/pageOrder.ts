/** Canonical page order. Pages stack shallow-to-deep: `home` is the
 *  first page (just inside the cover), `contact` is the deepest. Each
 *  page physically sits *on top of* the next one — going forward means
 *  flipping the current (shallower) page away to reveal the deeper
 *  page underneath. */
export const PAGE_ORDER = [
  "home",
  "about",
  "experience",
  "education",
  "projects",
  "hackathons",
  "leadership",
  "linkedin",
  "contact",
] as const;

export type PageKey = (typeof PAGE_ORDER)[number];

export function orderOf(kind: PageKey): number {
  return PAGE_ORDER.indexOf(kind);
}

export function nextPage(kind: PageKey): PageKey | null {
  const index = PAGE_ORDER.indexOf(kind);
  if (index < 0 || index >= PAGE_ORDER.length - 1) return null;
  return PAGE_ORDER[index + 1];
}

export function prevPage(kind: PageKey): PageKey | null {
  const index = PAGE_ORDER.indexOf(kind);
  if (index <= 0) return null;
  return PAGE_ORDER[index - 1];
}

export function isPageKey(kind: string | null | undefined): kind is PageKey {
  return !!kind && (PAGE_ORDER as readonly string[]).includes(kind);
}

"use client";

import { useIsMobile } from "@/lib/hooks/useIsMobile";

/**
 * Top-left gutter button for closing a content page and returning to
 * the chat home. Handwritten "← home" followed by a small keyboard
 * badge hinting that `Esc` also works (desktop only).
 */
export function PageBackButton({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile();

  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Flip back to chat home"
      style={{
        position: "absolute",
        // Baseline floats 0.19 × --line above rule 1 — matches the
        // sender-label offset in chat home. See CoverBackButton for
        // the full explanation.
        top: isMobile
          ? "calc(var(--line) * 1.4 - var(--fs-script) * 0.82)"
          : "calc(var(--line) * 1.57 - var(--fs-script) * 0.82)",
        left: isMobile
          ? "calc(var(--pad-content) + 8px)"
          : "calc(3% + var(--pad-chrome))",
        background: "transparent",
        border: "none",
        padding: isMobile ? "12px 8px" : 0,
        minWidth: isMobile ? 44 : undefined,
        minHeight: isMobile ? 44 : undefined,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 16,
        cursor: "pointer",
        lineHeight: 1,
        zIndex: 20,
      }}
      onMouseEnter={(e) => {
        if (isMobile) return;
        const kbd = e.currentTarget.querySelector(
          "[data-kbd]",
        ) as HTMLElement | null;
        const label = e.currentTarget.querySelector(
          "[data-label]",
        ) as HTMLElement | null;
        if (label) label.style.opacity = "1";
        if (kbd) kbd.style.opacity = "0.9";
      }}
      onMouseLeave={(e) => {
        if (isMobile) return;
        const kbd = e.currentTarget.querySelector(
          "[data-kbd]",
        ) as HTMLElement | null;
        const label = e.currentTarget.querySelector(
          "[data-label]",
        ) as HTMLElement | null;
        if (label) label.style.opacity = "0.7";
        if (kbd) kbd.style.opacity = "0.6";
      }}
    >
      {/* Handwritten "← home" */}
      <span
        data-label
        style={{
          fontFamily: "var(--font-script)",
          fontSize: isMobile ? "calc(var(--fs-script) * 1.08)" : "var(--fs-script)",
          color: "var(--color-ink-soft)",
          opacity: 0.85,
          transition: "opacity 180ms ease",
        }}
      >
        ← home
      </span>

      {!isMobile && (
        <span
          data-kbd
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-kbd)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-ink-faint)",
            opacity: 0.6,
            transition: "opacity 180ms ease",
            padding: "2px 6px",
            border: "1px solid color-mix(in srgb, var(--color-ink-faint) 40%, transparent)",
            borderRadius: 3,
            lineHeight: 1,
            transform: "translateY(-2px)",
          }}
        >
          esc
        </span>
      )}
    </button>
  );
}

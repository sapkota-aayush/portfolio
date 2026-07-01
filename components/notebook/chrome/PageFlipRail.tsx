"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Right-edge touch target — tap to flip to the next page in sequence.
 * Portaled above all page layers so it stays clickable.
 */
export function PageFlipRail({
  canGoForward,
  onFlip,
  onFlipActiveChange,
}: {
  canGoForward: boolean;
  onFlip: () => void;
  onFlipActiveChange?: (active: boolean) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!canGoForward || !mounted || typeof document === "undefined") return null;

  const setActive = (active: boolean) => {
    setPressed(active);
    onFlipActiveChange?.(active);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
    onFlip();
  };

  const onPointerCancel = () => {
    setActive(false);
  };

  return createPortal(
    <button
      type="button"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      aria-label="Touch to flip to the next page"
      style={{
        position: "fixed",
        right: "max(12px, env(safe-area-inset-right, 0px))",
        top: "50%",
        transform: `translateY(-50%) scale(${pressed ? 0.95 : 1})`,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: "16px 8px",
        minWidth: 72,
        minHeight: 88,
        background: "transparent",
        border: "none",
        borderRadius: 0,
        cursor: pressed ? "grabbing" : "grab",
        touchAction: "none",
        WebkitTapHighlightColor: "transparent",
        boxShadow: "none",
        color: "var(--color-ink-faint)",
        opacity: pressed ? 0.55 : 0.42,
        transition: "transform 120ms ease, opacity 120ms ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-hint)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          lineHeight: 1.35,
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        touch to flip
      </span>

      <svg
        width="28"
        height="20"
        viewBox="0 0 28 20"
        aria-hidden
        style={{
          animation: pressed ? "none" : "bobX 2s ease-in-out infinite",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <path
          d="M 4 2 L 12 10 L 4 18"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
        <path
          d="M 14 2 L 22 10 L 14 18"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
      </svg>
    </button>,
    document.body,
  );
}

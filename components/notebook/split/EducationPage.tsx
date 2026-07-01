"use client";

import { type CSSProperties } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import { HandwrittenText } from "../primitives/HandwrittenText";
import { PageAnimateContext, usePageAnimate } from "../primitives/PageAnimateContext";

const EDUCATION = {
  school: "St. Lawrence College",
  program: "Computer Programming and Analysis",
  period: "Sep 2023 – Apr 2026",
  location: "Kingston, ON",
  logoSrc: "/slc.webp",
  note:
    "Advanced diploma · Graduated Apr 2026. The classroom part of the arc; the projects, pitches, and startup work are where it gets loud.",
};

export function EducationPage({
  onClose,
  animate = true,
  sessionKey = 0,
}: {
  onClose: () => void;
  animate?: boolean;
  sessionKey?: number;
}) {
  const isMobile = useIsMobile();

  return (
    <PageAnimateContext.Provider value={{ animate, sessionKey }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Paper ruled={false} marginRule={false} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            paddingTop: "calc(var(--line) * 3)",
            paddingBottom: "calc(var(--line) * 3)",
            paddingLeft: isMobile
              ? "calc(var(--pad-content) + 44px)"
              : "calc(12% + var(--pad-content))",
            paddingRight: isMobile ? "var(--pad-content)" : "8%",
            overflowY: "auto",
            backgroundImage: "var(--rule-background)",
            backgroundAttachment: "local",
          }}
        >
          <PageBackButton onClose={onClose} />

          <div style={pageLabelStyle(isMobile)}>journal · education</div>

          <h1
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              color: "var(--color-ink)",
              margin: 0,
              lineHeight: "calc(var(--line) * 3)",
            }}
          >
            education
          </h1>

          <EducationCard />
        </div>

        <PageCorner pageNumber="03" />
      </div>
    </PageAnimateContext.Provider>
  );
}

function pageLabelStyle(isMobile: boolean): CSSProperties {
  return {
    position: "absolute",
    top: "calc(var(--line) * 2.57 - var(--fs-meta) * 0.86)",
    left: isMobile
      ? "calc(44px + var(--pad-content))"
      : "calc(3% + var(--pad-chrome))",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--fs-meta)",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "color-mix(in srgb, var(--color-ink-soft) 55%, transparent)",
    lineHeight: 1,
  };
}

function EducationCard() {
  const pageAnimate = usePageAnimate();

  return (
    <div
      style={{
        marginTop: "calc(var(--line) * 1.5)",
        maxWidth: 680,
        opacity: pageAnimate ? 1 : 0,
        transform: pageAnimate ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 82,
            height: 82,
            flexShrink: 0,
            transform: "rotate(-4deg)",
            background: "#fbfaf4",
            padding: 6,
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 8,
            filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.22))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={EDUCATION.logoSrc}
            alt={`${EDUCATION.school} logo`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
            draggable={false}
          />
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-hint)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-ink-faint)",
              lineHeight: "var(--line)",
            }}
          >
            {EDUCATION.period} · {EDUCATION.location}
          </div>
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-md)",
              fontWeight: 500,
              color: "var(--color-ink)",
              lineHeight: "var(--line)",
            }}
          >
            <HandwrittenText text={EDUCATION.school} animated={pageAnimate} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              fontStyle: "italic",
              color: "var(--color-ink-soft)",
              lineHeight: "var(--line)",
            }}
          >
            {EDUCATION.program}
          </div>
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-script)",
          fontSize: "var(--fs-body)",
          color: "var(--color-ink)",
          lineHeight: "var(--line)",
          margin: "var(--line) 0 0",
          maxWidth: 560,
        }}
      >
        {EDUCATION.note}
      </p>
    </div>
  );
}

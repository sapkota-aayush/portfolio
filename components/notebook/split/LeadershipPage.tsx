"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import { PageAnimateContext } from "../primitives/PageAnimateContext";

type LeadershipItem = {
  title: string;
  meta: string;
  imageSrc: string;
  href: string;
  blurb: ReactNode;
};

const roleLineStyle = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "var(--fs-hint)",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-faint)",
};

const ITEMS: LeadershipItem[] = [
  {
    title: "From Classroom to Startup",
    meta: "second SLC college feature · Jun 2026",
    imageSrc: "/slc.webp",
    href: "https://www.stlawrencecollege.ca/blog/-from-classroom-to-startup-a-journey-of-innovation-and-leadership",
    blurb:
      "Featured again on the St. Lawrence College website — this time on innovation, Toastmasters leadership, HackSLC, Empire Life, and building Pinpoint through Summer Company.",
  },
  {
    title: "2026 Student Association Awards",
    meta: "three awards · Apr 2026",
    imageSrc: "/Anotthermain.jpeg",
    href: "https://www.stlawrencecollege.ca/",
    blurb:
      "Innovation & Initiative Award, Student Association Award, and High-Impact Event Award in one night.",
  },
  {
    title: "Mayor's Innovation Challenge",
    meta: "Pinpoint pitch · Kingston",
    imageSrc: "/kingstondevprogram.png",
    href: "https://www.usepinpoint.ca/",
    blurb:
      "Pitched Pinpoint as a student housing platform for Kingston, connecting the build with city and community leaders.",
  },
  {
    title: "Toastmasters International",
    meta: "president / area contest winner",
    imageSrc: "/class%20speech.jpeg",
    href: "https://www.toastmasters.org/",
    blurb: (
      <>
        <span style={roleLineStyle}>Member · Oct 2024</span>
        <span style={roleLineStyle}>VP Membership & Speaker · Oct 2024 – Jul 2025</span>
        <span style={roleLineStyle}>President · Jul 2025 – Present</span>
        Club leadership, recruiting, speaking programs, and an Area Contest win
        with a seven-minute international speech.
      </>
    ),
  },
  {
    title: "HackSLC",
    meta: "team lead + organizer",
    imageSrc: "/hackSLC.jpg",
    href: "https://hackslc.devpost.com/",
    blurb:
      "Helped organize the first student-led SLC hackathon, from planning to sponsorship moving parts.",
  },
];

export function LeadershipPage({
  onClose,
  animate = true,
  sessionKey = 0,
}: {
  onClose: () => void;
  animate?: boolean;
  sessionKey?: number;
}) {
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    if (!animate) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setVisibleCount(1);
      interval = window.setInterval(() => {
        setVisibleCount((count) => {
          if (count >= ITEMS.length) {
            if (interval !== undefined) window.clearInterval(interval);
            return count;
          }
          return count + 1;
        });
      }, 300);
    }, 550);
    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [animate, sessionKey]);

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
          <div style={labelStyle(isMobile)}>journal · leadership</div>
          <h1 style={titleStyle}>leadership</h1>
          <p style={introStyle}>awards, speaking, organizing, and showing up.</p>
          <div style={{ marginTop: "var(--line)", paddingLeft: isMobile ? 0 : 24 }}>
            {ITEMS.map((item, i) => (
              <LeadershipEntry key={item.title} item={item} visible={visibleCount > i} />
            ))}
          </div>
        </div>
        <PageCorner pageNumber="06" />
      </div>
    </PageAnimateContext.Provider>
  );
}

function LeadershipEntry({
  item,
  visible,
}: {
  item: LeadershipItem;
  visible: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        marginBottom: "calc(var(--line) * 2)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={logoStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.imageSrc} alt="" style={imageStyle} draggable={false} />
        <span aria-hidden="true" style={polaroidStripStyle} />
      </a>
      <div>
        <div style={metaStyle}>{item.meta}</div>
        <div style={nameStyle}>{item.title}</div>
        <div style={bodyStyle}>{item.blurb}</div>
      </div>
    </div>
  );
}

const titleStyle = {
  fontFamily: "var(--font-script)",
  fontSize: "var(--fs-display)",
  fontWeight: 500,
  color: "var(--color-ink)",
  margin: 0,
  lineHeight: "calc(var(--line) * 3)",
};

const introStyle = {
  fontFamily: "var(--font-script)",
  fontSize: "var(--fs-body)",
  color: "var(--color-ink)",
  lineHeight: "var(--line)",
  margin: 0,
  maxWidth: 620,
};

const logoStyle = {
  width: "clamp(118px, 14vw, 160px)",
  minHeight: "clamp(118px, 14vw, 156px)",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column" as const,
  gap: 6,
  transform: "rotate(-2deg)",
  background: "#fffdf7",
  padding: "8px 8px 13px",
  border: "1px solid rgba(45, 38, 27, 0.1)",
  borderRadius: 5,
  boxShadow:
    "0 16px 24px rgba(37, 31, 21, 0.18), 0 3px 6px rgba(37, 31, 21, 0.12)",
  overflow: "hidden",
  textDecoration: "none",
};

const imageStyle = {
  width: "100%",
  height: "clamp(86px, 10vw, 116px)",
  objectFit: "cover" as const,
  display: "block",
  borderRadius: 3,
  filter: "saturate(1.04) contrast(1.03)",
};

const polaroidStripStyle = {
  display: "block",
  height: 12,
  width: "72%",
  margin: "0 auto",
  borderTop:
    "1px solid color-mix(in srgb, var(--color-ink-soft) 18%, transparent)",
  opacity: 0.35,
};

const metaStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--fs-hint)",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "var(--color-ink-faint)",
  lineHeight: "var(--line)",
};

const nameStyle = {
  fontFamily: "var(--font-script)",
  fontSize: "var(--fs-md)",
  fontWeight: 500,
  color: "var(--color-ink)",
  lineHeight: "var(--line)",
};

const bodyStyle = {
  fontFamily: "var(--font-script)",
  fontSize: "var(--fs-body)",
  color: "var(--color-ink)",
  lineHeight: "var(--line)",
  maxWidth: 620,
};

function labelStyle(isMobile: boolean) {
  return {
    position: "absolute" as const,
    top: "calc(var(--line) * 2.57 - var(--fs-meta) * 0.86)",
    left: isMobile
      ? "calc(44px + var(--pad-content))"
      : "calc(3% + var(--pad-chrome))",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--fs-meta)",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
    color: "color-mix(in srgb, var(--color-ink-soft) 55%, transparent)",
    lineHeight: 1,
  };
}

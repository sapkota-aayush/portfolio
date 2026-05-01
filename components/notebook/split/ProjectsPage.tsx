"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import { PageAnimateContext } from "../primitives/PageAnimateContext";

type Project = {
  name: string;
  meta: string;
  logoSrc: string;
  href: string;
  blurb: ReactNode;
};

const PROJECTS: Project[] = [
  {
    name: "Pinpoint",
    meta: "student housing startup",
    logoSrc: "/pinpoint.svg",
    href: "https://www.usepinpoint.ca/",
    blurb:
      "Started at QHacks, grew through realtor conversations and the Mayor's Innovation Challenge, now accepted into Summer Company with up to $3K funding.",
  },
  {
    name: "Vojur",
    meta: "voice-first journaling",
    logoSrc: "/vojurlogo.png",
    href: "https://voice.aayussh.com/",
    blurb:
      "Realtime AI conversation for journaling, built with Next.js, OpenAI Realtime, Supabase, and TypeScript.",
  },
  {
    name: "SLC Indoor Navigation",
    meta: "campus navigation",
    logoSrc: "/slc-navigation.jpg",
    href: "https://slcnavigation.aayussh.com/",
    blurb:
      "Multi-floor indoor navigation with graph search and NLP for campus wayfinding.",
  },
  {
    name: "EarthPulse",
    meta: "3D climate impact globe",
    logoSrc: "/earthpulse.svg",
    href: "https://earthpulse-three.vercel.app",
    blurb:
      "A Next.js app with a 3D globe, red pins for stressed sites, before/after satellite-style sliders, local stress reports, and climate narratives.",
  },
  {
    name: "Numaflow",
    meta: "open source contributions",
    logoSrc: "/numaflow.svg",
    href: "https://github.com/numaproj/numaflow",
    blurb:
      "Contributed PRs around Docker, gRPC handling, docs, and Python SDK improvements across the Numaflow ecosystem.",
  },
  {
    name: "Folderly",
    meta: "natural-language file organization",
    logoSrc: "/folderly.png",
    href: "https://github.com/sapkota-aayush/Folderly-Prototype",
    blurb:
      "A CLI experiment for organizing files from natural-language instructions.",
  },
  {
    name: "NFC Smart Cards",
    meta: "side hustle",
    logoSrc: "/menfc2.png",
    href: "mailto:aayush@aayussh.com",
    blurb:
      "Custom digital business cards that share contact info, portfolio links, and socials with one phone tap.",
  },
];

export function ProjectsPage({
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
          if (count >= PROJECTS.length) {
            if (interval !== undefined) window.clearInterval(interval);
            return count;
          }
          return count + 1;
        });
      }, 280);
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
          <div style={labelStyle(isMobile)}>journal · projects</div>
          <h1 style={titleStyle}>projects</h1>
          <p style={introStyle}>main builds worth opening a new tab for.</p>
          <div style={{ marginTop: "var(--line)", paddingLeft: isMobile ? 0 : 24 }}>
            {PROJECTS.map((project, i) => (
              <ProjectEntry
                key={project.name}
                project={project}
                visible={visibleCount > i}
              />
            ))}
          </div>
          <a
            href="https://github.com/sapkota-aayush"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginLeft: isMobile ? 0 : 24,
              marginTop: "calc(var(--line) * -0.25)",
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-body)",
              color: "var(--color-ink-soft)",
              lineHeight: "var(--line)",
              textDecoration: "none",
              borderBottom:
                "1px dashed color-mix(in srgb, var(--color-ink-soft) 35%, transparent)",
            }}
          >
            many more experiments live on GitHub →
          </a>
        </div>
        <PageCorner pageNumber="04" />
      </div>
    </PageAnimateContext.Provider>
  );
}

function ProjectEntry({
  project,
  visible,
}: {
  project: Project;
  visible: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        marginBottom: "var(--line)",
        maxWidth: 780,
        padding: "calc(var(--line) * 0.45) 18px",
        background:
          "color-mix(in srgb, var(--color-paper-warm) 78%, transparent)",
        border: "1px solid rgba(0,0,0,0.045)",
        borderRadius: 12,
        boxShadow: "0 10px 22px rgba(0,0,0,0.045)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <a href={project.href} target="_blank" rel="noopener noreferrer" style={logoStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.logoSrc} alt="" style={imageStyle} draggable={false} />
      </a>
      <div>
        <div style={metaStyle}>{project.meta}</div>
        <div style={nameStyle}>{project.name}</div>
        <div style={bodyStyle}>{project.blurb}</div>
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
  width: 70,
  height: 70,
  flexShrink: 0,
  transform: "rotate(-3deg)",
  background: "#fbfaf4",
  padding: 4,
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 6,
  filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.22))",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
  display: "block",
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

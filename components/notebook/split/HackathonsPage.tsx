"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import { PageAnimateContext } from "../primitives/PageAnimateContext";

type Hackathon = {
  name: string;
  meta: string;
  imageSrc: string;
  href: string;
  blurb: ReactNode;
};

const HACKATHONS: Hackathon[] = [
  {
    name: "Pinpoint",
    meta: "QHacks winner",
    imageSrc: "/pinpoint.svg",
    href: "https://www.usepinpoint.ca/",
    blurb:
      "Map-based student housing idea that won QHacks and later grew into the Pinpoint startup.",
  },
  {
    name: "Kingston 311 AI Assistant",
    meta: "King's Hack / Mayor's Cup",
    imageSrc: "/city%20of%20kingston.webp",
    href: "https://github.com/sapkota-aayush",
    blurb:
      "311 info assistant with citations and accessibility in mind, built around real city-service questions.",
  },
  {
    name: "McHacks X Backboard",
    meta: "McHacks",
    imageSrc: "/vojurlogo.png",
    href: "https://youtu.be/wQ7zC5duaws?si=eGpU1GCfERASJAPf",
    blurb:
      "Realtime voice journaling concept in the Vojur direction, built fast under hackathon pressure.",
  },
  {
    name: "Love Is Blind / RedFlagr",
    meta: "Queen's Stupid Hackathon",
    imageSrc: "/LoveIsBlind.png",
    href: "https://devpost.com/software/love-is-blind-f35x4z",
    blurb:
      "A deliberately unhinged dating app matching people on worst traits and red flags.",
  },
  {
    name: "NGMI",
    meta: "Toronto Stupid Ideas Hackathon",
    imageSrc: "/NGMI.png",
    href: "https://devpost.com/software/ngmi",
    blurb:
      "Anti-productivity chaos: distractions, popups, memes, and a very questionable relationship with focus.",
  },
];

export function HackathonsPage({
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
          if (count >= HACKATHONS.length) {
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
          <div style={labelStyle(isMobile)}>journal · hackathons</div>
          <h1 style={titleStyle}>hackathons</h1>
          <p style={introStyle}>fast builds, weird constraints, useful reps.</p>
          <div style={{ marginTop: "var(--line)", paddingLeft: isMobile ? 0 : 24 }}>
            {HACKATHONS.map((hackathon, i) => (
              <HackathonEntry
                key={hackathon.name}
                hackathon={hackathon}
                visible={visibleCount > i}
              />
            ))}
          </div>
        </div>
        <PageCorner pageNumber="05" />
      </div>
    </PageAnimateContext.Provider>
  );
}

function HackathonEntry({
  hackathon,
  visible,
}: {
  hackathon: Hackathon;
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
        padding: "calc(var(--line) * 0.4) 16px",
        background:
          "color-mix(in srgb, var(--color-paper-warm) 72%, transparent)",
        border: "1px solid rgba(0,0,0,0.045)",
        borderRadius: 12,
        boxShadow: "0 10px 22px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <a href={hackathon.href} target="_blank" rel="noopener noreferrer" style={logoStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hackathon.imageSrc} alt="" style={imageStyle} draggable={false} />
      </a>
      <div>
        <div style={metaStyle}>{hackathon.meta}</div>
        <div style={nameStyle}>{hackathon.name}</div>
        <div style={bodyStyle}>{hackathon.blurb}</div>
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
  width: 86,
  height: 64,
  flexShrink: 0,
  transform: "rotate(2deg)",
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

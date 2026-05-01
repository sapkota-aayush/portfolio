"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { PageBackButton } from "../chrome/PageBackButton";
import { PageCorner } from "../chrome/PageCorner";
import { Paper } from "../chrome/Paper";
import {
  PageAnimateContext,
  usePageAnimate,
} from "../primitives/PageAnimateContext";

type Role = {
  company: string;
  title: string;
  dates: string;
  location?: string;
  logoSrc?: string;
  /** External URL the logo links to — the company's site. Optional so
   *  entries without a public link fall back to a non-interactive sticker. */
  companyUrl?: string;
  /** Fallback displayed in a sticker frame when no logo is available. */
  initials?: string;
  blurb: ReactNode;
  /** Rotation for the logo sticker, degrees. Tuned per role so the
   *  stickers don't all sit perfectly straight. */
  logoRotation: number;
  /** Background color for the sticker frame. Subtle variation per role. */
  stickerBg?: string;
};

type ExperienceGroup = {
  label: string;
  note: string;
  roles: Role[];
};

const EXPERIENCE_GROUPS: ExperienceGroup[] = [
  {
    label: "work experience",
    note: "actual roles, not the trophy shelf.",
    roles: [
      {
        company: "Empire Life",
        title: "Software Development Intern (Co-op)",
        dates: "Aug 2025 – Present",
        location: "Kingston / Hybrid",
        logoSrc: "/empirelife.png",
        companyUrl: "https://www.empire.ca/",
        logoRotation: -4,
        blurb: (
          <>
            Pipelines, containers, and cloud migration work inside a real
            enterprise codebase.
          </>
        ),
      },
      {
        company: "Pinpoint",
        title: "Founder",
        dates: "2026 – Present",
        location: "Kingston",
        logoSrc: "/pinpoint.svg",
        companyUrl: "https://www.usepinpoint.ca/",
        logoRotation: 3,
        blurb: (
          <>
            Building a student housing startup from QHacks into Kingston
            Economic Development&apos;s Summer Company program, with up to
            $3K funding.
          </>
        ),
      },
      {
        company: "Sustainable Kingston",
        title: "Software Developer",
        dates: "Aug 2024 – Apr 2025",
        location: "Hybrid",
        logoSrc: "/sustainablekingston.png",
        companyUrl: "https://www.sustainablekingston.com/",
        logoRotation: -3,
        blurb: (
          <>
            Worked across website development, design updates, analytics, and
            community-facing digital improvements.
          </>
        ),
      },
      {
        company: "Peer Tutor",
        title: "Arduino + programming fundamentals",
        dates: "Oct 2024 – Present",
        location: "Remote",
        logoSrc: "/33-335657_tutoring-clipart-tutor-icon-png.png",
        companyUrl: "https://github.com/sapkota-aayush",
        logoRotation: 5,
        blurb: (
          <>
            Tutoring programming and Arduino basics — making confusing class
            material feel buildable.
          </>
        ),
      },
    ],
  },
];

const ROLE_REVEAL_MS = 280;
const FIRST_ROLE_DELAY_MS = 650;

export function ExperiencePage({
  onClose,
  animate = true,
  sessionKey = 0,
}: {
  onClose: () => void;
  animate?: boolean;
  sessionKey?: number;
}) {
  const isMobile = useIsMobile();
  const totalRoles = EXPERIENCE_GROUPS.reduce(
    (count, group) => count + group.roles.length,
    0,
  );
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    if (!animate) return;

    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setVisibleCount(1);
      interval = window.setInterval(() => {
        setVisibleCount((count) => {
          if (count >= totalRoles) {
            if (interval !== undefined) window.clearInterval(interval);
            return count;
          }
          return count + 1;
        });
      }, ROLE_REVEAL_MS);
    }, FIRST_ROLE_DELAY_MS);

    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [animate, sessionKey, totalRoles]);

  let roleIndex = 0;

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
          // Ruled lines travel with the content on scroll. background-
          // attachment: local binds the bg to the content so the rules
          // move together with the text — without it the bg sticks to
          // the scroll container and text drifts across fixed rules.
          backgroundImage: "var(--rule-background)",
          backgroundAttachment: "local",
        }}
      >
        <PageBackButton onClose={onClose} />

        {/* Page label */}
        <div
          style={{
            position: "absolute",
            // Baseline floats 0.19 × --line above rule 2.
            top: "calc(var(--line) * 2.57 - var(--fs-meta) * 0.86)",
            left: isMobile
              ? "calc(44px + var(--pad-content))"
              : "calc(3% + var(--pad-chrome))",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-meta)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color:
              "color-mix(in srgb, var(--color-ink-soft) 55%, transparent)",
            lineHeight: 1,
          }}
        >
          journal · experience
        </div>

        {/* Page title */}
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
          experience
        </h1>

        <p
          style={{
            fontFamily: "var(--font-script)",
            fontSize: "var(--fs-body)",
            color: "var(--color-ink)",
            lineHeight: "var(--line)",
            margin: 0,
            maxWidth: 620,
          }}
        >
          the actual work history. awards, startup updates, and leadership
          moments live in highlights.
        </p>

        {/* Role list — small left indent keeps entries off the margin
            rule without the old timeline gutter. */}
        <div
          style={{
            position: "relative",
            marginTop: "var(--line)",
            paddingLeft: isMobile ? 0 : 24,
          }}
        >
          {EXPERIENCE_GROUPS.map((group) => (
            <section key={group.label} style={{ marginBottom: "var(--line)" }}>
              <GroupHeader group={group} active={visibleCount > roleIndex} />
              {group.roles.map((role) => {
                const currentIndex = roleIndex;
                roleIndex += 1;
                return (
                  <RoleEntry
                    key={`${role.company}-${role.title}`}
                    role={role}
                    visible={visibleCount > currentIndex}
                  />
                );
              })}
            </section>
          ))}
        </div>
      </div>

      <PageCorner pageNumber="02" />
    </div>
    </PageAnimateContext.Provider>
  );
}

// ── Role entry ────────────────────────────────────────────────────────

function GroupHeader({
  group,
  active,
}: {
  group: ExperienceGroup;
  active: boolean;
}) {
  return (
    <div
      style={{
        marginTop: "calc(var(--line) * 2)",
        marginBottom: "var(--line)",
        opacity: active ? 1 : 0.18,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-meta)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-ink-faint)",
          lineHeight: "var(--line)",
        }}
      >
        {group.label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-script)",
          fontSize: "var(--fs-script)",
          color: "var(--color-ink-soft)",
          lineHeight: "var(--line)",
          maxWidth: 600,
        }}
      >
        {group.note}
      </div>
    </div>
  );
}

function RoleEntry({ role, visible }: { role: Role; visible: boolean }) {
  const pageAnimate = usePageAnimate();
  const shown = pageAnimate && visible;
  return (
    <div
      style={{
        position: "relative",
        // Integer-line-multiple gap so every role's text lands on a rule.
        // Half-line values (e.g. 2.5) push odd/even roles off-grid.
        marginBottom: "calc(var(--line) * 2)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Header row: dates + company + logo sticker */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          // No inter-element spacing here so blurb's top lands exactly at
          // (role top + 3 × --line) — keeps the grid intact.
          minHeight: "calc(var(--line) * 2)",
        }}
      >
        <LogoSticker role={role} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Dates — small, mono, ink-faint */}
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
            {role.dates}
            {role.location ? (
              <span style={{ opacity: 0.6 }}> · {role.location}</span>
            ) : null}
          </div>
          {/* Company name — big handwriting */}
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-md)",
              fontWeight: 500,
              color: "var(--color-ink)",
              lineHeight: "var(--line)",
            }}
          >
            {role.company}
          </div>
          {/* Role title — italic Caveat, a shade softer */}
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "var(--fs-script)",
              fontStyle: "italic",
              color: "var(--color-ink-soft)",
              lineHeight: "var(--line)",
            }}
          >
            {role.title}
          </div>
        </div>
      </div>

      {/* Blurb — primary body text, sits on the ruled grid. Uses --fs-body
          (not --fs-script) so its baseline lands on the rule at 0.76 ×
          --line; smaller --fs-script has a higher baseline fraction
          (~0.72) that drifts above the rule. */}
      <div
        style={{
          fontFamily: "var(--font-script)",
          fontSize: "var(--fs-body)",
          fontWeight: 400,
          color: "var(--color-ink)",
          lineHeight: "var(--line)",
          maxWidth: 560,
        }}
      >
        {role.blurb}
      </div>
    </div>
  );
}

// ── Logo sticker ──────────────────────────────────────────────────────

function LogoSticker({ role }: { role: Role }) {
  const size = 70;
  const bg = role.stickerBg ?? "#fbfaf4";

  const inner = (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        padding: 4,
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {role.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={role.logoSrc}
          alt={`${role.company} logo`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
          draggable={false}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-script)",
            fontSize: "var(--fs-body)",
            fontWeight: 500,
            color: "var(--color-ink)",
            opacity: 0.75,
          }}
        >
          {role.initials ?? role.company.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );

  const baseStyle: React.CSSProperties = {
    display: "block",
    width: size,
    height: size,
    flexShrink: 0,
    transform: `rotate(${role.logoRotation}deg)`,
    filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.22))",
    transition:
      "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 260ms ease",
    cursor: role.companyUrl ? "pointer" : "default",
    textDecoration: "none",
    color: "inherit",
  };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = `rotate(${role.logoRotation}deg) scale(1.06)`;
    e.currentTarget.style.filter =
      "drop-shadow(3px 5px 9px rgba(0,0,0,0.28))";
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = `rotate(${role.logoRotation}deg) scale(1)`;
    e.currentTarget.style.filter =
      "drop-shadow(2px 3px 6px rgba(0,0,0,0.22))";
  };

  // Wrap in an <a> when a companyUrl is present, otherwise fall back to a
  // non-interactive div so the sticker is a keyboard-accessible link only
  // when it has somewhere to go.
  if (role.companyUrl) {
    return (
      <a
        href={role.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${role.company} website (opens in new tab)`}
        style={baseStyle}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <div style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {inner}
    </div>
  );
}

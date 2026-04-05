'use client'

import Image from 'next/image'
import { hackathons } from '@/lib/constants'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'

export default function Hackathon() {
  return (
    <section id="hackathons" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading>Hackathons</SectionHeading>
          <div className="card-surface p-5 md:p-6">
            <div className="relative space-y-6">
              {hackathons.map((hackathon, index) => (
                <div key={index} className="relative">
                  {index < hackathons.length - 1 && (
                    <div className="absolute bottom-0 left-[13px] top-14 w-px bg-line/80 md:left-[15px]" />
                  )}
                  <div className="relative mb-3 flex flex-col gap-3 pl-11 md:flex-row md:items-start md:justify-between md:pl-12">
                    <div className="absolute left-0 top-0.5 h-9 w-9 overflow-hidden rounded-md border border-line/90 bg-elevated md:h-10 md:w-10">
                      {hackathon.image ? (
                        <Image
                          src={hackathon.image}
                          alt=""
                          fill
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <div className="h-full w-full bg-line/40" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-base font-semibold text-ink md:text-lg">
                        <span className="italic">{hackathon.name}</span>
                        {'achievement' in hackathon && hackathon.achievement && (
                          <span className="relative overflow-hidden rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                            <span className="relative z-10">Winner</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-ink-subtle md:text-base">
                        {hackathon.hackathon}
                        {hackathon.period && ` • ${hackathon.period}`}
                      </p>
                    </div>
                  </div>
                  <div className="pl-11 md:pl-12">
                    <p className="mb-3 text-sm leading-snug text-ink-muted md:text-base">
                      {Array.isArray(hackathon.description)
                        ? hackathon.description.join(' ')
                        : hackathon.description}
                      {hackathon.technologies.length > 0 && (
                        <span className="italic text-ink-subtle">
                          {' '}
                          ({hackathon.technologies.join(', ')})
                        </span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {hackathon.projectLink && (
                        <a
                          href={hackathon.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View project
                        </a>
                      )}
                      {hackathon.devPostLink && (
                        <a
                          href={hackathon.devPostLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .69-.07.87-.23.17-.16.26-.43.26-.82 0-.38-.09-.65-.27-.81zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29 1.07.29 1.64v5.21c0 .57-.02 1.21-.28 1.64-.21.33-.52.52-.76.66zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.12.01-3.16.29-3.38.3-.3.9-.3 1.25-.03l.26.23v1.27zm3.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.24-.32-.51-.79-.56-1.24l-.02-.02v-1.48c0-1.28-.02-1.48-.15-1.7-.13-.23-.35-.4-.66-.52-.23-.11-.29-.11-.54-.06-.26.05-.38.15-.5.38l-.05.08v1.6c0 .84.01 1.59.04 1.78.05.3.15.45.33.57.23.16.55.21 1.06.21h.66l.02-2.59.02-2.59h1.52c.97 0 1.37.02 1.58.15.3.18.44.53.44 1.1 0 .63-.19 1.05-.57 1.31-.3.2-.78.25-1.52.28l-.68.04v1.26c.02.04.06.13.1.2.06.12.13.2.2.25.1.08.2.12.4.12.18 0 .28-.03.38-.1.14-.1.24-.3.31-.62l.02-.02v-1.24h-.01z" />
                          </svg>
                          Devpost
                        </a>
                      )}
                      {hackathon.github && (
                        <a
                          href={hackathon.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                          aria-label={`${hackathon.name} GitHub`}
                        >
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                      {hackathon.video && (
                        <a
                          href={hackathon.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Watch recording (~13:00)
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

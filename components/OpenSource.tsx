'use client'

import Image from 'next/image'
import { openSource } from '@/lib/constants'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'

export default function OpenSource() {
  return (
    <section id="opensource" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Open source</SectionHeading>
          <div className="space-y-6">
            {openSource.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-surface p-5 md:p-6"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <h3 className="break-words text-base font-bold text-ink sm:text-lg md:text-xl">
                    {item.name}
                  </h3>
                  {item.name === 'Numaflow' && (
                    <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12 md:h-16 md:w-16">
                      <div className="relative h-full w-full rounded-full border border-line/90 bg-tint p-2">
                        <Image
                          src="/numaflow.png"
                          alt="Numaflow"
                          fill
                          className="rounded-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-block rounded-md border border-line/80 bg-tint px-2 py-1 text-xs text-ink-muted md:text-sm">
                      {item.type}
                    </span>
                  </div>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 self-start p-1 text-ink-muted transition-colors hover:text-ink sm:self-auto"
                    aria-label={`${item.name} GitHub`}
                  >
                    <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
                <p className="mb-3 text-sm leading-snug text-ink-muted md:text-base">
                  {item.description}
                  {item.technologies.length > 0 && (
                    <span className="italic text-ink-subtle">
                      {' '}
                      ({item.technologies.join(', ')})
                    </span>
                  )}
                </p>
                {item.prLinks && item.prLinks.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2 sm:gap-3">
                    {item.prLinks.map((pr: any, prIndex: number) => (
                      <a
                        key={prIndex}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm sm:min-h-0 md:text-base"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        {pr.title}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


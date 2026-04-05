'use client'

import { projects } from '@/lib/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading>Things I&apos;m working on</SectionHeading>
          <div className="card-surface p-5 md:p-6">
            <div className="relative space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="relative">
                  {index < projects.length - 1 && (
                    <div className="absolute bottom-0 left-[13px] top-14 w-px bg-line/80 md:left-[15px]" />
                  )}
                  <div className="relative mb-3 flex flex-col gap-3 pl-11 md:flex-row md:items-start md:justify-between md:pl-12">
                    <div className="absolute left-0 top-0.5 h-9 w-9 overflow-hidden rounded-md border border-line/90 bg-elevated md:h-10 md:w-10">
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt=""
                          fill
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <div className="h-full w-full bg-line/40" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="flex flex-wrap items-center gap-2 text-base font-semibold text-ink md:text-lg">
                        <span className="font-semibold italic">{project.name}</span>
                        {project.beta && (
                          <span className="relative overflow-hidden rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
                            <span className="relative z-10">Beta</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-ink-subtle md:text-base">{project.period}</p>
                    </div>
                  </div>
                  <div className="pl-11 md:pl-12">
                    <p className="mb-3 text-sm leading-snug text-ink-muted md:text-base">
                      {Array.isArray(project.description)
                        ? project.description.join(' ')
                        : project.description}
                      {project.technologies.length > 0 && (
                        <span className="italic text-ink-subtle">
                          {' '}
                          ({project.technologies.join(', ')})
                        </span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.downloadLink && (
                        <a
                          href={project.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </a>
                      )}
                      {project.video && (
                        <a
                          href={project.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex min-h-[44px] items-center gap-1 py-1 text-sm md:min-h-0 md:text-base"
                        >
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Watch demo
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

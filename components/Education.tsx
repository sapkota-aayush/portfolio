'use client'

import Image from 'next/image'
import { education } from '@/lib/constants'
import { motion } from 'framer-motion'
export default function Education() {
  return (
    <section id="education" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="flex items-start gap-2.5 text-lg font-semibold text-ink md:text-xl">
              <span className="shrink-0 select-none" aria-hidden>
                ◆
              </span>
              <span>Education</span>
            </h2>
            <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16 md:h-20 md:w-20">
              <div className="relative h-full w-full rounded-full border border-line/90 bg-tint p-2">
                <Image
                  src="/slc.webp"
                  alt="St. Lawrence College"
                  fill
                  className="rounded-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="card-surface p-5 md:p-6">
            <h3 className="mb-2 text-lg font-bold text-ink md:text-xl">{education.degree}</h3>
            <p className="mb-1 text-base text-ink-muted md:text-lg">{education.institution}</p>
            <p className="mb-2 text-sm text-ink-subtle md:text-base">{education.location}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <p className="text-sm text-ink-subtle md:text-base">{education.period}</p>
              <span className="inline-block w-fit rounded-md border border-line/80 bg-tint px-2 py-1 text-xs text-ink-muted md:text-sm">
                {education.status}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

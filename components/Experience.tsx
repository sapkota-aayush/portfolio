'use client'

import Image from 'next/image'
import { experience } from '@/lib/constants'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card-surface p-5 md:p-6"
              >
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold text-ink md:text-lg">
                        {exp.title}
                      </h3>
                      {(exp.company === 'Empire Life' ||
                        exp.company === 'Sustainable Kingston' ||
                        exp.company === 'Self-Employed') && (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line/90 bg-tint md:h-12 md:w-12">
                          <Image
                            src={
                              exp.company === 'Empire Life'
                                ? '/empirelife.png'
                                : exp.company === 'Sustainable Kingston'
                                  ? '/sustainablekingston.png'
                                  : '/33-335657_tutoring-clipart-tutor-icon-png.png'
                            }
                            alt=""
                            fill
                            className="object-contain p-1.5"
                          />
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-ink-muted md:text-base">
                      <span className="font-semibold italic">{exp.company}</span>
                      <span className="text-ink-subtle"> · {exp.location}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1 md:items-end">
                    <p className="text-xs text-ink-subtle md:text-sm">{exp.period}</p>
                    <span className="inline-block rounded-md border border-line/80 bg-tint px-2 py-0.5 text-xs text-ink-muted">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-snug text-ink-muted md:text-base">
                  {Array.isArray(exp.description)
                    ? exp.description.join(' ')
                    : exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

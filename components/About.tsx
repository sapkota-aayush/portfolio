'use client'

import { personalInfo } from '@/lib/constants'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'

export default function About() {
  return (
    <section id="about" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading>About</SectionHeading>
          <p className="text-base leading-relaxed text-ink-muted md:text-lg">
            {personalInfo.about}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

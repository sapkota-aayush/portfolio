'use client'

import { personalInfo } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">About</h2>
          <p className="text-base md:text-lg text-brown-700 leading-relaxed">
            {personalInfo.about}
          </p>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import Image from 'next/image'
import { education } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-6 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold text-brown-900">Education</h2>
            <motion.div
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-brown-100 to-brown-200 shadow-xl border-2 border-brown-400/60 p-2 ring-2 ring-brown-300/40">
                <Image
                  src="/slc.webp"
                  alt="St. Lawrence College"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            </motion.div>
          </div>
          <div className="bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-brown-300/40 p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-brown-900 mb-2">{education.degree}</h3>
            <p className="text-base md:text-lg text-brown-700 mb-1">{education.institution}</p>
            <p className="text-sm md:text-base text-brown-600 mb-2">{education.location}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-sm md:text-base text-brown-600">{education.period}</p>
              <span className="inline-block px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm w-fit">
                {education.status}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import Image from 'next/image'
import { experience } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Experience() {
  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-brown-300/40 p-5 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 sm:gap-4 mb-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-brown-900 break-words">{exp.title}</h3>
                      {(exp.company === "Empire Life" || exp.company === "Sustainable Kingston" || exp.company === "Self-Employed") && (
                        <motion.div
                          className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex-shrink-0"
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
                            src={
                              exp.company === "Empire Life" ? "/empirelife.png" :
                              exp.company === "Sustainable Kingston" ? "/sustainablekingston.png" :
                              "/33-335657_tutoring-clipart-tutor-icon-png.png"
                            }
                              alt={exp.company}
                              fill
                              className="object-contain rounded-full"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-brown-700 break-words">{exp.company}</p>
                  </div>
                  <div className="text-left md:text-right mt-1 md:mt-0 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-1 sm:gap-2 md:gap-1">
                    <p className="text-xs sm:text-sm md:text-base text-brown-600 whitespace-nowrap">{exp.period}</p>
                    <span className="inline-block px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm whitespace-nowrap">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm md:text-base text-brown-600 mb-2">{exp.location}</p>
                <ul className="text-sm md:text-base text-brown-700 leading-relaxed list-disc list-inside space-y-1">
                  {Array.isArray(exp.description) ? (
                    exp.description.map((point: string, idx: number) => (
                      <li key={idx}>{point}</li>
                    ))
                  ) : (
                    <li>{exp.description}</li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


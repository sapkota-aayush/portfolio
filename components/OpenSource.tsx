'use client'

import Image from 'next/image'
import { openSource } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function OpenSource() {
  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">Open Source Contributions</h2>
          <div className="space-y-6">
            {openSource.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-brown-300/40 p-5 md:p-6"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-brown-900 break-words">{item.name}</h3>
                  {item.name === "Numaflow" && (
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
                          src="/numaflow.png"
                          alt="Numaflow"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <div>
                    <span className="inline-block px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm">
                      {item.type}
                    </span>
                  </div>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown-700 hover:text-brown-900 transition-colors flex-shrink-0 self-start sm:self-auto p-1"
                    aria-label={`${item.name} GitHub`}
                  >
                    <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-sm md:text-base text-brown-700 mb-3 leading-relaxed">{item.description}</p>
                {item.prLinks && item.prLinks.length > 0 && (
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
                    {item.prLinks.map((pr: any, prIndex: number) => (
                      <a
                        key={prIndex}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline py-1 min-h-[44px] sm:min-h-0"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        {pr.title}
                      </a>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


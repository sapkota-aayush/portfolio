'use client'

import { projects } from '@/lib/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Projects() {
  return (
    <section id="projects" className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">Projects</h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-brown-300/40 p-5 md:p-6"
          >
            <div className="space-y-4 relative">
              {projects.map((project, index) => (
                <div key={index} className="relative">
                  {index < projects.length - 1 && (
                    <div className="absolute left-[11px] sm:left-4 top-12 sm:top-14 bottom-0 w-0.5 bg-brown-300" />
                  )}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 pl-10 sm:pl-12 md:pl-14 relative">
                    <motion.div
                      className="absolute left-0 top-0.5 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-brown-100 border-2 border-brown-300/60 flex-shrink-0 ring-2 ring-brown-200/60"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={project.name}
                          fill
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <div className="w-full h-full bg-brown-300 rounded-full" />
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-brown-800 break-words flex items-center gap-2">
                        {project.name}
                        {project.beta && (
                          <span className="relative px-2 py-0.5 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-white text-xs rounded-full font-semibold shadow-md overflow-hidden">
                            <span className="relative z-10">Beta</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                          </span>
                        )}
                      </h3>
                      <p className="text-sm md:text-base text-brown-600">
                        {project.period}
                      </p>
                    </div>
                  </div>
                  <div className="pl-10 sm:pl-12 md:pl-14">
                    {Array.isArray(project.description) ? (
                      <ul className="list-disc list-inside text-sm md:text-base text-brown-700 mb-4 leading-relaxed space-y-1">
                        {project.description.map((point, descIndex) => (
                          <li key={descIndex}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-2">{project.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline py-1 min-h-[44px] sm:min-h-0"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline py-1 min-h-[44px] sm:min-h-0"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.downloadLink && (
                        <a
                          href={project.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline py-1 min-h-[44px] sm:min-h-0"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Package
                        </a>
                      )}
                      {project.video && (
                        <a
                          href={project.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline py-1 min-h-[44px] sm:min-h-0"
                        >
                          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                          Watch Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

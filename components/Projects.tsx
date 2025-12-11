'use client'

import { projects } from '@/lib/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Projects() {
  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-brown-300/40"
              >
                {/* Image/Video Preview */}
                {(project.image || project.video) && (
                  <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-brown-100 to-brown-200 overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : project.video ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/20" />
                        <a
                          href={project.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 flex items-center justify-center w-20 h-20 bg-brown-600 rounded-full hover:bg-brown-700 transition-colors shadow-xl group-hover:scale-110 transition-transform"
                          aria-label={`Watch ${project.name} demo`}
                        >
                          <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </a>
                        <div className="absolute bottom-4 left-4 text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded">
                          Watch Demo
                        </div>
                      </div>
                    ) : null}
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-brown-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-brown-900 group-hover:text-brown-700 transition-colors break-words">
                        {project.name}
                      </h3>
                      {project.logo && (
                        <motion.div
                          className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex-shrink-0"
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
                          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-brown-100 to-brown-200 shadow-xl border-2 border-brown-400/60 p-2 ring-2 ring-brown-300/40">
                            <Image
                              src={project.logo}
                              alt={project.name}
                              fill
                              className="object-contain rounded-full"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brown-700 hover:text-brown-900 transition-colors flex-shrink-0 self-start sm:self-auto"
                      aria-label={`${project.name} GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>

                  {Array.isArray(project.description) ? (
                    <ul className="list-disc list-inside text-sm md:text-base text-brown-700 mb-4 leading-relaxed space-y-1">
                      {project.description.map((point, descIndex) => (
                        <li key={descIndex}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm md:text-base text-brown-700 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-brown-200 text-brown-800 rounded text-xs md:text-sm">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors font-semibold text-sm md:text-base shadow-md hover:shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.video && !project.image && (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-brown-500 text-white rounded-md hover:bg-brown-600 transition-colors font-semibold text-sm md:text-base shadow-md hover:shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Watch Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { leadership } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Leadership() {
  // Group Toastmasters entries together
  const groupedLeadership = leadership.reduce((acc, role, index) => {
    if (role.organization === "Toastmasters International") {
      if (!acc.toastmasters) {
        acc.toastmasters = [];
      }
      acc.toastmasters.push({ ...role, originalIndex: index });
    } else {
      acc.others.push({ ...role, originalIndex: index });
    }
    return acc;
  }, { toastmasters: [] as any[], others: [] as any[] });

  // Combine: others first, then toastmasters grouped together
  const displayOrder = [...groupedLeadership.others, ...(groupedLeadership.toastmasters.length > 0 ? [{ isToastmastersGroup: true, entries: groupedLeadership.toastmasters }] : [])];

  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">Leadership</h2>
          <div className="space-y-6">
            {displayOrder.map((item, groupIndex) => {
              if (item.isToastmastersGroup) {
                return (
                  <motion.div
                    key="toastmasters-group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-brown-300/40 p-5 md:p-6"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-brown-900 break-words">Toastmasters International</h3>
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
                            src="/Toastmasters_2011.png"
                            alt="Toastmasters International"
                            fill
                            className="object-contain rounded-full"
                          />
                        </div>
                      </motion.div>
                    </div>
                    <div className="relative w-full max-w-md h-48 sm:h-56 mb-4 rounded overflow-hidden bg-brown-100">
                      <Image
                        src="/toastmasters.jpeg"
                        alt="Toastmasters International"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-4 relative">
                      {item.entries.map((role: any, index: number) => (
                        <div key={`toastmasters-${index}`} className="relative">
                          {index < item.entries.length - 1 && (
                            <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-brown-300"></div>
                          )}
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 pl-6 relative">
                            <div className="absolute left-0 top-2 w-3 h-3 bg-brown-400 rounded-full border-2 border-white"></div>
                            <div className="flex-1">
                              <p className="text-base md:text-lg font-semibold text-brown-800">{role.role}</p>
                              <p className="text-sm md:text-base text-brown-600">{role.period}</p>
                            </div>
                          </div>
                          <div className="pl-6">
                            <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-2">{role.description}</p>
                            {role.achievement && (
                              <p className="text-sm md:text-base text-brown-800 font-medium italic">🏆 {role.achievement}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              }
              
              const role = item;
              return (
                <motion.div
                key={role.originalIndex || groupIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                className="bg-[#fefcf9] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 border border-brown-300/40 p-5 md:p-6"
              >
                {role.organization === "HackSLC" && (
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-lg md:text-xl font-semibold text-brown-900">{role.organization}</h3>
                    <motion.div
                      className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
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
                          src="/hackSLC-removebg-preview.png"
                          alt="HackSLC"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                    </motion.div>
                  </div>
                )}
                {role.organization && role.organization !== "HackSLC" && (
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-brown-900">{role.organization}</h3>
                      <p className="text-base md:text-lg text-brown-700">{role.role}</p>
                    </div>
                    <p className="text-sm md:text-base text-brown-600 mt-1 md:mt-0">{role.period}</p>
                  </div>
                )}
                {role.image && (
                  <a
                    href={role.articleLink || role.eventLink || role.devPostLink || '#'}
                    target={role.articleLink || role.eventLink || role.devPostLink ? "_blank" : undefined}
                    rel={role.articleLink || role.eventLink || role.devPostLink ? "noopener noreferrer" : undefined}
                    className="block relative w-full max-w-md h-48 mb-4 rounded overflow-hidden bg-brown-100 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Image
                      src={role.image}
                      alt={role.organization}
                      fill
                      className="object-cover"
                    />
                  </a>
                )}
                {role.organization === "HackSLC" && (
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <p className="text-base md:text-lg text-brown-700">{role.role}</p>
                    </div>
                    <p className="text-sm md:text-base text-brown-600 mt-1 md:mt-0">{role.period}</p>
                  </div>
                )}
                <p className="text-sm md:text-base text-brown-700 leading-relaxed mb-3">{role.description}</p>
                {role.achievement && (
                  <p className="text-sm md:text-base text-brown-800 font-medium italic mb-3">🏆 {role.achievement}</p>
                )}
                {(role.eventLink || role.devPostLink || role.articleLink) && (
                  <div className="flex flex-wrap gap-3 items-center">
                      {role.eventLink && (
                        <a
                          href={role.eventLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Event
                        </a>
                      )}
                      {role.devPostLink && (
                        <a
                          href={role.devPostLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .69-.07.87-.23.17-.16.26-.43.26-.82 0-.38-.09-.65-.27-.81zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29 1.07.29 1.64v5.21c0 .57-.02 1.21-.28 1.64-.21.33-.52.52-.76.66zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.12.01-3.16.29-3.38.3-.3.9-.3 1.25-.03l.26.23v1.27zm3.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.24-.32-.51-.79-.56-1.24l-.02-.02v-1.48c0-1.28-.02-1.48-.15-1.7-.13-.23-.35-.4-.66-.52-.23-.11-.29-.11-.54-.06-.26.05-.38.15-.5.38l-.05.08v1.6c0 .84.01 1.59.04 1.78.05.3.15.45.33.57.23.16.55.21 1.06.21h.66l.02-2.59.02-2.59h1.52c.97 0 1.37.02 1.58.15.3.18.44.53.44 1.1 0 .63-.19 1.05-.57 1.31-.3.2-.78.25-1.52.28l-.68.04v1.26c.02.04.06.13.1.2.06.12.13.2.2.25.1.08.2.12.4.12.18 0 .28-.03.38-.1.14-.1.24-.3.31-.62l.02-.02v-1.24h-.01z"/>
                          </svg>
                          DevPost
                        </a>
                      )}
                      {role.articleLink && (
                        <a
                          href={role.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm md:text-base text-brown-700 hover:text-brown-900 transition-colors underline"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                          Article
                        </a>
                      )}
                    </div>
                )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import Image from 'next/image'
import { leadership } from '@/lib/constants'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'

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
    <section id="leadership" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>Leadership</SectionHeading>
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
                    className="card-surface p-5 md:p-6"
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                      <h3 className="break-words text-base font-bold text-ink sm:text-lg md:text-xl">
                        Toastmasters International
                      </h3>
                      <div className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16 md:h-20 md:w-20">
                        <div className="relative h-full w-full rounded-full border border-line/90 bg-tint p-2">
                          <Image
                            src="/Toastmasters_2011.png"
                            alt="Toastmasters International"
                            fill
                            className="rounded-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative mb-4 h-48 w-full max-w-md overflow-hidden rounded-lg bg-tint sm:h-56">
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
                            <div className="absolute bottom-0 left-0 top-8 w-0.5 bg-line/90" />
                          )}
                          <div className="relative mb-2 flex flex-col pl-6 md:flex-row md:items-start md:justify-between">
                            <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-elevated bg-blue-600 dark:bg-blue-500" />
                            <div className="flex-1">
                              <p className="text-base font-semibold text-ink-muted md:text-lg">{role.role}</p>
                              <p className="text-sm text-ink-subtle md:text-base">{role.period}</p>
                            </div>
                          </div>
                          <div className="pl-6">
                            <p className="text-sm leading-snug text-ink-muted md:text-base">
                              {role.description}
                              {role.achievement && (
                                <span className="italic text-ink-subtle">
                                  {' '}
                                  · {role.achievement}
                                </span>
                              )}
                            </p>
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
                className="card-surface p-5 md:p-6"
              >
                {role.organization === "HackSLC" && (
                  <div className="mb-4 flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-ink md:text-xl">{role.organization}</h3>
                    <div className="relative h-16 w-16 shrink-0 md:h-20 md:w-20">
                      <div className="relative h-full w-full rounded-full border border-line/90 bg-tint p-2">
                        <Image
                          src="/hackSLC-removebg-preview.png"
                          alt="HackSLC"
                          fill
                          className="rounded-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {role.organization && role.organization !== "HackSLC" && (
                  <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-ink md:text-xl">{role.organization}</h3>
                      <p className="text-base text-ink-muted md:text-lg">{role.role}</p>
                    </div>
                    <p className="mt-1 text-sm text-ink-subtle md:mt-0 md:text-base">{role.period}</p>
                  </div>
                )}
                {role.image && (
                  <a
                    href={role.articleLink || role.eventLink || role.devPostLink || '#'}
                    target={role.articleLink || role.eventLink || role.devPostLink ? "_blank" : undefined}
                    rel={role.articleLink || role.eventLink || role.devPostLink ? "noopener noreferrer" : undefined}
                    className="relative mb-4 block h-48 w-full max-w-md cursor-pointer overflow-hidden rounded-lg bg-tint transition-opacity hover:opacity-90"
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
                  <div className="mb-2 flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-base text-ink-muted md:text-lg">{role.role}</p>
                    </div>
                    <p className="mt-1 text-sm text-ink-subtle md:mt-0 md:text-base">{role.period}</p>
                  </div>
                )}
                <p className="mb-3 text-sm leading-snug text-ink-muted md:text-base">
                  {role.description}
                  {role.achievement && (
                    <span className="italic text-ink-subtle">
                      {' '}
                      · {role.achievement}
                    </span>
                  )}
                </p>
                {(role.eventLink || role.devPostLink || role.articleLink) && (
                  <div className="flex flex-wrap gap-3 items-center">
                      {role.eventLink && (
                        <a
                          href={role.eventLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline flex items-center gap-1 text-sm md:text-base"
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
                          className="link-inline flex items-center gap-1 text-sm md:text-base"
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
                          className="link-inline flex items-center gap-1 text-sm md:text-base"
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


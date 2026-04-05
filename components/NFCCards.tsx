'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { socialLinks } from '@/lib/constants'

const nfcImages = [
  "/menfc1.png",
  "/menfc2.png",
  "/slcnfc.png",
]

export default function NFCCards() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % nfcImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + nfcImages.length) % nfcImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % nfcImages.length)
  }

  return (
    <section id="side-hustle" className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="flex items-start gap-2.5 text-lg font-semibold text-ink md:text-xl">
              <span className="shrink-0 select-none" aria-hidden>
                ◆
              </span>
              <span>Side hustle</span>
            </h2>
            <div className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12 md:h-14 md:w-14">
              <div className="relative h-full w-full rounded-full border border-line/90 bg-tint p-2">
                <Image
                  src="/nfclogo.webp"
                  alt="NFC Logo"
                  fill
                  className="rounded-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="card-surface p-4 md:p-6">
            <p className="mb-4 text-sm leading-relaxed text-ink-muted md:text-base">
              I do sell these as well! Digital business cards that work like smart networking cards. Tap your phone to instantly share your contact information, portfolio, and social links.
            </p>

            {/* Swiping Carousel */}
            <div className="relative h-[200px] md:h-[250px] mb-4 max-w-xl mx-auto">
              <div className="relative w-full h-full">
                {nfcImages.map((image, index) => {
                  const distance = Math.abs(index - currentIndex)
                  const isActive = index === currentIndex
                  const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === nfcImages.length - 1)
                  const isNext = index === currentIndex + 1 || (currentIndex === nfcImages.length - 1 && index === 0)
                  
                  let zIndex = 10
                  let scale = 0.85
                  let opacity = 0.3
                  let x = 0
                  let y = 0
                  let rotate = 0

                  if (isActive) {
                    zIndex = 50
                    scale = 1
                    opacity = 1
                    x = 0
                    y = 0
                    rotate = 0
                  } else if (isPrev) {
                    zIndex = 30
                    scale = 0.9
                    opacity = 0.6
                    x = -20
                    y = 10
                    rotate = -3
                  } else if (isNext) {
                    zIndex = 30
                    scale = 0.9
                    opacity = 0.6
                    x = 20
                    y = 10
                    rotate = 3
                  } else {
                    zIndex = 10
                    scale = 0.75
                    opacity = 0.2
                    x = index < currentIndex ? -60 : 60
                    y = 30
                    rotate = index < currentIndex ? -8 : 8
                  }

                  return (
                    <motion.div
                      key={index}
                      className="absolute inset-0 cursor-pointer"
                      style={{ zIndex }}
                      initial={false}
                      animate={{
                        scale,
                        opacity,
                        x,
                        y,
                        rotate,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      onClick={() => goToSlide(index)}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-tint shadow-2xl">
                        <Image
                          src={image}
                          alt={`NFC Card ${index + 1}`}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-elevated/90 p-2 text-ink shadow-lg backdrop-blur-sm transition-all hover:bg-elevated"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-elevated/90 p-2 text-ink shadow-lg backdrop-blur-sm transition-all hover:bg-elevated"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mb-4">
              {nfcImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-blue-600 dark:bg-blue-500'
                      : 'bg-line hover:bg-line/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Pricing and CTA */}
            <div className="rounded-lg border border-line/80 bg-tint p-2 md:p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="mb-0.5 text-xs font-semibold text-ink md:text-sm">
                    Custom NFC cards — $15
                  </p>
                  <p className="text-xs text-ink-muted">
                    Custom prints • Delivered within 1 day
                  </p>
                  <p className="mt-1 text-xs italic text-ink-subtle">
                    Contact if you want one. First impression is last impression.
                  </p>
                </div>
                <a
                  href={`mailto:${socialLinks.email}?subject=NFC Card Inquiry&body=Hi, I'm interested in ordering a custom NFC business card!`}
                  className="inline-flex shrink-0 items-center justify-center rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-elevated shadow-sm transition hover:opacity-90 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


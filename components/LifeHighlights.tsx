'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Highlight {
  image: string
  title: string
  description: string
  flipped?: boolean
  rotated?: boolean
}

const highlights: Highlight[] = [
  {
    image: "/kayaking.jpeg",
    title: "Kayaking",
    description: "",
    rotated: true,
  },
  {
    image: "/boxing.jpeg",
    title: "Boxing",
    description: "",
  },
  {
    image: "/productpitch.jpeg",
    title: "First Product Pitch",
    description: "",
  },
  {
    image: "/class speech.jpeg",
    title: "HackSLC Marketing",
    description: "",
  },
]

export default function LifeHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length)
  }

  return (
    <section className="py-6 md:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brown-900 mb-6">Life Highlights</h2>
          
          <div className="relative h-[250px] md:h-[300px] mb-4 max-w-lg mx-auto">
            {/* Stacked photos effect */}
            <div className="relative w-full h-full">
              {highlights.map((highlight, index) => {
                const distance = Math.abs(index - currentIndex)
                const isActive = index === currentIndex
                const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === highlights.length - 1)
                const isNext = index === currentIndex + 1 || (currentIndex === highlights.length - 1 && index === 0)
                
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
                } else if (distance === 2) {
                  zIndex = 20
                  scale = 0.8
                  opacity = 0.4
                  x = index < currentIndex ? -40 : 40
                  y = 20
                  rotate = index < currentIndex ? -5 : 5
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
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl bg-brown-100">
                      <Image
                        src={highlight.image}
                        alt={highlight.title}
                        fill
                        className="object-contain"
                        style={
                          highlight.rotated 
                            ? { transform: 'rotate(180deg) scaleX(-1)' } 
                            : highlight.flipped 
                            ? { transform: 'scaleX(-1)' } 
                            : undefined
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                        <h3 className="text-base md:text-lg font-bold">{highlight.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-brown-900 rounded-full p-2 shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/80 hover:bg-white text-brown-900 rounded-full p-2 shadow-lg transition-all"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-brown-600 w-8'
                    : 'bg-brown-300 hover:bg-brown-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


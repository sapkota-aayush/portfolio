'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface FloatingLogo {
  src: string
  alt: string
  size?: number // Size in pixels (default: 60)
  top?: string // Top position (e.g., "10%", "200px")
  left?: string // Left position
  right?: string // Right position
  bottom?: string // Bottom position
  delay?: number // Animation delay in seconds
  duration?: number // Animation duration in seconds
}

interface FloatingLogosProps {
  logos: FloatingLogo[]
}

export default function FloatingLogos({ logos }: FloatingLogosProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {logos.map((logo, index) => {
        const size = logo.size || 60
        const delay = logo.delay || 0
        const duration = logo.duration || 4

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: logo.top,
              left: logo.left,
              right: logo.right,
              bottom: logo.bottom,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, -8, 0],
              opacity: [0.7, 0.9, 0.7],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative h-full w-full rounded-full border border-line/90 bg-tint/95 p-2 shadow-xl backdrop-blur-sm transition-opacity hover:opacity-100">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain rounded-full"
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}


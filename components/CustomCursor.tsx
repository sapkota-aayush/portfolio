'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface CursorTrail {
  x: number
  y: number
  id: number
  timestamp: number
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<CursorTrail[]>([])
  const trailIdRef = useRef(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    // Only show cursor on devices with a mouse
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasMouse) return

    setIsVisible(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add trail point with throttling
      trailIdRef.current += 1
      setTrail((prev) => {
        const newTrail = [...prev, { 
          x: e.clientX, 
          y: e.clientY, 
          id: trailIdRef.current,
          timestamp: Date.now()
        }]
        // Keep only last 12 trail points
        return newTrail.slice(-12)
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsHovering(isInteractive)
    }

    // Clean up old trail points
    const cleanupTrail = () => {
      setTrail((prev) => {
        const now = Date.now()
        return prev.filter((point) => now - point.timestamp < 300)
      })
      rafRef.current = requestAnimationFrame(cleanupTrail)
    }
    rafRef.current = requestAnimationFrame(cleanupTrail)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Smooth trail */}
      {trail.map((point, index) => {
        const progress = index / (trail.length - 1 || 1)
        const opacity = progress * 0.4
        const size = 3 + progress * 5
        return (
          <motion.div
            key={point.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            initial={{ x: point.x, y: point.y, opacity: 0, scale: 0 }}
            animate={{ 
              x: point.x - size / 2, 
              y: point.y - size / 2,
              opacity: opacity,
              scale: 1
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className="rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: '#8b6b4f',
                boxShadow: `0 0 ${size * 2}px rgba(139, 107, 79, ${opacity * 0.8})`,
              }}
            />
          </motion.div>
        )
      })}

      {/* Main cursor - unified design */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 12 : 8),
          y: mousePosition.y - (isHovering ? 12 : 8),
          scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className="rounded-full border-2 relative overflow-hidden flex items-center justify-center"
          style={{
            width: isHovering ? 24 : 16,
            height: isHovering ? 24 : 16,
            borderColor: isHovering ? '#8b6b4f' : '#4f3d30',
            backgroundColor: isHovering ? 'rgba(139, 107, 79, 0.1)' : 'rgba(79, 61, 48, 0.05)',
            boxShadow: isHovering
              ? '0 0 25px rgba(139, 107, 79, 0.6), inset 0 0 20px rgba(139, 107, 79, 0.15)'
              : '0 0 15px rgba(79, 61, 48, 0.4)',
          }}
        >
          {/* Inner dot */}
          <div
            className="rounded-full"
            style={{
              width: isHovering ? 8 : 6,
              height: isHovering ? 8 : 6,
              backgroundColor: isHovering ? '#8b6b4f' : '#4f3d30',
              boxShadow: isHovering 
                ? '0 0 12px rgba(139, 107, 79, 0.8), inset 0 0 3px rgba(139, 107, 79, 0.3)'
                : '0 0 8px rgba(79, 61, 48, 0.7)',
            }}
          />
        </div>
      </motion.div>

      {/* Hover effect - orbiting particles */}
      {isHovering && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 pointer-events-none z-[9997]"
              initial={{
                x: mousePosition.x,
                y: mousePosition.y,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: mousePosition.x + (Math.cos((i * Math.PI * 2) / 8) * 35),
                y: mousePosition.y + (Math.sin((i * Math.PI * 2) / 8) * 35),
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: '#8b6b4f',
                  boxShadow: '0 0 8px rgba(139, 107, 79, 0.7)',
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full border"
          initial={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            width: 40,
            height: 40,
            opacity: 0.6,
            scale: 0.5,
          }}
          animate={{
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
          }}
          style={{
            borderColor: '#8b6b4f',
            boxShadow: '0 0 20px rgba(139, 107, 79, 0.4)',
          }}
        />
      )}
    </>
  )
}


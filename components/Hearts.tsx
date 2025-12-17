'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function Hearts() {
  const [heartCount, setHeartCount] = useState(20) // Start with 20 likes
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Fetch current like count from Supabase
    fetchHeartCount()
  }, [])

  const fetchHeartCount = async () => {
    try {
      const { data, error } = await supabase
        .from('hearts')
        .select('count')
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching heart count:', error)
        return
      }

      if (data) {
        setHeartCount(data.count || 20)
      }
    } catch (error) {
      console.error('Error fetching heart count:', error)
    }
  }

  const handleHeartClick = async () => {
    if (isAnimating) return

    setIsAnimating(true)
    const newCount = heartCount + 1
    setHeartCount(newCount)

    // Try to update Supabase, but don't revert if it fails
    // This allows the feature to work even if Supabase isn't set up
    try {
      const { error } = await supabase
        .from('hearts')
        .upsert({ id: 1, count: newCount }, { onConflict: 'id' })

      if (error) {
        console.error('Error updating like count in Supabase:', error)
        // Don't revert - keep the local increment
      }
    } catch (error) {
      console.error('Error updating like count:', error)
      // Don't revert - keep the local increment
    }

    setTimeout(() => {
      setIsAnimating(false)
    }, 500) // Reduced timeout for faster repeated clicks
  }

  return (
    <div className="py-2 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={handleHeartClick}
              disabled={isAnimating}
              className={`relative group ${
                isAnimating ? 'cursor-wait' : 'cursor-pointer hover:scale-110'
              } transition-transform duration-300`}
              aria-label="Leave a like"
            >
            <motion.div
              animate={isAnimating ? {
                scale: [1, 1.3, 1],
                rotate: [0, 8, -8, 0],
              } : {}}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 fill-red-400 group-hover:fill-red-500 transition-colors"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>

            {/* Floating hearts animation */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0, y: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [0, 1.2],
                        y: -30 - i * 8,
                        x: (i - 1) * 15,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                      }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <svg
                        className="w-5 h-5 fill-red-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </button>
          <p className="text-xs text-brown-500 opacity-70 animate-pulse">Tap</p>
          </div>

          <div className="text-center">
            <p className="text-xs md:text-sm text-brown-700 mb-1">
              Show some love
            </p>
            <p className="text-lg md:text-xl font-bold text-brown-900">
              {heartCount.toLocaleString()}
            </p>
            <p className="text-brown-600 text-xs">
              Likes
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


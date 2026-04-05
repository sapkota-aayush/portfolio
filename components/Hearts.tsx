'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const DEFAULT_LIKES = 20
const MAX_LIKES = 9_999_999

function sanitizeLikeCount(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number(raw)
  if (!Number.isFinite(n) || n < 0 || n > MAX_LIKES) {
    return DEFAULT_LIKES
  }
  return Math.floor(n)
}

export default function Hearts() {
  const [heartCount, setHeartCount] = useState(DEFAULT_LIKES)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    fetchHeartCount()
  }, [])

  const fetchHeartCount = async () => {
    try {
      const { data, error } = await supabase
        .from('hearts')
        .select('count')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching heart count:', error)
        return
      }

      if (data && data.count != null) {
        setHeartCount(sanitizeLikeCount(data.count))
      }
    } catch (error) {
      console.error('Error fetching heart count:', error)
    }
  }

  const handleHeartClick = async () => {
    if (isAnimating) return

    setIsAnimating(true)
    const safeBase = sanitizeLikeCount(heartCount)
    const newCount = Math.min(MAX_LIKES, safeBase + 1)
    setHeartCount(newCount)

    try {
      const { error } = await supabase
        .from('hearts')
        .upsert({ id: 1, count: newCount }, { onConflict: 'id' })

      if (error) {
        console.error('Error updating like count in Supabase:', error)
      }
    } catch (error) {
      console.error('Error updating like count:', error)
    }

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <section
      className="mt-12 border-t border-line/80 px-4 py-10"
      aria-label="Portfolio likes"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-4"
        >
          <button
            type="button"
            onClick={handleHeartClick}
            disabled={isAnimating}
            className={`relative rounded-full border border-line/90 bg-elevated p-3 shadow-sm transition hover:border-red-300/60 dark:hover:border-red-500/40 ${
              isAnimating ? 'cursor-wait' : 'cursor-pointer hover:scale-105 active:scale-95'
            }`}
            aria-label="Leave a like"
          >
            <motion.span
              animate={
                isAnimating
                  ? { scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }
                  : {}
              }
              transition={{ duration: 0.45 }}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <svg
                className="h-8 w-8 fill-red-500 transition-colors dark:fill-red-400"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.span>

            <AnimatePresence>
              {isAnimating && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 1, scale: 0, y: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [0, 1.1],
                        y: -28 - i * 6,
                        x: (i - 1) * 12,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.75, delay: i * 0.08 }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <svg
                        className="h-4 w-4 fill-red-500 dark:fill-red-400"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </motion.span>
                  ))}
                </>
              )}
            </AnimatePresence>
          </button>

          <div className="text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
              Likes
            </p>
            <p className="text-2xl font-semibold tabular-nums text-ink">
              {heartCount.toLocaleString()}
            </p>
            <p className="text-xs text-ink-muted">Tap the heart</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

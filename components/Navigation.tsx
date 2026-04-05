'use client'

import { useState, useEffect } from 'react'
import { personalInfo } from '@/lib/constants'
import { useTheme } from '@/components/ThemeProvider'

const navItems = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Hackathons', href: '#hackathons' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['hero', ...navItems.map((item) => item.href.slice(1))]
      const scrollPosition = window.scrollY + 96

      for (let i = ids.length - 1; i >= 0; i--) {
        const section = document.getElementById(ids[i])
        if (section) {
          const offsetTop =
            section.getBoundingClientRect().top + window.pageYOffset
          if (scrollPosition >= offsetTop) {
            setActiveSection(ids[i] === 'hero' ? '#hero' : `#${ids[i]}`)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-surface/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 md:py-3.5"
        aria-label="Main"
      >
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="font-script text-2xl text-ink hover:opacity-80 transition-opacity shrink-0"
        >
          {personalInfo.name}
        </a>

        <div className="hidden sm:flex items-center gap-1 md:gap-5 text-sm text-ink-muted">
          {navItems.map((item) => {
            const isActive = activeSection === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`px-1.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-ink font-medium'
                    : 'hover:text-ink'
                }`}
              >
                {item.name}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="sm:hidden flex items-center gap-0.5 overflow-x-auto max-w-[42vw] text-xs text-ink-muted scrollbar-none">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`shrink-0 px-1.5 py-1 rounded-md ${
                  activeSection === item.href
                    ? 'text-ink font-medium'
                    : ''
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/90 bg-elevated text-ink shadow-sm transition hover:bg-tint"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

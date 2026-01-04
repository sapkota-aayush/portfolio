'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '#hero', icon: 'home' },
  { name: 'Projects', href: '#projects', icon: 'folder' },
  { name: 'Experience', href: '#experience', icon: 'briefcase' },
  { name: 'Education', href: '#education', icon: 'education' },
  { name: 'Contact', href: '#contact', icon: 'contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(`#${sections[i]}`)
        if (section) {
          const offsetTop = section.getBoundingClientRect().top + window.pageYOffset
          if (scrollPosition >= offsetTop) {
            setActiveSection(`#${sections[i]}`)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 70
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const getIcon = (iconName: string) => {
    const isActive = activeSection === navItems.find(item => item.icon === iconName)?.href
    const iconClass = `w-5 h-5 ${isActive ? 'text-brown-900' : 'text-brown-600'}`
    
    switch (iconName) {
      case 'home':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'folder':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        )
      case 'briefcase':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'education':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'contact':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <nav className="fixed top-4 right-4 z-50">
      {/* Desktop: Horizontal Icon Bar */}
      <div className="hidden md:block">
        <div className="bg-[#fefcf9] rounded-full shadow-lg border border-brown-300/40 px-3 py-2.5">
          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative p-2.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-brown-100 text-brown-900'
                      : 'text-brown-600 hover:bg-brown-50 hover:text-brown-800'
                  }`}
                  title={item.name}
                  aria-label={item.name}
                >
                  <span className="w-5 h-5 block">
                    {getIcon(item.icon)}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Bottom Navigation */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-[#fefcf9] rounded-full shadow-lg border border-brown-300/40 px-2 py-2">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative p-2.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-brown-100 text-brown-900'
                      : 'text-brown-600 hover:bg-brown-50'
                  }`}
                  aria-label={item.name}
                >
                  <span className="w-5 h-5 block">
                    {getIcon(item.icon)}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}


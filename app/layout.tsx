import type { Metadata } from 'next'
import { Merriweather } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '900']
})

export const metadata: Metadata = {
  title: 'Aayush Sapkota - Software Developer • Toastmaster Public Speaker',
  description: 'Portfolio of Aayush Sapkota - Software Developer & Toastmaster Public Speaker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={merriweather.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}


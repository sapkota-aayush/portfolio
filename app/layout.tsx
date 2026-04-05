import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import { inter, caveat } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Aayush Sapkota - Software Developer • Toastmaster Public Speaker',
  description:
    'Portfolio of Aayush Sapkota - Software Developer & Toastmaster Public Speaker',
}

const themeInit = `
(function () {
  try {
    var k = 'portfolio-theme';
    var t = localStorage.getItem(k);
    if (t === 'dark' || t === 'light') {
      document.documentElement.classList.toggle('dark', t === 'dark');
      return;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${caveat.variable} font-sans min-h-screen`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

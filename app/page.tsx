import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Hackathon from '@/components/Hackathon'
import OpenSource from '@/components/OpenSource'
import Leadership from '@/components/Leadership'
import Education from '@/components/Education'
import LifeHighlights from '@/components/LifeHighlights'
import NFCCards from '@/components/NFCCards'
import Hearts from '@/components/Hearts'
import Contact from '@/components/Contact'
import FloatingLogos from '@/components/FloatingLogos'
import { floatingLogos } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen py-4 md:py-8 relative">
      {floatingLogos.length > 0 && <FloatingLogos logos={floatingLogos} />}
      <Hero />
      <About />
      <Projects />
      <Hackathon />
      <Experience />
      <OpenSource />
      <Leadership />
      <NFCCards />
      <Education />
      <LifeHighlights />
      <Contact />
      <Hearts />
    </main>
  )
}


import Navbar from '@/components/Navbar'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Products from '@/components/home/Products'
import Markets from '@/components/home/Markets'
import Services from '@/components/home/Services'
import MarketPerformance from '@/components/home/MarketPerformance'
import Diferentials from '@/components/home/Diferentials'
import MissionVisionValues from '@/components/home/MissionVisionValues'
import Contact from '@/components/home/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <About />
      <Products />

      {/* Products (white) → Markets (navy) */}
      <div className="wave-sep wave-sep--wn" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,38 C280,68 560,8 840,44 C1060,68 1280,24 1440,46 L1440,64 L0,64 Z" fill="#1B2B4B" />
        </svg>
      </div>

      <Markets />

      {/* Markets (navy) → Services (light) */}
      <div className="wave-sep wave-sep--nl" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,50 C240,18 480,62 720,36 C960,14 1200,54 1440,26 L1440,64 L0,64 Z" fill="#f8f8f4" />
        </svg>
      </div>

      <Services />

      {/* Services (light) → MarketPerformance (navy) */}
      <div className="wave-sep wave-sep--ln" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,26 C360,60 720,14 1080,50 C1260,68 1380,34 1440,42 L1440,64 L0,64 Z" fill="#1B2B4B" />
        </svg>
      </div>

      <MarketPerformance />
      <Diferentials />

      {/* Diferentials (navy) → MissionVisionValues (light) */}
      <div className="wave-sep wave-sep--nl" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,46 C400,14 800,60 1200,28 C1320,14 1400,42 1440,36 L1440,64 L0,64 Z" fill="#f8f8f4" />
        </svg>
      </div>

      <MissionVisionValues />

      {/* MissionVisionValues (light) → Contact (navy) */}
      <div className="wave-sep wave-sep--ln" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C480,66 960,10 1440,48 L1440,64 L0,64 Z" fill="#1B2B4B" />
        </svg>
      </div>

      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

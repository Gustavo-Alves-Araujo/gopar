import Navbar from '@/components/Navbar'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Products from '@/components/home/Products'
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
      <Services />
      <MarketPerformance />
      <Diferentials />
      <MissionVisionValues />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

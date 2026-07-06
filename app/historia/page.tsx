import NavbarHistory from '@/components/NavbarHistory'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Historia() {
  return (
    <div>
      <NavbarHistory />
      <main style={{ paddingTop: '8rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#1B2B4B', fontSize: '3.2rem' }}>GOPAR Negócios Globais</h1>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

import NavbarProducts from '@/components/NavbarProducts'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Produtos() {
  return (
    <div>
      <NavbarProducts />
      <main style={{ paddingTop: '8rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#1B2B4B', fontSize: '3.2rem' }}>Commodities GOPAR</h1>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

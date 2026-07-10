'use client'

import Navbar from '@/components/Navbar'
import Contact from '@/components/home/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '8rem' }}>
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

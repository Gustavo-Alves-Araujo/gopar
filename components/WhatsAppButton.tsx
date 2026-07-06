'use client'

// @ts-ignore
import { UilWhatsapp } from '@iconscout/react-unicons'

const WhatsAppButton = () => {
  return (
    <div className="whats">
      <a
        href="https://wa.me/5534999318112?text=Olá, vim pelo site da GOPAR para negociarmos!"
        target="_blank"
        rel="noopener noreferrer"
        className="wtsapp"
      >
        <UilWhatsapp size="40" className="whats-button" />
      </a>
    </div>
  )
}

export default WhatsAppButton

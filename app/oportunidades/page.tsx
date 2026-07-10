'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLang } from '@/contexts/LanguageContext'

export default function OportunidadesPage() {
  const { t, lang } = useLang()
  const o = t.oportunidadesPage

  const introRef = useRef(null)
  const buyersRef = useRef(null)
  const suppliersRef = useRef(null)
  const marketsRef = useRef(null)
  const ctaRef = useRef(null)

  const introInView = useInView(introRef, { once: true, margin: '-60px' })
  const buyersInView = useInView(buyersRef, { once: true, margin: '-60px' })
  const suppliersInView = useInView(suppliersRef, { once: true, margin: '-60px' })
  const marketsInView = useInView(marketsRef, { once: true, margin: '-60px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="page-hero">
        <img className="page-hero__img" src="/images/services.jpg" alt="Oportunidades GOPAR" />
        <div className="page-hero__overlay" />
        <motion.div
          className="page-hero__content container-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="page-hero__label">{o.hero.label}</p>
          <h1 className="page-hero__title">
            {o.hero.title}<br />
            <span style={{ color: 'var(--clr-gold)' }}>{o.hero.titleHighlight}</span>
          </h1>
          <p className="page-hero__description">{o.hero.description}</p>
        </motion.div>
      </section>

      {/* INTRO */}
      <section style={{ background: '#fff', padding: '8rem 0' }} ref={introRef}>
        <div className="container-page">
          <motion.p
            style={{
              fontSize: '1.8rem',
              lineHeight: '3rem',
              color: '#444',
              maxWidth: '80rem',
              margin: '0 auto',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {o.intro}
          </motion.p>
        </div>
      </section>

      {/* FOR BUYERS */}
      <section style={{ background: '#f4f6f9', padding: '8rem 0' }} ref={buyersRef}>
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={buyersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '4rem' }}
          >
            <span className="section-label">{o.buyers.subtitle}</span>
            <h2 className="title-green">
              {o.buyers.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="title-beige">{o.buyers.title.split(' ').slice(-1)}</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2.4rem' }}>
            {o.buyers.items.map((item, i) => (
              <motion.div
                key={i}
                className="product-info-card"
                initial={{ opacity: 0, y: 30 }}
                animate={buyersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  style={{
                    width: '4.8rem',
                    height: '4.8rem',
                    background: 'var(--clr-gold)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.6rem',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.8rem',
                  }}
                >
                  {i + 1}
                </div>
                <h3 style={{ color: 'var(--clr-navy)', fontSize: '1.7rem', fontWeight: 700, marginBottom: '1rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#666', fontSize: '1.45rem', lineHeight: '2.4rem' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR SUPPLIERS */}
      <section style={{ background: 'var(--clr-navy)', padding: '8rem 0' }} ref={suppliersRef}>
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={suppliersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '4rem' }}
          >
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {o.suppliers.subtitle}
            </span>
            <h2 className="title-green" style={{ color: '#fff' }}>
              {o.suppliers.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="title-beige">{o.suppliers.title.split(' ').slice(-1)}</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2.4rem' }}>
            {o.suppliers.items.map((item, i) => (
              <motion.div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '1.2rem',
                  padding: '3.2rem',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={suppliersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  style={{
                    width: '4.8rem',
                    height: '4.8rem',
                    background: 'var(--clr-gold)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.6rem',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1.8rem',
                  }}
                >
                  {i + 1}
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginBottom: '1rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.45rem', lineHeight: '2.4rem' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC MARKETS */}
      <section style={{ background: '#fff', padding: '8rem 0' }} ref={marketsRef}>
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={marketsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '4rem' }}
          >
            <span className="section-label">{o.markets.subtitle}</span>
            <h2 className="title-green">
              {o.markets.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="title-beige">{o.markets.title.split(' ').slice(-1)}</span>
            </h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {o.markets.items.map((market, i) => (
              <motion.div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '2.4rem',
                  background: '#f4f6f9',
                  borderRadius: '1.2rem',
                  padding: '2.8rem 3.2rem',
                  borderLeft: '4px solid var(--clr-gold)',
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={marketsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div style={{ flexShrink: 0 }}>
                  <strong style={{ color: 'var(--clr-navy)', fontSize: '1.8rem', fontWeight: 800 }}>
                    {market.name}
                  </strong>
                </div>
                <p style={{ color: '#555', fontSize: '1.5rem', lineHeight: '2.4rem' }}>
                  {market.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta" ref={ctaRef}>
        <div className="container-page">
          <motion.div
            className="page-cta__content"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="page-cta__title">{o.cta.title}</h2>
            <p className="page-cta__desc">{o.cta.description}</p>
            <div className="page-cta__btns">
              <a href="/cotacao" className="page-cta__btn page-cta__btn--primary">
                {o.cta.btn}
              </a>
              <a href="/contato" className="page-cta__btn page-cta__btn--secondary">
                {lang === 'pt' ? 'Fale Conosco' : 'Contact Us'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

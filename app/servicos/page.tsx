'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLang } from '@/contexts/LanguageContext'

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const WarehouseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><polyline points="1 20 23 20" />
  </svg>
)

const serviceIcons = [<GlobeIcon key="g" />, <WarehouseIcon key="w" />, <TruckIcon key="t" />, <ChartIcon key="c" />]

const productImages = [
  '/images/enxofre.jpg',
  '/images/soja.jpg',
  '/images/milho.jpg',
  '/images/fertilizante.jpg',
  '/images/acucar.jpg',
  '/images/sorgo.jpg',
]

const productSlugs = ['enxofre', 'soja', 'milho', 'fertilizantes', 'acucar', 'sorgo']

export default function ServicosPage() {
  const { t, lang } = useLang()
  const sp = t.servicesPage
  const commoditiesRef = useRef(null)
  const processRef = useRef(null)
  const servicesRef = useRef(null)
  const commoditiesInView = useInView(commoditiesRef, { once: true, margin: '-80px' })
  const processInView = useInView(processRef, { once: true, margin: '-80px' })
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' })

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <img className="page-hero__img" src="/images/services.jpg" alt="GOPAR Serviços" />
        <div className="page-hero__overlay" />
        <motion.div
          className="page-hero__content container-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="page-hero__label">{sp.hero.label}</p>
          <h1 className="page-hero__title">
            {sp.hero.title}<br />
            <span style={{ color: 'var(--clr-gold)' }}>{sp.hero.titleHighlight}</span>
          </h1>
          <p className="page-hero__description">{sp.hero.description}</p>
        </motion.div>
      </section>

      {/* Page hero → Commodities (navy → white) */}
      <div className="wave-sep wave-sep--nw" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,44 C360,12 720,64 1080,30 C1260,12 1380,48 1440,36 L1440,64 L0,64 Z" fill="#fff" />
        </svg>
      </div>

      {/* COMMODITIES */}
      <section className="sp-commodities" ref={commoditiesRef}>
        <div className="container-page">
          <motion.div
            className="sp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={commoditiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{sp.commodities.sectionLabel}</span>
            <h2 className="title-green">
              {sp.commodities.title} <span className="title-beige">{sp.commodities.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="sp-commodity-grid">
            {sp.commodities.items.map((c, i) => (
              <motion.div
                key={i}
                className="sp-commodity-card"
                initial={{ opacity: 0, y: 30 }}
                animate={commoditiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <a href={`/produtos/${productSlugs[i]}`} className="sp-commodity-card__img-wrap">
                  <img src={productImages[i]} alt={c.title} className="sp-commodity-card__img" />
                  <div className="sp-commodity-card__overlay">
                    <span className="sp-commodity-card__english">{c.english}</span>
                  </div>
                </a>
                <div className="sp-commodity-card__body">
                  <h3 className="sp-commodity-card__title">{c.title}</h3>
                  <p className="sp-commodity-card__desc">{c.description}</p>
                  <ul className="sp-commodity-card__specs">
                    {c.specs.map((s, si) => (
                      <li key={si} className="sp-commodity-card__spec">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--clr-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="sp-commodity-card__actions">
                    <a href="/cotacao" className="sp-commodity-card__btn">
                      {sp.commodities.cta}
                    </a>
                    <a href={`/produtos/${productSlugs[i]}`} className="sp-commodity-card__link">
                      {lang === 'pt' ? 'Ver detalhes' : 'See details'} →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commodities (white) → Process (navy) */}
      <div className="wave-sep wave-sep--wn" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,34 C280,68 560,8 840,42 C1060,66 1280,20 1440,44 L1440,64 L0,64 Z" fill="#1B2B4B" />
        </svg>
      </div>

      {/* PROCESS */}
      <section className="sp-process" ref={processRef}>
        <div className="container-page">
          <motion.div
            className="sp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>{sp.process.sectionLabel}</span>
            <h2 className="title-green" style={{ color: '#fff' }}>
              {sp.process.title} <span className="title-beige">{sp.process.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="sp-process-grid">
            {sp.process.steps.map((step, i) => (
              <motion.div
                key={i}
                className="sp-process-step"
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="sp-process-step__number">{step.number}</span>
                <h3 className="sp-process-step__title">{step.title}</h3>
                <p className="sp-process-step__desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process (navy) → Services (light) */}
      <div className="wave-sep wave-sep--nl" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,52 C240,18 480,62 720,36 C960,14 1200,56 1440,26 L1440,64 L0,64 Z" fill="#f8f8f4" />
        </svg>
      </div>

      {/* SERVICES */}
      <section className="sp-services" ref={servicesRef}>
        <div className="container-page">
          <motion.div
            className="sp-section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{sp.services.sectionLabel}</span>
            <h2 className="title-green">
              {sp.services.title} <span className="title-beige">{sp.services.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="sp-services-grid">
            {sp.services.items.map((s, i) => (
              <motion.div
                key={i}
                className="sp-service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="sp-service-card__icon">{serviceIcons[i]}</div>
                <h3 className="sp-service-card__title">{s.title}</h3>
                <p className="sp-service-card__desc">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="container-page">
          <motion.div
            className="page-cta__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="page-cta__title">{sp.cta.title}</h2>
            <p className="page-cta__desc">{sp.cta.description}</p>
            <div className="page-cta__btns">
              <a href="/cotacao" className="page-cta__btn page-cta__btn--primary">
                {sp.cta.btn2}
              </a>
              <a href="/contato" className="page-cta__btn page-cta__btn--secondary">
                {sp.cta.btn}
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

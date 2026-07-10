'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLang } from '@/contexts/LanguageContext'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const MissionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
    <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
    <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
  </svg>
)

const VisionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const ValuesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default function SobrePage() {
  const { t, lang } = useLang()
  const a = t.aboutPage
  const storyRef = useRef(null)
  const numbersRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' })
  const numbersInView = useInView(numbersRef, { once: true, margin: '-80px' })
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })

  return (
    <>
      <Navbar />

      {/* PAGE HERO */}
      <section className="page-hero">
        <img className="page-hero__img" src="/images/hero.jpg" alt="GOPAR" />
        <div className="page-hero__overlay" />
        <motion.div
          className="page-hero__content container-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="page-hero__label">{a.hero.label}</p>
          <h1 className="page-hero__title">
            {a.hero.title}<br />
            <span style={{ color: 'var(--clr-gold)' }}>{a.hero.titleHighlight}</span>
          </h1>
          <p className="page-hero__description">{a.hero.description}</p>
        </motion.div>
      </section>

      {/* Page hero → Story (navy → white) */}
      <div className="wave-sep wave-sep--nw" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,42 C360,14 720,62 1080,28 C1260,12 1380,46 1440,34 L1440,64 L0,64 Z" fill="#fff" />
        </svg>
      </div>

      {/* STORY SECTION */}
      <section className="about-story" ref={storyRef}>
        <div className="container-page">
          <div className="about-story__grid">
            <motion.div
              className="about-story__text"
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">{a.story.sectionLabel}</span>
              <h2 className="title-green">
                {a.story.title} <span className="title-beige">{a.story.titleHighlight}</span>
              </h2>
              <div className="story-divider" />
              <p className="story-paragraph">{a.story.p1}</p>
              <p className="story-paragraph">{a.story.p2}</p>
              <p className="story-paragraph">{a.story.p3}</p>
            </motion.div>

            <motion.div
              className="about-story__visual"
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="story-image-wrap">
                <img src="/images/about.jpg" alt="GOPAR" className="story-image" />
                <div className="story-badge">
                  <span className="story-badge__value">100%</span>
                  <span className="story-badge__label">Segurança</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story (white) → Numbers (navy) */}
      <div className="wave-sep wave-sep--wn" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,36 C280,66 560,10 840,42 C1060,66 1280,22 1440,44 L1440,64 L0,64 Z" fill="#1B2B4B" />
        </svg>
      </div>

      {/* NUMBERS */}
      <section className="about-numbers" ref={numbersRef}>
        <div className="container-page">
          <motion.div
            className="about-numbers__header"
            initial={{ opacity: 0, y: 20 }}
            animate={numbersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>{a.numbers.sectionLabel}</span>
            <h2 className="title-green" style={{ color: '#fff' }}>
              {a.numbers.title} <span className="title-beige">{a.numbers.titleHighlight}</span>
            </h2>
          </motion.div>
          <div className="about-numbers__grid">
            {a.numbers.items.map((item, i) => (
              <motion.div
                key={i}
                className="about-number-card"
                initial={{ opacity: 0, y: 30 }}
                animate={numbersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <strong className="about-number-card__value">{item.value}</strong>
                <span className="about-number-card__label">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers (navy) → MVV (light) */}
      <div className="wave-sep wave-sep--nl" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,52 C240,18 480,64 720,38 C960,14 1200,58 1440,28 L1440,64 L0,64 Z" fill="#f8f8f4" />
        </svg>
      </div>

      {/* MISSION VISION VALUES */}
      <section className="about-mvv" ref={teamRef}>
        <div className="container-page">
          <motion.div
            className="about-mvv__header"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{t.mvv.sectionLabel}</span>
            <h2 className="title-green">
              {t.mvv.title} <span className="title-beige">{t.mvv.titleHighlight}</span>
            </h2>
            <div className="mv-divider" />
          </motion.div>

          <div className="mv-box">
            <motion.div
              className="mv-card mission-card"
              initial={{ opacity: 0, y: 40 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mv-icon-container"><MissionIcon /></div>
              <h3 className="mv-title">{t.mvv.missionTitle}</h3>
              <p className="mv-description">{t.mvv.missionText}</p>
            </motion.div>
            <motion.div
              className="mv-card vision-card"
              initial={{ opacity: 0, y: 40 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mv-icon-container"><VisionIcon /></div>
              <h3 className="mv-title">{t.mvv.visionTitle}</h3>
              <p className="mv-description">{t.mvv.visionText}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MVV (light) → Team (white) — subtle, same colour family */}
      <div className="wave-sep wave-sep--wl" aria-hidden="true">
        <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#fff" />
        </svg>
      </div>

      {/* TEAM */}
      <section className="about-team" ref={valuesRef}>
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">{a.team.sectionLabel}</span>
            <h2 className="title-green">
              {a.team.title} <span className="title-beige">{a.team.titleHighlight}</span>
            </h2>
          </motion.div>

          <motion.div
            className="team-card"
            initial={{ opacity: 0, y: 40 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="team-card__avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="team-card__info">
              <h3 className="team-card__name">{a.team.name}</h3>
              <p className="team-card__role">{a.team.role}</p>
              <p className="team-card__bio">{a.team.bio}</p>
              <div className="team-card__contacts">
                <a href="https://wa.me/5534999318112" className="team-card__link team-card__link--green" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.5A8.5 8.5 0 1 1 12 3.5a8.5 8.5 0 0 1 0 17z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href="mailto:gomesdsantos35@gmail.com" className="team-card__link" target="_blank" rel="noreferrer">
                  <i className="uil uil-envelope" style={{ fontSize: '1.8rem' }} />
                  E-mail
                </a>
                <a href="https://www.linkedin.com/company/gopar" className="team-card__link team-card__link--blue" target="_blank" rel="noreferrer">
                  <i className="uil uil-linkedin" style={{ fontSize: '1.8rem' }} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team (white) → Values (navy) */}
      <div className="wave-sep wave-sep--wn" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,28 C480,66 960,10 1440,50 L1440,64 L0,64 Z" fill="#1B2B4B" />
        </svg>
      </div>

      {/* VALUES */}
      <section className="about-values-section">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>{a.values.sectionLabel}</span>
            <h2 className="title-green" style={{ color: '#fff' }}>
              {a.values.title} <span className="title-beige">{a.values.titleHighlight}</span>
            </h2>
          </motion.div>
          <div className="about-values-grid">
            {t.mvv.values.map((v, i) => (
              <motion.div
                key={i}
                className="about-value-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about-value-item__icon"><CheckIcon /></div>
                <div>
                  <h4 className="about-value-item__title">{v.title}</h4>
                  <p className="about-value-item__desc">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values (navy) → CTA (light) */}
      <div className="wave-sep wave-sep--nl" aria-hidden="true">
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,46 C400,14 800,62 1200,26 C1320,12 1400,44 1440,36 L1440,64 L0,64 Z" fill="#f8f8f4" />
        </svg>
      </div>

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
            <h2 className="page-cta__title">
              {lang === 'pt' ? 'Pronto para negociar?' : 'Ready to trade?'}
            </h2>
            <p className="page-cta__desc">
              {lang === 'pt'
                ? 'Entre em contato com a equipe GOPAR e descubra como podemos conectar seu negócio ao mercado global de commodities.'
                : 'Contact the GOPAR team and discover how we can connect your business to the global commodities market.'}
            </p>
            <div className="page-cta__btns">
              <a href="/cotacao" className="page-cta__btn page-cta__btn--primary">
                {lang === 'pt' ? 'Solicitar Cotação' : 'Request a Quote'}
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

'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const Services = () => {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, when: 'beforeChildren' } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const icons = [
    <svg key="globe" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>,
    <svg key="warehouse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>,
    <svg key="truck" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>,
    <svg key="chart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>,
  ]

  return (
    <section id="serviços" className="services" ref={ref}>
      <motion.div
        className="services-container container-page"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div className="services-left-side" variants={itemVariants}>
          <motion.span className="section-label" variants={itemVariants}>
            {t.services.sectionLabel}
          </motion.span>
          <motion.h1 className="services-title title-green" variants={itemVariants}>
            {t.services.title} <span className="title-beige">{t.services.titleHighlight}</span>
          </motion.h1>
          <motion.p className="services-description" variants={itemVariants}>
            {t.services.description}
          </motion.p>
          <motion.h2 className="services-subtitle" variants={itemVariants}>
            {t.services.subtitle}
          </motion.h2>
          <motion.div className="services-items" variants={containerVariants}>
            {t.services.items.map((s, i) => (
              <motion.div key={i} className="services-item" variants={itemVariants}>
                <span className="services-item__number">0{i + 1}</span>
                <div className="services-icon">{icons[i]}</div>
                <div className="services-item__info">
                  <h3 className="service-item__title">{s.title}</h3>
                  <p className="service-item__description">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="services-right-side last-item" variants={itemVariants}>
          <div className="services-modal">
            <strong>GOPAR</strong>
            {t.services.badge}
          </div>
          <motion.div
            className="services-img"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img src="/images/services.jpg" alt="Soluções GOPAR" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="section-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <a
          href="https://wa.me/5534999318112?text=Ol%C3%A1%2C+quero+solicitar+um+or%C3%A7amento+GOPAR!"
          target="_blank"
          rel="noreferrer"
          className="section-cta__btn section-cta__btn--dark"
        >
          {t.ctas.services}
        </a>
      </motion.div>
    </section>
  )
}

export default Services

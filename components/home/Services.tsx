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
    visible: { opacity: 1, transition: { staggerChildren: 0.08, when: 'beforeChildren' } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="serviços" className="services" ref={ref}>

      {/* Full-width centred header */}
      <motion.div
        className="services-header container-page"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>
          {t.services.sectionLabel}
        </span>
        <h1 className="services-title title-green">
          {t.services.title} <span className="title-beige">{t.services.titleHighlight}</span>
        </h1>
        <p className="services-description">
          {t.services.description}
        </p>
      </motion.div>

      {/* Two-column body: list left, image right */}
      <motion.div
        className="services-body container-page"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div className="services-left-side" variants={itemVariants}>
          <motion.h2 className="services-subtitle" variants={itemVariants}>
            {t.services.subtitle}
          </motion.h2>
          <motion.div className="services-items" variants={containerVariants}>
            {t.services.items.map((s, i) => (
              <motion.div key={i} className="services-item" variants={itemVariants}>
                <span className="services-item__number">0{i + 1}</span>
                <div className="services-item__info">
                  <h3 className="service-item__title">{s.title}</h3>
                  <ul className="services-bullets">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="services-bullet">{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="services-right-side"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Desktop: vertical port image */}
          <img
            src="/images/services-vertical.jpg"
            alt="Porto — GOPAR Global Business"
            className="services-img__desktop"
          />
          {/* Mobile: original landscape image */}
          <img
            src="/images/services.jpg"
            alt="Soluções GOPAR"
            className="services-img__mobile"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="section-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <a href="/cotacao" className="section-cta__btn section-cta__btn--dark">
          {t.ctas.services}
        </a>
      </motion.div>
    </section>
  )
}

export default Services

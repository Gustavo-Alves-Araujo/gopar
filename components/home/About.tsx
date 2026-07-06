'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLang } from '@/contexts/LanguageContext'

const About = () => {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const router = useRouter()

  return (
    <section id="sobre" className="about container-page" ref={ref}>
      <motion.div
        className="about-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="/images/about.jpg"
          alt="GOPAR - Agronegócio Global"
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t.about.sectionLabel}
          </motion.span>
          <h1 className="about-title title-green">
            {t.about.title} <span className="title-beige">{t.about.titleHighlight}</span>
          </h1>
          <p className="about-text_description">{t.about.p1}</p>
          <p className="about-text_description" style={{ marginTop: '1.6rem' }}>
            {t.about.p2}
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <strong>{t.about.stat1}</strong>
              <span>{t.about.stat1Label}</span>
            </div>
            <div className="about-stat">
              <strong>{t.about.stat2}</strong>
              <span>{t.about.stat2Label}</span>
            </div>
            <div className="about-stat">
              <strong>{t.about.stat3}</strong>
              <span>{t.about.stat3Label}</span>
            </div>
          </div>

          <motion.button
            className="about-button"
            onClick={() => router.push('/sobre')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.about.cta}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About

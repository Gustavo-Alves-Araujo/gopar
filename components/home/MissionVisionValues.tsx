'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const MissionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
  </svg>
)

const VisionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

const ValuesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function MissionVisionValues() {
  const { t } = useLang()

  return (
    <section className="mv-container" id="missao">
      <div className="container-page">
        <motion.div
          className="mv-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
            {t.mvv.sectionLabel}
          </span>
          <h2 className="title-green">
            {t.mvv.title} <span className="title-beige">{t.mvv.titleHighlight}</span>
          </h2>
          <div className="mv-divider" />
        </motion.div>

        <div className="mv-content">
          <div className="mv-box">
            <motion.div
              className="mv-card mission-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mv-icon-container"><MissionIcon /></div>
              <h3 className="mv-title">{t.mvv.missionTitle}</h3>
              <p className="mv-description">{t.mvv.missionText}</p>
            </motion.div>

            <motion.div
              className="mv-card vision-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mv-icon-container"><VisionIcon /></div>
              <h3 className="mv-title">{t.mvv.visionTitle}</h3>
              <p className="mv-description">{t.mvv.visionText}</p>
            </motion.div>
          </div>

          <motion.div
            className="values-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="values-header">
              <div className="mv-icon-container"><ValuesIcon /></div>
              <h3 className="mv-title" style={{ marginBottom: 0 }}>{t.mvv.valuesTitle}</h3>
            </div>
            <div className="values-grid">
              {t.mvv.values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="value-checkmark">
                    <CheckIcon />
                  </div>
                  <h4 className="value-title">{value.title}</h4>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="section-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '4rem' }}
        >
          <a href="/sobre" className="section-cta__btn section-cta__btn--dark">
            {t.ctas.mvv}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

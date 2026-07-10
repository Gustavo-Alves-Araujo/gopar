'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const Markets = () => {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const m = t.markets

  return (
    <section id="mercados" className="markets" ref={ref}>
      <div className="container-page">
        <motion.div
          className="markets-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label markets-label">{m.sectionLabel}</span>
          <h1 className="title-green markets-title">
            {m.title} <span className="title-beige">{m.titleHighlight}</span>
          </h1>
          <p className="markets-subtitle">{m.subtitle}</p>
        </motion.div>

        <motion.div
          className="markets-grid"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
        >
          {m.items.map((item, i) => (
            <motion.div
              key={i}
              className="market-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="market-card__flag">{item.flag}</div>
              <h3 className="market-card__name">{item.name}</h3>
              <p className="market-card__desc">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Markets

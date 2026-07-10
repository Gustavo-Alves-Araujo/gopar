'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const Diferentials = () => {
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
    <section id="pilares" className="diferencials" ref={ref}>
      <div className="diferencials-box container-page">
        <motion.div
          className="diferencials-content"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div
            className="diferencials-left-side"
            variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
          >
            <motion.img
              src="/images/pilares.jpg"
              alt="GOPAR Agro Broker"
              initial={{ scale: 1.03 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.2 }}
            />
          </motion.div>

          <motion.div
            className="diferencials-right-side"
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } }}
          >
            <div className="diferencials-info">
              <motion.h1
                className="diferencials-title"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="title-white">{t.differentials.title} </span>
                <span className="title-beige">{t.differentials.titleHighlight}</span>
              </motion.h1>
              <motion.div className="diferencials-items" variants={containerVariants}>
                {t.differentials.items.slice(0, 5).map((item, index) => (
                  <motion.div key={index} className="diferencials-item" variants={itemVariants}>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9A227"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, width: '2rem', height: '2rem', marginTop: '0.3rem' }}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.08 + 0.6 }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                    <p className="diferencials-item__description">
                      <strong>{item.title}:</strong> {item.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="section-cta"
                style={{ marginTop: '3.2rem', justifyContent: 'flex-start' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <a
                  href="/cotacao"
                  className="section-cta__btn section-cta__btn--gold"
                >
                  {t.ctas.differentials}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Diferentials

'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const productImages = [
  '/images/soja.jpg',
  '/images/milho.jpg',
  '/images/fertilizante.jpg',
  '/images/algodao.jpg',
  '/images/acucar.jpg',
  '/images/sorgo.jpg',
]

const Products = () => {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, when: 'beforeChildren' } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="commodities" className="products container-page" ref={ref}>
      <motion.div
        style={{ textAlign: 'center', marginBottom: '0.8rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t.products.sectionLabel}</span>
      </motion.div>
      <motion.h1
        className="title-green"
        style={{ textAlign: 'center', marginBottom: '1.2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {t.products.title}{' '}
        <motion.span
          className="title-beige"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {t.products.titleHighlight}
        </motion.span>
      </motion.h1>
      <motion.p
        style={{ textAlign: 'center', color: '#888', fontSize: '1.5rem', marginBottom: '4rem' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        {t.products.subtitle}
      </motion.p>

      <motion.div
        className="products-list"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {t.products.items.map((c, i) => (
          <motion.div key={i} className="product" variants={itemVariants}>
            <div className="product-card">
              <div className="product-front">
                <div className="product-banner">
                  <img src={productImages[i]} alt={c.title} />
                </div>
                <div className="product-front__info">
                  <span className="product-front__title">{c.title}</span>
                  <span className="product-front__subtitle">{c.subtitle}</span>
                </div>
              </div>
              <div className="product-back">
                <div className="product-back__content">
                  <span className="product-back__title">{c.subtitle}</span>
                  <div className="product-back__divider" />
                  <p className="product-back__description">{c.description}</p>
                  <a
                    href="https://wa.me/5534999318112?text=Ol%C3%A1%2C+tenho+interesse+em+commodities+da+GOPAR!"
                    target="_blank"
                    rel="noreferrer"
                    className="product-back__btn"
                  >
                    {t.products.cta}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.a
        href="https://wa.me/5534999318112?text=Ol%C3%A1%2C+tenho+interesse+em+commodities+da+GOPAR!"
        target="_blank"
        className="product-button"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{ marginTop: '4rem' }}
      >
        {t.products.cta}
      </motion.a>
    </section>
  )
}

export default Products

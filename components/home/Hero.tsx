'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const Hero = () => {
  const { t } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="home" className="hero" ref={ref}>
      <motion.img
        className="hero_img"
        src="/images/hero.jpg"
        alt="GOPAR - Commodities Agrícolas"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      />
      <motion.img
        className="hero_img-mb"
        src="/images/hero-mobile.jpg"
        alt="GOPAR"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      />

      <div className="hero-overlay" />

      <motion.div
        className="hero-info"
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.p
          className="hero-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {t.hero.label}
        </motion.p>
        <motion.h1
          className="title-hero-green"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t.hero.headline1}
          <br />
          <motion.span
            className="title-hero-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {t.hero.headline2}
          </motion.span>
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85 }}
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.p
          className="hero-info__description"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {t.hero.description}
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.a
            className="button-hero button-hero--primary"
            href="https://wa.me/5534999318112?text=Ol%C3%A1%2C+vim+pelo+site+da+GOPAR!"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.hero.cta1}
          </motion.a>
          <motion.a
            className="button-hero button-hero--secondary"
            href="#commodities"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.hero.cta2}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

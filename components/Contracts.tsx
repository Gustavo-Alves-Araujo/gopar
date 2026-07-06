'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Contracts = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { y: -5, scale: 1.02, transition: { duration: 0.2 } },
  }

  return (
    <section id="contracts" className="contracts" ref={ref}>
      <motion.div
        className="contracts-container container-page"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Lado Esquerdo */}
        <motion.div
          className="contracts-leftSide"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="contracts-title-green"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Consultoria de negócios e gestão de contratos
          </motion.h1>

          <motion.h1
            className="contracts-title-beige"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            para oferecer tudo que sua empresa precisa
          </motion.h1>

          <motion.div className="contracts-items" variants={containerVariants}>
            <motion.div className="contract-item" variants={itemVariants}>
              <motion.i
                className="uil uil-chart-pie-alt"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
              />
              <div className="contract-info">Diversidade de ofertas e cotações</div>
            </motion.div>

            <motion.div className="contract-item" variants={itemVariants}>
              <motion.i
                className="uil uil-shield-check"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
              />
              <div className="contract-info">Relacionamento de confiança</div>
            </motion.div>

            <motion.div className="contract-item" variants={itemVariants}>
              <motion.i
                className="uil uil-truck"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
              />
              <div className="contract-info">Acompanhamento da entrega</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contracts-btns"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <a
              href="https://wa.me/551136780066?text=Olá, vim pelo site interessado em ser Comprador!"
              target="_blank"
              className="contracts-btn-green"
            >
              SER COMPRADOR
            </a>
            <a
              href="https://wa.me/551136780066?text=Olá, vim pelo site interessado em ser Fornecedor!"
              target="_blank"
              className="contracts-btn-beige"
            >
              SER FORNECEDOR
            </a>
          </motion.div>
        </motion.div>

        {/* Lado Direito - Imagem */}
        <motion.div
          className="contracts-rightSide last-item"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.img
            src="/images/business.png"
            alt="Consultoria de negócios"
            initial={{ scale: 0.95 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contracts

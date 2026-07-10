'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Contact = () => {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', message: '' })
  const [focusedFields, setFocusedFields] = useState({ name: false, email: false, phone: false, message: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleFocus = (field: string) => setFocusedFields((p) => ({ ...p, [field]: true }))
  const handleBlur = (field: string) => {
    if (!formData[field as keyof typeof formData]) setFocusedFields((p) => ({ ...p, [field]: false }))
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    let isValid = true
    const newErrors = { name: '', email: '', phone: '', message: '' }

    if (!formData.name.trim()) { newErrors.name = t.contact.errName; isValid = false }
    if (!formData.email.trim()) { newErrors.email = t.contact.errEmail; isValid = false }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { newErrors.email = t.contact.errEmailInvalid; isValid = false }
    if (!formData.phone.trim()) { newErrors.phone = t.contact.errPhone; isValid = false }
    else if (!/^\d{10,15}$/.test(formData.phone)) { newErrors.phone = t.contact.errPhoneInvalid; isValid = false }
    if (!formData.message.trim()) { newErrors.message = t.contact.errMessage; isValid = false }

    setErrors(newErrors)
    if (!isValid) { setIsSubmitting(false); return }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Falha no envio')
      setShowSuccessModal(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setFocusedFields({ name: false, email: false, phone: false, message: false })
    } catch (error: unknown) {
      setSubmitError(error instanceof Error ? error.message : 'Ocorreu um erro ao enviar. Tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const infoItems = [
    { icon: 'uil-envelope', text: 'gomes@goparglobal.com.br', href: 'mailto:gomes@goparglobal.com.br' },
    { icon: 'uil-phone', text: '+55 (34) 9 9931-8112', href: 'tel:+5534999318112' },
    { icon: 'uil-map-marker', text: 'Uberlândia — MG, Brasil', href: null },
    { icon: 'uil-globe', text: 'www.goparglobal.com.br', href: 'https://www.goparglobal.com.br' },
  ]

  return (
    <section id="contato" className="contact2" ref={ref}>
      <div className="container-page">

        {/* Header */}
        <motion.div
          className="contact2-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ color: 'rgba(201,162,39,0.8)' }}>{t.contact.sectionLabel}</span>
          <h1 className="title-green" style={{ color: '#fff' }}>
            {t.contact.title}{' '}
            <span className="title-beige">{t.contact.titleHighlight}</span>
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="contact2-grid">

          {/* INFO PANEL */}
          <motion.div
            className="contact2-info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h3 className="contact2-info__title">{t.contact.subtitle}</h3>
            <p className="contact2-info__text">{t.contact.text}</p>

            {/* Trust signals */}
            <div className="contact2-trust">
              {[t.contact.trust1, t.contact.trust2, t.contact.trust3].map((item, i) => (
                <div key={i} className="contact2-trust__item">
                  <span className="contact2-trust__icon"><CheckIcon /></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="contact2-details">
              {infoItems.map((item, i) => (
                <div key={i} className="contact2-detail">
                  <span className="contact2-detail__icon">
                    <i className={`uil ${item.icon}`} />
                  </span>
                  {item.href ? (
                    <a href={item.href} className="contact2-detail__text contact2-detail__text--link">{item.text}</a>
                  ) : (
                    <span className="contact2-detail__text">{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social + WhatsApp CTA */}
            <div className="contact2-social">
              <p className="contact2-social__label">{t.contact.social}</p>
              <div className="contact2-social__icons">
                <a href="https://www.linkedin.com/company/gopar" target="_blank" rel="noreferrer" className="contact2-social__link">
                  <i className="uil uil-linkedin" />
                </a>
                <a href="https://wa.me/5534999318112" target="_blank" rel="noreferrer" className="contact2-social__link">
                  <i className="uil uil-whatsapp" />
                </a>
              </div>
            </div>

            <a
              href="https://wa.me/5534999318112?text=Ol%C3%A1%2C+vim+pelo+site+da+GOPAR!"
              target="_blank"
              rel="noreferrer"
              className="contact2-wa-btn"
            >
              <i className="uil uil-whatsapp" />
              {lang === 'pt' ? 'Fale pelo WhatsApp' : 'Chat on WhatsApp'}
            </a>
          </motion.div>

          {/* FORM PANEL */}
          <motion.div
            className="contact2-form-panel"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <h3 className="contact2-form__title">{t.contact.formTitle}</h3>

            <form onSubmit={handleSubmit} autoComplete="off" className="contact2-form">
              <div className="contact2-field-row">
                <div className="contact2-field">
                  <div className={`contact-form__container ${focusedFields.name || formData.name ? 'focus' : ''}`}>
                    <input type="text" id="name" name="name" className={`contact2-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} onFocus={() => handleFocus('name')} onBlur={() => handleBlur('name')} />
                    <label htmlFor="name">{t.contact.fieldName}</label>
                  </div>
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                <div className="contact2-field">
                  <div className={`contact-form__container ${focusedFields.phone || formData.phone ? 'focus' : ''}`}>
                    <input type="tel" id="phone" name="phone" className={`contact2-input ${errors.phone ? 'error' : ''}`} value={formData.phone} onChange={handleChange} onFocus={() => handleFocus('phone')} onBlur={() => handleBlur('phone')} />
                    <label htmlFor="phone">{t.contact.fieldPhone}</label>
                  </div>
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
              </div>

              <div className="contact2-field">
                <div className={`contact-form__container ${focusedFields.email || formData.email ? 'focus' : ''}`}>
                  <input type="email" id="email" name="email" className={`contact2-input ${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')} />
                  <label htmlFor="email">{t.contact.fieldEmail}</label>
                </div>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="contact2-field">
                <div className={`contact-form__container textarea ${focusedFields.message || formData.message ? 'focus' : ''}`}>
                  <textarea id="message" name="message" className={`contact2-input contact2-textarea ${errors.message ? 'error' : ''}`} value={formData.message} onChange={handleChange} onFocus={() => handleFocus('message')} onBlur={() => handleBlur('message')} />
                  <label htmlFor="message">{t.contact.fieldMessage}</label>
                </div>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>

              <button type="submit" className="contact2-submit" disabled={isSubmitting}>
                {isSubmitting ? t.contact.submitting : t.contact.submit}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <h3>{t.contact.successTitle}</h3>
            <p>{t.contact.successText}</p>
            <button onClick={() => setShowSuccessModal(false)}>{t.contact.successClose}</button>
          </div>
        </div>
      )}
      {submitError && (
        <div className="error-modal">
          <div className="modal-content">
            <h3>{t.contact.errorTitle}</h3>
            <p>{submitError}</p>
            <button onClick={() => setSubmitError('')}>{t.contact.errorClose}</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact

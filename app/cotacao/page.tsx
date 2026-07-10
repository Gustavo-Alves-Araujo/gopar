'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLang } from '@/contexts/LanguageContext'

const RFQPage = () => {
  const { t } = useLang()
  const r = t.rfqPage

  const emptyForm = {
    company: '', responsible: '', country: '', email: '', phone: '',
    product: '', specification: '', quantity: '', destinationPort: '',
    incoterm: '', paymentTerms: '', observations: '',
  }

  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const e: Partial<typeof emptyForm> = {}
    if (!formData.company.trim()) e.company = r.errCompany
    if (!formData.responsible.trim()) e.responsible = r.errResponsible
    if (!formData.country.trim()) e.country = r.errCountry
    if (!formData.email.trim()) e.email = r.errEmail
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = r.errEmailInvalid
    if (!formData.phone.trim()) e.phone = r.errPhone
    if (!formData.product) e.product = r.errProduct
    if (!formData.quantity.trim()) e.quantity = r.errQuantity
    if (!formData.incoterm) e.incoterm = r.errIncoterm
    if (!formData.paymentTerms) e.paymentTerms = r.errPaymentTerms
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('error')
      setShowSuccess(true)
      setFormData(emptyForm)
    } catch {
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="rfq-hero">
        <div className="rfq-hero__overlay" />
        <div className="container-page rfq-hero__content">
          <motion.span
            className="page-hero__label"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {r.hero.label}
          </motion.span>
          <motion.h1
            className="page-hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {r.hero.title}{' '}
            <span className="title-beige">{r.hero.titleHighlight}</span>
          </motion.h1>
          <motion.p
            className="page-hero__description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {r.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="rfq-main">
        <div className="container-page rfq-main__grid">

          {/* Info panel */}
          <motion.aside
            className="rfq-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="rfq-info__title">Como funciona</h2>
            <ol className="rfq-info__list">
              {r.info.map((item, i) => (
                <li key={i} className="rfq-info__item">
                  <span className="rfq-info__number">{String(i + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>

            <div className="rfq-info__contact">
              <p className="rfq-info__contact-label">Dúvidas? Fale direto:</p>
              <a
                href="https://wa.me/5534999318112?text=Ol%C3%A1%2C+gostaria+de+solicitar+uma+cota%C3%A7%C3%A3o+GOPAR!"
                target="_blank"
                rel="noreferrer"
                className="rfq-info__wa"
              >
                <i className="uil uil-whatsapp" />
                WhatsApp
              </a>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.div
            className="rfq-form-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="rfq-form__title">{r.form.title}</h2>
            <form onSubmit={handleSubmit} className="rfq-form" autoComplete="off">

              <div className="rfq-row">
                <div className="rfq-field">
                  <label>{r.form.company} *</label>
                  <input name="company" value={formData.company} onChange={handleChange} className={errors.company ? 'error' : ''} />
                  {errors.company && <span className="rfq-error">{errors.company}</span>}
                </div>
                <div className="rfq-field">
                  <label>{r.form.responsible} *</label>
                  <input name="responsible" value={formData.responsible} onChange={handleChange} className={errors.responsible ? 'error' : ''} />
                  {errors.responsible && <span className="rfq-error">{errors.responsible}</span>}
                </div>
              </div>

              <div className="rfq-row">
                <div className="rfq-field">
                  <label>{r.form.country} *</label>
                  <input name="country" value={formData.country} onChange={handleChange} className={errors.country ? 'error' : ''} />
                  {errors.country && <span className="rfq-error">{errors.country}</span>}
                </div>
                <div className="rfq-field">
                  <label>{r.form.email} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                  {errors.email && <span className="rfq-error">{errors.email}</span>}
                </div>
              </div>

              <div className="rfq-field">
                <label>{r.form.phone} *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
                {errors.phone && <span className="rfq-error">{errors.phone}</span>}
              </div>

              <div className="rfq-row">
                <div className="rfq-field">
                  <label>{r.form.product} *</label>
                  <select name="product" value={formData.product} onChange={handleChange} className={errors.product ? 'error' : ''}>
                    <option value="">—</option>
                    {r.productOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.product && <span className="rfq-error">{errors.product}</span>}
                </div>
                <div className="rfq-field">
                  <label>{r.form.specification}</label>
                  <input name="specification" value={formData.specification} onChange={handleChange} />
                </div>
              </div>

              <div className="rfq-row">
                <div className="rfq-field">
                  <label>{r.form.quantity} *</label>
                  <input name="quantity" value={formData.quantity} onChange={handleChange} className={errors.quantity ? 'error' : ''} placeholder="ex: 5.000 MT" />
                  {errors.quantity && <span className="rfq-error">{errors.quantity}</span>}
                </div>
                <div className="rfq-field">
                  <label>{r.form.destinationPort}</label>
                  <input name="destinationPort" value={formData.destinationPort} onChange={handleChange} />
                </div>
              </div>

              <div className="rfq-row">
                <div className="rfq-field">
                  <label>{r.form.incoterm} *</label>
                  <select name="incoterm" value={formData.incoterm} onChange={handleChange} className={errors.incoterm ? 'error' : ''}>
                    <option value="">—</option>
                    {r.incotermOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.incoterm && <span className="rfq-error">{errors.incoterm}</span>}
                </div>
                <div className="rfq-field">
                  <label>{r.form.paymentTerms} *</label>
                  <select name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} className={errors.paymentTerms ? 'error' : ''}>
                    <option value="">—</option>
                    {r.paymentOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.paymentTerms && <span className="rfq-error">{errors.paymentTerms}</span>}
                </div>
              </div>

              <div className="rfq-field">
                <label>{r.form.observations}</label>
                <textarea name="observations" value={formData.observations} onChange={handleChange} rows={4} />
              </div>

              <button type="submit" className="rfq-submit" disabled={isSubmitting}>
                {isSubmitting ? r.form.submitting : r.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {showSuccess && (
        <div className="success-modal">
          <div className="modal-content">
            <h3>{r.successTitle}</h3>
            <p>{r.successText}</p>
            <button onClick={() => setShowSuccess(false)}>{r.successClose}</button>
          </div>
        </div>
      )}
      {showError && (
        <div className="error-modal">
          <div className="modal-content">
            <h3>{r.errorTitle}</h3>
            <p>{r.errorText}</p>
            <button onClick={() => setShowError(false)}>{r.errorClose}</button>
          </div>
        </div>
      )}
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default RFQPage

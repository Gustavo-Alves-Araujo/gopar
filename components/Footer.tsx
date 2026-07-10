'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useLang } from '@/contexts/LanguageContext'

const Footer = () => {
  const { t } = useLang()
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (id: string) => {
    if (pathname === '/') {
      const element = document.getElementById(id)
      if (element) {
        window.scrollTo({ top: element.offsetTop - 62, behavior: 'smooth' })
      }
    } else {
      router.push('/')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          window.scrollTo({ top: element.offsetTop - 62, behavior: 'smooth' })
        }
      }, 150)
    }
  }

  const commodities = ['Enxofre', 'Soja', 'Milho', 'Fertilizantes', 'Açúcar IC45', 'Sorgo']

  return (
    <footer className="footer">
      <div className="footer-container container-page">
        <div className="footer-logo">
          <img
            src="/images/logo-gopar-white.png"
            alt="GOPAR Negócios Globais"
            style={{ filter: 'brightness(0)', maxHeight: '7rem' }}
          />
          <p style={{ marginTop: '1.2rem', color: '#555', fontSize: '1.4rem', lineHeight: '2.2rem', maxWidth: '30rem' }}>
            {t.footer.description}
          </p>
          <div className="footer-contats" style={{ marginTop: '1.6rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="2.4rem" viewBox="0 -960 960 960" width="2.4rem" fill="#1B2B4B">
              <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />
            </svg>
            <p>+55 34 99931-8112</p>
          </div>
          <div className="footer-contats">
            <svg xmlns="http://www.w3.org/2000/svg" height="2.4rem" viewBox="0 -960 960 960" width="2.4rem" fill="#1B2B4B">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z" />
            </svg>
            <p>gomes@goparglobal.com.br</p>
          </div>
          <div className="footer-contats">
            <svg xmlns="http://www.w3.org/2000/svg" height="2.4rem" viewBox="0 -960 960 960" width="2.4rem" fill="#1B2B4B">
              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Z" />
            </svg>
            <p>Uberlândia - MG, Brasil</p>
          </div>
        </div>

        <div className="footer-map">
          <h2><span className="footer-titles">{t.footer.navTitle}</span></h2>
          <ul className="footer-list">
            {t.footer.navLinks.map((link) => (
              <li key={link.label}>
                {'href' in link ? (
                  <a
                    href={link.href}
                    className="footer-list__link line-footer"
                    onClick={(e) => { e.preventDefault(); router.push(link.href) }}
                  >
                    {link.label.toUpperCase()}
                  </a>
                ) : (
                  <a
                    href={`#${link.section}`}
                    className="footer-list__link line-footer"
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.section) }}
                  >
                    {link.label.toUpperCase()}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-map">
          <h2><span className="footer-titles">{t.footer.commoditiesTitle}</span></h2>
          <ul className="footer-list">
            {commodities.map((c) => (
              <li key={c}>
                <a
                  href="#commodities"
                  className="footer-list__link line-footer"
                  onClick={(e) => { e.preventDefault(); scrollToSection('commodities') }}
                >
                  {c.toUpperCase()}
                </a>
              </li>
            ))}
            <li style={{ color: '#888', fontSize: '1.3rem' }}>Entre outros</li>
          </ul>
        </div>

        <div className="footer-map">
          <h2><span className="footer-titles">{t.footer.contactTitle}</span></h2>
          <ul className="footer-list">
            <li style={{ color: '#555', fontSize: '1.4rem' }}>Verinaldo Gomes</li>
            <li style={{ color: '#777', fontSize: '1.3rem' }}>Diretor & CEO</li>
            <li style={{ marginTop: '0.8rem' }}>
              <a href="https://wa.me/5534999318112" className="footer-list__link" style={{ color: '#25D366' }}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:gomes@goparglobal.com.br" className="footer-list__link line-footer">
                E-MAIL
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="Copyright container-page">
        <h1>
          Copyright &copy; <span className="date">{new Date().getFullYear()}</span>{' '}
          {t.footer.copyright}
        </h1>
        <div className="footer-icons">
          <a href="https://wa.me/5534999318112" target="_blank" rel="noreferrer">
            <i className="uil uil-whatsapp" />
          </a>
          <a href="mailto:gomes@goparglobal.com.br" target="_blank" rel="noreferrer">
            <i className="uil uil-envelope" />
          </a>
          <a href="https://www.linkedin.com/company/gopar" target="_blank" rel="noreferrer">
            <i className="uil uil-linkedin" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

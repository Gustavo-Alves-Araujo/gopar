'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLang } from '@/contexts/LanguageContext'

const BRFlag = () => (
  <svg viewBox="0 0 24 16" width="24" height="16" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="16" fill="#009C3B"/>
    <polygon points="12,2 22,8 12,14 2,8" fill="#FFDF00"/>
    <circle cx="12" cy="8" r="3.5" fill="#002776"/>
  </svg>
)

const USFlag = () => (
  <svg viewBox="0 0 24 16" width="24" height="16" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="16" fill="#B22234"/>
    <rect width="24" height="1.6" y="0" fill="#B22234"/>
    <rect width="24" height="1.6" y="3.2" fill="#fff"/>
    <rect width="24" height="1.6" y="6.4" fill="#B22234"/>
    <rect width="24" height="1.6" y="9.6" fill="#fff"/>
    <rect width="24" height="1.6" y="12.8" fill="#B22234"/>
    <rect width="9.6" height="8" fill="#3C3B6E"/>
  </svg>
)

const Navbar = () => {
  const { lang, t, setLang } = useLang()
  const [showMenu, setShowMenu] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const position = element.offsetTop - 62
      window.scrollTo({ top: position, behavior: 'smooth' })
      setActiveLink(id)
    }
  }

  const handleNavItemClick = (item: { action: string; target: string; key: string }, e: React.MouseEvent) => {
    e.preventDefault()
    setShowMenu(false)
    if (item.action === 'page') {
      router.push(item.target)
    } else {
      // scroll action
      if (isHomePage) {
        scrollToSection(item.target)
      } else {
        router.push('/')
        setTimeout(() => scrollToSection(item.target), 150)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50)
      if (isHomePage) {
        const sections = document.querySelectorAll('section')
        let currentSection = ''
        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.clientHeight
          if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id') || ''
          }
        })
        setActiveLink(currentSection)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const navItems = [
    { key: 'home', label: t.nav.home, action: 'scroll', target: 'home' },
    { key: 'sobre', label: t.nav.about, action: 'page', target: '/sobre' },
    { key: 'servicos', label: t.nav.services, action: 'page', target: '/servicos' },
    { key: 'contato', label: t.nav.contact, action: 'scroll', target: 'contato' },
  ]

  const switchToLang = lang === 'pt' ? 'en' : 'pt'

  return (
    <header className={`header ${scrolled ? 'scroll-header' : ''}`} id="header">
      <nav className="navbar container-page">
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); if (isHomePage) scrollToSection('home'); else router.push('/') }}>
          <img src="/images/logo-gopar-white.png" alt="Logo GOPAR Negócios Globais" />
        </a>
        <a href="#home" className="nav-logo-white" onClick={(e) => { e.preventDefault(); if (isHomePage) scrollToSection('home'); else router.push('/') }}>
          <img src="/images/logo-gopar-white.png" alt="Logo GOPAR Negócios Globais" />
        </a>

        <div className={`nav-menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="navbar-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.action === 'page' ? item.target : `#${item.target}`}
                  className={`navbar-list__link line ${(item.action === 'page' ? pathname === item.target : isHomePage && activeLink === item.target) ? 'active-link' : ''}`}
                  onClick={(e) => handleNavItemClick(item, e)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-close" id="nav-close" onClick={() => setShowMenu(false)}>
            <i className="uil uil-times" />
          </div>
        </div>

        <div className="nav-actions">
          <button
            className="lang-btn"
            onClick={() => setLang(switchToLang)}
            aria-label={`Switch to ${switchToLang === 'en' ? 'English' : 'Português'}`}
          >
            {switchToLang === 'en' ? <USFlag /> : <BRFlag />}
            <span>{switchToLang.toUpperCase()}</span>
          </button>
          <div className="nav-toggle" id="nav-toggle" onClick={() => setShowMenu(true)}>
            <i className="uil uil-bars" />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const NavbarHistory = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const scrollToSection = (id: string) => {
    router.push('/')
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const position = element.offsetTop - 62
        window.scrollTo({ top: position, behavior: 'smooth' })
        setActiveLink(id)
      }
    }, 100)
  }

  const handleMainItemClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault()
    setShowMenu(false)
    if (isHomePage) {
      scrollToSection(section)
    } else {
      router.push('/')
      setTimeout(() => scrollToSection(section), 100)
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['home', 'sobre', 'commodities', 'serviços', 'pilares', 'contato']

  return (
    <header className={`header ${scrolled ? 'scroll-header' : ''}`} id="header"
      style={{ backgroundColor: 'var(--clr-navy)' }}
    >
      <nav className="navbar container-page">
        <a href="#home" className="nav-logo" onClick={(e) => handleMainItemClick('home', e)}>
          <img src="/images/logo-gopar-white.png" alt="Logo GOPAR Negócios Globais" />
        </a>
        <a href="#home" className="nav-logo-white" onClick={(e) => handleMainItemClick('home', e)}>
          <img src="/images/logo-gopar-white.png" alt="Logo GOPAR Negócios Globais" />
        </a>

        <div className={`nav-menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="navbar-list">
            {navItems.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`navbar-list__link line ${activeLink === section ? 'active-link' : ''}`}
                  onClick={(e) => handleMainItemClick(section, e)}
                >
                  {section.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-close" id="nav-close" onClick={() => setShowMenu(false)}>
            <i className="uil uil-times" />
          </div>
        </div>

        <div className="nav-toggle" id="nav-toggle" onClick={() => setShowMenu(true)}>
          <i className="uis uis-bars" />
        </div>
      </nav>
    </header>
  )
}

export default NavbarHistory

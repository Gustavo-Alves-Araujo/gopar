'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const NavbarProducts = () => {
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
    <header className={`headerProducts ${scrolled ? 'scroll-headerProducts' : ''}`} id="headerProducts">
      <nav className="navbarProducts container-page">
        <a href="#home" className="nav-logoProducts" onClick={(e) => handleMainItemClick('home', e)}>
          <img src="/images/logo-gopar-white.png" alt="Logo GOPAR Negócios Globais" />
        </a>
        <a href="#home" className="nav-logo-whiteProducts" onClick={(e) => handleMainItemClick('home', e)}>
          <img src="/images/logo-gopar-white.png" alt="Logo GOPAR Negócios Globais" />
        </a>

        <div className={`nav-menuProducts ${showMenu ? 'show-menuProducts' : ''}`} id="nav-menuProducts">
          <ul className="navbar-listProducts">
            {navItems.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`navbar-list__linkProducts lineProducts ${activeLink === section ? 'active-linkProducts' : ''}`}
                  onClick={(e) => handleMainItemClick(section, e)}
                >
                  {section.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-closeProducts" id="nav-closeProducts" onClick={() => setShowMenu(false)}>
            <i className="uil uil-times" />
          </div>
        </div>

        <div className="nav-toggleProducts" id="nav-toggleProducts" onClick={() => setShowMenu(true)}>
          <i className="uis uis-bars" />
        </div>
      </nav>
    </header>
  )
}

export default NavbarProducts

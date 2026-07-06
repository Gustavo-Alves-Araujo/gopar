'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const ScrollToHash = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.getElementById(hash.substring(1))
      if (element) {
        const scroll = () => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth',
          })
        }
        scroll()
        const timeout = setTimeout(scroll, 500)
        return () => clearTimeout(timeout)
      }
    }
  }, [pathname, searchParams])

  return null
}

export default ScrollToHash

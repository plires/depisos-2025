import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NavMenu from '@/components/commons/NavMenu.jsx'

import logoLarge from '@/assets/img/logo-large.svg'
import logoSmall from '@/assets/img/logo-small.svg'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'

import '@/components/commons/header.css'

const Header = () => {
  const headerElement = useRef()
  const navElement = useRef()

  const [isNavMobileOpen, setIsNavMobileOpen] = useState(false)
  const [logo, setLogo] = useState(logoLarge)

  const toggleNavMobile = () => {
    setIsNavMobileOpen(!isNavMobileOpen)
    navElement.current.classList.toggle('open')
  }

  const closeNavMobile = () => {
    setIsNavMobileOpen(false)
    navElement.current.classList.remove('open')
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      if (scrollPosition > 100) {
        headerElement.current.classList.add('fixed')
        setLogo(logoSmall)
      } else {
        headerElement.current.classList.remove('fixed')
        setLogo(logoLarge)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className='transition' ref={headerElement}>
      <div className='container h-100'>
        <div className='row h-100'>
          <div className='col-md-12 contentHeader'>
            <Link to='/' onClick={closeNavMobile}>
              <img
                className='logo transition img-fluid'
                src={logo}
                alt='logo depisos'
              />
            </Link>
            <nav className='transition' ref={navElement}>
              <NavMenu closeNavMobile={closeNavMobile} />
            </nav>
            <span onClick={toggleNavMobile}>
              {isNavMobileOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

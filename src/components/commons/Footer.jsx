import Logo from '@/assets/img/logo-depisos-footer.svg'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'

import './footer.css'

const Footer = () => {
  return (
    <footer className='container-fluid'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 contentLogo'>
            <img className='img-fluid' src={Logo} alt='logo depisos footer' />
          </div>
          <div className='col-md-4 data'>
            <p>
              Showroom San Martín
              <br />
              Calle: 56 4575 - San Martin
              <br />
              Teléfono: 11 6379 0009
              <br />
              Email: info@depisos.com
              <br />
              Horarios: Lu - Vie / 9:00 - 18:00 Hs.
              <br />
              Sábados 9:30 - 13:30 Hs.
            </p>
          </div>
          <div className='col-md-4 rrss'>
            <a
              target='_blank'
              className='transition'
              rel='noreferrer'
              href='https://www.facebook.com/Depisos'
            >
              <FaFacebook />
            </a>
            <a
              target='_blank'
              className='transition'
              rel='noreferrer'
              href='https://www.instagram.com/depisosok/'
            >
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

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
              Email: info@depisos.com
              <br />
              Horarios: Lu - Vie / 8:00 - 17:00 Hs.
            </p>
            <p>Teléfono: 11 6379-0009</p>
            <a
              target='_blank'
              className='transition'
              rel='noreferrer'
              href='https://wa.me/5491135800225?text=Hola%20quiero%20informacion%20sobre%20venta%20mayorista...'
            >
              Whatsapp Venta Mayorista: 11 3580‑0225
            </a>
            <br />
            <a
              target='_blank'
              className='transition'
              rel='noreferrer'
              href='https://wa.me/5491141711995?text=Hola%20quiero%20informacion%20sobre%20venta%20minorista...'
            >
              Whatsapp Venta Minorista: 11 4171‑1995
            </a>
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

import HeroSection from '@/components/commons/HeroSection'
import QuoteForm from '@/components/commons/QuoteForm.jsx'

import { MdOutlineEventAvailable, MdOutlineWatchLater } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

import heroDesktop from '@/assets/img/header-contacto-desktop.webp'
import heroMobile from '@/assets/img/header-contacto-mobile.webp'

import './contacto.css'

const Contacto = () => {
  return (
    <main className='contacto'>
      <HeroSection
        heroDesktop={heroDesktop}
        heroMobile={heroMobile}
        title='contactate <br />con nosotros'
        extraClass='contentContact'
      />

      <section className='container'>
        <div data-aos='fade-up' className='row'>
          <div className='col-md-4 contentData'>
            <p>
              <span>
                <MdOutlineWatchLater />
              </span>
              Horarios: Lunes a Viernes 8:00 - 17:00 hs.
            </p>
            <p>
              <span>
                <MdOutlineEventAvailable />
              </span>
              Visitas al showroom con cita previa
            </p>
            <p>
              <span>
                <HiOutlineMail />
              </span>
              Email: info@depisos.com
            </p>
            <hr />
            <a
              target='_blank'
              className='transition'
              rel='noreferrer'
              href='https://wa.me/5491135800225?text=Hola%20quiero%20informacion%20sobre%20venta%20mayorista...'
            >
              <span>
                <FaWhatsapp />
              </span>
              Whatsapp Venta Mayorista: 11 3580‑0225
            </a>
            <br />
            <a
              target='_blank'
              className='transition'
              rel='noreferrer'
              href='https://wa.me/5491141711995?text=Hola%20quiero%20informacion%20sobre%20venta%20minorista...'
            >
              <span>
                <FaWhatsapp />
              </span>
              Whatsapp Venta Minorista: 11 4171‑1995
            </a>
          </div>
          <div className='col-md-8 col-lg-7 offset-lg-1 contentForm'>
            <QuoteForm
              recaptchaSiteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              type='contacto'
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contacto

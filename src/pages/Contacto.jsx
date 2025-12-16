import HeroSection from '@/components/commons/HeroSection'
import QuoteForm from '@/components/commons/QuoteForm.jsx'
import GoogleMap from '@/components/commons/GoogleMap.jsx'

import { CiLocationOn } from 'react-icons/ci'
import { IoIosPhonePortrait } from 'react-icons/io'
import { MdOutlineWatchLater } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'

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
            <h4 className='latoBoldItalic'>Showroom San Martín</h4>
            <p>
              <span>
                <CiLocationOn />
              </span>
              Dirección: Calle 56 n°4575, San Martín, Buenos Aires, Argentina.
            </p>
            <p>
              <span>
                <IoIosPhonePortrait />
              </span>
              Teléfono: (+54) 11 6379 0009
            </p>
            <p>
              <span>
                <MdOutlineWatchLater />
              </span>
              Horarios: Lunes a Viernes 8:00 - 17:00 hs.
            </p>
            <p>
              <span>
                <HiOutlineMail />
              </span>
              Email: info@depisos.com
            </p>
          </div>
          <div className='col-md-8 col-lg-7 offset-lg-1 contentForm'>
            <QuoteForm
              recaptchaSiteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              type='contacto'
            />
          </div>
        </div>

        <div className='row contentMap'>
          <div className='col-md-12'>
            <GoogleMap
              src={import.meta.env.VITE_GOOGLE_MAP}
              height={450}
              title='Mapa Depisos.com'
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contacto

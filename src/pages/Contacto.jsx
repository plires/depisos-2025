import HeroSection from '@/components/commons/HeroSection'
import QuoteForm from '@/components/commons/QuoteForm.jsx'
import GoogleMap from '@/components/commons/GoogleMap.jsx'

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
      />
      <section className='container'>
        <div data-aos='fade-up' className='row'>
          <div className='col-md-4'>
            <h4>Showroom San Martín</h4>
            <p>
              Dirección: Calle 56 n°4575, San Martín, Buenos Aires, Argentina.
            </p>
            <p>Teléfono: (+54) 11 6379 0009</p>
            <p>
              Horarios: Lunes a Viernes 9:00 - 18:00 hrs. Sábado 9:30 13:30 hrs.
            </p>
            <p>Email: info@depisos.com</p>
          </div>
          <div className='col-md-7'>
            <QuoteForm
              recaptchaSiteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              type='contacto'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <GoogleMap
              src={import.meta.env.VITE_GOOGLE_MAP}
              height={450}
              title='Mapa Depisos.com'
            />
            {/* <GoogleMap map={import.meta.env.VITE_GOOGLE_MAP} /> */}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contacto

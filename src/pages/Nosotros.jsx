import HeroSection from '@/components/commons/HeroSection'
import Cta from '@/components/commons/Cta'

import heroDesktop from '@/assets/img/header-nosotros-desktop.webp'
import heroMobile from '@/assets/img/header-nosotros-mobile.webp'
import content from '@/assets/img/content-nosotros.webp'
import instaladores from '@/assets/img/instalacion-nosotros.webp'
import asesoramiento from '@/assets/img/asesoramiento-nosotros.webp'
import aliado from '@/assets/img/aliado-nosotros.webp'

import './nosotros.css'

const Profesionales = () => {
  return (
    <main className='nosotros'>
      <HeroSection
        heroDesktop={heroDesktop}
        heroMobile={heroMobile}
        title='nosotros'
      />
      <section className='contentNosotros container'>
        <div data-aos='fade-up' className='row'>
          <div className='col-md-12'>
            <h2>Creamos espacios que inspiran</h2>
            <p>
              En Depisos llevamos una larga trayectoria
              <span>transformando ambientes</span> junto a arquitectos,
              diseñadores, constructoras y hogares que buscan
              <span>soluciones confiables y con estilo.</span>
            </p>
          </div>
        </div>

        <div data-aos='fade-up' className='row'>
          <div className='col-md-12'>
            <img
              className='img-fluid imgContentNosotros'
              src={content}
              alt='contenido sustentabilidad'
            />
          </div>

          <div className='col-md-12 contentDataNosotros'>
            <p data-aos='fade-up'>
              Nuestro diferencial está en{' '}
              <span>unir diseño, tecnología y compromiso ambiental</span>,
              ofreciendo materiales que combinan la belleza de lo natural con la
              resistencia de lo moderno.
            </p>
            <p data-aos='fade-up'>
              <span>
                Contamos con un amplio portfolio de revestimientos de WPC, pisos
                a prueba de agua SPC y cielorrasos de PVC pensados para dar
                calidez, durabilidad y personalidad a cada proyecto.
              </span>
            </p>
            <p data-aos='fade-up'>
              Creemos que <span>la innovación</span> es el camino hacia un{' '}
              <span>futuro más sustentable.</span> Por eso apostamos a productos
              que reducen el mantenimiento, optimizan recursos y minimizan el
              impacto en el medioambiente.
            </p>
            <p data-aos='fade-up'>
              Detrás de cada elección, hay un equipo de especialistas que
              acompaña cada etapa del proceso.
            </p>
          </div>
        </div>

        <div className='row'>
          <Cta
            col='col-md-4'
            title='Nordeco Instaladores oficiales'
            img_src={instaladores}
            typeLink='external'
            link='#'
            textLink='Necesito instalación'
          />
          <Cta
            col='col-md-4'
            title='Asesoramiento profesional'
            img_src={asesoramiento}
            typeLink='external'
            link='#'
            textLink='Necesito asesoramiento'
          />
          <Cta
            col='col-md-4'
            title='Programa de beneficios para aliados'
            img_src={aliado}
            typeLink='internal'
            link='/profesionales'
            textLink='Quiero ser aliado'
          />
        </div>
      </section>
    </main>
  )
}

export default Profesionales

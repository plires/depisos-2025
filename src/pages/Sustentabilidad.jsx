import HeroSection from '@/components/commons/HeroSection'

import heroDesktop from '@/assets/img/header-sustentabilidad-desktop.webp'
import heroMobile from '@/assets/img/header-sustentabilidad-mobile.webp'
import content from '@/assets/img/content-sustentabilidad.webp'

import './sustentabilidad.css'

const Profesionales = () => {
  return (
    <main className='sustentabilidad'>
      <HeroSection
        heroDesktop={heroDesktop}
        heroMobile={heroMobile}
        title='nuestro compromiso <br />
        con la sustentabilidad'
      />
      <section className='contentSustentabilidad container'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 contentData'>
            <p data-aos='fade-up'>
              En Depisos creemos que cada elección que hacemos hoy define el
              mundo en el que vamos a vivir mañana. Por eso, trabajamos con
              productos y procesos que priorizan la responsabilidad ambiental
              sin resignar calidad ni diseño.
            </p>
            <p data-aos='fade-up'>
              Utilizamos materiales reciclables y de larga duración, que reducen
              la generación de residuos. Apostamos a tecnologías de bajo impacto
              ambiental.
            </p>
            <p data-aos='fade-up'>
              Impulsamos soluciones que favorecen la eficiencia energética en
              los espacios, aportando confort térmico y durabilidad.
            </p>
            <p data-aos='fade-up'>
              Porque nuestro compromiso no es solo con tus proyectos, sino
              también con el planeta que compartimos.
            </p>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <img
              data-aos='fade-up'
              className='img-fluid'
              src={content}
              alt='contenido sustentabilidad'
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profesionales

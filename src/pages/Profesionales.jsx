import HeroSection from '@/components/commons/HeroSection'
import ArticleDescription from '@/components/profesionales/ArticleDescription'

import heroDesktop from '@/assets/img/header-profesionales-desktop.webp'
import heroMobile from '@/assets/img/header-profesionales-mobile.webp'

import instaladores from '@/assets/img/profesionales-instalando.webp'
import asesores from '@/assets/img/profesionales-asesorando.webp'
import muestras from '@/assets/img/profesionales-muestras.webp'

import './profesionales.css'

const Profesionales = () => {
  return (
    <main className='profesionales'>
      <HeroSection
        heroDesktop={heroDesktop}
        heroMobile={heroMobile}
        title='Profesionales'
        description='Contamos con instaladores, arquitectos y decoradores para ayudarte en todo el proceso de tu proyecto.'
      />
      <section className='container'>
        <ArticleDescription
          dir='left'
          image={instaladores}
          altImage='instalador oficial nordeco'
          title='NORDECO Instaladores oficiales'
          description='Trabajamos junto a Nordeco, nuestro instalador oficial, para garantizar resultados impecables en cada proyecto. Terminaciones prolijas, montaje seguro y la tranquilidad de saber que tu inversión está en manos expertas.
            '
          textBtn='Necesito instalación'
          typeLink='external'
          linkBtn='https://wa.me/5491153117118?text=Hola%20quiero%20más%20informaci%C3%B3n%20sobre%20instaladores'
        />
        <ArticleDescription
          dir='right'
          image={asesores}
          altImage='asesores profesionales'
          title='Asesoramiento profesional'
          description='Ponemos a tu disposición decoradores y 
            arquitectos que te acompañarán en cada etapa de tu proyecto. Te ayudamos a elegir materiales, colores y diseños que se adapten a tu estilo y necesidad, cuidando 
            cada detalle.'
          typeLink='external'
          linkBtn='https://wa.me/5491131861604?text=Hola%20necesito%20más%20asesoramiento'
          textBtn='Necesito asesoramiento'
        />
        <ArticleDescription
          dir='left'
          image={muestras}
          altImage='muestras de materiales para profesionales depisos'
          title='Programa de beneficios para aliados'
          description='Si sos arquitecto, decorador o constructor, sumate a nuestro Programa Aliados y obtené beneficios exclusivos para vos y tus clientes. Más ventajas, más oportunidades, más diseño.'
          typeLink='external'
          linkBtn='https://wa.me/5491131861604?text=Hola%20quiero%20ser%20aliado%20de%20depisos...'
          textBtn='Quiero ser aliado'
        />
      </section>
    </main>
  )
}

export default Profesionales

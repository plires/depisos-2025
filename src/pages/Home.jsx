import { Link } from 'react-router-dom'
import Carrusel from '@/components/home/Carrusel'
import Categories from '@/components/home/Categories'
import CaracteristicaSustentable from '@/components/home/CaracteristicaSustentable'
import IconEspecializacion from '@/components/home/IconEspecializacion'
import CuratorFeed from '@/components/commons/CuratorFeed'

import {
  getCategoriesTop,
  getCategoriesMiddle,
  getCategoriesBottom,
} from '@/utils/dataUtils'

import iconRetail from '@/assets/img/icon-retail.svg'
import iconHogar from '@/assets/img/icon-hogar.svg'
import iconDesarrollos from '@/assets/img/icon-desarrollos.svg'

import './home.css'

const Home = () => {
  const categoriesTop = getCategoriesTop('categoriesTop')
  const categoriesMiddle = getCategoriesMiddle('categoriesMiddle')
  const categoriesBottom = getCategoriesBottom('categoriesBottom')

  return (
    <main className='home'>
      <Carrusel />
      <section className='categories container'>
        <Categories items={categoriesTop} col='col-md-3' />
        <Categories items={categoriesMiddle} col='col-md-12' />
        <Categories items={categoriesBottom} col='col-md-4' />
      </section>
      <section className='sustentable container'>
        <Link to='sustentabilidad'>
          <h2 className='latoBold transition'>
            Susten
            <br />
            table
          </h2>
          <div className='contentCategories'>
            <CaracteristicaSustentable
              title='Menor impacto <br />ambiental'
              description='Materiales reciclables y de bajo consumo energético.'
            />
            <CaracteristicaSustentable
              title='Larga vida útil'
              description='Resistentes y duraderos: menos reemplazos, menos residuos.'
            />
            <CaracteristicaSustentable
              title='Ambientes más <br />saludables'
              description='Libres de productos tóxicos y aptos para interiores seguros.'
            />
          </div>
        </Link>
      </section>

      <section className='container especializacion text-center'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='latoBold'>Nos especializamos en</h2>
          </div>
        </div>
        <div className='row'>
          <IconEspecializacion
            col='col-md-4'
            title='Retail'
            description='Soluciones versátiles para locales y comercios que buscan destacar con personalidad y practicidad.'
            icon={iconRetail}
          />
          <IconEspecializacion
            col='col-md-4'
            title='Hogar'
            description='Revestimientos funcionales y estéticos para renovar tu casa con calidez, estilo y durabilidad.'
            icon={iconHogar}
          />
          <IconEspecializacion
            col='col-md-4'
            title='Desarrollos Especiales'
            description='Obras, eventos o montajes: estamos donde tu proyecto lo requiera con 
            revestimientos versátiles, estéticos y listos para adaptarse a cada necesidad.'
            icon={iconDesarrollos}
          />
        </div>
      </section>
      <section className='container instagram'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className='text-center'>Instagram Feed</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <CuratorFeed />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

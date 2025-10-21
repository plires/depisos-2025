import { Link } from 'react-router-dom'

import slideMobile from '@/assets/img/placa-background-mobile.webp'
import slideDesktop from '@/assets/img/placa-background-desktop.webp'
import facebook from '@/assets/img/icon-facebook.svg'
import instagram from '@/assets/img/icon-instagram.svg'
import whatsapp from '@/assets/img/icon-whatsapp.svg'
import logo from '@/assets/img/logo-placa.svg'

import styles from './placa.module.css'

const PlacaInicial = () => {
  return (
    <main className='placa.css'>
      <section className={styles.header}>
        <picture>
          <source media='(max-width: 768px)' srcSet={slideMobile} />
          <img
            className={`${styles.back} img-fluid`}
            src={slideDesktop}
            alt='header depisos'
          />
        </picture>
        <div className={styles.content}>
          <h1>
            <span>MUY PRONTO,</span> <br /> una nueva forma de inspirarte llega
            a
          </h1>
          <img className={styles.logo} src={logo} alt='logo depisos' />
          <a
            className={`btn btn-primary ${styles.btnPlaca}`}
            href='mailto:info@depisos.com'
          >
            CONTACTANOS
          </a>
          <div className={styles.rrss}>
            <Link
              className='transition'
              to='https://www.facebook.com/Depisos'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img className='img-fluid' src={facebook} alt='icon facebook' />
            </Link>
            <Link
              className='transition'
              to='https://www.instagram.com/depisosok/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={instagram} alt='icon instagram' />
            </Link>
            <Link
              className='transition'
              to='https://api.whatsapp.com/send/?phone=5491132029269&text=Hola%20Depisos!%20Necesito%20hacer%20una%20consulta!&app_absent=0'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={whatsapp} alt='icon whatsapp' />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PlacaInicial

import { Link } from 'react-router-dom'
import CustomNextArrow from '@/components/commons/CustomNextArrow'
import CustomPrevArrow from '@/components/commons/CustomPrevArrow'

import { getImageURL, getCarruselHome } from '@/utils/dataUtils'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './carrusel.module.css'

const Carrusel = () => {
  const carrusel = getCarruselHome('carrusel')

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  }
  return (
    <section className={`${styles.carruselHome}`}>
      {carrusel.length > 0 ? (
        <Slider {...settings}>
          {carrusel.map(carrusel => (
            <div key={carrusel.id} className={`${styles.contentProduct}`}>
              <img
                className={`${styles.mobile}`}
                src={getImageURL(carrusel.img_mobile_src)}
                alt={carrusel.img_alt}
              />
              <img
                className={`${styles.desktop}`}
                src={getImageURL(carrusel.img_desktop_src)}
                alt={carrusel.img_alt}
              />
              <div data-aos='fade-up' className={`${styles.data}`}>
                <h2>{carrusel.title}</h2>
                <span dangerouslySetInnerHTML={{ __html: carrusel.subtitle }} />
                <p
                  className={`${styles.description}`}
                  dangerouslySetInnerHTML={{ __html: carrusel.description }}
                />
                <button className={`btn btnSolid ${styles.btn}`}>
                  <Link to={carrusel.link}>+Info</Link>
                </button>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <>
          <h4 className={`${styles.sincarrusel}`}>
            En este momento no hay carrusel disponibles para mostrar
          </h4>
          <br />
        </>
      )}
    </section>
  )
}
export default Carrusel

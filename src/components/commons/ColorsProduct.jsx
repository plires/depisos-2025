import { useState } from 'react'
import { getImageURL } from '@/utils/dataUtils.js'
import Modal from '@/components/commons/ModalColorProduct.jsx'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './colors-product.module.css'

const ColorsProduct = ({ product }) => {
  const extraClass = product?.[0]?.extra_class

  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleOpenModal = item => {
    setSelectedProduct(item)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  // Configuración del carrusel responsivo
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  }

  return (
    <>
      <div
        data-aos='fade-up'
        className={[
          styles.contentColors,
          'contentColors',
          extraClass && (styles[extraClass] ?? extraClass),
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Slider {...settings} className={styles.sliderContainer}>
          {product.map(item => (
            <div key={item.id} className={styles.slideWrapper}>
              <article className={styles.color}>
                <button
                  onClick={() => handleOpenModal(item)}
                  className={styles.colorButton}
                >
                  <h4 className={styles.verticalTitle}>{item.title}</h4>
                  <div className={styles.imageContainer}>
                    <img src={getImageURL(item.img_src)} alt={item.title} />
                  </div>
                </button>
              </article>
            </div>
          ))}
        </Slider>
      </div>

      <Modal isOpen={!!selectedProduct} onClose={handleCloseModal}>
        {selectedProduct && (
          <div className={styles.modalImageContainer}>
            <h3>{selectedProduct.title}</h3>
            <img
              src={getImageURL(selectedProduct.img_src)}
              alt={selectedProduct.title}
            />
          </div>
        )}
      </Modal>
    </>
  )
}

export default ColorsProduct

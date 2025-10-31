import { useState } from 'react'
import { getImageURL } from '@/utils/dataUtils.js'
import Modal from '@/components/commons/ModalColorProduct.jsx'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './colors-product.module.css'

const ColorsProduct = ({ product }) => {
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

  // Función para detectar si la estructura es agrupada o simple
  const isGroupedStructure = () => {
    if (!product || product.length === 0) return false
    // Si el primer elemento tiene una propiedad que es un array, es estructura agrupada
    const firstItem = product[0]
    const keys = Object.keys(firstItem)
    // Excluir propiedades conocidas de items individuales
    const nonItemKeys = keys.filter(
      key => !['id', 'title', 'img_src', 'extra_class'].includes(key),
    )
    return nonItemKeys.length > 0 && Array.isArray(firstItem[nonItemKeys[0]])
  }

  // Función para formatear el nombre del grupo (primera letra mayúscula)
  const formatGroupName = name => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  // Renderizar un carrusel individual
  const renderCarousel = (items, extraClass) => {
    console.log(items)
    return (
      <Slider {...settings} className={styles.sliderContainer}>
        {items.map(item => (
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
    )
  }

  // Estructura simple: array directo de colores
  if (!isGroupedStructure()) {
    const extraClass = product?.[0]?.extra_class

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
          {renderCarousel(product, extraClass)}
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

  // Estructura agrupada: múltiples carruseles con títulos
  return (
    <>
      {product.map((group, groupIndex) => {
        // Obtener el nombre del grupo (ej: "nativa", "evolucion")
        const groupName = Object.keys(group).find(key =>
          Array.isArray(group[key]),
        )
        const items = group[groupName]
        const extraClass = items?.[0]?.extra_class

        return (
          <div key={groupIndex} className={styles.groupContainer}>
            {/* Título del grupo */}
            <div className={styles.groupHeader}>
              <h4 className={styles.groupTitle}>
                Línea {formatGroupName(groupName)}
              </h4>
            </div>

            {/* Carrusel del grupo */}
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
              {renderCarousel(items, extraClass)}
            </div>
          </div>
        )
      })}

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

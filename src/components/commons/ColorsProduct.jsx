import { useState } from 'react'
import { getImageURL } from '@/utils/dataUtils.js'
import Modal from '@/components/commons/ModalColorProduct.jsx'

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

  return (
    <>
      <div
        className={[
          styles.contentColors, // CSS Module
          'contentColors', // clase global
          extraClass && (styles[extraClass] ?? extraClass), // usa styles[extraClass] si existe en el módulo; si no, la agrega como global
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {product.map(item => (
          <article key={item.id} className={styles.color}>
            <button
              onClick={() => handleOpenModal(item)}
              className={styles.colorButton}
            >
              <h4>{item.title}</h4>
              <img src={getImageURL(item.img_src)} alt={item.title} />
            </button>
          </article>
        ))}
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

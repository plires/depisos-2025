import { getImageURL } from '@/utils/dataUtils.js'

import styles from './gallery-product.module.css'

const GalleryProduct = ({ product }) => {
  return (
    <section className={`galleryProduct container ${styles.galleryProduct}`}>
      <div className='row'>
        {product.map(item => (
          <article data-aos='fade-up' key={item.id} className={item.col}>
            <img
              src={getImageURL(item.img_src)}
              alt={`Imagen producto - ${item.id}`}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export default GalleryProduct

import { getImageURL } from '@/utils/dataUtils.js'

import styles from './medidas-product.module.css'

const MedidasProduct = ({ product }) => {
  return (
    <section className={`medidasProduct container ${styles.medidasProduct}`}>
      <div className='row'>
        {product.map(item => (
          <article
            data-aos='fade-up'
            key={item.id}
            className={`galleryProduct ${item.col} ${item.extra_class ? item.extra_class : ''}`.trim()}
          >
            <img
              src={getImageURL(item.img_src)}
              alt={`Imagen medidas producto - ${item.id}`}
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export default MedidasProduct

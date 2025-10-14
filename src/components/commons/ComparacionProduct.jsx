import { ImgComparisonSlider } from '@img-comparison-slider/react'
import { getImageURL } from '@/utils/dataUtils.js'

import styles from './comparacion-product.module.css'

const ComparacionProduct = ({ product }) => {
  return (
    <section
      data-aos='fade-up'
      className={`comparacionProduct container ${styles.comparacionProduct}`}
    >
      <div className='row'>
        <div className='col-md-12'>
          <ImgComparisonSlider className={styles.sliderFocus}>
            <img
              className='img-fluid'
              slot='first'
              src={getImageURL(product[0].img_src)}
              alt='Antes'
            />
            <img
              className='img-fluid'
              slot='second'
              src={getImageURL(product[1].img_src)}
              alt='Después'
            />
          </ImgComparisonSlider>
        </div>
      </div>
    </section>
  )
}

export default ComparacionProduct

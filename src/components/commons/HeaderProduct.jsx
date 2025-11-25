import { getImageURL } from '@/utils/dataUtils.js'
import iconBtnSustentable from '@/assets/img/icon-btn-sustentable.svg'

import styles from './header-product.module.css'

const HeaderProduct = ({ product }) => {
  return (
    <div className={`container ${styles.contentHeader} contentHeader`}>
      <div className='row'>
        <div className={`col-md-6 ${styles.contentImgBackground}`}>
          <img
            className='img-fluid'
            src={getImageURL(product.img_header_background_src)}
            alt={`${product.title} - imagen header background`}
          />
        </div>
        <div className={`col-md-6 ${styles.contentImgDetail}`}>
          <img
            data-aos='fade-up'
            className='img-fluid'
            src={getImageURL(product.img_header_detail_src)}
            alt={`${product.title} - imagen header detalle`}
          />
          <div data-aos='fade-up' className={styles.contentData}>
            <h1>{product.title}</h1>
            <span>
              {product.subtitle}
              <img
                className={styles.iconBtnSustentable}
                src={iconBtnSustentable}
                alt={`icono boton sustentable - ${product.id}`}
              />
            </span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HeaderProduct

import { getImageURL } from '@/utils/dataUtils.js'

import styles from './accessories-product.module.css'

const AccessoriesProduct = ({ product }) => {
  return (
    <section
      className={`accessoriesProduct container ${styles.accessoriesProduct}`}
    >
      <div data-aos='fade-up' className='row'>
        <div className='col-md-12'>
          <h3 className='latoBoldItalic'>Accesorios</h3>
        </div>
      </div>

      <div data-aos='fade-up' className='row'>
        <div className='col-md-6'>
          <img
            className='img-fluid'
            src={getImageURL(product[0].img_src)}
            alt='accesorios del producto'
          />
        </div>
        <div className='col-md-6'>
          <p>{product[0].description}</p>
        </div>
      </div>
    </section>
  )
}

export default AccessoriesProduct

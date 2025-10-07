import { Link } from 'react-router-dom'
import { getImageURL } from '@/utils/dataUtils.js'

import styles from './colors-product.module.css'

const ColorsProduct = ({ product }) => {
  return (
    <div className={`${styles.contentColors} contentColors`}>
      {product.map(item => (
        <article key={item.id} className={styles.color}>
          <Link>
            <h4>{item.title}</h4>
            <img src={getImageURL(item.img_src)} alt={item.title} />
          </Link>
        </article>
      ))}
    </div>
  )
}
export default ColorsProduct

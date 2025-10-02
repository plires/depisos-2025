import { Link } from 'react-router-dom'
import { getImageURL } from '@/utils/dataUtils.js'

import styles from './categories.module.css'

const Categories = ({ items, col = 'col-md-12' }) => {
  return (
    <section className='row'>
      {items.map(item => (
        <div key={item.id} className={`${col} p-0 ${styles.contentCategory}`}>
          <img
            className={`${styles.categoryImg}`}
            src={getImageURL(item.img_src)}
            alt={item.title + ' - ' + item.id}
          />
          <div className={`${styles.data}`}>
            <h2
              className='latoBoldItalic'
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <Link
              className={`btn btnOutline ${styles.btnInfo}`}
              to={item.link_btn}
            >
              {item.text_btn}
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}
export default Categories

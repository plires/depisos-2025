import Button from '@/components/commons/ButtonApp.jsx'
import { getImageURL } from '@/utils/dataUtils.js'

import styles from './cta.module.css'

const Cta = ({
  col = 'col-md-4',
  title,
  img_src,
  typeLink = 'internal',
  link,
  textLink,
}) => {
  const linkProps =
    typeLink === 'external'
      ? { href: link, rel: 'noopener noreferrer' }
      : { to: link }

  return (
    <article data-aos='fade-up' className={`cta ${styles.cta} ${col}`}>
      <div className={styles.content}>
        <h4>{title}</h4>
        <img className='img-fluid' src={img_src} alt={title} />
        <Button data-aos='fade-up' {...linkProps} variant='primary' size='md'>
          {textLink}
        </Button>
      </div>
    </article>
  )
}

export default Cta

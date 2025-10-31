import ButtonApp from '@/components/commons/ButtonApp.jsx'

import styles from './other-lines-product-product.module.css'

const OtherLinesProduct = ({ product }) => {
  const extraClass = product?.[0]?.extra_class

  return (
    <div
      className={[
        styles.contentOtherLines, // CSS Module
        'contentOtherLines', // clase global
        extraClass && (styles[extraClass] ?? extraClass), // usa styles[extraClass] si existe en el módulo; si no, la agrega como global
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {product.map(item => (
        <ButtonApp
          key={item.id}
          data-aos='fade-up'
          to={item.src}
          variant='primary'
          size='md'
        >
          {item.linea}
        </ButtonApp>
      ))}
    </div>
  )
}

export default OtherLinesProduct

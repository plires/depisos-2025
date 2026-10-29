import { FiInfo } from 'react-icons/fi'
import styles from './disclaimer-product.module.css'

export default function DisclaimerProduct() {
  return (
    <section
      data-aos='fade-up'
      className={`disclaimerProduct ${styles.disclaimerProduct} container`}
    >
      <aside className={styles.box} aria-labelledby='disclaimer-product-title'>
        <h4
          id='disclaimer-product-title'
          className={`latoBold ${styles.title}`}
        >
          <FiInfo className={styles.icon} aria-hidden />
          Información importante
        </h4>
        <p>
          Las imágenes, fotografías, colores y características de los productos
          publicados en este sitio web son de carácter ilustrativo y
          referencial.
        </p>
        <p>
          Los colores y tonalidades pueden presentar variaciones respecto del
          producto real debido a la iluminación, las condiciones fotográficas y
          la configuración de cada pantalla.
        </p>
        <p>
          Las especificaciones técnicas, medidas, formatos, modalidades de
          presentación, disponibilidad y demás características de los productos
          pueden ser modificadas sin previo aviso.
        </p>
        <p>
          Se recomienda consultar las características, presentaciones y
          condiciones vigentes de cada producto antes de confirmar la compra.
        </p>
      </aside>
    </section>
  )
}

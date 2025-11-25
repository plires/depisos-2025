import styles from './caracteristica-sustentable.module.css'

const CaracteristicaSustentable = ({ title, description }) => {
  return (
    <div data-aos='fade-up' className={styles.caracteristica}>
      <h3
        className='transition latoBoldItalic'
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className='transition'>{description}</p>
    </div>
  )
}

export default CaracteristicaSustentable

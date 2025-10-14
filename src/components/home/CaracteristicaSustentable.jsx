import styles from './caracteristica-sustentable.module.css'

const CaracteristicaSustentable = () => {
  return (
    <div data-aos='fade-up' className={styles.caracteristica}>
      <h3 className='transition latoBoldItalic'>
        Menor impacto <br />
        ambiental
      </h3>
      <p className='transition'>
        Materiales reciclables y de bajo consumo energético.
      </p>
    </div>
  )
}

export default CaracteristicaSustentable

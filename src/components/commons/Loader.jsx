import styles from './loader.module.css'

const Loader = () => {
  return (
    <section className={`${styles.loader}`}>
      <div className='spinner-border text-light' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </section>
  )
}

export default Loader

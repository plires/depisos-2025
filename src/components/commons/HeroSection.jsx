import styles from './hero-section.module.css'

const HeroSection = ({ heroDesktop, heroMobile, title, description }) => {
  return (
    <section
      className={`container-fluid profesionalesHero ${styles.contentSection}`}
    >
      <div className='row'>
        <div className={`col-md-12 p-0 ${styles.content}`}>
          <img
            className={`${styles.mobile}`}
            src={heroMobile}
            alt='header profesionales desktop'
          />
          <img
            className={`${styles.desktop}`}
            src={heroDesktop}
            alt='header profesionales desktop'
          />
          <div className={`${styles.data}`}>
            {title && (
              <h1
                data-aos='fade-up'
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            {description && (
              <p
                data-aos='fade-up'
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection

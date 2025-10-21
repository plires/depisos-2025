import styles from './hero-section.module.css'

const HeroSection = ({
  heroDesktop,
  heroMobile,
  title,
  description,
  extraClass = false,
}) => {
  return (
    <section
      className={`container-fluid ${styles.contentSection} ${extraClass && extraClass}`}
    >
      <div className='row'>
        <div className={`col-md-12 p-0 ${styles.content}`}>
          <img
            className={`img-fluid ${styles.mobile}`}
            src={heroMobile}
            alt='header Hero mobile'
          />
          <img
            className={`img-fluid ${styles.desktop}`}
            src={heroDesktop}
            alt='header Hero desktop'
          />
          <div className={`${styles.data} data`}>
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

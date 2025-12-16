import Button from '@/components/commons/ButtonApp.jsx'

import styles from './article-description.module.css'

const ArticleDescription = ({
  dir = 'left',
  image,
  altImage,
  title,
  description,
  typeLink = 'internal',
  textBtn,
  linkBtn,
}) => {
  const linkProps =
    typeLink === 'external'
      ? { href: linkBtn, rel: 'noopener noreferrer' }
      : { to: linkBtn }

  return dir === 'left' ? (
    <div
      className={`articulos row contentArticle ${styles.contentArticle} ${styles.left}`}
    >
      <div className={`col-md-7 ${styles.contentImg}`}>
        <h3 data-aos='fade-up' dangerouslySetInnerHTML={{ __html: title }} />
        <img
          data-aos='fade-up'
          className={`img-fluid ${styles.image}`}
          src={image}
          alt={altImage}
        />
      </div>
      <div className={`col-md-5 ${styles.contentData}`}>
        <div className={styles.content}>
          <p
            data-aos='fade-up'
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Button data-aos='fade-up' {...linkProps} variant='primary' size='md'>
            {textBtn}
          </Button>

          {/* <Button
            data-aos='fade-up'
            target='_blank'
            rel='noopener noreferrer'
            href={linkBtn}
            variant='primary'
            size='md'
          >
            {textBtn}
          </Button> */}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`articulos row contentArticle ${styles.contentArticle} ${styles.right}`}
    >
      <div className={`col-md-5 ${styles.contentData}`}>
        <div className={styles.content}>
          <p
            data-aos='fade-up'
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Button
            data-aos='fade-up'
            target='_blank'
            rel='noopener noreferrer'
            href={linkBtn}
            variant='primary'
            size='md'
          >
            {textBtn}
          </Button>
        </div>
      </div>
      <div className={`col-md-7 ${styles.contentImg}`}>
        <h3 data-aos='fade-up' dangerouslySetInnerHTML={{ __html: title }} />
        <img
          data-aos='fade-up'
          className={`img-fluid ${styles.image}`}
          src={image}
          alt={altImage}
        />
      </div>
    </div>
  )
}
export default ArticleDescription

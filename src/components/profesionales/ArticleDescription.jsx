import Button from '@/components/commons/ButtonApp.jsx'

import styles from './article-description.module.css'

const ArticleDescription = ({
  dir = 'left',
  image,
  altImage,
  title,
  description,
  textBtn,
  linkBtn,
}) => {
  return dir === 'left' ? (
    <div
      className={`articulos row contentArticle ${styles.contentArticle} ${styles.left}`}
    >
      <div className={`col-md-7 ${styles.contentImg}`}>
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <img
          className={`img-fluid ${styles.image}`}
          src={image}
          alt={altImage}
        />
      </div>
      <div className={`col-md-5 ${styles.contentData}`}>
        <div className={styles.content}>
          <p dangerouslySetInnerHTML={{ __html: description }} />
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
    </div>
  ) : (
    <div
      className={`articulos row contentArticle ${styles.contentArticle} ${styles.right}`}
    >
      <div className={`col-md-5 ${styles.contentData}`}>
        <div className={styles.content}>
          <p dangerouslySetInnerHTML={{ __html: description }} />
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
        <h3 dangerouslySetInnerHTML={{ __html: title }} />
        <img
          className={`img-fluid ${styles.image}`}
          src={image}
          alt={altImage}
        />
      </div>
    </div>
  )
}
export default ArticleDescription

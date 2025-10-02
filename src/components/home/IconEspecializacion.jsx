import styles from './icon-especializacion.module.css'

const IconEspecializacion = ({ col, title, description, icon }) => {
  return (
    <div className={col}>
      <div className={styles.iconEspecializacion}>
        <img src={icon} alt={title} />
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}
export default IconEspecializacion

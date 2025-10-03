import { Link } from 'react-router-dom'
import styles from './button.module.css'

export default function Button({
  children,
  icon = null,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  to = null, // ✅ navegación interna
  href = null, // ✅ navegación externa
  target, // opcional para href
  rel,
  ...props
}) {
  const buttonClasses = [
    styles.button,
    styles[variant] || '',
    styles[size] || '',
    disabled ? styles.disabled : '',
    className,
  ]
    .join(' ')
    .trim()

  // ✅ 1. Enlace interno con React Router
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{children}</span>
      </Link>
    )
  }

  // ✅ 2. Enlace externo
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span>{children}</span>
      </a>
    )
  }

  // ✅ 3. Botón tradicional
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

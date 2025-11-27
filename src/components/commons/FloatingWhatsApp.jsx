import { useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import styles from './floating-whatsApp.module.css'

const FloatingWhatsApp = () => {
  // Configuración de WhatsApp desde variables de entorno
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE
  const message = encodeURIComponent(
    import.meta.env.VITE_WHATSAPP_MESSAGE ||
      'Hola, me gustaría obtener más información sobre sus productos.',
  )
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  // Función para parsear horario en formato "HH:MM" a minutos
  const parseTimeToMinutes = timeString => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Verificar si está dentro del horario permitido (solo se calcula una vez al montar)
  const isVisible = useMemo(() => {
    const now = new Date()
    const day = now.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const currentTime = hours * 60 + minutes // Convertir a minutos desde medianoche

    // Obtener días habilitados desde .env (formato: "1,2,3,4,5")
    const enabledDays =
      import.meta.env.VITE_WHATSAPP_WEEKDAYS_ENABLED?.split(',').map(Number) ||
      []
    const saturdayEnabled =
      import.meta.env.VITE_WHATSAPP_SATURDAY_ENABLED === 'true'

    // Domingo u otro día no configurado = no visible
    if (day === 0 || (!enabledDays.includes(day) && day !== 6)) {
      return false
    }

    // Lunes a Viernes
    if (enabledDays.includes(day)) {
      const startTime = parseTimeToMinutes(
        import.meta.env.VITE_WHATSAPP_WEEKDAYS_START || '08:00',
      )
      const endTime = parseTimeToMinutes(
        import.meta.env.VITE_WHATSAPP_WEEKDAYS_END || '17:00',
      )
      return currentTime >= startTime && currentTime < endTime
    }

    // Sábado
    if (day === 6 && saturdayEnabled) {
      const startTime = parseTimeToMinutes(
        import.meta.env.VITE_WHATSAPP_SATURDAY_START || '08:30',
      )
      const endTime = parseTimeToMinutes(
        import.meta.env.VITE_WHATSAPP_SATURDAY_END || '13:00',
      )
      return currentTime >= startTime && currentTime < endTime
    }

    return false
  }, [])

  // No renderizar nada si no está en horario
  if (!isVisible) {
    return null
  }

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.floatingWhatsapp}
      aria-label='Contactar por WhatsApp'
    >
      <FaWhatsapp className={styles.icon} />
    </a>
  )
}

export default FloatingWhatsApp

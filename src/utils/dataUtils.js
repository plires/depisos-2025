import carruselHome from '@/data/carrusel-home.json'
import categoriesTop from '@/data/caterogias-top-home.json'
import categoriesMiddle from '@/data/caterogias-middle-home.json'
import categoriesBottom from '@/data/caterogias-bottom-home.json'

export const getCarruselHome = key => carruselHome[key]
export const getCategoriesTop = key => categoriesTop[key]
export const getCategoriesMiddle = key => categoriesMiddle[key]
export const getCategoriesBottom = key => categoriesBottom[key]

export const validation = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Ingresá un nombre'
  }
  if (!values.email) {
    errors.email = 'Ingresá tu email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Ingresá un correo válido'
  }
  if (!values.comments) {
    errors.comments = 'Enviá tu mensaje'
  }
  return errors
}

export const getLink = link => {
  var linkToAttribute = '#'

  switch (link) {
    case 'whatsapp':
      linkToAttribute = import.meta.env.VITE_LINK_TO_WHATSAPP
      break
    case 'mail':
      linkToAttribute = import.meta.env.VITE_MAILTO
      break
    case 'address':
      linkToAttribute = import.meta.env.VITE_ADDRESS
      break

    default:
      linkToAttribute = '#'
  }
  return linkToAttribute
}

export const getImageURL = name => {
  return new URL(`../assets/img/${name}`, import.meta.url).href
}

/** Valida y normaliza datos del formulario.
 * Devuelve { ok, cleaned, errors } y NO toca setState.
 */
export const validate = (form, type) => {
  const data = Object.fromEntries(new FormData(form).entries())
  const errors = {}

  // --- Campos que SIEMPRE se validan ---
  const name = (data.name || '').trim()
  if (name.length < 3) errors.name = 'Ingresá al menos 3 caracteres.'

  const email = (data.email || '').trim()
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  if (!emailRe.test(email)) errors.email = 'Email no válido.'

  const phone = (data.phone || '').trim()
  if (phone.replace(/\D/g, '').length < 7) errors.phone = 'Teléfono no válido.'

  const comments = (data.comments || '').trim()
  if (comments.length < 10) {
    errors.comments = 'Ingresá un mensaje (mayor a 10 caracteres).'
  }

  // --- Condicionales por type ---
  let m2Num // la usamos en cleaned si corresponde

  if (type === 'contacto') {
    // Validar profile, ignorar province y surface
    if (!data.profile) errors.profile = 'Seleccioná tu perfil.'
  } else {
    // Ignorar profile, validar province y surface
    const m2Raw = (data.surface ?? '').toString().replace(',', '.').trim()
    m2Num = Number(m2Raw)

    if (!m2Raw || Number.isNaN(m2Num) || m2Num <= 0) {
      errors.surface = 'Ingresá un número mayor a 0.'
    }

    if (!data.province) {
      errors.province = 'Seleccioná una provincia.'
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    cleaned: {
      ...data,
      name,
      email,
      phone,
      comments,
      // Solo incluimos surface numérica cuando NO es 'contacto'
      surface: type !== 'contacto' ? m2Num : undefined,
    },
    errors,
  }
}

/** Espera a que reCAPTCHA v3 esté listo. */
const waitForRecaptchaReady = () =>
  new Promise(resolve => {
    const tryReady = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(resolve)
      } else {
        setTimeout(tryReady, 50)
      }
    }
    tryReady()
  })

/** Obtiene token de reCAPTCHA v3 (acción "cotizar"). Devuelve string|null. */
export const getRecaptchaToken = async recaptchaSiteKey => {
  if (!recaptchaSiteKey) return null
  await waitForRecaptchaReady()
  if (!window.grecaptcha?.execute) return null
  try {
    const token = await window.grecaptcha.execute(recaptchaSiteKey, {
      action: 'cotizar',
    })
    return token || null
  } catch {
    return null
  }
}

/** Maneja el submit completo (validación, token, fetch, feedback).
 *  Inyectá las dependencias desde el componente.
 */
export const handleSubmit = async (e, deps) => {
  const {
    setServerMsg,
    setServerErr,
    setSubmitting,
    setLocked,
    setErrors,
    recaptchaSiteKey,
    fetchUrl = import.meta.env.VITE_ROOT + 'api/cotizar.php',
    type,
  } = deps

  e.preventDefault()
  setServerMsg?.(null)
  setServerErr?.(null)

  const { ok, cleaned, errors } = validate(e.currentTarget, type)
  if (!ok) {
    setErrors?.(errors)
    return
  }

  try {
    setSubmitting?.(true)

    const originUrl = window.location.href
    const recaptchaToken = await getRecaptchaToken(recaptchaSiteKey)

    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...cleaned, recaptchaToken, originUrl, type }),
    })

    const payload = await res.json().catch(() => ({}))

    if (!res.ok || payload.success !== true) {
      // Validación de servidor (422) con mapa de campos
      if (res.status === 422 && payload.fields) {
        setErrors?.(payload.fields)
        setServerErr?.(payload.error || '')
        if (payload.field) {
          const el = document.getElementById(payload.field)
          if (el) el.focus()
        }
        return
      }

      // Otros errores (400/500)
      throw new Error(payload.error || 'No pudimos procesar tu solicitud.')
    }

    setErrors?.({})
    setServerMsg?.(
      '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.',
    )
    setLocked?.(true) // bloquea el form tras éxito
  } catch (err) {
    setServerErr?.(err.message || String(err))
  } finally {
    setSubmitting?.(false)
  }
}

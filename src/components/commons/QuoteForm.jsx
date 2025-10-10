import { useEffect, useMemo, useRef, useState } from 'react'

import styles from './quote-form.module.css'

export default function QuoteForm({ recaptchaSiteKey }) {
  const [submitting, setSubmitting] = useState(false)
  const [locked, setLocked] = useState(false) // read-only tras éxito
  const [serverMsg, setServerMsg] = useState(null)
  const [serverErr, setServerErr] = useState(null)
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // Carga del script de reCAPTCHA v3
  useEffect(() => {
    if (window.grecaptcha || !recaptchaSiteKey) return
    const s = document.createElement('script')
    s.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
    s.async = true
    document.head.appendChild(s)
    return () => document.head.removeChild(s)
  }, [recaptchaSiteKey])

  const validate = form => {
    const data = Object.fromEntries(new FormData(form).entries())
    const next = {}
    const name = (data.nombre || '').trim()
    if (name.length < 3) next.nombre = 'Ingresá al menos 3 caracteres.'

    const email = (data.email || '').trim()
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!emailRe.test(email)) next.email = 'Email no válido.'

    const telefono = (data.telefono || '').trim()
    if (telefono.replace(/\D/g, '').length < 7)
      next.telefono = 'Teléfono no válido.'

    const m2 = (data.superficie || '').replace(',', '.').trim()
    const m2Num = Number(m2)
    if (!m2 || Number.isNaN(m2Num) || m2Num <= 0)
      next.superficie = 'Ingresá un número mayor a 0.'

    if (!data.provincia) next.provincia = 'Seleccioná una provincia.'

    setErrors(next)
    return {
      ok: Object.keys(next).length === 0,
      cleaned: { ...data, superficie: m2Num },
    }
  }

  const getRecaptchaToken = async () => {
    if (!recaptchaSiteKey || !window.grecaptcha?.execute) return null
    return await window.grecaptcha.execute(recaptchaSiteKey, {
      action: 'cotizar',
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setServerMsg(null)
    setServerErr(null)

    const { ok, cleaned } = validate(e.currentTarget)
    if (!ok) return

    try {
      setSubmitting(true)

      const token = await getRecaptchaToken() // puede ser null en dev
      const res = await fetch('/api/cotizar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cleaned, recaptchaToken: token }),
      })

      const payload = await res.json().catch(() => ({}))
      if (!res.ok || payload.success !== true) {
        throw new Error(payload.error || 'No pudimos procesar tu solicitud.')
      }

      setServerMsg(
        '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.',
      )
      setLocked(true) // ← deja el form read-only tras éxito
    } catch (err) {
      setServerErr(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Helpers feedback
  const invalid = n => (errors[n] ? 'is-invalid' : '')
  const msg = n => errors[n]

  return (
    <form onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className='row mb-3'>
        <div className='col-12 text-center'>
          <h3 className='fw-semibold fst-italic'>Cotizador</h3>
        </div>
      </div>

      {/* Fieldset permite deshabilitar todo de una */}
      <fieldset disabled={submitting || locked}>
        {/* Nombre */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='nombre'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Nombre:
          </label>
          <div className='col-sm-8'>
            <input
              type='text'
              className={`form-control ${invalid('nombre')}`}
              id='nombre'
              name='nombre'
              required
              maxLength={80}
            />
            <div className='invalid-feedback'>{msg('nombre')}</div>
          </div>
        </div>

        {/* Email */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='email'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Email:
          </label>
          <div className='col-sm-8'>
            <input
              type='email'
              className={`form-control ${invalid('email')}`}
              id='email'
              name='email'
              required
            />
            <div className='invalid-feedback'>{msg('email')}</div>
          </div>
        </div>

        {/* Teléfono */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='telefono'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Teléfono:
          </label>
          <div className='col-sm-8'>
            <input
              type='tel'
              className={`form-control ${invalid('telefono')}`}
              id='telefono'
              name='telefono'
              required
            />
            <div className='invalid-feedback'>{msg('telefono')}</div>
          </div>
        </div>

        {/* Superficie */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='superficie'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Superficie a cubrir en m2:
          </label>
          <div className='col-sm-8'>
            <input
              type='text'
              className={`form-control ${invalid('superficie')}`}
              id='superficie'
              name='superficie'
              inputMode='decimal'
              required
            />
            <div className='invalid-feedback'>{msg('superficie')}</div>
          </div>
        </div>

        {/* Provincia */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='provincia'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Provincia:
          </label>
          <div className='col-sm-8'>
            <select
              id='provincia'
              name='provincia'
              className={`form-select ${invalid('provincia')}`}
              required
              defaultValue=''
            >
              <option value='' disabled>
                Seleccioná…
              </option>
              <option>Buenos Aires</option>
              <option>CABA</option>
              <option>Córdoba</option>
              <option>Santa Fe</option>
              <option>Mendoza</option>
              <option>Neuquén</option>
              <option>Resto del país</option>
            </select>
            <div className='invalid-feedback'>{msg('provincia')}</div>
          </div>
        </div>

        {/* Mensaje */}
        <div className='row mb-3'>
          <label
            htmlFor='mensaje'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Agregar mensaje (opcional):
          </label>
          <div className='col-sm-8'>
            <textarea
              id='mensaje'
              name='mensaje'
              className='form-control'
              rows={5}
              maxLength={1500}
            />
            <div className='form-text'>Hasta 1500 caracteres.</div>
          </div>
        </div>
      </fieldset>

      {/* Mensajes del servidor */}
      {serverMsg && (
        <div className='row mb-3'>
          <div className='col-sm-8 offset-sm-4'>
            <div className='alert alert-success py-2 mb-0'>{serverMsg}</div>
          </div>
        </div>
      )}
      {serverErr && (
        <div className='row mb-3'>
          <div className='col-sm-8 offset-sm-4'>
            <div className='alert alert-danger py-2 mb-0'>{serverErr}</div>
          </div>
        </div>
      )}

      {/* Botón */}
      <div className='row'>
        <div className='col-sm-12'>
          <button
            className='btn btn-dark rounded-pill px-5 d-inline-flex align-items-center gap-2'
            type='submit'
            disabled={submitting || locked}
          >
            {submitting && (
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>
            )}
            {submitting ? 'Enviando…' : locked ? 'Enviado' : 'Cotizar'}
          </button>
        </div>
      </div>
    </form>
  )
}

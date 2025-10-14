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
    const name = (data.name || '').trim()
    if (name.length < 3) next.name = 'Ingresá al menos 3 caracteres.'

    const email = (data.email || '').trim()
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!emailRe.test(email)) next.email = 'Email no válido.'

    const phone = (data.phone || '').trim()
    if (phone.replace(/\D/g, '').length < 7) next.phone = 'Teléfono no válido.'

    const m2 = (data.surface || '').replace(',', '.').trim()
    const m2Num = Number(m2)
    if (!m2 || Number.isNaN(m2Num) || m2Num <= 0)
      next.surface = 'Ingresá un número mayor a 0.'

    if (!data.province) next.province = 'Seleccioná una provincia.'

    const comments = (data.comments || '').trim()
    if (comments.length < 10)
      next.comments = 'Ingresá un mensaje (mayor a 10 caracteres).'

    setErrors(next)
    return {
      ok: Object.keys(next).length === 0,
      cleaned: { ...data, surface: m2Num },
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

      const originUrl = window.location.href

      const token = await getRecaptchaToken() // puede ser null en dev
      const res = await fetch('/api/cotizar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cleaned,
          recaptchaToken: token,
          originUrl,
        }),
      })

      const payload = await res.json().catch(() => ({}))
      if (!res.ok || payload.success !== true) {
        // 👇 Manejo fino de 422 con errores por campo
        if (res.status === 422 && payload.fields) {
          setErrors(payload.fields) // pinta invalid-feedback en cada campo
          setServerErr(payload.error || '') // comentario específico arriba (alert)
          if (payload.field) {
            // Llevar el foco al primer campo con error (si existe en el DOM)
            const el = document.getElementById(payload.field)
            if (el) el.focus()
          }
          return // no arrojamos Error, ya mostramos feedback
        }

        // Otros errores (400, 500, etc.)
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
    <form
      className={`shadow-sm ${styles.contentForm} card`}
      onSubmit={handleSubmit}
      ref={formRef}
      noValidate
    >
      <div className='text-center'>
        <h3 className='fw-semibold fst-italic'>Cotizador</h3>
      </div>

      {/* Fieldset permite deshabilitar todo de una */}
      <fieldset disabled={submitting || locked}>
        {/* Nombre */}
        <div className='row mb-3 align-items-center'>
          <label htmlFor='name' className='col-sm-4 col-form-label text-sm-end'>
            Nombre:
          </label>
          <div className='col-sm-8'>
            <input
              type='text'
              className={`form-control ${invalid('name')}`}
              id='name'
              name='name'
              required
              maxLength={80}
            />
            <div className='invalid-feedback'>{msg('name')}</div>
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
            htmlFor='phone'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Teléfono:
          </label>
          <div className='col-sm-8'>
            <input
              type='tel'
              className={`form-control ${invalid('phone')}`}
              required
              id='phone'
              name='phone'
            />
            <div className='invalid-feedback'>{msg('phone')}</div>
          </div>
        </div>

        {/* Superficie */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='surface'
            className='col-sm-4 col-form-label text-sm-end'
          >
            superficie a cubrir en m2:
          </label>
          <div className='col-sm-8'>
            <input
              type='text'
              className={`form-control ${invalid('surface')}`}
              id='surface'
              name='surface'
              inputMode='decimal'
              required
            />
            <div className='invalid-feedback'>{msg('surface')}</div>
          </div>
        </div>

        {/* Provincia */}
        <div className='row mb-3 align-items-center'>
          <label
            htmlFor='province'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Provincia:
          </label>
          <div className='col-sm-8'>
            <select
              id='province'
              name='province'
              className={`form-select ${invalid('province')}`}
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
            <div className='invalid-feedback'>{msg('province')}</div>
          </div>
        </div>

        {/* Comentario */}
        <div className='row mb-3'>
          <label
            htmlFor='comments'
            className='col-sm-4 col-form-label text-sm-end'
          >
            Agregar comentario:
          </label>
          <div className='col-sm-8'>
            <textarea
              required
              id='comments'
              name='comments'
              className={`form-control ${styles.textarea} ${invalid('comments')}`}
              rows={5}
              maxLength={1500}
              minLength={10}
            />
            <div className='invalid-feedback'>{msg('comments')}</div>
            <div className='form-text'>Hasta 1500 caracteres.</div>
          </div>
        </div>
      </fieldset>

      {/* Mensaje del servidor */}
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
        <div className='col-sm-12 text-center'>
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

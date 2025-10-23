import { useEffect, useRef, useState } from 'react'
import { handleSubmit as submitHandler } from '@/utils/dataUtils'

import styles from './quote-form.module.css'

export default function QuoteForm({ recaptchaSiteKey, type = false }) {
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

  // Helpers feedback
  const invalid = n => (errors[n] ? 'is-invalid' : '')
  const msg = n => errors[n]

  return (
    <form
      data-aos='fade-up'
      className={`shadow-sm ${styles.contentForm} card`}
      onSubmit={e =>
        submitHandler(e, {
          setServerMsg,
          setServerErr,
          setSubmitting,
          setLocked,
          setErrors,
          recaptchaSiteKey,
          type,
        })
      }
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
          <label htmlFor='name' className='col-sm-4 col-form-label'>
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
          <label htmlFor='email' className='col-sm-4 col-form-label'>
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
          <label htmlFor='phone' className='col-sm-4 col-form-label'>
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

        {type !== 'contacto' ? (
          <>
            {/* Superficie */}
            <div className='row mb-3 align-items-center'>
              <label htmlFor='surface' className='col-sm-4 col-form-label'>
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
              <label htmlFor='province' className='col-sm-4 col-form-label'>
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
          </>
        ) : null}

        {type === 'contacto' ? (
          // Perfil
          <div className='row mb-3 align-items-center'>
            <label htmlFor='profile' className='col-sm-4 col-form-label'>
              ¿Qué perfil sos?:
            </label>
            <div className='col-sm-8'>
              <select
                id='profile'
                name='profile'
                className={`form-select ${invalid('profile')}`}
                required
                defaultValue=''
              >
                <option value='' disabled>
                  Seleccioná…
                </option>
                <option>Particular</option>
                <option>Arquitecto</option>
                <option>Decorador/a</option>
                <option>Estudio</option>
                <option>Corporativo</option>
                <option>Otro</option>
              </select>
              <div className='invalid-feedback'>{msg('profile')}</div>
            </div>
          </div>
        ) : null}

        {/* Comentario */}
        <div className='row mb-3'>
          <label htmlFor='comments' className='col-sm-4 col-form-label'>
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

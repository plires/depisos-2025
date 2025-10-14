// src/components/CuratorFeed.jsx
import { useEffect } from 'react'

const SCRIPT_ID = 'curator-feed-depisos-script'
const SCRIPT_SRC =
  'https://cdn.curator.io/published/f4d0c2e3-5cfa-42c7-8060-ace37ced7c3a.js'
const CONTAINER_ID = 'curator-feed-depisos-layout'

export default function CuratorFeed() {
  useEffect(() => {
    // Evitar carga duplicada (React StrictMode en dev monta/desmonta dos veces)
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement('script')
      s.id = SCRIPT_ID
      s.src = SCRIPT_SRC
      s.async = true
      s.charset = 'UTF-8'
      // Insertar lo más tarde posible para no bloquear
      document.body.appendChild(s)
    }
    // No removemos el script en unmount para que no se recargue al navegar.
  }, [])

  return (
    <div data-aos='fade-up' id={CONTAINER_ID}>
      <a
        href='https://curator.io'
        target='_blank'
        rel='noreferrer'
        className='crt-logo crt-tag'
      >
        Powered by Curator.io
      </a>
    </div>
  )
}

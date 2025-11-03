import { useEffect } from 'react'

const SCRIPT_ID = 'curator-feed-depisos-script'
const SCRIPT_SRC =
  'https://cdn.curator.io/published/f4d0c2e3-5cfa-42c7-8060-ace37ced7c3a.js'
const CONTAINER_ID = 'curator-feed-depisos-layout'

export default function CuratorFeed() {
  useEffect(() => {
    // Cargar el script SOLO si no existe
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = SCRIPT_SRC
      script.async = true
      script.charset = 'UTF-8'
      document.body.appendChild(script)
    }
    // ⚠️ NO hay cleanup - el script persiste siempre
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

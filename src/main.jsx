import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'modern-css-reset/dist/reset.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/fonts.css'
import 'aos/dist/aos.css'
import './assets/css/app.css'

import './assets/js/app.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

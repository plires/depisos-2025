import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/components/commons/Header.jsx'
import Footer from '@/components/commons/Footer.jsx'
import Home from '@/pages/Home.jsx'
import Product from '@/pages/Product.jsx'
import Profesionales from '@/pages/Profesionales.jsx'
import Sustentabilidad from '@/pages/Sustentabilidad.jsx'
import Nosotros from '@/pages/Nosotros.jsx'
import Contacto from '@/pages/Contacto.jsx'
import NotFound from '@/pages/NotFound.jsx'

import { AppProvider } from '@/context/app'
import ScrollToTop from '@/utils/scrollToTop'
import { ToastContainer } from 'react-toastify'

import '@/assets/css/app.css'

function App() {
  return (
    <>
      <AppProvider>
        <Router basename='/dev/'>
          <ScrollToTop />
          <ToastContainer />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />

            {/* Productos con URLs simples */}
            <Route path='/productos/wall-panel' element={<Product />} />
            <Route path='/productos/perfiles' element={<Product />} />
            <Route path='/productos/deck-dual' element={<Product />} />
            <Route path='/productos/siding' element={<Product />} />
            <Route path='/productos/flat-panel' element={<Product />} />

            {/* Productos con URLs anidadas - Cielorraso */}
            <Route
              path='/productos/cielorraso/:productSlug'
              element={<Product />}
            />

            {/* Productos con URLs anidadas - Vinyl Panel */}
            <Route
              path='/productos/vinyl-panel/:productSlug'
              element={<Product />}
            />

            {/* Productos con URLs anidadas - Pisos Waterproof */}
            <Route
              path='/productos/pisos-waterproof/:productSlug'
              element={<Product />}
            />

            <Route path='/profesionales' element={<Profesionales />} />
            <Route path='/sustentabilidad' element={<Sustentabilidad />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AppProvider>
    </>
  )
}

export default App

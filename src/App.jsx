import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/components/commons/Header.jsx'
import Footer from '@/components/commons/Footer.jsx'
import Home from '@/pages/Home.jsx'
// import PlacaInicial from '@/pages/PlacaInicial.jsx'
import ProductWallPanel from '@/pages/ProductWallPanel.jsx'
import ProductPerfiles from '@/pages/ProductPerfiles.jsx'
import ProductDeckDual from '@/pages/ProductDeckDual.jsx'
import ProductSiding from '@/pages/ProductSiding.jsx'
import ProductFlatPanel from '@/pages/ProductFlatPanel.jsx'
import ProductCielorrasoFoliado from '@/pages/ProductCielorrasoFoliado.jsx'
import Profesionales from '@/pages/Profesionales.jsx'
import Sustentabilidad from '@/pages/Sustentabilidad.jsx'
import Nosotros from '@/pages/Nosotros.jsx'
import Contacto from '@/pages/Contacto.jsx'
import Test from '@/pages/Test.jsx'
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
            {/* <Route path='/' element={<PlacaInicial />} /> */}
            <Route path='/' element={<Home />} />
            <Route
              path='/productos/wall-panel'
              element={<ProductWallPanel />}
            />
            <Route path='/productos/perfiles' element={<ProductPerfiles />} />
            <Route path='/productos/deck-dual' element={<ProductDeckDual />} />
            <Route path='/productos/siding' element={<ProductSiding />} />
            <Route
              path='/productos/flat-panel'
              element={<ProductFlatPanel />}
            />
            <Route
              path='/productos/cielorraso/foliados'
              element={<ProductCielorrasoFoliado />}
            />
            <Route path='/profesionales' element={<Profesionales />} />
            <Route path='/sustentabilidad' element={<Sustentabilidad />} />
            <Route path='/nosotros' element={<Nosotros />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/test' element={<Test />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AppProvider>
    </>
  )
}

export default App

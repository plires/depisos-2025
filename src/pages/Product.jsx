import { useParams, useLocation, Navigate } from 'react-router-dom'
import HeaderProduct from '@/components/commons/HeaderProduct.jsx'
import ColorsProduct from '@/components/commons/ColorsProduct.jsx'
import OtherLinesProduct from '@/components/commons/OtherLinesProduct.jsx'
import GalleryProduct from '@/components/commons/GalleryProduct.jsx'
import MedidasProduct from '@/components/commons/MedidasProduct.jsx'
import ComparacionProduct from '@/components/commons/ComparacionProduct.jsx'
import AccessoriesProduct from '@/components/commons/AccessoriesProduct.jsx'
import TechnicalSheetProduct from '@/components/commons/TechnicalSheetProduct.jsx'
import QuoteForm from '@/components/commons/QuoteForm.jsx'

import { getProductBySlug } from '@/data/products'
import './product.css'

const Product = () => {
  const { productSlug } = useParams()
  const location = useLocation()

  // Construir el slug completo basado en la URL
  const fullSlug = productSlug
    ? location.pathname.split('/productos/')[1] // Para URLs anidadas como "vinyl-panel/plenos"
    : location.pathname.split('/productos/')[1] // Para URLs simples como "wall-panel"

  // Mapeo de URLs a slugs de configuración
  const slugMap = {
    'wall-panel': 'wall-panel',
    perfiles: 'perfiles',
    'deck-dual': 'deck-dual',
    siding: 'siding',
    'flat-panel': 'flat-panel',
    'cielorraso/foliados': 'cielorraso-foliados',
    'cielorraso/printer': 'cielorraso-printer',
    'vinyl-panel/foliados': 'vinyl-foliados',
    'vinyl-panel/plenos': 'vinyl-plenos',
    'vinyl-panel/printer': 'vinyl-printer',
    'pisos-waterproof/spc': 'pisos-spc',
    'pisos-waterproof/melaminicos': 'pisos-melaminicos',
  }

  const configSlug = slugMap[fullSlug]
  const productConfig = getProductBySlug(configSlug)

  // Si el producto no existe, redirigir a 404
  if (!productConfig) {
    return <Navigate to='/404' replace />
  }

  const { data: product, otherLinesTitle } = productConfig

  return (
    <main className='product'>
      <HeaderProduct product={product.header[0]} />

      <section data-aos='fade-up' className='contentColors container'>
        <div className='row'>
          <div className='col-md-12'>
            <h3>Colores Disponibles</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <ColorsProduct product={product.colores} />
          </div>
        </div>
      </section>

      {product.otrasLineas && (
        <section data-aos='fade-up' className='contentOtherLines container'>
          <div className='row'>
            <div className='col-md-12'>
              <h3>{otherLinesTitle}</h3>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <OtherLinesProduct product={product.otrasLineas} />
            </div>
          </div>
        </section>
      )}

      <GalleryProduct product={product.gallery} />
      <MedidasProduct product={product.medidas} />
      <ComparacionProduct product={product.comparacion} />

      {product.accessories && (
        <AccessoriesProduct product={product.accessories} />
      )}

      <TechnicalSheetProduct
        data={product.technicalSheet.data}
        ventajas={product.technicalSheet.ventajas}
      />

      <section className='quoteFormProduct container'>
        <div className='row'>
          <div className='col-md-12 col-lg-8 offset-lg-2'>
            <QuoteForm
              recaptchaSiteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Product

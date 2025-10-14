import HeaderProduct from '@/components/commons/HeaderProduct.jsx'
import ColorsProduct from '@/components/commons/ColorsProduct.jsx'
import GalleryProduct from '@/components/commons/GalleryProduct.jsx'
import MedidasProduct from '@/components/commons/MedidasProduct.jsx'
import ComparacionProduct from '@/components/commons/ComparacionProduct.jsx'
import AccessoriesProduct from '@/components/commons/AccessoriesProduct.jsx'
import TechnicalSheetProduct from '@/components/commons/TechnicalSheetProduct.jsx'
import QuoteForm from '@/components/commons/QuoteForm.jsx'

import product from '@/data/perfiles.json'

import './product.css'

const ProductPerfiles = () => {
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

export default ProductPerfiles

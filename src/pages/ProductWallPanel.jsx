import HeaderProduct from '@/components/commons/HeaderProduct.jsx'
import ColorsProduct from '@/components/commons/ColorsProduct.jsx'
import GalleryProduct from '@/components/commons/GalleryProduct.jsx'
import MedidasProduct from '@/components/commons/MedidasProduct.jsx'

import product from '@/data/wall-panel.json'

import './product.css'

const ProductWallPanel = () => {
  return (
    <main className='product'>
      <HeaderProduct product={product['header'][0]} />
      <section className='contentColors container'>
        <div className='row'>
          <div className='col-md-12'>
            <h3>Colores Disponibles</h3>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <ColorsProduct product={product['colores']} />
          </div>
        </div>

        <GalleryProduct product={product['gallery']} />
        <MedidasProduct product={product['medidas']} />
      </section>
    </main>
  )
}

export default ProductWallPanel

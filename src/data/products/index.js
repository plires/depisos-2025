// Importar todos los JSONs
import cielorrasoFoliado from '@/data/cielorraso-foliado.json'
import cielorrasoPrinter from '@/data/cielorraso-printer.json'
import deckDual from '@/data/deck-dual.json'
import flatPanel from '@/data/flat-panel.json'
import perfiles from '@/data/perfiles.json'
import pisosMelaminicos from '@/data/pisos-melaminicos.json'
import pisosSPC from '@/data/pisos-spc.json'
import siding from '@/data/siding.json'
import vinylFoliados from '@/data/vinyl-foliados.json'
import vinylPlenos from '@/data/vinyl-plenos.json'
import vinylPrinter from '@/data/vinyl-printer.json'
import wallPanel from '@/data/wall-panel.json'

// Configuración de cada producto
export const productsConfig = {
  'cielorraso-foliados': {
    data: cielorrasoFoliado,
    otherLinesTitle: 'Otras líneas de cielorraso',
  },
  'cielorraso-printer': {
    data: cielorrasoPrinter,
    otherLinesTitle: 'Otras líneas de cielorraso',
  },
  'deck-dual': {
    data: deckDual,
  },
  'flat-panel': {
    data: flatPanel,
  },
  perfiles: {
    data: perfiles,
  },
  'pisos-melaminicos': {
    data: pisosMelaminicos,
  },
  'pisos-spc': {
    data: pisosSPC,
  },
  siding: {
    data: siding,
  },
  'vinyl-foliados': {
    data: vinylFoliados,
    otherLinesTitle: 'Otras líneas de vinyl panel',
  },
  'vinyl-plenos': {
    data: vinylPlenos,
    otherLinesTitle: 'Otras líneas de vinyl panel',
  },
  'vinyl-printer': {
    data: vinylPrinter,
    otherLinesTitle: 'Otras líneas de vinyl panel',
  },
  'wall-panel': {
    data: wallPanel,
  },
}

// Helper para obtener producto por slug
export const getProductBySlug = slug => {
  return productsConfig[slug] || null
}

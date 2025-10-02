import carruselHome from '@/data/carrusel-home.json'
import categoriesTop from '@/data/caterogias-top-home.json'
import categoriesMiddle from '@/data/caterogias-middle-home.json'
import categoriesBottom from '@/data/caterogias-bottom-home.json'

export const getCarruselHome = key => carruselHome[key]
export const getCategoriesTop = key => categoriesTop[key]
export const getCategoriesMiddle = key => categoriesMiddle[key]
export const getCategoriesBottom = key => categoriesBottom[key]

export const validation = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Ingresá un nombre'
  }
  if (!values.email) {
    errors.email = 'Ingresá tu email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Ingresá un correo válido'
  }
  if (!values.comments) {
    errors.comments = 'Enviá tu mensaje'
  }
  return errors
}

export const getLink = link => {
  var linkToAttribute = '#'

  switch (link) {
    case 'whatsapp':
      linkToAttribute = import.meta.env.VITE_LINK_TO_WHATSAPP
      break
    case 'mail':
      linkToAttribute = import.meta.env.VITE_MAILTO
      break
    case 'address':
      linkToAttribute = import.meta.env.VITE_ADDRESS
      break

    default:
      linkToAttribute = '#'
  }
  return linkToAttribute
}

export const getImageURL = name => {
  return new URL(`../assets/img/${name}`, import.meta.url).href
}

export const categoryImageMapping = {
  'Tractores': {
    mobile: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Desktop.webp',
    xl: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Desktop-XL.webp'
  },
  'Palas Cargadoras': {
    mobile: '/images/categorias/Palas-Cargadoras/Palas-Cargadoras-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Palas-Cargadoras/Palas-Cargadoras-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Palas-Cargadoras/Palas-Cargadoras-Tzadik-Desktop.webp',
    xl: '/images/categorias/Palas-Cargadoras/Palas-Cargadoras-Tzadik-Desktop-XL.webp'
  },
  'Línea Logística': {
    mobile: '/images/categorias/Linea-Logistica/Linea-Logistica-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Linea-Logistica/Linea-Logistica-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Linea-Logistica/Linea-Logistica-Tzadik-Desktop.webp',
    xl: '/images/categorias/Linea-Logistica/Linea-Logistica-Tzadik-Desktop-XL.webp'
  },
  'Maquinaría Vial': {
    mobile: '/images/categorias/Maquinaria-Vial/Maquinaria-Vial-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Maquinaria-Vial/Maquinaria-Vial-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Maquinaria-Vial/Maquinaria-Vial-Tzadik-Desktop.webp',
    xl: '/images/categorias/Maquinaria-Vial/Maquinaria-Vial-Tzadik-Desktop-XL.webp'
  },
  'Maquinaría Agrícola': {
    mobile: '/images/categorias/Maquinaria-Agricola/Maquinaria-Agricola-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Maquinaria-Agricola/Maquinaria-Agricola-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Maquinaria-Agricola/Maquinaria-Agricola-Tzadik-Desktop.webp',
    xl: '/images/categorias/Maquinaria-Agricola/Maquinaria-Agricola-Tzadik-Desktop-XL.webp'
  },
  'Implementos': {
    mobile: '/images/categorias/Implementos/Implementos-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Implementos/Implementos-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Implementos/Implementos-Tzadik-Desktop.webp',
    xl: '/images/categorias/Implementos/Implementos-Tzadik-Desktop-XL.webp'
  },
  'Ferretería': {
    mobile: '/images/categorias/Ferreteria/Ferreteria-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Ferreteria/Ferreteria-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Ferreteria/Ferreteria-Tzadik-Desktop.webp',
    xl: '/images/categorias/Ferreteria/Ferreteria-Tzadik-Desktop-XL.webp'
  },
  'Productos Especiales': {
    mobile: '/images/categorias/Productos-Especiales/Productos-Especiales-Tzadik-Mobile.webp',
    tablet: '/images/categorias/Productos-Especiales/Productos-Especiales-Tzadik-Tablet.webp',
    desktop: '/images/categorias/Productos-Especiales/Productos-Especiales-Tzadik-Desktop.webp',
    xl: '/images/categorias/Productos-Especiales/Productos-Especiales-Tzadik-Desktop-XL.webp'
  }
}

export const getCategoryImages = (categoryName) => {
  return categoryImageMapping[categoryName] || null
}

export const getCategoryImage = (categoryName, size = 'desktop') => {
  const images = getCategoryImages(categoryName)
  return images ? images[size] : null
}

export const getCategoryImageByBreakpoint = (categoryName, breakpoint = 'md') => {
  const images = getCategoryImages(categoryName)
  if (!images) return null

  const breakpointMap = {
    'mobile': images.mobile,
    'md': images.tablet,
    'lg': images.desktop,
    'xxl': images.xl
  }

  return breakpointMap[breakpoint] || images.desktop
}
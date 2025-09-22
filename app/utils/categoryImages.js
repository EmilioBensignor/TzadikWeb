export const categoryImageMapping = {
  'Tractores': {
    mobile: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Mobile.jpg',
    tablet: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Tablet.jpg',
    desktop: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Desktop.jpg',
    xl: '/images/categorias/Tractores/Tractores-Hanomag-Tzadik-Desktop-XL.jpg'
  }
  // Agregar más categorías aquí cuando tengas las imágenes
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
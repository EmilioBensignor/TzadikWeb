export const useOgMeta = () => {
  const setPageMeta = (options) => {
    const baseUrl = 'https://tzadik.com.ar'

    const finalUrl = options.url || baseUrl
    const imageUrl = options.image.startsWith('http') ? options.image : `${baseUrl}${options.image}`

    const title = `${options.title} - Tzadik`
    const description = options.description

    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: options.type || 'website' },
        { property: 'og:url', content: finalUrl },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl }
      ]
    })
  }

  return {
    setPageMeta
  }
}

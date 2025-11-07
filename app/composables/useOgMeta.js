export const useOgMeta = () => {
  const setPageMeta = (options) => {
    const baseUrl = 'https://tzadik.com.ar'

    const finalUrl = options.url || baseUrl
    const imageUrl = options.image.startsWith('http') ? options.image : `${baseUrl}${options.image}`

    useHead({
      title: `${options.title} - Tzadik`,
      meta: [
        {
          name: 'description',
          content: options.description
        },
        { property: 'og:type', content: options.type || 'website' },
        { property: 'og:url', content: finalUrl },
        { property: 'og:title', content: `${options.title} - Tzadik` },
        { property: 'og:description', content: options.description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${options.title} - Tzadik` },
        { name: 'twitter:description', content: options.description },
        { name: 'twitter:image', content: imageUrl }
      ]
    })
  }

  return {
    setPageMeta
  }
}

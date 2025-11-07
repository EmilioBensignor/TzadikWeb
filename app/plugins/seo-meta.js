/**
 * Plugin global para manejar meta tags Open Graph en SSR
 * Este plugin se ejecuta en servidor y cliente antes de renderizar
 */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      setOgMeta: (options) => {
        const baseUrl = 'https://tzadik.com.ar'
        const finalUrl = options.url || baseUrl
        const imageUrl = options.image.startsWith('http')
          ? options.image
          : `${baseUrl}${options.image}`

        const title = `${options.title} - Tzadik`

        useHead({
          title,
          meta: [
            { name: 'description', content: options.description },
            { property: 'og:type', content: options.type || 'website' },
            { property: 'og:url', content: finalUrl },
            { property: 'og:title', content: title },
            { property: 'og:description', content: options.description },
            { property: 'og:image', content: imageUrl },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: options.description },
            { name: 'twitter:image', content: imageUrl }
          ]
        })
      }
    }
  }
})

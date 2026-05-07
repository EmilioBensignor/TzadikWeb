// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/seo', '@nuxtjs/supabase'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      htmlAttrs: {
        lang: 'es'
      },
      // %s se reemplaza por el title de cada página (vía useSeoMeta).
      // Si la página no setea title, se renderiza solo "Tzadik - Maquinaria agrícola y vial"
      // (configurado vía site.name + site.description en @nuxtjs/seo).
      titleTemplate: '%s',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#FF541C' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { property: 'og:locale', content: 'es_AR' },
        { property: 'og:site_name', content: 'Tzadik' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/images/Logo-Tzadik.svg' },
        // Preconnect a Supabase Storage para acortar TTFB de imágenes de productos
        { rel: 'preconnect', href: 'https://bueiuoskfgmfakhfzrqf.supabase.co', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://bueiuoskfgmfakhfzrqf.supabase.co' }
      ]
    }
  },
  site: {
    url: 'https://www.tzadik.com.ar',
    name: 'Tzadik',
    description: 'Maquinaria agrícola y vial para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento.',
    defaultLocale: 'es'
  },
  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: false
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ],
    autoLastmod: true,
    cacheMaxAgeSeconds: 600,
    xsl: false
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Tzadik',
      url: 'https://www.tzadik.com.ar',
      logo: 'https://www.tzadik.com.ar/images/Logo-Tzadik.svg',
      sameAs: [
        'https://www.instagram.com/tzadik.argentina/',
        'https://www.facebook.com/tzadik.argentina/',
        'https://www.tiktok.com/@tzadik.argentina',
        'https://www.youtube.com/@tzadik.argentina'
      ]
    }
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800],
    }
  },
  icon: {
    provider: 'iconify',
    collections: ['tabler']
  },
  image: {
    // Permite a `<NuxtImg>` optimizar imágenes externas del bucket de Supabase.
    // En producción Vercel sirve via /_vercel/image con AVIF/WebP automático.
    domains: ['bueiuoskfgmfakhfzrqf.supabase.co'],
    format: ['avif', 'webp'],
    screens: {
      sm: 480,
      md: 768,
      lg: 1080,
      xl: 1280,
      xxl: 1440
    }
  },
  supabase: {
    redirect: false,
  },
  // Caché HTML en el edge: stale-while-revalidate
  // Páginas estáticas se rebuildean cada hora, mantienen contenido fresco mientras tanto.
  routeRules: {
    '/': { swr: 3600 },
    '/quienes-somos': { swr: 3600 },
    '/servicios': { swr: 3600 },
    '/contacto': { swr: 3600 },
    '/categorias': { redirect: { to: '/', statusCode: 301 } },
    '/categorias/**': { swr: 600 },
    '/marcas': { redirect: { to: '/', statusCode: 301 } },
    '/marcas/**': { swr: 600 }
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.tzadik.com.ar'
    }
  },
  ssr: true
})

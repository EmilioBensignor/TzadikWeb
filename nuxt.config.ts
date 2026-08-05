// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/seo', '@nuxtjs/supabase', 'nuxt-gtag'],

  // Google Analytics 4. Sin NUXT_PUBLIC_GTAG_ID el modulo no carga nada.
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
    enabled: Boolean(process.env.NUXT_PUBLIC_GTAG_ID) && process.env.NODE_ENV === 'production'
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      htmlAttrs: {
        lang: 'es'
      },
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
        { rel: 'preconnect', href: 'https://bueiuoskfgmfakhfzrqf.supabase.co', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://bueiuoskfgmfakhfzrqf.supabase.co' }
      ]
    }
  },
  site: {
    url: 'https://www.tzadik.com.ar',
    name: 'Tzadik',
    description: 'Tractores, maquinaria vial y vehículos off road para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento.',
    defaultLocale: 'es'
  },
  seo: {
    fallbackTitle: false,
    redirectToCanonicalSiteUrl: false
  },
  ogImage: { enabled: false },
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
    provider: 'none',
    serverBundle: {
      collections: ['tabler', 'material-symbols']
    },
    clientBundle: {
      scan: true,
      // Estos se arman en runtime (`tabler:${item.icon}` desde menu.js y contacto.vue),
      // asi que el escaneo estatico no los detecta.
      icons: [
        'tabler:mail',
        'tabler:phone',
        'tabler:map-pin',
        'tabler:brand-whatsapp',
        'tabler:star',
        'tabler:star-filled'
      ]
    }
  },
  image: {
    provider: 'none',
    domains: ['bueiuoskfgmfakhfzrqf.supabase.co'],
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

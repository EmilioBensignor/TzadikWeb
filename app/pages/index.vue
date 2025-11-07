<template>
    <DefaultMain>
        <HomeHero />
        <NavCategorias class="hidden lg:block lg:sticky lg:top-[9.5rem] xxl:top-36 lg:-mt-52 xxl:-mt-60" />
        <HomeOfertas class="lg:mt-16 xxl:mt-14" />
        <HomeMarcas />
        <HomeServicios />
        <HomeReviews />
        <HomeUbicaciones />
        <HomeContacto />
    </DefaultMain>
</template>

<script setup>
const pageTitle = computed(() => 'Tzadik - Maquinaria Agrícola y Víal')

const pageDescription = computed(() =>
    'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento'
)

const pageUrl = computed(() => 'https://tzadik.com.ar')

const ogImage = computed(() => 'https://www.tzadik.com.ar/_vercel/image?url=%2Fimages%2FLogo-Tzadik.svg&w=1536&q=100')

useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: pageDescription },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:image', content: ogImage },
        { property: 'og:url', content: pageUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' }
    ]
})
</script>
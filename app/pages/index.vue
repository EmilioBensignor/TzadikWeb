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
const config = useRuntimeConfig()

const title = 'Tzadik - Maquinaria Agrícola y Víal'
const description = 'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento'
const ogImage = `${config.public.siteUrl}/images/Logo-Tzadik.svg`
const ogUrl = `${config.public.siteUrl}`

useHead({
    title: title,
    meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImage },
        { property: 'og:url', content: ogUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' }
    ]
})
</script>
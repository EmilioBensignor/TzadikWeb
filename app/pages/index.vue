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
const siteUrl = config.public.siteUrl

const title = 'Maquinaria agrícola y vial - Tzadik'
const description = 'Maquinaria agrícola y vial para maximizar tu productividad. Asistencia técnica, repuestos y mantenimiento en NEA.'
const ogImage = `${siteUrl}/images/og/Tzadik-OG.jpg`

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogUrl: siteUrl,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCard: 'summary_large_image'
})
</script>
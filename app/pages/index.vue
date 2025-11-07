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

const siteUrl = config.public.siteUrl || 'https://tzadik.com.ar'

const title = 'Tzadik - Maquinaria agrícola y vial'
const description = 'Maquinaria agrícola y vial para maximizar tu productividad. Asistencia técnica, repuestos y mantenimiento.'
const ogImage = `${siteUrl}/images/Logo-Tzadik.png`

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: siteUrl,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCard: 'summary_large_image'
})
</script>
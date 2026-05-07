<template>
    <DefaultMain>
        <ServiciosHero />
        <NavCategorias class="hidden lg:block lg:!z-10 lg:-mt-52 xxl:-mt-60" />
        <ServiciosSoluciones />
        <HomeContacto />
    </DefaultMain>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const title = 'Servicios - Tzadik'
const description = 'Asistencia técnica especializada, repuestos originales y mantenimiento preventivo para maquinaria agrícola y vial.'
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
    ogUrl: `${siteUrl}/servicios`,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCard: 'summary_large_image'
})
</script>
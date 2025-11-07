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

const siteUrl = config.public.siteUrl || 'https://tzadik.com.ar'

const title = 'Servicios - Tzadik'
const description = 'Asistencia técnica especializada, repuestos originales y mantenimiento preventivo para maquinaria agrícola y vial.'
const ogImage = `${siteUrl}/images/Logo-Tzadik.png`

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: `${siteUrl}/servicios`,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCard: 'summary_large_image'
})
</script>
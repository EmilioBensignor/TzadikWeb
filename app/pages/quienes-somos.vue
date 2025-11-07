<template>
    <DefaultMain>
        <SomosHero />
        <NavCategorias class="hidden lg:block lg:!z-10 lg:-mt-52 xxl:-mt-60" />
        <SomosNosotros />
        <HomeReviews />
        <HomeUbicaciones />
        <HomeContacto />
    </DefaultMain>
</template>

<script setup>
const config = useRuntimeConfig()

const siteUrl = config.public.siteUrl || 'https://tzadik.com.ar'

const title = 'Quiénes Somos - Tzadik'
const description = 'Conoce nuestra trayectoria en maquinaria agrícola y vial. Compromiso, calidad y experiencia al servicio de tu productividad.'
const ogImage = `${siteUrl}/images/Logo-Tzadik.png`

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: `${siteUrl}/quienes-somos`,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterCard: 'summary_large_image'
})
</script>
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
useSeoMeta({
    title: 'Tzadik - Maquinaria Agrícola y Víal',
    description: 'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento',
    ogTitle: 'Tzadik - Maquinaria Agrícola y Víal',
    ogDescription: 'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento',
    ogImage: 'https://tzadik.com.ar/og-image-fallback.jpg',
    ogUrl: 'https://tzadik.com.ar',
    ogType: 'website',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: 'Tzadik - Maquinaria Agrícola y Víal',
    twitterDescription: 'Maquinaria agrícola y víal para maximizar tu productividad',
    twitterImage: 'https://tzadik.com.ar/og-image-fallback.jpg',
    twitterCard: 'summary_large_image'
})
</script>
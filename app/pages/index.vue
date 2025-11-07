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

useHead({
    title: 'Tzadik - Maquinaria Agrícola y Víal',
    meta: [
        { name: 'description', content: 'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento' },
        { property: 'og:title', content: 'Tzadik - Maquinaria Agrícola y Víal' },
        { property: 'og:description', content: 'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento' },
        { property: 'og:image', content: `${config.public.siteUrl}/images/Logo-Tzadik.svg` },
        { property: 'og:url', content: config.public.siteUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:title', content: 'Tzadik - Maquinaria Agrícola y Víal' },
        { name: 'twitter:description', content: 'Maquinaria agrícola y víal para maximizar tu productividad' },
        { name: 'twitter:image', content: `${config.public.siteUrl}/images/Logo-Tzadik.svg` },
        { name: 'twitter:card', content: 'summary_large_image' }
    ]
})
</script>
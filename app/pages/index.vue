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
const { setPageMeta } = useOgMeta()

onMounted(() => {
    setPageMeta({
        title: 'Tzadik - Maquinaria Agrícola y Víal',
        description: 'Maquinaria agrícola y víal para maximizar tu productividad. Para que tu trabajo no se detenga: asistencia técnica, repuestos y mantenimiento',
        image: '/images/Logo-Tzadik.svg',
        url: 'https://tzadik.com.ar',
        type: 'website'
    })
})
</script>
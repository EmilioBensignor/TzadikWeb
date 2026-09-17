<template>
    <DefaultMain class="md:!gap-8 md:px-11 lg:px-20 xxl:px-0 pb-6 md:pb-12 lg:pb-16">
        <div
            class="w-full max-w-[1200px] flex items-end gap-2 text-sm font-semibold p-5 pb-3 md:pt-8 md:pb-0 md:px-0 mx-auto">
            <NuxtLink :to="ROUTE_NAMES.HOME" class="text-gray-dark">Inicio</NuxtLink>
            <Icon name="tabler:chevron-right" class="w-5 h-5 text-primary" />
            <p>Productos</p>
        </div>
        <div class="w-full max-w-[1200px] px-5 md:px-0 mx-auto">
            <HeadingH1 class="!text-left uppercase">Todos los productos</HeadingH1>
        </div>
        <CategoriaFiltros />
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

const config = useRuntimeConfig()

const pageTitle = 'Productos - Tzadik'
const pageDescription = 'Buscá entre todos los productos de Tzadik: tractores, maquinaria vial y off road.'
const pageUrl = `${config.public.siteUrl}/categorias`
const ogImage = `${config.public.siteUrl}/images/og/Tzadik-OG.jpg`

useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: pageUrl,
    ogType: 'website',
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: ogImage,
    twitterCard: 'summary_large_image'
})

useSchemaOrg([
    defineBreadcrumb({
        itemListElement: [
            { name: 'Inicio', item: '/' },
            { name: 'Productos', item: pageUrl }
        ]
    })
])
</script>

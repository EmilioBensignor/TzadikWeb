<template>
    <DefaultMain class="md:!gap-8 md:px-11 lg:px-20 xxl:px-0 pb-6 md:pb-12 lg:pb-16">
        <div
            class="w-full max-w-[1200px] flex items-end gap-2 text-sm font-semibold p-5 pb-3 md:pt-8 md:pb-0 md:px-0 mx-auto">
            <NuxtLink :to="ROUTE_NAMES.HOME" class="text-gray-dark">Inicio</NuxtLink>
            <Icon name="tabler:chevron-right" class="w-5 h-5 text-primary" />
            <p>{{ categoria?.nombre }}</p>
        </div>
        <div class="w-full max-w-[1200px] relative mx-auto ">
            <picture v-if="categoryImages" class="w-full object-cover overflow-hidden">
                <source media="(min-width: 1440px)" :srcset="categoryImages.xl">
                <source media="(min-width: 1080px)" :srcset="categoryImages.desktop">
                <source media="(min-width: 768px)" :srcset="categoryImages.tablet">
                <img :src="categoryImages.mobile" :alt="`${categoria?.nombre} - Tzadik`"
                    class="w-full h-full md:rounded-xl md:shadow md:shadow-black/30 object-cover" />
            </picture>
            <div class="w-full h-full sr-only absolute top-0 p-5 md:p-10 lg:p-12">
                <HeadingH1 class="!text-left text-light uppercase">{{ categoria?.nombre }}</HeadingH1>
            </div>
        </div>
        <CategoriaFiltros />
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import { getCategoryImages, getCategoryImageByBreakpoint } from '~/utils/categoryImages'

const route = useRoute()
const config = useRuntimeConfig()
const { categorias, fetchCategorias, loading, error } = useCategorias()
const { productos, fetchProductos, getImageUrl } = useProductos()

if (categorias.value.length === 0) {
    await fetchCategorias()
}

const categoria = computed(() => {
    return categorias.value.find(cat => cat.nombre === route.params.categoria)
})

if (categoria.value) {
    await fetchProductos({
        categoria_id: categoria.value.id,
        includeImages: true,
        limit: 5
    })
}

const categoryImages = computed(() => {
    return categoria.value ? getCategoryImages(categoria.value.nombre) : null
})

const pageTitle = computed(() =>
    categoria.value ? `${categoria.value.nombre} - Tzadik` : 'Categorías - Tzadik'
)

const pageDescription = computed(() =>
    categoria.value
        ? `Explorar ${categoria.value.nombre} en Tzadik - Maquinaria agrícola y víal de calidad`
        : 'Explora nuestras categorías de maquinaria agrícola y víal'
)

const pageUrl = computed(() =>
    `${config.public.siteUrl}/categorias/${route.params.categoria}`
)

const ogImage = computed(() => {
    const primerProductoConImagen = productos.value.find(p =>
        p.producto_imagenes?.length > 0
    )

    if (primerProductoConImagen?.producto_imagenes?.[0]?.storage_path) {
        return getImageUrl(primerProductoConImagen.producto_imagenes[0].storage_path)
    }

    return `${config.public.siteUrl}/images/Logo-Tzadik.svg`
})

useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: 'https://www.tzadik.com.ar/_vercel/image?url=%2Fimages%2FLogo-Tzadik.svg&w=1536&q=100',
    ogUrl: pageUrl,
    ogType: 'website',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: 'https://www.tzadik.com.ar/_vercel/image?url=%2Fimages%2FLogo-Tzadik.svg&w=1536&q=100',
    twitterCard: 'summary_large_image'
})
</script>
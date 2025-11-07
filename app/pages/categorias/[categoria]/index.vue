<template>
    <DefaultMain class="md:!gap-8 md:px-11 lg:px-20 xxl:px-0 pb-6 md:pb-12 lg:pb-16">
        <div class="w-full max-w-[1200px] flex items-end gap-2 text-sm font-semibold p-5 pb-3 md:pt-8 md:pb-0 md:px-0 mx-auto">
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
const { categorias, fetchCategorias, loading, error } = useCategorias()
const { setPageMeta } = useOgMeta()
const { productos, fetchProductos, getImageUrl } = useProductos()

const categoria = computed(() => {
    return categorias.value.find(cat => cat.nombre === route.params.categoria)
})

const categoryImages = computed(() => {
    return categoria.value ? getCategoryImages(categoria.value.nombre) : null
})

const obtenerProductoAleatorio = () => {
    if (!categoria.value) return null

    const productosCategoria = productos.value.filter(prod => prod.categoria_id === categoria.value.id)

    if (productosCategoria.length === 0) return null

    const indiceAleatorio = Math.floor(Math.random() * productosCategoria.length)
    return productosCategoria[indiceAleatorio]
}

const actualizarMetaTags = async () => {
    if (categoria.value) {
        let imagenUrl = '/og-image-fallback.jpg'

        if (categoria.value && productos.value.filter(p => p.categoria_id === categoria.value.id).length === 0) {
            await fetchProductos({
                categoria_id: categoria.value.id,
                includeImages: true,
                noPagination: true
            })
        }

        const productoAleatorio = obtenerProductoAleatorio()

        if (productoAleatorio?.producto_imagenes?.length > 0) {
            const imagenPrincipal = productoAleatorio.producto_imagenes.find(img => img.es_principal) || productoAleatorio.producto_imagenes[0]
            imagenUrl = getImageUrl(imagenPrincipal.storage_path)
        }

        setPageMeta({
            title: categoria.value.nombre,
            description: `Explorar ${categoria.value.nombre} en Tzadik - Maquinaria agrícola y víal de calidad`,
            image: imagenUrl,
            url: `https://tzadik.com.ar/categorias/${route.params.categoria}`,
            type: 'website'
        })
    }
}

onMounted(async () => {
    if (categorias.value.length === 0) {
        await fetchCategorias()
    }
    await actualizarMetaTags()
})

watch(() => categoria.value, async () => {
    await actualizarMetaTags()
})
</script>
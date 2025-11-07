<template>
    <DefaultMain class="gap-6 lg:!gap-8 xxl:!gap-10">
        <nav
            class="w-full max-w-[1200px] flex flex-wrap items-end gap-2 text-sm font-semibold pt-8 px-5 md:px-11 lg:px-20 xxl:px-0 mx-auto">
            <ul class="flex items-center gap-2">
                <li>
                    <NuxtLink :to="ROUTE_NAMES.HOME" class="text-gray-dark">Inicio</NuxtLink>
                </li>
                <Icon name="tabler:chevron-right" class="w-5 h-5 text-primary" />
                <li>
                    <NuxtLink :to="`/categorias/${categoria?.nombre}`" class="text-gray-dark">{{ categoria?.nombre }}
                    </NuxtLink>
                </li>
                <Icon name="tabler:chevron-right" class="w-5 h-5 text-primary" />
            </ul>
            <p>{{ producto?.titulo }}</p>
        </nav>

        <div v-if="loadingProducto" class="flex flex-col items-center justify-center py-12 px-5">
            <Icon name="tabler:loader-2" class="w-8 h-8 text-primary animate-spin mb-4" />
            <p class="text-gray-600 text-center">Cargando producto...</p>
        </div>

        <div v-else-if="!producto" class="flex flex-col items-center justify-center py-12 px-5">
            <Icon name="tabler:package-off" class="w-16 h-16 text-gray-400 mb-4" />
            <p class="text-lg font-semibold text-gray-600 mb-2">Producto no encontrado</p>
            <p class="text-gray-500 text-center mb-4">El producto que buscas no existe o fue eliminado</p>
            <NuxtLink :to="ROUTE_NAMES.HOME"
                class="bg-primary text-light px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Volver al inicio
            </NuxtLink>
        </div>

        <div v-else class="w-full max-w-[1200px] mx-auto">
            <ProductDetalle :producto="producto" :getImageUrl="getImageUrl" :getYouTubeEmbedUrl="getYouTubeEmbedUrl"
                :getYouTubeThumbnail="getYouTubeThumbnail" :esYouTubeShort="esYouTubeShort" :formatearTexto="formatearTexto"
                :descargarFichaTecnica="descargarFichaTecnica" :cambiarImagenPrincipal="cambiarImagenPrincipal" />
        </div>
        <DefaultSection class="lg:hidden px-5 md:px-11">
            <div class="w-full flex flex-col gap-4 bg-gray-mid rounded-lg p-3">
                <div class="flex gap-3">
                    <NuxtImg src="/images/servicios/Mantenimiento.svg" alt="Mantenimiento Servicios Tzadik"
                        class="w-8 h-8 object-contain flex-shrink-0" />
                    <div class="flex flex-col gap-1">
                        <HeadingH3 class="text-primary">RENDIMIENTO ASEGURADO</HeadingH3>
                        <p class="text-xs md:text-sm font-bold">Contamos con técnicos expertos y repuestos oficiales
                            para tu
                            equipo.</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <NuxtImg src="/images/servicios/Camion-traslados.svg" alt="Camión de Traslados Servicios Tzadik"
                        class="w-8 h-8 object-contain flex-shrink-0" />
                    <div class="flex flex-col gap-1">
                        <HeadingH3 class="text-primary">TRASLADAMOS TU MAQUINARIA</HeadingH3>
                        <p class="text-xs md:text-sm font-bold">Nos encargamos de llevarte tu maquinaria con nuestro
                            camión
                            especializado</p>
                    </div>
                </div>
            </div>
        </DefaultSection>
        <div class="w-full max-w-[1200px] mx-auto">
            <DefaultSection class="lg:px-20 xxl:px-0 my-8">
                <HeadingH2 class="lg:w-full lg:text-left">MIRÁ OTROS PRODUCTOS SIMILARES</HeadingH2>

                <div v-if="loadingSimilares" class="flex justify-center py-4">
                    <Icon name="tabler:loader-2" class="w-8 h-8 text-primary animate-spin" />
                </div>

                <CarouselStatic v-else :slides-per-view="{ base: 1.3, sm: 2.3, md: 3, lg: 4, xl: 4, xxl: 4 }"
                    :gap="{ base: 12, md: 12, lg: 16, xl: 16, xxl: 16 }" :button-position="{
                        top: {
                            base: '20%',
                            md: '30%',
                            lg: '32%',
                            xl: '35%',
                            xxl: '35%',
                        },
                        transform: 'translateY(0)',
                        left: {
                            base: '0.5rem',
                            md: '1rem',
                            lg: '-1rem',
                            xl: '-1rem',
                            xxl: '-1rem',
                        },
                        right: {
                            base: '0.5rem',
                            md: '1rem',
                            lg: '-1rem',
                            xl: '-1rem',
                            xxl: '-1rem',
                        }
                    }" class="md:px-11 lg:px-0">
                    <ProductCard v-for="producto in productosSimilares" :key="producto.id" :product="producto" />
                </CarouselStatic>
            </DefaultSection>
        </div>
        <HomeContacto />
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import { formatCurrency } from '@/utils/formatCurrency'

const route = useRoute()
const { categorias, fetchCategorias } = useCategorias()
const { productos, fetchProductos, getImageUrl, getCurrencySymbol, generateSlug, loading, error } = useProductos()
const { getVideoUrl } = useStorage()

const productosSimilares = ref([])
const loadingSimilares = ref(false)
const loadingProducto = ref(true)

const producto = ref(null)
const categoria = ref(null)
const imagenPrincipalActual = ref(null)

const buscarProducto = async () => {
    loadingProducto.value = true
    const productoSlug = route.params.producto
    const categoriaSlug = route.params.categoria

    if (categorias.value.length === 0) {
        await fetchCategorias()
    }

    categoria.value = categorias.value.find(cat => generateSlug(cat.nombre) === categoriaSlug)

    if (!categoria.value) {
        return
    }

    await fetchProductos({
        categoria_id: categoria.value.id,
        includeImages: true,
        noPagination: true
    })

    producto.value = productos.value.find(prod => generateSlug(prod.titulo) === productoSlug)

    if (producto.value) {
        let mediaPrincipal = null

        if (producto.value.videos?.length > 0) {
            mediaPrincipal = producto.value.videos[0]
            mediaPrincipal.es_video = true
        } else {
            mediaPrincipal = producto.value.producto_imagenes?.find(img => img.es_principal) || producto.value.producto_imagenes?.[0]
            if (mediaPrincipal) {
                mediaPrincipal.es_video = false
            }
        }

        imagenPrincipalActual.value = mediaPrincipal

        await obtenerProductosSimilares()
    }

    loadingProducto.value = false
}

const imagenPrincipal = computed(() => {
    if (!imagenPrincipalActual.value) {
        return '/images/placeholder-product.jpg'
    }

    if (imagenPrincipalActual.value.es_video) {
        return getYouTubeEmbedUrl(imagenPrincipalActual.value.url || imagenPrincipalActual.value.storage_path || imagenPrincipalActual.value.link)
    }

    return getImageUrl(imagenPrincipalActual.value.storage_path)
})

const esPrincipalVideo = computed(() => {
    return imagenPrincipalActual.value?.es_video || false
})

const imagenesAdicionales = computed(() => {
    if (!producto.value?.producto_imagenes) return []
    return producto.value.producto_imagenes.filter(img => !img.es_principal)
})

const todosLosMedias = computed(() => {
    const medios = []

    if (producto.value?.videos?.length > 0) {
        const videosConMarca = producto.value.videos.map(video => ({
            ...video,
            es_video: true
        }))
        medios.push(...videosConMarca)
    }

    if (producto.value?.producto_imagenes?.length > 0) {
        const imagenesConMarca = producto.value.producto_imagenes.map(imagen => ({
            ...imagen,
            es_video: false
        }))
        medios.push(...imagenesConMarca)
    }

    return medios
})

const datosDinamicos = computed(() => {
    if (!producto.value?.datos_dinamicos) return {}

    const formatted = {}
    Object.entries(producto.value.datos_dinamicos).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            formatted[formattedKey] = value
        }
    })

    return formatted
})

const esYouTubeShort = (url) => {
    if (!url) return false
    return url.includes('/shorts/')
}

const getYouTubeVideoId = (url) => {
    if (!url) return null

    const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/)
    if (shortsMatch) return shortsMatch[1]

    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[7].length === 11) ? match[7] : null
}

const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url)
    if (!videoId) {
        return url
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`
    return embedUrl
}

const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url)
    if (!videoId) return '/images/placeholder-product.jpg'
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

const cambiarMediaPrincipal = (media) => {
    imagenPrincipalActual.value = media
}

const formatearTexto = (texto) => {
    if (!texto) return ''
    return texto.replace(/\n/g, '<br>')
}

const descargarFichaTecnica = async () => {
    const config = useRuntimeConfig()
    const fileUrl = `${config.public.supabase.url}/storage/v1/object/public/productos-pdfs/${producto.value.ficha_tecnica}`

    try {
        const response = await fetch(fileUrl)
        const blob = await response.blob()

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = producto.value.ficha_tecnica
        link.click()
        URL.revokeObjectURL(url)
    } catch (error) {
        window.open(fileUrl, '_blank')
    }
}

const cambiarImagenPrincipal = (imagen) => {
    imagenPrincipalActual.value = { ...imagen, es_video: false }
}

const obtenerProductosSimilares = async () => {
    if (!categoria.value || !producto.value) return

    try {
        loadingSimilares.value = true

        const productosCategoria = productos.value.filter(prod =>
            prod.categoria_id === categoria.value.id && prod.id !== producto.value.id
        )

        const productosOrdenados = productosCategoria.sort((a, b) => {
            if (a.destacado && !b.destacado) return -1
            if (!a.destacado && b.destacado) return 1

            if (a.oferta && !b.oferta) return -1
            if (!a.oferta && b.oferta) return 1

            return new Date(b.created_at) - new Date(a.created_at)
        })

        productosSimilares.value = productosOrdenados.slice(0, 8)

    } catch (error) {
        console.error('Error obteniendo productos similares:', error)
    } finally {
        loadingSimilares.value = false
    }
}

const { setPageMeta } = useOgMeta()

const actualizarMetaTagsProducto = () => {
    if (producto.value) {
        let imagenProducto = '/og-image.jpg'

        if (imagenPrincipalActual.value?.es_video) {
            imagenProducto = getYouTubeThumbnail(imagenPrincipalActual.value.url || imagenPrincipalActual.value.storage_path || imagenPrincipalActual.value.link)
        } else if (imagenPrincipalActual.value?.storage_path) {
            imagenProducto = getImageUrl(imagenPrincipalActual.value.storage_path)
        }

        setPageMeta({
            title: producto.value.titulo,
            description: producto.value.descripcion_corta || `${producto.value.titulo} - Maquinaria agrícola en Tzadik`,
            image: imagenProducto,
            url: `https://tzadik.com.ar/categorias/${route.params.categoria}/${route.params.producto}`,
            type: 'product'
        })
    }
}

watch(() => route.params, async () => {
    await buscarProducto()
    actualizarMetaTagsProducto()
}, { immediate: false })

watch(() => producto.value, () => {
    actualizarMetaTagsProducto()
})

watch(() => imagenPrincipalActual.value, () => {
    actualizarMetaTagsProducto()
})

onMounted(async () => {
    await buscarProducto()
    actualizarMetaTagsProducto()
})
</script>
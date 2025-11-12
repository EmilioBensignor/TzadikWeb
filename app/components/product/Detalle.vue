<template>
    <DefaultSection class="flex flex-col lg:flex-row-reverse lg:items-start gap-6 lg:gap-4 xxl:gap-8 lg:px-20 xxl:px-0">
        <div class="w-full max-w-[100vw] lg:hidden md:pl-11 lg:pl-0">
            <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.3, md: 2.2 }" :show-arrows="false">
                <div v-for="(media, index) in todosLosMedias" :key="index"
                    class="bg-gray-100 overflow-hidden rounded-xl">
                    <div v-if="media.es_video" class="w-full aspect-[4/3] pb-2.5">
                        <iframe :src="getYouTubeEmbedUrl(media.url || media.storage_path || media.link)"
                            :title="`${producto.titulo} video ${index + 1}`" class="w-full h-full rounded-xl bg-black"
                            frameborder="0" allowfullscreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            loading="lazy">
                        </iframe>
                    </div>
                    <NuxtImg v-else :src="getImageUrl(media.storage_path)" :alt="`${producto.titulo} ${index + 1}`"
                        class="w-full rounded-xl object-cover" />
                </div>
            </CarouselStatic>
        </div>

        <div class="lg:w-1/2 hidden lg:flex flex-col gap-4 lg:gap-6">
            <div class="w-full h-[25rem] overflow-hidden relative flex items-center justify-center bg-black rounded-xl">
                <iframe v-if="esPrincipalVideo" :src="imagenPrincipal" :title="`${producto.titulo} video`" :class="[
                    'rounded-xl',
                    esVideoPrincipalShort ? 'h-full w-auto' : 'w-full h-full'
                ]" class="object-cover" frameborder="0" allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
                <NuxtImg v-else :src="imagenPrincipal" :alt="producto.titulo"
                    class="w-full h-full object-cover rounded-xl" />

                <button v-if="todosLosMedias.length > 1" @click="navegarMedia('prev')"
                    class="w-10 h-10 flex items-center justify-center absolute z-10 left-1 top-1/2 -translate-y-1/2 bg-primary rounded-full shadow-lg text-light">
                    <Icon name="tabler:chevron-left" class="w-7 h-7" />
                </button>

                <button v-if="todosLosMedias.length > 1" @click="navegarMedia('next')"
                    class="w-10 h-10 flex items-center justify-center absolute z-10 right-1 top-1/2 -translate-y-1/2 bg-primary rounded-full shadow-lg text-light">
                    <Icon name="tabler:chevron-right" class="w-7 h-7" />
                </button>
            </div>
            <div v-if="todosLosMedias.length > 1" class="flex gap-2 overflow-x-auto">
                <div v-for="(media, index) in mediasSecundarios" :key="index"
                    class="flex-shrink-0 w-[6.75rem] xxl:w-36 h-[6.875rem] rounded-lg overflow-hidden cursor-pointer relative"
                    @click="cambiarMediaPrincipal(media)">
                    <div v-if="media.es_video" class="relative w-full h-full">
                        <img :src="getYouTubeThumbnail(media.url || media.storage_path || media.link)"
                            class="w-full h-full object-cover" :alt="`${producto.titulo} video thumbnail`" />
                        <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <Icon name="tabler:play" class="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <NuxtImg v-else :src="getImageUrl(media.storage_path)" :alt="`${producto.titulo} ${index + 2}`"
                        class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-dark/40"></div>
                </div>
            </div>
            <div class="w-full flex flex-col gap-4 bg-gray-mid rounded-lg p-3 lg:p-5">
                <div class="flex items-center gap-3">
                    <NuxtImg src="/images/servicios/Mantenimiento.svg" alt="Mantenimiento Servicios Tzadik"
                        class="w-8 lg:w-10 h-8 lg:h-10 object-contain flex-shrink-0" />
                    <div class="flex flex-col">
                        <HeadingH3 class="lg:!text-xl text-primary">RENDIMIENTO ASEGURADO</HeadingH3>
                        <p class="text-xs md:text-sm font-bold">Contamos con técnicos expertos y repuestos oficiales
                            para tu
                            equipo.</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <NuxtImg src="/images/servicios/Camion-traslados.svg" alt="Camión de Traslados Servicios Tzadik"
                        class="w-8 lg:w-10 h-8 lg:h-10 object-contain flex-shrink-0" />
                    <div class="flex flex-col">
                        <HeadingH3 class="lg:!text-xl text-primary">TRASLADAMOS TU MAQUINARIA</HeadingH3>
                        <p class="text-xs md:text-sm font-bold">Nos encargamos de llevarte tu maquinaria con nuestro
                            camión
                            especializado</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 xxl:gap-10 px-5 md:px-11 lg:px-0">
            <div class="w-full flex flex-col gap-2 lg:gap-4">
                <div v-if="producto.oferta" class="w-max bg-secondary rounded-[4px] text-light pt-1.5 px-2 pb-1">
                    <p class="text-xs lg:text-sm font-medium">{{ producto.oferta }}</p>
                </div>
                <HeadingH1 class="!text-left">{{ producto.titulo }}
                </HeadingH1>
                <p v-if="producto.descripcion_larga" v-html="formatearTexto(producto.descripcion_larga)"
                    class="text-xs lg:text-base font-semibold"></p>
            </div>

            <div v-if="tieneDescuento" class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <p
                        class="font-teko text-xl md:text-[1.375rem] lg:text-2xl xxl:text-[1.75rem] font-medium line-through">
                        {{
                            formatCurrency(producto.precio) }}</p>
                    <p class="text-[0.625rem] lg:text-xs xxl:text-sm font-semibold mt-2">{{ getCurrencySymbol(producto)
                        }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <p class="font-teko text-[1.625rem] lg:text-[2rem] xxl:text-4xl font-semibold">{{
                        formatCurrency(producto.precio_descuento) }}</p>
                    <p class="text-xs lg:text-base font-semibold mt-2">{{ getCurrencySymbol(producto) }}</p>
                </div>
            </div>
            <div v-else-if="producto.precio" class="flex items-center gap-2">
                <p class="font-teko text-[1.625rem] lg:text-[2rem] xxl:text-4xl font-semibold">{{
                    formatCurrency(producto.precio_descuento || producto.precio) }}</p>
                <p class="text-xs lg:text-base font-semibold mt-2">{{ getCurrencySymbol(producto) }}</p>
            </div>
            <NuxtLink :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank"
                class="w-max h-12 flex justify-center items-center gap-2.5 bg-whatsapp text-light font-bold rounded-full shadow-lg px-8">
                <Icon name="tabler:brand-whatsapp" class="w-5 h-5 flex-shrink-0 -mt-1" />
                Consultar ahora
            </NuxtLink>

            <div v-if="datosDinamicos && Object.keys(datosDinamicos).length > 0" class="flex flex-col gap-2 lg:gap-3">
                <div class="md:flex md:justify-between md:items-center">
                    <HeadingH2 class="!text-left lg:!text-2xl xxl:!text-[1.75rem]">DETALLES TÉCNICOS</HeadingH2>
                    <div v-if="producto.ficha_tecnica" class="hidden md:block">
                        <button @click="descargarFichaTecnica" class="flex items-center gap-2.5 text-primary font-bold">
                            <Icon name="tabler:download" class="w-5 h-5 flex-shrink-0 -mt-1" />
                            Descargar ficha técnica
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-2">
                    <div v-for="(valor, campo) in datosDinamicos" :key="campo"
                        class="flex justify-between gap-2 border-b border-gray-dark py-3 lg:py-4">
                        <span class="text-xs lg:text-base font-bold">{{ campo }}:</span>
                        <span class="text-right text-xs lg:text-base font-medium">{{ valor }}</span>
                    </div>
                    <div v-if="producto.condicion" class="flex justify-between py-3 lg:py-4">
                        <span class="text-xs lg:text-base font-bold">Condición:</span>
                        <span class="text-right text-xs lg:text-base font-medium">{{ producto.condicion }}</span>
                    </div>
                </div>
            </div>

            <div v-if="producto.ficha_tecnica" class="md:hidden">
                <button @click="descargarFichaTecnica" class="flex items-center gap-2.5 text-primary font-bold">
                    <Icon name="tabler:download" class="w-5 h-5 flex-shrink-0 -mt-1" />
                    Descargar ficha técnica
                </button>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import { formatCurrency } from '@/utils/formatCurrency'

const props = defineProps({
    producto: { type: Object, required: true },
    getImageUrl: { type: Function, required: true },
    getYouTubeEmbedUrl: { type: Function, required: true },
    getYouTubeThumbnail: { type: Function, required: true },
    esYouTubeShort: { type: Function, required: true },
    formatearTexto: { type: Function, required: true },
    descargarFichaTecnica: { type: Function, required: true },
    cambiarImagenPrincipal: { type: Function, required: true }
})

const getCurrencySymbol = (producto) => {
    return producto.moneda ? 'USD' : 'ARS'
}

const imagenPrincipalActual = ref(null)

watchEffect(() => {
    if (props.producto) {
        let mediaPrincipal = null

        if (props.producto.videos?.length > 0) {
            mediaPrincipal = props.producto.videos[0]
            mediaPrincipal.es_video = true
        } else {
            mediaPrincipal = props.producto.producto_imagenes?.find(img => img.es_principal) || props.producto.producto_imagenes?.[0]
            if (mediaPrincipal) {
                mediaPrincipal.es_video = false
            }
        }

        imagenPrincipalActual.value = mediaPrincipal
    }
})

const imagenPrincipal = computed(() => {
    if (!imagenPrincipalActual.value) {
        return '/images/placeholder-product.jpg'
    }

    if (imagenPrincipalActual.value.es_video) {
        return props.getYouTubeEmbedUrl(imagenPrincipalActual.value.url || imagenPrincipalActual.value.storage_path || imagenPrincipalActual.value.link)
    }

    return props.getImageUrl(imagenPrincipalActual.value.storage_path)
})

const esPrincipalVideo = computed(() => {
    return imagenPrincipalActual.value?.es_video || false
})

const esVideoPrincipalShort = computed(() => {
    if (!imagenPrincipalActual.value?.es_video) return false
    const url = imagenPrincipalActual.value.url || imagenPrincipalActual.value.storage_path || imagenPrincipalActual.value.link
    return props.esYouTubeShort(url)
})

const todosLosMedias = computed(() => {
    const medios = []

    if (props.producto?.videos?.length > 0) {
        const videosConMarca = props.producto.videos.map(video => ({
            ...video,
            es_video: true
        }))
        medios.push(...videosConMarca)
    }

    if (props.producto?.producto_imagenes?.length > 0) {
        const imagenesConMarca = props.producto.producto_imagenes.map(imagen => ({
            ...imagen,
            es_video: false
        }))
        medios.push(...imagenesConMarca)
    }

    return medios
})

const datosDinamicos = computed(() => {
    if (!props.producto?.datos_dinamicos) return {}

    const formatted = {}
    Object.entries(props.producto.datos_dinamicos).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            formatted[formattedKey] = value
        }
    })

    return formatted
})

const mediasSecundarios = computed(() => {
    const getMediaId = (media) => {
        if (!media) return null
        return media.es_video
            ? (media.url || media.storage_path || media.link)
            : media.storage_path
    }

    const idActual = getMediaId(imagenPrincipalActual.value)
    return todosLosMedias.value.filter(media => getMediaId(media) !== idActual)
})

const cambiarMediaPrincipal = (media) => {
    imagenPrincipalActual.value = media
}

const navegarMedia = (direccion) => {
    if (!todosLosMedias.value.length) return

    const getMediaId = (media) => {
        if (!media) return null
        return media.es_video
            ? (media.url || media.storage_path || media.link)
            : media.storage_path
    }

    const idActual = getMediaId(imagenPrincipalActual.value)
    const indiceActual = todosLosMedias.value.findIndex(media => getMediaId(media) === idActual)

    if (indiceActual === -1) {
        imagenPrincipalActual.value = todosLosMedias.value[0]
        return
    }

    let nuevoIndice
    if (direccion === 'next') {
        nuevoIndice = (indiceActual + 1) % todosLosMedias.value.length
    } else {
        nuevoIndice = (indiceActual - 1 + todosLosMedias.value.length) % todosLosMedias.value.length
    }

    imagenPrincipalActual.value = todosLosMedias.value[nuevoIndice]
}

const tieneDescuento = computed(() => {
    if (!props.producto.precio_descuento) return false
    return props.producto.precio_descuento < props.producto.precio
})
</script>
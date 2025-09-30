<template>
    <DefaultSection class="flex flex-col gap-6">
        <div class="max-w-[100vw] lg:hidden md:pl-11">
            <CarouselStatic :slides-per-view="{ base: 1.3, sm: 1.3, md: 2.2 }" :show-arrows="true">
                <div v-for="(media, index) in todosLosMedias" :key="index" class="bg-gray-100 overflow-hidden">
                    <div v-if="media.es_video" class="relative w-full h-full">
                        <iframe :src="getYouTubeEmbedUrl(media.url || media.storage_path || media.link)"
                            :title="`${producto.titulo} video ${index + 1}`" class="w-full absolute inset-0 rounded-xl"
                            frameborder="0" allowfullscreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            loading="lazy">
                        </iframe>
                        <div class="absolute inset-0 bg-gray-200 flex items-center justify-center" style="z-index: -1;">
                            <Icon name="tabler:video" class="w-12 h-12 text-gray-400" />
                        </div>
                    </div>
                    <NuxtImg v-else :src="getImageUrl(media.storage_path)" :alt="`${producto.titulo} ${index + 1}`"
                        class="w-full rounded-xl object-cover" />
                </div>
            </CarouselStatic>
        </div>

        <div class="hidden lg:flex flex-col gap-4">
            <div class="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <iframe v-if="esPrincipalVideo" :src="imagenPrincipal" :title="`${producto.titulo} video`"
                    class="w-full h-full" frameborder="0" allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
                <NuxtImg v-else :src="imagenPrincipal" :alt="producto.titulo" class="w-full h-full object-cover" />
            </div>
            <div v-if="todosLosMedias.length > 1" class="flex gap-2 overflow-x-auto">
                <div v-for="(media, index) in todosLosMedias.slice(1)" :key="index"
                    class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
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
                </div>
            </div>
        </div>

        <div class="w-full flex flex-col gap-6 px-5 md:px-11">
            <div class="w-full flex flex-col gap-2">
                <div v-if="producto.oferta" class="w-max bg-secondary rounded-[4px] text-light pt-1.5 px-2 pb-1">
                    <p class="text-xs font-medium">{{ producto.oferta }}</p>
                </div>
                <HeadingH1 class="!text-left">{{ producto.titulo }}
                </HeadingH1>
                <p v-if="producto.descripcion_larga" v-html="formatearTexto(producto.descripcion_larga)"
                    class="text-xs font-semibold"></p>
            </div>

            <div class="flex items-center gap-2">
                <p class="font-teko text-[1.625rem] font-semibold">{{ formatCurrency(producto.precio) }}</p>
                <p class="text-xs font-semibold mt-2">{{ getCurrencySymbol(producto) }}</p>
            </div>
            <NuxtLink :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank"
                class="w-max h-12 flex justify-center items-center gap-2.5 bg-whatsapp text-light font-bold rounded-full shadow-lg px-8">
                <Icon name="tabler:brand-whatsapp" class="w-5 h-5 flex-shrink-0 -mt-1" />
                Consultar ahora
            </NuxtLink>

            <div v-if="datosDinamicos && Object.keys(datosDinamicos).length > 0" class="flex flex-col gap-2">
                <div class="md:flex md:justify-between md:items-center">
                    <HeadingH2 class="!text-left">DETALLES TÉCNICOS</HeadingH2>
                    <div v-if="producto.ficha_tecnica" class="hidden md:block">
                        <button @click="descargarFichaTecnica" class="flex items-center gap-2.5 text-primary font-bold">
                            <Icon name="tabler:download" class="w-5 h-5 flex-shrink-0 -mt-1" />
                            Descargar ficha técnica
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-2">
                    <div v-for="(valor, campo) in datosDinamicos" :key="campo"
                        class="flex justify-between border-b border-gray-dark py-3">
                        <span class="text-xs font-bold">{{ campo }}:</span>
                        <span class="text-xs font-medium">{{ valor }}</span>
                    </div>
                    <div v-if="producto.condicion" class="flex justify-between py-3">
                        <span class="text-xs font-bold">Condición:</span>
                        <span class="text-xs font-medium">{{ producto.condicion }}</span>
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

const cambiarMediaPrincipal = (media) => {
    imagenPrincipalActual.value = media
}
</script>
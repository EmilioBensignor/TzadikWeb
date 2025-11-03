<template>
    <DefaultSection
        class="xxl:max-w-[1200px] lg:flex-row lg:!gap-16 px-5 md:px-11 pb-8 md:pb-12 lg:pb-0 lg:px-20 xxl:px-0 mx-auto">
        <div class="flex lg:hidden flex-col items-center text-center gap-2 ">
            <HeadingH2>ESTAMOS CERCA TUYO</HeadingH2>
            <p class="text-xs md:text-sm">
                Contamos con 5 sucursales distribuidas por Argentina para estar siempre cerca de donde nos necesites.
                <span class="font-bold">Envíos a todo el país</span>
            </p>
        </div>
        <div
            class="w-full h-80 xxl:h-[22rem] relative rounded-xl lg:shadow-lg lg:shadow-black/30 overflow-hidden ">
            <ClientOnly>
                <div ref="mapContainer" class="w-full h-full rounded-xl">
                </div>
                <template #fallback>
                    <div class="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                        <div class="text-center">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p class="text-sm text-dark">Cargando mapa...</p>
                        </div>
                    </div>
                </template>
            </ClientOnly>
        </div>
        <div class="lg:flex flex-col gap-6">
            <div class="hidden lg:flex flex-col items-center lg:items-start text-center gap-2 lg:gap-6 ">
                <HeadingH2>ESTAMOS CERCA TUYO</HeadingH2>
                <p class="lg:text-left text-xs md:text-sm lg:text-base">
                    Contamos con 5 sucursales distribuidas por Argentina para estar siempre cerca de donde nos
                    necesites. <span class="font-bold">Envíos a todo el país</span>
                </p>
                <p></p>
            </div>
            <div class="w-full flex flex-col md:flex-row md:flex-wrap gap-6 mt-3 lg:mt-0">
                <div v-for="(ubicacion, index) in ubicaciones" :key="index" @click="selectUbicacion(index)"
                    class="md:w-[48%] lg:w-full flex items-center gap-3 cursor-pointer transition-colors duration-200 pb-1 md:pb-0 ">
                    <Icon name="tabler:map-pin" class="w-4 lg:w-5 h-4 lg:h-5 text-primary flex-shrink-0 mb-1" />
                    <div :class="selectedUbicacion === index ? ' border-b border-primary' : 'border-transparent'">
                        <p class="text-sm no-underline">{{ ubicacion.texto }}</p>
                    </div>
                </div>
            </div>
        </div>

    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const mapContainer = ref(null)
const selectedUbicacion = ref(0)

let map = null
let markers = []

const ubicaciones = [
    {
        texto: "Resistencia, Chaco.",
        direccion: ROUTE_NAMES.UBICACION,
        lat: -27.418540879713515,
        lng: -59.11149044705953
    },
    {
        texto: "Corrientes, Capital.",
        direccion: ROUTE_NAMES.UBICACION,
        lat: -27.4697,
        lng: -58.8306
    },
    {
        texto: "Pcia. Roque Sáenz Peña, Chaco.",
        direccion: ROUTE_NAMES.UBICACION,
        lat: -26.7854,
        lng: -60.4389
    },
    {
        texto: "Villa Ángela, Chaco.",
        direccion: ROUTE_NAMES.UBICACION,
        lat: -27.5713,
        lng: -60.7143
    },
    {
        texto: "Posadas, Misiones.",
        direccion: ROUTE_NAMES.UBICACION,
        lat: -27.3621,
        lng: -55.9006
    },
];

const selectUbicacion = (index) => {
    selectedUbicacion.value = index

    if (map && ubicaciones[index]) {
        const ubicacion = ubicaciones[index]
        map.setCenter({ lat: ubicacion.lat, lng: ubicacion.lng })
        map.setZoom(12)
        updateMarkers()
    }
}

const initializeMap = async () => {
    if (typeof window === 'undefined' || !mapContainer.value) return

    try {
        if (!window.google || !window.google.maps) {
            const config = useRuntimeConfig()
            const apiKey = config.public.googleMapsApiKey

            await new Promise((resolve, reject) => {
                window.initMap = () => {
                    resolve()
                    delete window.initMap
                }

                const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
                if (existingScript) {
                    existingScript.remove()
                }

                const script = document.createElement('script')
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=marker&callback=initMap`
                script.async = true
                script.defer = true
                script.onerror = reject
                document.head.appendChild(script)
            })
        }

        if (mapContainer.value) {
            map = new window.google.maps.Map(mapContainer.value, {
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapId: 'tzadik-map',
                center: { lat: -27.418540879713515, lng: -59.11149044705953 },
                zoom: 10
            })

            await nextTick()
            updateMarkers()
        }
    } catch (error) {
        console.error('Error al cargar el mapa:', error)
    }
}

const updateMarkers = () => {
    if (!map || !window.google) return

    markers.forEach(marker => {
        if (marker && marker.setMap) {
            marker.setMap(null)
        }
    })
    markers = []

    const selectedUbicacionData = ubicaciones[selectedUbicacion.value]
    if (selectedUbicacionData) {
        try {
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position: { lat: selectedUbicacionData.lat, lng: selectedUbicacionData.lng },
                map: map,
                title: selectedUbicacionData.texto
            })

            markers.push(marker)
        } catch (error) {
            console.error('Error al crear marcador:', error)
        }
    }
}

onMounted(() => {
    if (import.meta.client) {
        nextTick(() => {
            initializeMap().then(() => {
                if (map) {
                    selectUbicacion(0)
                }
            })
        })
    }
})

onUnmounted(() => {
    if (markers.length > 0) {
        markers.forEach(marker => {
            if (marker && marker.setMap) {
                marker.setMap(null)
            }
        })
    }
    markers = []
    map = null
})
</script>
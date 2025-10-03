<template>
    <DefaultSection class="py-8 lg:pt-20 lg:pb-0 px-5 lg:px-32">
        <div class="flex flex-col gap-4 xxl:gap-8">
            <HeadingH2>SOLUCIONES COMPLETAS PARA TU EQUIPO</HeadingH2>

            <div class="hidden lg:block">
                <div class="flex gap-8">
                    <div class="w-1/2 pb-20">
                        <div v-for="(solucion, index) in soluciones" :key="index" :id="`solucion-${index}`"
                            class="min-h-[60vh] flex items-center transition-opacity duration-300"
                            :class="{ 'opacity-30': activeIndex !== index }">
                            <div class="flex flex-col items-start gap-4">
                                <HeadingH3 class="text-[2rem] text-primary">{{ solucion.title }}</HeadingH3>
                                <p class="text-start text-sm font-medium">{{ solucion.text }}</p>
                                <ButtonPrimary :to="solucion.action">{{ solucion.cta }}</ButtonPrimary>
                            </div>
                        </div>
                    </div>

                    <div class="w-1/2 relative">
                        <div class="sticky top-[138px] flex items-center justify-center" style="height: calc(75vh - 138px);">
                            <div class="relative w-full aspect-video">
                                <NuxtImg v-for="(solucion, index) in soluciones" :key="index"
                                    :src="`/images/servicios/${solucion.img}-Tzadik.webp`" :alt="solucion.title"
                                    class="absolute top-0 left-0 w-full h-full rounded-[4px] shadow-md shadow-black/25 object-cover transition-all duration-500"
                                    :class="activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:hidden flex flex-col gap-7">
                <div v-for="(solucion, index) in soluciones" :key="index"
                    class="flex flex-col items-center gap-3">
                    <NuxtImg :src="`/images/servicios/${solucion.img}-Tzadik.webp`" :alt="solucion.title"
                        class="rounded-[4px] shadow-md shadow-black/25 object-cover" />
                    <HeadingH3 class="text-xl text-primary">{{ solucion.title }}</HeadingH3>
                    <p class="text-center text-xs font-medium">{{ solucion.text }}</p>
                    <ButtonPrimary :to="solucion.action">{{ solucion.cta }}</ButtonPrimary>
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const soluciones = [
    {
        img: "Mantenimiento-Maquinaria",
        title: "MANTENIMIENTO",
        text: "Nuestros técnicos y mecánicos están en constante capacitación para asegurar el máximo rendimiento de su equipo. Con mantenimientos preventivos y correctivos, garantizamos una vida útil más prolongada y menor tiempo de inactividad.",
        cta: "Solicitar mantenimiento",
        action: "#",
    },
    {
        img: "Repuestos-Oficiales-Originales",
        title: "REPUESTOS OFICIALES",
        text: "Trabajamos exclusivamente con repuestos originales y nuevos. Esto garantiza que su maquinaria conserve el rendimiento y la seguridad con la que fue diseñada, evitando fallas y reparaciones innecesarias.",
        cta: "Consultar por repuesto",
        action: "#",
    },
    {
        img: "Camion-Especializado-Traslado",
        title: "CAMIÓN DE TRASLADO",
        text: "Contamos con un camión especializado para el traslado seguro y eficiente de vehículos, maquinarias e implementos de hasta 7 toneladas. Un servicio pensado para brindarle rapidez, seguridad y confianza.",
        cta: "Reservar traslado",
        action: "#",
    },
    {
        img: "Consignaciones-Maquinaria-Reparaciones",
        title: "CONSIGNACIONES",
        text: "¿Queres vender tu maquinaria usada? La recibimos en consignación, realizamos las reparaciones necesarias y la promocionamos en nuestros canales de venta para asegurarle el mejor valor de reventa.",
        cta: "Consignar equipo",
        action: "#",
    },
];

const activeIndex = ref(0);

const setupIntersectionObserver = () => {
    const options = {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.id.replace('solucion-', ''));
                activeIndex.value = index;
            }
        });
    }, options);

    soluciones.forEach((_, index) => {
        const element = document.getElementById(`solucion-${index}`);
        if (element) observer.observe(element);
    });

    return observer;
};

let observer = null;

onMounted(() => {
    if (window.innerWidth >= 1024) {
        observer = setupIntersectionObserver();
    }
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>


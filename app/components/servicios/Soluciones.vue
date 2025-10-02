<template>
    <DefaultSection class="py-8 px-5">
        <HeadingH2>SOLUCIONES COMPLETAS PARA TU EQUIPO</HeadingH2>
        <div class="flex flex-col items-center gap-7">
            <div v-for="(solucion, index) in soluciones" :key="index" class="flex flex-col items-center gap-4">
                <NuxtImg :src="`/images/servicios/${solucion.img}-Tzadik.webp`" :alt="solucion.title" class="rounded-[4px] shadow-md shadow-black/25" />
                <div class="flex flex-col items-center gap-3">
                    <HeadingH3 class="text-xl text-primary">{{ solucion.title }}</HeadingH3>
                    <p class="text-center text-xs font-medium">{{ solucion.text }}</p>
                    <ButtonPrimary :to="solucion.action">{{ solucion.cta }}</ButtonPrimary>
                </div>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
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
</script>
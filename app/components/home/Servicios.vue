<template>
    <DefaultSection class="!gap-8 md:!gap-6 py-8 md:py-12 md:px-11">
        <div class="w-full h-44 md:h-56 md:flex md:flex-col md:justify-between md:items-start md:rounded-[32px] md:shadow-lg text-light py-6 px-5 md:p-8 bg-cover bg-center bg-no-repeat bg-servicios">
            <HeadingH2 class="w-full flex md:block flex-col !text-left">
                TE ACOMPAÑAMOS
                <span class="font-teko">HOY Y SIEMPRE</span>
            </HeadingH2>
            <ButtonPrimary class="hidden md:block">Descubrí todos los servicios</ButtonPrimary>
        </div>
        <div class="flex md:grid md:grid-cols-2 flex-col gap-4 px-5 md:px-3">
            <div v-for="(servicio, index) in servicios" :key="index" class="flex gap-4">
                <NuxtImg :src="`/images/servicios/${servicio.icono}.svg`" :alt="servicio.titulo" class="w-7 md:w-8 h-7 md:h-8 object-contain flex-shrink-0" />
                <div class="flex flex-col gap-1">
                    <HeadingH3 class="text-primary">{{ servicio.titulo }}</HeadingH3>
                    <p class="text-xs">{{ servicio.texto }}</p>
                </div>
            </div>
        </div>
        <ButtonPrimary class="md:hidden">Descubrí todos los servicios</ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const servicios = [
    {
        titulo: "MANTENIMIENTO",
        icono: "Mantenimiento",
        texto: "Nuestros técnicos y mecánicos están en constante capacitación, asegurando el correcto funcionamiento y la máxima vida útil de su equipo.",
    },
    {
        titulo: "REPUESTOS OFICIALES",
        icono: "Repuestos-oficiales",
        texto: "Garantizamos el óptimo funcionamiento y rendimiento de su equipo al trabajar exclusivamente con repuestos originales y nuevos.",
    },
    {
        titulo: "CAMIÓN DE TRASLADO",
        icono: "Camion-traslados",
        texto: "Disponemos de un camión especializado para el traslado seguro y eficiente de vehículos, maquinarias e implementos hasta 7 toneladas.",
    },
    {
        titulo: "CONSIGNACIONES",
        icono: "Consignaciones",
        texto: "Traemos su maquinaría usada en consignación, la reparamos y la promocionamos en nuestros canales para obtener el mejor valor de venta.",
    },
];
</script>

<style scoped>
.bg-servicios {
    background-image: url('/images/home/servicio/Te-Acompanamos-Servicios-Mobile.webp');
}

@media (width >=768px) {
    .bg-servicios {
        background-image: url('/images/home/servicio/Te-Acompanamos-Servicios-Tablet.webp');
    }
}

@media (width >=1080px) {
    .bg-servicios {
        background-image: url('/images/home/servicio/Te-Acompanamos-Servicios-Desktop.webp');
    }
}

@media (width >=1440px) {
    .bg-servicios {
        background-image: url('/images/home/servicio/Te-Acompanamos-Servicios-Desktop-XL.webp');
    }
}
</style>
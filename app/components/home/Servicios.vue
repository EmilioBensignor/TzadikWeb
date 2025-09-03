<template>
    <DefaultSection class="xxl:max-w-[1200px] lg:flex-row !gap-8 md:!gap-6 lg:!gap-8 py-8 md:py-12 lg:py-0 md:px-11 lg:px-20 xxl:px-0 xxl:mx-auto">
        <div class="w-full lg:w-1/2 xxl:w-[44.75rem] h-44 sm:h-56 lg:h-[27.5rem] md:flex md:flex-col md:justify-between md:items-start md:rounded-xl md:shadow-lg lg:shadow-black/30 text-light bg-cover bg-center bg-no-repeat bg-servicios py-6 px-5 md:p-8 lg:p-12">
            <HeadingH2 class="w-full flex md:block xxl:flex flex-col !text-left fade-up">
                TE ACOMPAÑAMOS
                <span class="font-teko">HOY Y SIEMPRE</span>
            </HeadingH2>
            <ButtonPrimary class="hidden md:block fade-up">Descubrí todos los servicios</ButtonPrimary>
        </div>
        <div class="lg:w-1/2 xxl:w-[28.375rem] flex md:grid lg:flex md:grid-cols-2 flex-col gap-4 lg:gap-6 px-5 md:px-3 lg:px-0">
            <div v-for="(servicio, index) in servicios" :key="index" class="flex gap-4 fade-up">
                <NuxtImg :src="`/images/servicios/${servicio.icono}.svg`" :alt="servicio.titulo" class="w-7 md:w-8 h-7 md:h-8 object-contain flex-shrink-0" />
                <div class="flex flex-col gap-1 lg:gap-1.5">
                    <HeadingH3 class="text-primary">{{ servicio.titulo }}</HeadingH3>
                    <p class="text-xs lg:text-sm">{{ servicio.texto }}</p>
                </div>
            </div>
        </div>
        <ButtonPrimary class="md:hidden fade-up">Descubrí todos los servicios</ButtonPrimary>
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

@media (width >=480px) {
    .bg-servicios {
        background-position: center -20px;
    }
}

@media (width >=768px) {
    .bg-servicios {
        background-image: url('/images/home/servicio/Te-Acompanamos-Servicios-Tablet.webp');
        background-position: center;
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
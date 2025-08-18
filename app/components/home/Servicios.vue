<template>
    <DefaultSection class="!gap-8 py-8">
        <NuxtImg src="/images/home/Mantenimiento-Respuestos-Traslados-Consignaciones.jpg"
            alt="Mantenimiento Respuestos Traslados Consignaciones" class="w-full h-44 object-cover" />
        <div class="w-full h-44 absolute text-light py-6 px-5" style="background: linear-gradient(90deg, #352631 0%, rgba(53, 38, 49, 0) 100%);">
            <HeadingH2 class="w-full flex flex-col !text-left">
                TE ACOMPAÑAMOS
                <span class="font-teko">HOY Y SIEMPRE</span>
            </HeadingH2>
        </div>
        <div class="flex flex-col gap-4 px-5">
            <div v-for="(servicio, index) in servicios" :key="index" class="flex gap-4">
                <NuxtImg :src="`/images/servicios/${servicio.icono}.svg`" :alt="servicio.titulo" class="w-7 h-7 object-contain flex-shrink-0" />
                <div class="flex flex-col gap-1">
                    <HeadingH3 class="text-primary">{{ servicio.titulo }}</HeadingH3>
                    <p class="text-xs">{{ servicio.texto }}</p>
                </div>
            </div>
        </div>
        <ButtonPrimary>Descubrí todos los servicios</ButtonPrimary>
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
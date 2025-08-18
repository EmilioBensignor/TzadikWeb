<template>
    <footer>
        <div class="flex flex-col items-center gap-6 text-center bg-dark text-light py-6 px-5">
            <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="w-36 h-8 object-contain" />
            <div class="flex flex-col gap-3">
                <p class="text-sm font-semibold">Páginas</p>
                <nav>
                    <ul class="flex flex-col gap-3">
                        <li v-for="(pagina, index) in paginas" :key="index">
                            <NuxtLink :to="pagina.route" class="text-xs">{{ pagina.name }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="flex flex-col gap-3">
                <p class="text-sm font-semibold">Contacto</p>
                <nav>
                    <ul class="flex flex-col gap-3">
                        <li v-for="(pagina, index) in contacto" :key="index" class="flex justify-center items-center gap-2">
                            <Icon :name="`tabler:${pagina.icon}`" />
                            <NuxtLink :to="pagina.route" class="text-xs" target="_blank">{{ pagina.text }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-sm font-semibold">Redes Sociales</p>
                <nav>
                    <ul class="flex justify-center items-center gap-2">
                        <li v-for="(red, index) in redes" :key="index">
                            <NuxtLink :to="red.route">
                                <NuxtImg :src="`/images/redes/${red.name}.svg`" :alt="red.name" class="w-5 h-5 object-contain" />
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="flex justify-center bg-primary text-center text-light text-xs p-3">
            <p>© Tzadik {{ new Date().getFullYear() }}. Todos los derechos reservados</p>
        </div>
    </footer>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const paginas = [
    {
        name: "Productos",
        route: ROUTE_NAMES.PRODUCTOS
    },
    {
        name: "Servicios",
        route: ROUTE_NAMES.SERVICIOS
    },
    {
        name: "Marcas",
        route: ROUTE_NAMES.MARCAS
    },
    {
        name: "Quienes Somos",
        route: ROUTE_NAMES.QUIENES_SOMOS
    },
];

const contacto = [
    {
        icon: "phone",
        route: `tel:${ROUTE_NAMES.TELEFONO}`,
        text: ROUTE_NAMES.TELEFONO,
    },
    {
        icon: "brand-whatsapp",
        route: `https://wa.me/${ROUTE_NAMES.WHATSAPP.replace(/\s/g, '')}`,
        text: ROUTE_NAMES.WHATSAPP,
    },
    {
        icon: "mail",
        route: `mailto:${ROUTE_NAMES.MAIL}`,
        text: ROUTE_NAMES.MAIL,
    },
    {
        icon: "map-pin",
        route: '#',
        text: ROUTE_NAMES.UBICACION,
    },
];

const redes = [
    {
        name: "Instagram",
        route: ROUTE_NAMES.REDES.INSTAGRAM,
    },
    {
        name: "Facebook",
        route: ROUTE_NAMES.REDES.FACEBOOK,
    },
    {
        name: "TikTok",
        route: ROUTE_NAMES.REDES.TIKTOK,
    },
];
</script>
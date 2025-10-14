<template>
    <DefaultMain class="lg:!pb-0">
        <DefaultSection class="h-screen py-16 lg:py-32 xxl:py-60 px-5 md:px-11 lg:px-20 contacto-bg">
            <div
                class="flex md:grid md:grid-cols-2 xxl:grid-cols-4 md:justify-items-center flex-col gap-5 md:gap-8 lg:gap-12">
                <ButtonPrimary :to="ROUTE_NAMES.HOME"
                    class="w-56 lg:w-60 flex justify-center items-center gap-1.5 lg:text-lg font-medium lg:px-6">
                    Nuestra Web
                </ButtonPrimary>
                <ButtonPrimary v-for="(link, index) in links" :key="index" :to="link.link" target="_blank"
                    class="w-56 lg:w-60 flex justify-center items-center gap-1.5 lg:text-lg font-medium lg:px-6">
                    <Icon v-if="link.icon" :name="`tabler:${link.icon}`" class="w-4 h-4 text-light mb-0.5" />
                    {{ link.title }}
                </ButtonPrimary>
            </div>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

definePageMeta({
    layout: 'contact'
});

const links = [
    {
        title: "Whatsapp",
        icon: "brand-whatsapp",
        link: `https://wa.me/${ROUTE_NAMES.WHATSAPP}`,
    },
    {
        title: "Repuestos / Posventa",
        link: "",
    },
    {
        title: "Resistencia",
        icon: "map-pin",
        link: "",
    },
    {
        title: "Posadas",
        icon: "map-pin",
        link: "",
    },
    {
        title: "Corrientes",
        icon: "map-pin",
        link: "",
    },
    {
        title: "Sáenz Peña",
        icon: "map-pin",
        link: "",
    },
    {
        title: "Villa Angela",
        icon: "map-pin",
        link: "",
    },
];
</script>

<style scoped>
.contacto-bg {
    height: calc(100vh - 64px);
    background-image: url('/images/contacto/Contacto-Tzadik-Mobile.webp');
    background-size: cover;
    background-position: center;
}

@media (min-width: 768px) {
    .contacto-bg {
        background-image: url('/images/contacto/Contacto-Tzadik-Tablet.webp');
    }
}

@media (min-width: 1080px) {
    .contacto-bg {
        height: calc(100vh - 88px);
        background-image: url('/images/contacto/Contacto-Tzadik-Desktop.webp');
    }
}

@media (min-width: 1440px) {
    .contacto-bg {
        background-image: url('/images/contacto/Contacto-Tzadik-Desktop-XL.webp');
    }
}
</style>
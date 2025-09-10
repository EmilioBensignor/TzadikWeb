<template>
    <DefaultSection class="md:px-11 md:pb-12 lg:px-20 lg:pb-0">
        <div class="w-full xxl:max-w-[1200px] flex flex-col items-center md:items-start gap-3 md:gap-4 bg-gradient-to-r from-dark to-primary bg-contacto bg-cover bg-center bg-no-repeat md:rounded-xl md:shadow-lg py-6 px-5 md:p-8 lg:p-10 xxl:p-12 fade-up">
            <HeadingH2 class="text-light">ENCONTRÁ LA SOLUCIÓN IDEAL PARA VOS</HeadingH2>
            <div class="md:flex md:items-center md:gap-6">
                <div class="hidden md:flex items-center gap-1.5 text-light">
                    <Icon name="tabler:brand-whatsapp" class="w-6 h-6 flex-shrink-0" />
                    <p class="text-xl">+549 362 462-0042</p>
                </div>
                <ButtonPrimary :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank">Contactanos</ButtonPrimary>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
useFadeUp()

const showContactForm = ref(false)
</script>

<style scoped>
@media (width >=768px) {
    .bg-contacto {
        background-image: url('/images/home/contacto/Contacto-Tzadik-Tablet.webp');
    }
}

@media (width >=1080px) {
    .bg-contacto {
        background-image: url('/images/home/contacto/Contacto-Tzadik-Desktop.webp');
    }
}

@media (width >=1440px) {
    .bg-contacto {
        background-image: url('/images/home/contacto/Contacto-Tzadik-Desktop-XL.webp');
    }
}
</style>
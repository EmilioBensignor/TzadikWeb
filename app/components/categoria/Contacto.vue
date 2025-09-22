<template>
    <DefaultSection>
        <div class="w-full flex flex-col lg:flex-row lg:justify-between items-center gap-3 lg:gap-4 bg-gradient-to-r from-dark to-primary md:rounded-xl md:shadow-md md:shadow-black/30 py-6 px-5 xxl:p-8">
            <HeadingH2 class="text-light md:!text-2xl lg:!text-[1.69rem] xl:!text-[1.75rem]">ENCONTRÁ LA SOLUCIÓN IDEAL PARA VOS</HeadingH2>
            <ButtonPrimary :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank" class="!bg-dark">Contactanos</ButtonPrimary>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
useFadeUp()

</script>
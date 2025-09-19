<template>
    <DefaultSection>
        <div class="w-full flex flex-col items-center gap-3 bg-gradient-to-r from-dark to-primary py-6 px-5">
            <HeadingH2 class="text-light">ENCONTRÁ LA SOLUCIÓN IDEAL PARA VOS</HeadingH2>
            <ButtonPrimary :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank">Contactanos</ButtonPrimary>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
useFadeUp()

</script>
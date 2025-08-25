<template>
    <NuxtLink :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP.replace(/\s/g, '')}`" target="_blank"
        class="w-[3.75rem] h-[3.75rem] flex justify-center items-center fixed bottom-4 right-4 md:right-11 z-20 bg-whatsapp text-light rounded-full shadow-lg p-4">
        <Icon name="tabler:brand-whatsapp" class="w-8 h-8 flex-shrink-0" />
    </NuxtLink>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

</script>
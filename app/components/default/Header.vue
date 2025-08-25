<template>
    <header class="sticky top-0 z-50">
        <div class="flex flex-col md:flex-row md:justify-between items-center gap-1 bg-primary text-light text-xs font-medium py-3 px-5 md:px-11">
            <div class="flex justify-center items-center gap-2">
                <Icon name="tabler:map-pin" class="w-4 h-4 flex-shrink-0" />
                <p>{{ ROUTE_NAMES.UBICACION }}</p>
            </div>
            <p>Lunes a Viernes de 9hs - 18hs</p>
        </div>
        <div class="flex justify-center items-center bg-light p-5 md:py-6 md:px-11">
            <button 
                @click="toggleDrawer"
                class="flex justify-center items-center absolute left-5 md:left-11"
            >
                <Icon name="tabler:menu-2" class="w-5 md:w-6 h-5 md:h-6 text-primary" />
            </button>
            <NuxtLink>
                <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="w-28 md:w-32 h-6 md:h-7 object-contain" />
            </NuxtLink>
        </div>
        <NavCategorias class="md:pl-11" />
        <NavDrawer :is-open="isDrawerOpen" @close="closeDrawer" />
    </header>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const isDrawerOpen = ref(false)

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}
</script>
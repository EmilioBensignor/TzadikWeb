<template>
    <header class="sticky top-0 z-50">
        <div class="flex flex-col items-center gap-1 bg-primary text-light text-xs font-medium py-3 px-5">
            <div class="flex justify-center items-center gap-2">
                <Icon name="tabler:map-pin" class="w-4 h-4 flex-shrink-0" />
                <p>{{ ROUTE_NAMES.UBICACION }}</p>
            </div>
            <p>Lunes a Viernes de 9hs - 18hs</p>
        </div>
        <div class="flex justify-center bg-light p-5">
            <button 
                @click="toggleDrawer"
                class="flex justify-center items-center absolute left-5"
            >
                <Icon name="tabler:menu-2" class="w-5 h-5 text-primary" />
            </button>
            <NuxtLink>
                <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="w-28 h-6 object-contain" />
            </NuxtLink>
        </div>
        <NavCategorias />
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
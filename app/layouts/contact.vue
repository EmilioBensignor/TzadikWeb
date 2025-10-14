<template>
    <header class="flex justify-center bg-light p-5">
        <NuxtLink :to="ROUTE_NAMES.HOME" class="">
            <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="h-6 lg:h-12 object-contain" />
        </NuxtLink>
    </header>
    <slot />
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
</script>
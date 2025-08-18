<template>
    <NuxtLink v-if="to" :to="to"
        class="bg-primary hover:bg-primaryButton-hover rounded-full primary-shadow text-light text-base !leading-none font-bold transition duration-300 py-[1.125rem] px-8">
        <slot />
    </NuxtLink>
    <button v-else type="button"
        class="bg-primary hover:bg-primaryButton-hover rounded-full primary-shadow text-light text-base !leading-none font-bold transition duration-300 py-[1.125rem] px-8">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    to: {
        type: [String, Object],
        default: null
    }
})
</script>
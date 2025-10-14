<template>
    <NuxtLink v-if="to" :to="to"
        class="bg-primary lg:hover:bg-primaryHover rounded-full primary-shadow text-light text-base !leading-none font-bold transition duration-300 pt-[1.125rem] pb-4 px-8">
        <slot />
    </NuxtLink>
    <button v-else type="button"
        class="bg-primary lg:hover:bg-primaryHover rounded-full primary-shadow text-light text-base !leading-none font-bold transition duration-300 pt-[1.125rem] pb-4 px-8">
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
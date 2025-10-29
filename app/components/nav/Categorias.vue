<template>
    <div
        class="lg:w-[58.5rem] xxl:w-[1210px] lg:z-50 bg-light lg:rounded-full shadow-md lg:primary-shadow py-2 lg:py-3 lg:px-12 lg:mx-auto">
        <CarouselStatic :slides-per-view="{ base: 4, sm: 5.5, md: 8.5, lg: 8.5, xl: 8.5, xxl: 8.5 }"
            :gap="{ base: 16, md: 32, lg: 20, xl: 20, xxl: 20 }" :show-arrows="false">
            <NuxtLink v-for="categoria in categorias" :key="categoria.id" :to="`/categorias/${categoria.nombre}`"
                class="!w-max sm:!w-auto flex flex-col items-center gap-1 lg:gap-2 text-xs md:last:mr-11 lg:last:mr-0">
                <NuxtImg :src="categoria.icon" :alt="`Tzadik ${categoria.nombre}`" class="w-6 lg:w-8 h-6 lg:h-8 text-primary object-contain" />
                <p class="font-normal hover:text-primary transition-colors duration-300">{{ categoria.nombre }}</p>
            </NuxtLink>
        </CarouselStatic>
    </div>
</template>

<script setup>
const { categorias, fetchCategorias } = useCategorias()

onMounted(async () => {
    if (categorias.value.length === 0) {
        await fetchCategorias()
    }
})
</script>
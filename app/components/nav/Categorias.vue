<template>
    <div
        class="lg:w-[62rem] xxl:w-[64rem] lg:sticky lg:top-[9.5rem] xxl:top-36 lg:z-10 bg-light lg:rounded-full shadow-md lg:primary-shadow py-2 lg:py-3 lg:px-12 lg:-mt-52 xxl:-mt-60 lg:mx-auto">
        <CarouselStatic :slides-per-view="{ base: 4, sm: 5.5, md: 8.5, lg: 8.5, xl: 8.5, xxl: 8.5 }"
            :gap="{ base: 16, md: 32, lg: 20, xl: 20, xxl: 20 }" :show-arrows="false">
            <NuxtLink v-for="categoria in categorias" :key="categoria.id" to="#"
                class="!w-max sm:!w-auto flex flex-col items-center gap-1 lg:gap-2 text-xs md:last:mr-11 lg:last:mr-0">
                <Icon :name="`tabler:${categoria.icon}`" class="w-6 lg:w-8 h-6 lg:h-8 text-primary" />
                <p class="font-normal">{{ categoria.nombre }}</p>
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
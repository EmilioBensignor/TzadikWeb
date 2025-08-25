<template>
    <div class="bg-light py-2">
        <CarouselStatic :slides-per-view="{ base: 4, sm: 3.1, md: 8.5, lg: 3, xl: 4, xxl: 4 }" :gap="{ base: 16, md: 32, lg: 16, xl: 16, xxl: 16 }" :show-arrows="false">
            <NuxtLink 
                v-for="categoria in categorias" 
                :key="categoria.id" 
                to="#" 
                class="!w-max sm:!w-auto flex flex-col items-center gap-1 text-xs md:last:mr-11"
            >
                <Icon :name="`tabler:${categoria.icon}`" class="w-6 h-6 text-primary" />
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
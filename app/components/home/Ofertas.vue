<template>
    <DefaultSection v-if="loading || ofertas.length > 0"
        class="xxl:max-w-[1200px] py-8 md:py-12 md:px-11 lg:px-20 lg:py-0 xxl:px-0 mx-auto">
        <div class="md:w-full md:flex md:justify-between md:items-center ">
            <HeadingH2 class="px-5 md:px-0">NOVEDADES Y OFERTAS EXCLUSIVAS</HeadingH2>
            <ButtonPrimary class="hidden md:block">Ver todas las ofertas</ButtonPrimary>
        </div>
        <div v-if="loading && ofertas.length === 0" class="flex gap-4 px-5 md:px-0 overflow-hidden">
            <div v-for="n in 4" :key="n" class="w-56 md:w-64 flex-shrink-0 min-h-[23rem] flex flex-col rounded-xl bg-gray-mid/40 animate-pulse">
                <div class="w-full h-48 lg:h-52 rounded-t-xl bg-gray-mid"></div>
                <div class="flex flex-col gap-3 p-4">
                    <div class="w-3/4 h-4 rounded bg-gray-mid"></div>
                    <div class="w-full h-3 rounded bg-gray-mid"></div>
                    <div class="w-1/2 h-5 rounded bg-gray-mid mt-3"></div>
                </div>
            </div>
        </div>
        <CarouselStatic v-else :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 4, xl: 4, xxl: 4 }" :gap="{ base: 12, lg: 16, xl: 16, xxl: 16 }" class="flex-1 pl-1 ">
            <ProductCard v-for="(oferta, index) in ofertas" :key="index" :product="oferta" />
        </CarouselStatic>
        <ButtonPrimary class="md:hidden ">Ver todas las ofertas</ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const { ofertas, fetchOfertas, loading } = useProductos()

await useAsyncData('home-ofertas', async () => {
    if (ofertas.value.length === 0) await fetchOfertas()
    return true
})
</script>
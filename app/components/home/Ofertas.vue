<template>
    <DefaultSection class="max-w-[1200px] py-8 md:py-12 md:px-11 lg:px-20 lg:py-0 xxl:px-0 mx-auto">
        <div class="md:w-full md:flex md:justify-between md:items-center fade-up">
            <HeadingH2 class="px-5 md:px-0">NOVEDADES Y OFERTAS EXCLUSIVAS</HeadingH2>
            <ButtonPrimary class="hidden md:block">Ver todas las ofertas</ButtonPrimary>
        </div>
        <CarouselStatic :slides-per-view="{ base: 1.4, sm: 2.5, md: 3, lg: 4, xl: 4, xxl: 4 }" :gap="{ base: 12, lg: 16, xl: 16, xxl: 16 }" class="flex-1 pl-1 fade-up">
            <ProductCard v-for="(oferta, index) in ofertas" :key="index" :product="oferta" />
        </CarouselStatic>
        <ButtonPrimary class="md:hidden fade-up">Ver todas las ofertas</ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const { ofertas, fetchOfertas } = useProductos()
useFadeUp()

await fetchOfertas()
</script>
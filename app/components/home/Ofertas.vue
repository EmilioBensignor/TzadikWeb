<template>
    <DefaultSection class="py-8">
        <HeadingH2 class="px-5">NOVEDADES Y OFERTAS EXCLUSIVAS</HeadingH2>
        <CarouselStatic :slides-per-view="{ base: 1.4, sm: 3.1, md: 3, lg: 3, xl: 4, xxl: 4 }" :gap="{ base: 12, lg: 16, xl: 16, xxl: 16 }" class="pl-1">
            <ProductCard v-for="(oferta, index) in ofertas" :key="index" :product="oferta" />
        </CarouselStatic>
        <ButtonPrimary>Ver todas las ofertas</ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const { ofertas, fetchOfertas } = useProductos()

await fetchOfertas()
</script>
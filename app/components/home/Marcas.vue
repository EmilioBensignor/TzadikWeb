<template>
    <DefaultSection>
        <div class="flex flex-col items-center text-center gap-2 px-5">
            <HeadingH2>TRABAJAMOS JUNTO A LAS MEJORES MARCAS</HeadingH2>
            <p class="text-xs">
                Colaboramos con marcas reconocidas por su <span class="text-primary font-bold">calidad</span>, para
                asegurar la <span class="text-primary font-bold">innovación y fiabilidad</span> en cada producto que
                ofrecemos.
            </p>
        </div>
        <CarouselStatic :slides-per-view="{ base: 2.4, sm: 3.1, md: 3, lg: 3, xl: 4, xxl: 4 }"
            :gap="{ lg: 16, xl: 16, xxl: 16 }" class="pl-1">
            <div v-for="marca in marcas" :key="marca" class="h-16 flex justify-center items-center rounded-xl orange-shadow py-5 px-4">
                <NuxtImg :src="`/images/marcas/${marca}.png`" :alt="marca" class="object-contain" />
            </div>
        </CarouselStatic>
        <ButtonPrimary>Conocé más detalles</ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const marcas = ["Michigan", "Hanomag", "Husqvarna", "Grosspal", "Fema"];
</script>
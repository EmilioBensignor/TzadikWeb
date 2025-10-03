<template>
    <DefaultSection class="md:px-11 lg:px-20 xxl:px-0">
        <div
            class="w-full xxl:max-w-[1200px] flex flex-col items-center gap-3 md:gap-6 bg-marcas lg:bg-cover lg:bg-no-repeat lg:bg-center lg:rounded-xl lg:shadow-md lg:shadow-black/30 lg:py-10 lg:px-8">
            <div class="lg:w-full flex flex-col items-center lg:items-start text-center gap-2 lg:gap-3 px-5 lg:px-0">
                <HeadingH2 class="lg:w-full lg:text-left lg:text-light ">TRABAJAMOS JUNTO A LAS MEJORES MARCAS
                </HeadingH2>
                <p
                    class="lg:w-full md:max-w-[26.75rem] lg:max-w-[31rem] lg:text-left lg:text-light text-xs md:text-sm xxl:text-base ">
                    Colaboramos con marcas reconocidas por su <span
                        class="text-primary lg:text-terciary font-bold">calidad</span>, para
                    asegurar la <span class="text-primary lg:text-terciary font-bold">innovación y fiabilidad</span> en
                    cada producto que
                    ofrecemos.
                </p>
                <ButtonPrimary class="hidden lg:block ">Conocé más detalles</ButtonPrimary>
            </div>
            <CarouselStatic :slides-per-view="{ base: 2.4, sm: 3.4, md: 4, lg: 4, xl: 4, xxl: 5 }"
                :gap="{ md: 12, lg: 16, xl: 16, xxl: 16 }" :button-position="{
                    top: {
                        base: '20%',
                        md: '20%',
                        lg: '35%',
                        xl: '35%',
                        xxl: '35%',
                    },
                    transform: 'translateY(0)',
                    left: {
                        base: '0.5rem',
                        md: '-1.5rem',
                        lg: '-1.5rem',
                        xl: '-1.5rem',
                        xxl: '-1.75rem',
                    },
                    right: {
                        base: '0.5rem',
                        md: '-1.5rem',
                        lg: '-1.5rem',
                        xl: '-1.5rem',
                        xxl: '-1.75rem',
                    }
                }" class="pl-1 ">
                <div v-for="(marca, index) in marcas" :key="index"
                    class="h-16 md:h-[4.75rem] lg:h-28 flex justify-center items-center lg:bg-light rounded-md lg:rounded-xl orange-shadow py-5 px-4">
                    <NuxtImg :src="`/images/marcas/${marca.nombre}.webp`" :alt="marca.nombre" :class="[
                        'w-full max-h-10 md:max-h-12 object-contain',
                        index === marcas.length - 1 ? 'lg:!max-h-8' : ''
                    ]" />
                </div>
            </CarouselStatic>
            <ButtonPrimary class="lg:hidden">Conocé más detalles</ButtonPrimary>
        </div>
    </DefaultSection>
</template>

<script setup>
import marcas from '~/shared/marcas';

useFadeUp()
</script>

<style scoped>
@media (width >=1080px) {
    .bg-marcas {
        background-image: url('/images/marcas/Marcas-Tzadik.webp');
    }
}

@media (width >=1440px) {
    .bg-marcas {
        background-image: url('/images/marcas/Marcas-Tzadik-XL.webp');
    }
}
</style>
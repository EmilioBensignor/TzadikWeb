<template>
    <footer>
        <div class="w-full bg-dark">
            <div
                class="max-w-[1200px] flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 md:gap-9 text-center text-light py-6 lg:py-12 px-5 md:px-11 lg:px-20 xxl:px-0 mx-auto">
                <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik"
                    class="w-36 md:w-32 lg:w-[13.5rem] h-8 md:h-7 lg:h-12 object-contain" />
                <div class="md:w-full md:max-w-[32.5rem] lg:max-w-[38rem] flex flex-col md:justify-between md:flex-row gap-6 lg:gap-24">
                    <div class="flex flex-col gap-3 md:gap-4">
                        <p class="md:text-left text-sm md:text-base lg:text-xl font-semibold">Páginas</p>
                        <nav>
                            <ul class="flex flex-col md:items-start gap-3 md:gap-4">
                                <li v-for="(pagina, index) in paginas" :key="index">
                                    <NuxtLink :to="pagina.route" class="text-xs lg:text-sm">{{ pagina.name }}</NuxtLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="md:max-w-44 flex flex-col gap-3 md:gap-4">
                        <p class="md:text-left text-sm md:text-base lg:text-xl font-semibold">Contacto</p>
                        <ul class="flex flex-col md:items-start gap-3 md:gap-4">
                            <li v-for="(pagina, index) in contacto" :key="index"
                                class="flex justify-center items-center gap-2">
                                <Icon :name="`tabler:${pagina.icon}`" class="md:w-5 md:h-5 flex-shrink-0" />
                                <NuxtLink :to="pagina.route" class="md:text-left text-xs lg:text-sm" target="_blank">{{
                                    pagina.text }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-3 md:gap-4">
                        <p class="md:text-left text-sm md:text-base font-semibold">Redes Sociales</p>
                        <ul class="flex justify-center md:justify-start items-center gap-2">
                            <li v-for="(red, index) in redes" :key="index">
                                <NuxtLink target="_blank" :to="red.route">
                                    <NuxtImg :src="`/images/redes/${red.name}-Blanco.svg`" :alt="red.name"
                                        class="w-full h-5 md:h-6 object-contain" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center bg-primary text-center text-light text-xs lg:text-sm p-3">
            <p>© Peripeteia {{ new Date().getFullYear() }}. Todos los derechos reservados</p>
        </div>
    </footer>
</template>

<script setup>
import { paginas, contacto, redes } from '~/shared/menu';

</script>
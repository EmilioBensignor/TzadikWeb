<template>
    <footer>
        <div class="flex flex-col items-center gap-6 text-center bg-dark text-light py-6 px-5 md:px-11">
            <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="w-36 h-8 object-contain" />
            <div class="md:w-full flex flex-col md:flex-row gap-6">
                <div class="md:w-1/3 flex flex-col gap-3 md:gap-4">
                    <p class="md:text-left text-sm md:text-base font-semibold">Páginas</p>
                    <nav>
                        <ul class="flex flex-col md:items-start gap-3 md:gap-4">
                            <li v-for="(pagina, index) in paginas" :key="index">
                                <NuxtLink :to="pagina.route" class="text-xs">{{ pagina.name }}</NuxtLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="md:w-1/3 flex flex-col gap-3 md:gap-4">
                    <p class="md:text-left text-sm md:text-base font-semibold">Contacto</p>
                    <ul class="flex flex-col md:items-start gap-3 md:gap-4">
                        <li v-for="(pagina, index) in contacto" :key="index"
                            class="flex justify-center items-center gap-2">
                            <Icon :name="`tabler:${pagina.icon}`" class="md:w-5 md:h-5" />
                            <NuxtLink :to="pagina.route" class="md:text-left text-xs" target="_blank">{{ pagina.text }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="md:w-1/3 flex flex-col gap-3 md:gap-4">
                    <p class="md:text-left text-sm md:text-base font-semibold">Redes Sociales</p>
                    <ul class="flex justify-center md:justify-start items-center gap-2">
                        <li v-for="(red, index) in redes" :key="index">
                            <NuxtLink :to="red.route">
                                <NuxtImg :src="`/images/redes/${red.name}-Blanco.svg`" :alt="red.name"
                                    class="w-5 md:w-6 h-5 md:h-6 object-contain" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex justify-center bg-primary text-center text-light text-xs p-3">
            <p>© Tzadik {{ new Date().getFullYear() }}. Todos los derechos reservados</p>
        </div>
    </footer>
</template>

<script setup>
import { paginas, contacto, redes } from '~/shared/menu';

</script>
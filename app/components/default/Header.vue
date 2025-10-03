<template>
    <header class="sticky top-0 z-50" :class="isSpecialPage ? 'lg:shadow-md' : ''">
        <div class="w-full bg-primary">
            <div
                class="xxl:max-w-[1200px] flex flex-col md:flex-row md:justify-between lg:justify-start items-center gap-1 lg:gap-0 text-light text-xs lg:text-sm font-medium py-3 px-5 md:px-11 lg:px-20 xxl:px-0 mx-auto">
                <div
                    class="w-full flex flex-col md:flex-row md:justify-between lg:justify-start items-center lg:items-end gap-1 lg:gap-8">
                    <div class="flex justify-center items-end gap-2">
                        <Icon name="tabler:map-pin" class="w-4 lg:w-5 h-4 lg:h-5 flex-shrink-0" />
                        <p>{{ ROUTE_NAMES.UBICACION }}</p>
                    </div>
                    <p>Lunes a Viernes de 9hs - 18hs</p>
                    <p class="absolute top-3 right-3 md:right-5 text-[0.625rem]">BH</p>
                </div>
                <ul class="hidden lg:flex items-center gap-2">
                    <li v-for="(red, index) in redes" :key="index">
                        <NuxtLink :to="red.route" class="no-underline">
                            <NuxtImg :src="`/images/redes/${red.name}-Blanco.svg`" :alt="red.name"
                                class="w-full h-5 md:h-6 object-contain" />
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <div class="w-full bg-light" :class="isSpecialPage ? '' : 'lg:shadow-md'">
            <div
                class="xxl:max-w-[1200px] flex justify-center lg:justify-between items-center p-5 md:py-6 lg:py-5 md:px-11 lg:px-20 xxl:px-0 mx-auto">
                <button @click="toggleDrawer"
                    class="flex lg:hidden justify-center items-center absolute left-5 md:left-11">
                    <Icon name="tabler:menu-2" class="w-5 md:w-6 h-5 md:h-6 text-primary" />
                </button>
                <NuxtLink :to="ROUTE_NAMES.HOME">
                    <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik"
                        class="w-28 md:w-32 lg:w-44 h-6 md:h-7 lg:h-10 object-contain" />
                </NuxtLink>
                <nav class="hidden lg:block">
                    <ul class="flex items-center gap-1.5 xxl:gap-6">
                        <li v-for="(pagina, index) in paginas" :key="index">
                            <NuxtLink :to="pagina.route"
                                class="h-12 text-dark hover:text-primary text-[1.125rem] font-medium px-6 transition-colors duration-300"
                                @click="closeDrawer">
                                {{ pagina.name }}
                            </NuxtLink>
                        </li>
                        <ButtonPrimary :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank">Contactanos
                        </ButtonPrimary>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="lg:px-20">
            <NavCategorias class="md:pl-11"
                :class="isSpecialPage ? 'lg:hidden' : 'lg:w-full lg:border lg:border-primary lg:mt-8'" />
        </div>
        <NavDrawer :is-open="isDrawerOpen" @close="closeDrawer" class="lg:hidden" />
    </header>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
import { redes, paginas } from '~/shared/menu';

const route = useRoute()
const isDrawerOpen = ref(false)
const showContactForm = ref(false)

const isSpecialPage = computed(() => {
    const specialPages = ['index', 'servicios', 'marcas', 'quienes-somos']
    return specialPages.includes(route.name)
})

const isServiciosPage = computed(() => route.name === 'servicios')

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}
</script>
<template>
    <Transition enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-300 ease-in" enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
        <div v-if="isOpen" class="fixed inset-0 z-50" @click="closeDrawer">

            <div v-if="isOpen" class="w-44 md:w-64 h-full absolute left-0 top-0 bg-light shadow-lg p-5 md:px-6" @click.stop>
                <div class="flex flex-col gap-9">
                    <div class="flex items-center justify-between">
                        <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="w-20 md:w-28 h-4 md:h-6 object-contain" />
                        <button @click="closeDrawer" class="flex items-center">
                            <Icon name="tabler:plus" class="w-5 h-5 text-primary rotate-45" />
                        </button>
                    </div>

                    <nav>
                        <ul class="flex flex-col gap-8">
                            <li>
                                <NuxtLink to="#" class="block text-dark text-base font-medium" @click="closeDrawer">
                                    Servicios
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="#" class="block text-dark text-base font-medium" @click="closeDrawer">
                                    Marcas
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="#" class="block text-dark text-base font-medium" @click="closeDrawer">
                                    Quienes Somos
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <ul class="flex items-center gap-2">
                        <li v-for="(red, index) in redes" :key="index">
                            <NuxtLink :to="red.route">
                                <NuxtImg :src="`/images/redes/${red.name}-Negro.svg`" :alt="red.name"
                                    class="w-full h-5 md:h-6 object-contain" />
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Transition>

</template>

<script setup>
import { redes } from '~/shared/menu';

defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const closeDrawer = () => {
    emit('close')
}
</script>
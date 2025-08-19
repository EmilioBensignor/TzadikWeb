<template>
    <Transition enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-300 ease-in" enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
        <div v-if="isOpen" class="fixed inset-0 z-50" @click="closeDrawer">

            <div v-if="isOpen" class="w-44 h-full absolute left-0 top-0 bg-light shadow-lg p-5" @click.stop>
                <div class="flex flex-col gap-9">
                    <div class="flex items-center justify-between border-b border-gray-200">
                        <NuxtImg src="/images/Logo-Tzadik.svg" alt="Logo Tzadik" class="w-20 h-4 object-contain" />
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
                                    class="w-5 h-5 object-contain" />
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
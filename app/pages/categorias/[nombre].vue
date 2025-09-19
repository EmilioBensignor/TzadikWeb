<template>
    <DefaultMain>
        <div class="flex items-end gap-2 text-sm font-semibold p-5 pb-3">
            <NuxtLink :to="ROUTE_NAMES.HOME" class="text-gray-dark">Inicio</NuxtLink>
            <Icon name="tabler:chevron-right" class="w-5 h-5 text-primary" />
            <p>{{ categoria?.nombre }}</p>
        </div>
        <div>
            <HeadingH1>{{ categoria?.nombre }}</HeadingH1>
        </div>
        <CategoriaFiltros />
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

const route = useRoute()
const { categorias, fetchCategorias, loading, error } = useCategorias()

const categoria = computed(() => {
    return categorias.value.find(cat => cat.nombre === route.params.nombre)
})

onMounted(async () => {
    if (categorias.value.length === 0) {
        await fetchCategorias()
    }
})
</script>
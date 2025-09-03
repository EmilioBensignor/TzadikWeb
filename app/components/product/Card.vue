<template>
    <NuxtLink to="#" class="min-h-[23rem] flex flex-col relative primary-shadow rounded-xl">
        <NuxtImg :src="imageUrl" :alt="product.titulo" class="w-full h-48 lg:h-52 object-cover rounded-t-xl" />
        <p v-if="product.oferta" class="absolute top-3 left-3 bg-secondary rounded-[4px] text-xs text-light !leading-none primary-shadow pt-1.5 px-2 pb-1">{{ product.oferta }}</p>
        <div class="min-h-[11rem] flex flex-col flex-1 justify-between gap-3 p-4">
            <div class="flex flex-col gap-3">
                <p class="font-teko font-semibold text-[1.125rem] md:text-xl xxl:text-2xl">{{ product.titulo }}</p>
                <p class="text-xs md:text-sm">{{ product.descripcion_corta }}</p>
            </div>
            <div class="flex items-end gap-2">
                <p class="font-teko text-2xl xxl:text-[1.75rem] font-semibold !leading-none">{{ formatCurrency(product.precio) }}</p>
                <p class="text-sm font-medium">USD</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
import { formatCurrency } from '@/utils/formatCurrency'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const { getImageUrl } = useProductos()

const imageUrl = computed(() => {
    if (!props.product?.producto_imagenes || props.product.producto_imagenes.length === 0) {
        return '/images/placeholder-product.jpg'
    }
    const imagenPrincipal = props.product.producto_imagenes.find(img => img.es_principal) || props.product.producto_imagenes[0]
    return imagenPrincipal ? getImageUrl(imagenPrincipal.storage_path) : '/images/placeholder-product.jpg'
})
</script>
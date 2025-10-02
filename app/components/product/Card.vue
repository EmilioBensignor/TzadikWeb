<template>
    <NuxtLink :to="productUrl" class="min-h-[23rem] flex flex-col relative primary-shadow rounded-xl">
        <NuxtImg :src="imageUrl" :alt="product.titulo" class="w-full h-48 lg:h-52 object-cover rounded-t-xl" />
        <p v-if="product.oferta"
            class="absolute top-3 left-3 bg-secondary rounded-[4px] text-xs text-light !leading-none primary-shadow pt-1.5 px-2 pb-1">
            {{ product.oferta }}</p>
        <div class="min-h-[11rem] flex flex-col flex-1 justify-between gap-3 p-4">
            <div class="flex flex-col gap-3">
                <p class="font-teko font-semibold text-[1.125rem] md:text-xl xxl:text-2xl">{{ product.titulo }}</p>
                <p class="text-xs md:text-sm">{{ product.descripcion_corta }}</p>
            </div>
            <div>
                <div v-if="product.precio_descuento" class="flex flex-col gap-1">
                    <div class="flex items-end gap-2">
                        <p class="font-teko text-sm md:text-base xxl:text-xl font-medium !leading-none line-through">{{
                            formatCurrency(product.precio) }}</p>
                        <p class="text-[0.625rem] font-medium mb-0.5">{{ getCurrencySymbol(product) }}</p>
                    </div>
                    <div class="flex items-end gap-2">
                        <p class="font-teko text-2xl xxl:text-[1.75rem] font-semibold !leading-none">{{
                            formatCurrency(product.precio_descuento) }}</p>
                        <p class="text-sm font-medium">{{ getCurrencySymbol(product) }}</p>
                    </div>
                </div>
                <div v-else class="flex items-end gap-2">
                    <p class="font-teko text-2xl xxl:text-[1.75rem] font-semibold !leading-none">{{
                        formatCurrency(product.precio) }}</p>
                    <p class="text-sm font-medium mb-0.5">{{ getCurrencySymbol(product) }}</p>
                </div>
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

const { getImageUrl, getCurrencySymbol, generateSlug } = useProductos()

const imageUrl = computed(() => {
    if (!props.product?.producto_imagenes || props.product.producto_imagenes.length === 0) {
        return '/images/placeholder-product.jpg'
    }
    const imagenPrincipal = props.product.producto_imagenes.find(img => img.es_principal) || props.product.producto_imagenes[0]
    return imagenPrincipal ? getImageUrl(imagenPrincipal.storage_path) : '/images/placeholder-product.jpg'
})

const productUrl = computed(() => {
    if (!props.product) return '#'
    const categoriaSlug = generateSlug(props.product.categorias?.nombre || 'categoria')
    const productoSlug = generateSlug(props.product.titulo)
    return `/categorias/${categoriaSlug}/${productoSlug}`
})
</script>
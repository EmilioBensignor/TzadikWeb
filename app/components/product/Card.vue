<template>
    <NuxtLink :to="productUrl" class="min-h-[23rem] flex flex-col relative primary-shadow rounded-xl">
        <img :src="imageUrl" :srcset="imageSrcset" :alt="product.titulo"
            width="400" height="300"
            sizes="(max-width: 768px) 70vw, (max-width: 1080px) 33vw, 300px"
            :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'" decoding="async"
            @error="onImageError"
            class="w-full h-48 lg:h-52 bg-gray-mid object-cover rounded-t-xl" />
        <p v-if="product.oferta"
            class="absolute top-3 left-3 bg-secondary rounded-[4px] text-xs text-light !leading-none primary-shadow pt-1.5 px-2 pb-1">
            {{ product.oferta }}</p>
        <div class="min-h-[11rem] flex flex-col flex-1 justify-between gap-3 p-4">
            <div class="flex flex-col gap-3">
                <p class="font-teko font-semibold text-[1.125rem] md:text-xl xxl:text-2xl">{{ product.titulo }}</p>
                <p class="text-xs md:text-sm">{{ product.descripcion_corta }}</p>
            </div>
            <div>
                <div v-if="tieneDescuento" class="flex flex-col gap-1">
                    <div v-if="product.precio" class="flex items-end gap-2">
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
                <div v-else-if="product.precio" class="flex items-end gap-2">
                    <p class="font-teko text-2xl xxl:text-[1.75rem] font-semibold !leading-none">{{
                        formatCurrency(product.precio_descuento || product.precio) }}</p>
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
    },
    priority: {
        type: Boolean,
        default: false
    }
})

const { getImageUrl, getCurrencySymbol, generateSlug } = useProductos()

const imageError = ref(false)

const storagePath = computed(() => {
    if (!props.product?.producto_imagenes?.length) return null
    const principal = props.product.producto_imagenes.find(img => img.es_principal) || props.product.producto_imagenes[0]
    return principal?.storage_path || null
})

const imageUrl = computed(() => {
    if (imageError.value || !storagePath.value) return '/images/placeholder-product.jpg'
    return getImageUrl(storagePath.value, { width: 400, height: 300 })
})

const imageSrcset = computed(() => {
    if (imageError.value || !storagePath.value) return null
    return [300, 400, 600, 800]
        .map(w => `${getImageUrl(storagePath.value, { width: w, height: Math.round(w * 0.75) })} ${w}w`)
        .join(', ')
})

const onImageError = () => {
    imageError.value = true
}

const productUrl = computed(() => {
    if (!props.product) return '#'
    const categoriaSlug = props.product.categorias?.slug
        || generateSlug(props.product.categorias?.nombre || 'categoria')
    const productoSlug = generateSlug(props.product.titulo)
    return `/categorias/${categoriaSlug}/${productoSlug}`
})

const tieneDescuento = computed(() => {
    if (!props.product.precio_descuento) return false
    return props.product.precio_descuento < props.product.precio
})
</script>
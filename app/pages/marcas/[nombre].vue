<template>
    <DefaultMain>
        <MarcaHero />
        <NavCategorias class="hidden lg:block lg:!z-10 lg:-mt-52 xxl:-mt-60" />
        <CarouselStatic :slides-per-view="{ base: 2.4, sm: 2.8, md: 3, lg: 4, xl: 4, xxl: 5 }"
            :gap="{ md: 12, lg: 16, xl: 16, xxl: 16 }" :button-position="{
                top: {
                    base: '20%',
                    md: '20%',
                    lg: '30%',
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
            }" class="md:w-[42.5rem] lg:w-[58.5rem] xxl:w-[1210px] pl-1 -mt-10 mx-auto">
            <div v-for="(marca, index) in marcasOrdenadas" :key="index" :class="[
                'h-16 md:h-[4.75rem] lg:h-28 flex justify-center items-center bg-light rounded-md lg:rounded-xl orange-shadow py-5 px-4',
                index === 0 ? 'border-[3px] md:border-[6px] border-primary' : ''
            ]">
                <NuxtLink v-if="index !== 0" :to="`${ROUTE_NAMES.MARCAS}/${marca.slug}`">
                    <NuxtImg :src="`/images/marcas/${marca.slug}.webp`" :alt="marca.nombre" :class="[
                        'w-full max-h-10 md:max-h-12 lg:max-h-16 object-contain',
                        index === marcasOrdenadas.length - 1 ? 'lg:!max-h-8' : ''
                    ]" />
                </NuxtLink>
                <NuxtImg v-else :src="`/images/marcas/${marca.slug}.webp`" :alt="marca.nombre" :class="[
                    'w-full max-h-10 md:max-h-12 lg:max-h-16 object-contain',
                    index === marcasOrdenadas.length - 1 ? 'lg:!max-h-8' : ''
                ]" />
            </div>
        </CarouselStatic>
        <div v-if="marca" class="w-full max-w-[1200px] mx-auto">
            <DefaultSection class="flex flex-col items-center !gap-10 pt-7 md:pt-9 lg:pt-0 px-5 md:px-11 xxl:!px-0">
                <h1 class="sr-only">{{ marca.nombre }}</h1>
                <NuxtImg :src="`/images/marcas/${marca.slug}.webp`"
                    :alt="`${marca.nombre} Tractores, Palas Cargadoras, Logistica, Maquinaria Agricola`"
                    class="h-11 md:h-12 lg:h-14 xxl:h-16" />
                <div class="lg:w-full flex flex-col md:flex-row md:items-stretch gap-8 md:gap-5 lg:gap-4 xxl:gap-8">
                    <NuxtImg :src="`/images/marcas/${marca.img}.webp`" :alt="marca.alt" class="md:w-1/2 rounded-xl object-cover" />
                    <ul class="md:w-1/2 flex flex-col md:justify-between gap-4 lg:gap-5 xxl:gap-6">
                        <li v-for="(caracteristica, index) in marca.caracteristicas" :key="index"
                            class="flex items-center gap-3 md:gap-4">
                            <NuxtImg :src="`/images/marcas/caracteristicas/${caracteristica.icono}.svg`"
                                :alt="`Caracteristica ${marca.alt}`" class="w-8 h-8 flex-shrink-0 object-contain" />
                            <span class="text-xs md:text-sm font-medium">{{ caracteristica.texto }}</span>
                        </li>
                    </ul>
                </div>
            </DefaultSection>
        </div>
        <div v-if="marca" class="w-full max-w-[1200px] mx-auto">
            <DefaultSection class="md:px-11 lg:px-20 xxl:px-0 my-8">
                <HeadingH2 class="md:w-full md:text-left px-5 md:px-0">LOS PRODUCTOS MÁS DESTACADOS DE {{
                    marca.nombre.toUpperCase() }}</HeadingH2>

                <div v-if="loadingProductos" class="flex justify-center py-4">
                    <Icon name="tabler:loader-2" class="w-8 h-8 text-primary animate-spin" />
                </div>

                <CarouselStatic v-else-if="productosMarca.length > 0"
                    :slides-per-view="{ base: 1.3, sm: 2.3, md: 3, lg: 4, xl: 4, xxl: 4 }"
                    :gap="{ base: 12, md: 12, lg: 16, xl: 16, xxl: 16 }" :button-position="{
                        top: {
                            base: '20%',
                            md: '32%',
                            lg: '35%',
                            xl: '37%',
                            xxl: '38%',
                        },
                        transform: 'translateY(0)',
                        left: {
                            base: '0.5rem',
                            md: '-1.25rem',
                            lg: '-1.25rem',
                            xl: '-1.25rem',
                            xxl: '-1.25rem',
                        },
                        right: {
                            base: '0.5rem',
                            md: '-1.25rem',
                            lg: '-1.25rem',
                            xl: '-1.25rem',
                            xxl: '-1.25rem',
                        }
                    }">
                    <ProductCard v-for="producto in productosMarca" :key="producto.id" :product="producto" />
                </CarouselStatic>

                <div v-else class="flex flex-col items-center justify-center py-8 px-5">
                    <Icon name="tabler:package-off" class="w-12 h-12 text-gray-400 mb-3" />
                    <p class="text-gray-600 text-center">No hay productos disponibles de esta marca</p>
                </div>
            </DefaultSection>
        </div>
        <div v-else>
            <h1>Marca no encontrada</h1>
        </div>
        <HomeContacto />
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';
import marcas from '~/shared/marcas.js';

const route = useRoute();
const { productos, fetchProductos } = useProductos();

const productosMarca = ref([]);
const loadingProductos = ref(false);

const marca = computed(() => {
    return marcas.find(m => m.slug === route.params.nombre);
});

const marcasOrdenadas = computed(() => {
    const currentIndex = marcas.findIndex(m => m.slug === route.params.nombre);
    if (currentIndex === -1) {
        return marcas;
    }

    return [
        marcas[currentIndex],
        ...marcas.slice(0, currentIndex),
        ...marcas.slice(currentIndex + 1)
    ];
});

const obtenerProductosMarca = async () => {
    if (!marca.value) return;

    try {
        loadingProductos.value = true;

        await fetchProductos({
            includeImages: true,
            noPagination: true
        });

        const productosFiltered = productos.value.filter(prod =>
            prod.datos_dinamicos?.marca?.toLowerCase() === marca.value.nombre.toLowerCase()
        );

        const productosOrdenados = productosFiltered.sort((a, b) => {
            if (a.destacado && !b.destacado) return -1;
            if (!a.destacado && b.destacado) return 1;

            if (a.oferta && !b.oferta) return -1;
            if (!a.oferta && b.oferta) return 1;

            return new Date(b.created_at) - new Date(a.created_at);
        });

        productosMarca.value = productosOrdenados;

    } catch (error) {
        console.error('Error obteniendo productos de la marca:', error);
    } finally {
        loadingProductos.value = false;
    }
};

onMounted(async () => {
    await obtenerProductosMarca();
});

watch(() => route.params.nombre, async () => {
    await obtenerProductosMarca();
}, { immediate: false });
</script>
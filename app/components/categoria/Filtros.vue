<template>
    <DefaultSection class="w-full max-w-[1200px] md:flex-row md:items-start md:!gap-4 mx-auto">
        <div class="w-full md:max-w-[13.75rem] lg:max-w-[17rem] flex flex-col gap-3 md:gap-4 pt-6 pb-3 px-5 md:p-0">
            <div class="flex flex-col gap-3 md:gap-4 rounded-xl md:rounded-2xl shadow-md shadow-black/30 p-3 md:p-4 lg:p-6">
                <p class="lg:text-xl font-bold">Filtros aplicados</p>
                <div class="flex flex-wrap items-center gap-2">
                    <span v-for="(filtro, index) in filtrosAplicados" :key="index"
                        class="flex items-center gap-2 border border-primary rounded-lg text-sm font-medium p-2">
                        {{ filtro }}
                        <button v-if="!(index === 0 && categoriaActual?.nombre === filtro)"
                            @click="removerFiltro(index)"
                            class="w-3 h-3 flex justify-center items-center bg-primary rounded-full text-light">
                            <Icon name="tabler:x" class="w-3 h-3" />
                        </button>
                    </span>
                </div>
                <button @click="limpiarFiltros" class="self-end text-xs lg:text-base text-primary font-semibold">Limpiar
                    filtros</button>
            </div>
            <div class="flex flex-col gap-3 md:gap-5 rounded-xl md:rounded-2xl shadow-md shadow-black/30 p-3 md:p-4 lg:p-6">
                <div class="flex justify-between items-center">
                    <p class="font-bold lg:text-xl">Filtros</p>
                    <button @click="toggleFiltros"
                        class="w-6 h-6 flex justify-center items-center bg-primary rounded-full shadow-md shadow-black/20 text-light md:hidden">
                        <Icon name="tabler:chevron-down" class="w-5 h-5 transition-transform duration-200"
                            :class="filtrosAbiertos ? 'rotate-180' : ''" />
                    </button>
                </div>
                <Transition enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 transform -translate-y-2"
                    enter-to-class="opacity-100 transform translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 transform translate-y-0"
                    leave-to-class="opacity-0 transform -translate-y-2">
                    <div v-if="filtrosAbiertos" class="flex flex-col gap-6">
                        <div v-if="subcategorias.length > 0" class="flex flex-col gap-2">
                            <p class="text-sm md:text-base font-semibold">Subcategoría</p>
                            <div class="flex flex-col gap-2 text-xs">
                                <FormCheckbox v-for="(subcategoria, index) in subcategorias" :key="index"
                                    :id="`subcat-${index}`" :value="subcategoria.nombre"
                                    :checked="filtrosSeleccionados.subcategorias.includes(subcategoria.nombre)"
                                    :label="subcategoria.nombre"
                                    @update:checked="toggleSubcategoria(subcategoria.nombre, $event)" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-sm md:text-base font-semibold">Condición</p>
                            <div class="flex flex-col gap-2">
                                <FormCheckbox id="nuevo" value="Nuevo"
                                    :checked="filtrosSeleccionados.condicion.includes('Nuevo')" label="Nuevo"
                                    @update:checked="toggleCondicion('Nuevo', $event)" />
                                <FormCheckbox id="usado" value="Usado"
                                    :checked="filtrosSeleccionados.condicion.includes('Usado')" label="Usado"
                                    @update:checked="toggleCondicion('Usado', $event)" />
                                <FormCheckbox id="seminuevo" value="Seminuevo"
                                    :checked="filtrosSeleccionados.condicion.includes('Seminuevo')" label="Seminuevo"
                                    @update:checked="toggleCondicion('Seminuevo', $event)" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-sm md:text-base font-semibold">Marca</p>
                            <div class="flex flex-col gap-2">
                                <FormCheckbox v-for="(marca, index) in marcas" :key="index" :id="`marca-${index}`"
                                    :value="marca.nombre" :checked="filtrosSeleccionados.marcas.includes(marca.nombre)"
                                    :label="marca.nombre.charAt(0).toUpperCase() + marca.nombre.slice(1)"
                                    @update:checked="toggleMarca(marca, $event)" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-sm md:text-base font-semibold">Moneda</p>
                            <div class="flex flex-col gap-2">
                                <FormCheckbox id="dolares" value="dolares"
                                    :checked="filtrosSeleccionados.moneda.includes('dolares')" label="Dólares"
                                    @update:checked="toggleMoneda('dolares', $event)" />
                                <FormCheckbox id="pesos" value="pesos"
                                    :checked="filtrosSeleccionados.moneda.includes('pesos')" label="Pesos Argentinos"
                                    @update:checked="toggleMoneda('pesos', $event)" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <p class="text-sm md:text-base font-semibold">Oferta</p>
                            <div class="flex flex-col gap-2">
                                <FormCheckbox id="productosOferta" value="productosOferta"
                                    :checked="filtrosSeleccionados.oferta.includes('productosOferta')"
                                    label="Productos en oferta"
                                    @update:checked="toggleOferta('productosOferta', $event)" />
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="w-full flex flex-col gap-6">
            <div class="flex justify-between items-center border-b border-gray-dark pb-1.5 md:pb-4 md:px-2 mx-5 md:mx-0">
                <div class="flex items-end gap-2 lg:gap-4">
                    <NuxtImg :src="categoriaActual?.icon" :alt="`Icono de ${categoriaActual?.nombre}`"
                        class="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 object-contain" />
                    <p class="text-xs md:text-base lg:text-xl font-bold">{{ productosFiltrados.length }} Resultados</p>
                </div>
                <div class="flex items-center gap-2">
                    <FormSelect v-model="ordenarPor" :options="opcionesOrdenar" />
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <div class="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 flex-col gap-3 md:gap-4 px-5 md:px-0">
                    <ProductCard v-for="product in primerosProductos" :key="product.id" :product="product" />
                </div>

                <CategoriaContacto v-if="mostrarBannerContacto" class="my-3" />

                <div class="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 flex-col gap-3 md:gap-4 px-5 md:px-0">
                    <ProductCard v-for="product in siguientesProductos" :key="product.id" :product="product" />
                </div>

                <div class="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 flex-col gap-3 md:gap-4 px-5 md:px-0">
                    <ProductCard v-for="product in productosAdicionales" :key="product.id" :product="product" />
                </div>

                <ButtonPrimary v-if="mostrarBotonCargarMas" @click="cargarMasProductos" class="self-center">
                    Cargar más productos
                </ButtonPrimary>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import marcas from '~/shared/marcas'

const route = useRoute()
const { categorias, fetchCategorias, getSubcategoriasPorCategoria } = useCategorias()
const { productos, searchProductos, clearFilters } = useProductos()
const productosStore = useProductosStore()

const categoriaActual = computed(() => {
    return categorias.value.find(cat => cat.nombre === route.params.nombre)
})

const subcategorias = computed(() => {
    if (!categoriaActual.value?.id) return []
    return getSubcategoriasPorCategoria(categoriaActual.value.id)
})

const filtrosAbiertos = ref(false)

onMounted(() => {
    const checkScreenSize = () => {
        filtrosAbiertos.value = window.innerWidth >= 768
        isXXL.value = window.innerWidth >= 1440
        isMD.value = window.innerWidth >= 768
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})
const ordenarPor = ref('precio-mayor')
const productosAdicionalesTotales = ref(0)

const opcionesOrdenar = [
    { value: 'precio-mayor', label: 'Precio: mayor a menor' },
    { value: 'precio-menor', label: 'Precio: menor a mayor' }
]

const filtrosSeleccionados = reactive({
    subcategorias: [],
    condicion: [],
    marcas: [],
    moneda: [],
    oferta: []
})

const filtrosAplicados = computed(() => {
    const aplicados = []

    if (categoriaActual.value?.nombre) {
        aplicados.push(categoriaActual.value.nombre)
    }

    if (filtrosSeleccionados.subcategorias.length > 0) {
        aplicados.push(...filtrosSeleccionados.subcategorias)
    }
    if (filtrosSeleccionados.condicion.length > 0) {
        aplicados.push(...filtrosSeleccionados.condicion)
    }
    if (filtrosSeleccionados.marcas.length > 0) {
        aplicados.push(...filtrosSeleccionados.marcas.map(m => m.charAt(0).toUpperCase() + m.slice(1)))
    }
    if (filtrosSeleccionados.moneda.length > 0) {
        aplicados.push(...filtrosSeleccionados.moneda.map(m => m === 'dolares' ? 'Dólares' : 'Pesos Argentinos'))
    }
    if (filtrosSeleccionados.oferta.length > 0) {
        aplicados.push('En oferta')
    }

    return aplicados
})

const productosFiltrados = computed(() => {
    return productos.value
})

const isXXL = ref(false)
const isMD = ref(false)

const productosAntesBanner = computed(() => {
    if (isXXL.value) return 9
    if (isMD.value) return 6
    return 5
})

const productosAntesBoton = computed(() => {
    if (isXXL.value) return 18
    if (isMD.value) return 12
    return 10
})

const productosPorCarga = computed(() => {
    if (isXXL.value) return 9
    if (isMD.value) return 6
    return 5
})

const primerosProductos = computed(() => {
    return productosFiltrados.value.slice(0, productosAntesBanner.value)
})

const siguientesProductos = computed(() => {
    if (productosFiltrados.value.length <= productosAntesBanner.value) return []
    return productosFiltrados.value.slice(productosAntesBanner.value, productosAntesBanner.value * 2)
})

const productosAdicionales = computed(() => {
    if (productosFiltrados.value.length <= productosAntesBanner.value * 2) return []
    return productosFiltrados.value.slice(productosAntesBanner.value * 2, productosAntesBanner.value * 2 + productosAdicionalesTotales.value)
})

const productosVisibles = computed(() => {
    return primerosProductos.value.length + siguientesProductos.value.length + productosAdicionales.value.length
})

const mostrarBannerContacto = computed(() => {
    return productosFiltrados.value.length > productosAntesBanner.value
})

const mostrarBotonCargarMas = computed(() => {
    const totalProductos = productosFiltrados.value.length
    return productosVisibles.value < totalProductos
})

const cargarMasProductos = () => {
    productosAdicionalesTotales.value += productosPorCarga.value
}

const toggleFiltros = () => {
    filtrosAbiertos.value = !filtrosAbiertos.value
}

const toggleSubcategoria = async (subcategoria, checked) => {
    if (checked) {
        filtrosSeleccionados.subcategorias.push(subcategoria)
    } else {
        const index = filtrosSeleccionados.subcategorias.indexOf(subcategoria)
        if (index > -1) {
            filtrosSeleccionados.subcategorias.splice(index, 1)
        }
    }
    await aplicarFiltros()
}

const toggleCondicion = async (condicion, checked) => {
    if (checked) {
        filtrosSeleccionados.condicion.push(condicion)
    } else {
        const index = filtrosSeleccionados.condicion.indexOf(condicion)
        if (index > -1) {
            filtrosSeleccionados.condicion.splice(index, 1)
        }
    }
    await aplicarFiltros()
}

const toggleMarca = async (marca, checked) => {
    if (checked) {
        filtrosSeleccionados.marcas.push(marca.nombre)
    } else {
        const index = filtrosSeleccionados.marcas.indexOf(marca.nombre)
        if (index > -1) {
            filtrosSeleccionados.marcas.splice(index, 1)
        }
    }
    await aplicarFiltros()
}

const toggleMoneda = async (moneda, checked) => {
    if (checked) {
        filtrosSeleccionados.moneda.push(moneda)
    } else {
        const index = filtrosSeleccionados.moneda.indexOf(moneda)
        if (index > -1) {
            filtrosSeleccionados.moneda.splice(index, 1)
        }
    }
    await aplicarFiltros()
}

const toggleOferta = async (oferta, checked) => {
    if (checked) {
        filtrosSeleccionados.oferta.push(oferta)
    } else {
        const index = filtrosSeleccionados.oferta.indexOf(oferta)
        if (index > -1) {
            filtrosSeleccionados.oferta.splice(index, 1)
        }
    }
    await aplicarFiltros()
}

const aplicarFiltros = async () => {
    if (!categoriaActual.value?.id) return

    const searchParams = {
        categoria_id: categoriaActual.value.id,
        condicion: filtrosSeleccionados.condicion,
        marca: filtrosSeleccionados.marcas,
        moneda: filtrosSeleccionados.moneda,
        en_oferta: filtrosSeleccionados.oferta.length > 0
    }

    // Aplicar subcategorías si hay alguna seleccionada
    if (filtrosSeleccionados.subcategorias.length > 0) {
        const subcategoriasIds = subcategorias.value
            .filter(sub => filtrosSeleccionados.subcategorias.includes(sub.nombre))
            .map(sub => sub.id)
        searchParams.subcategoria_ids = subcategoriasIds
    }

    await searchProductos(searchParams)
    productosAdicionalesTotales.value = 0
}

const limpiarFiltros = async () => {
    Object.keys(filtrosSeleccionados).forEach(key => {
        filtrosSeleccionados[key] = []
    })
    productosAdicionalesTotales.value = 0
    await aplicarFiltros()
}

const removerFiltro = async (index) => {
    const filtroARemover = filtrosAplicados.value[index]

    if (index === 0 && categoriaActual.value?.nombre === filtroARemover) {
        return
    }

    Object.keys(filtrosSeleccionados).forEach(categoria => {
        const filtros = filtrosSeleccionados[categoria]
        const indice = filtros.findIndex(filtro => {
            if (categoria === 'condicion') {
                return filtro === filtroARemover
            }
            if (categoria === 'moneda') {
                return (filtro === 'dolares' && filtroARemover === 'Dólares') ||
                    (filtro === 'pesos' && filtroARemover === 'Pesos Argentinos')
            }
            if (categoria === 'oferta') {
                return filtroARemover === 'En oferta'
            }
            return filtro === filtroARemover
        })

        if (indice !== -1) {
            filtros.splice(indice, 1)
        }
    })

    await aplicarFiltros()
}

onMounted(async () => {
    if (categorias.value.length === 0) {
        await fetchCategorias()
    }
})

watch(() => categoriaActual.value?.id, async (nuevaCategoriaId) => {
    if (nuevaCategoriaId) {
        limpiarFiltros()
        const originalPageSize = productosStore.pageSize
        productosStore.pageSize = 1000
        await searchProductos({ categoria_id: nuevaCategoriaId })
        productosStore.pageSize = originalPageSize
    }
}, { immediate: true })

watch(() => ordenarPor.value, async () => {
    if (ordenarPor.value === 'precio-mayor') {
        productosStore.setSorting('precio', 'desc')
    } else if (ordenarPor.value === 'precio-menor') {
        productosStore.setSorting('precio', 'asc')
    }
    await aplicarFiltros()
})
</script>
<template>
    <DefaultSection class="w-full max-w-[1200px] md:flex-row md:items-start md:!gap-4 mx-auto">
        <div class="w-full md:max-w-[13.75rem] lg:max-w-[17rem] flex flex-col gap-3 md:gap-4 pt-6 pb-3 px-5 md:p-0">
            <div
                class="flex flex-col gap-3 md:gap-4 rounded-xl md:rounded-2xl shadow-md shadow-black/30 p-3 md:p-4 lg:p-6 ">
                <p class="lg:text-xl font-bold">Filtros aplicados</p>
                <div v-if="filtrosAplicados.length > 0" class="flex flex-wrap items-center gap-2">
                    <span v-for="filtro in filtrosAplicados" :key="`${filtro.tipo}-${filtro.valor}`"
                        class="flex items-center gap-2 border border-primary rounded-lg text-sm font-medium p-2">
                        {{ filtro.label }}
                        <button @click="removerFiltro(filtro)" :aria-label="`Quitar filtro ${filtro.label}`"
                            class="w-3 h-3 flex justify-center items-center bg-primary rounded-full text-light">
                            <Icon name="tabler:x" class="w-3 h-3" />
                        </button>
                    </span>
                </div>
                <p v-else class="text-sm text-gray-dark">Sin filtros aplicados</p>
                <button v-if="filtrosAplicados.length > 0" @click="limpiarFiltros"
                    class="self-end text-xs lg:text-base text-primary font-semibold">Limpiar
                    filtros</button>
            </div>
            <div
                class="flex flex-col gap-3 md:gap-5 rounded-xl md:rounded-2xl shadow-md shadow-black/30 p-3 md:p-4 lg:p-6 ">
                <div class="flex justify-between items-center">
                    <p class="font-bold lg:text-xl">Filtros</p>
                    <button @click="toggleFiltros" aria-label="Mostrar u ocultar filtros"
                        class="w-6 h-6 flex justify-center items-center bg-primary rounded-full shadow-md shadow-black/20 text-light md:hidden">
                        <Icon name="tabler:chevron-down" class="w-5 h-5 transition-transform duration-200"
                            :class="filtrosAbiertos ? 'rotate-180' : ''" />
                    </button>
                </div>
                <div class="flex-col gap-6" :class="filtrosAbiertos ? 'flex' : 'hidden md:flex'">
                        <div class="flex flex-col gap-2">
                            <p class="text-sm md:text-base font-semibold">Categoría</p>
                            <div class="flex flex-col gap-2 text-xs">
                                <FormCheckbox v-for="categoria in categorias" :key="categoria.id"
                                    :id="`cat-${categoria.id}`" :value="categoria.id"
                                    :checked="categoriaSeleccionada === categoria.id" :label="categoria.nombre"
                                    @update:checked="toggleCategoria(categoria.id, $event)" />
                            </div>
                        </div>
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
                                <FormCheckbox v-for="marca in marcas" :key="marca.id" :id="`marca-${marca.id}`"
                                    :value="marca.id" :checked="filtrosSeleccionados.marcas.includes(marca.id)"
                                    :label="marca.nombre"
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
            </div>
        </div>
        <div class="w-full flex flex-col gap-6">
            <div class="flex flex-col gap-4 border-b border-gray-dark pb-1.5 md:pb-4 md:px-2 mx-5 md:mx-0">
                <div class="w-full flex items-center gap-2 border border-gray-dark focus-within:border-primary rounded-lg px-3 transition-colors duration-300">
                    <Icon name="tabler:search" class="w-5 h-5 text-gray-dark flex-shrink-0" />
                    <input v-model="busqueda" type="search" name="busqueda" id="busqueda"
                        placeholder="Buscar un producto"
                        aria-label="Buscar productos"
                        class="w-full bg-transparent text-sm md:text-base outline-none py-2.5" />
                    <button v-if="busqueda" @click="busqueda = ''" aria-label="Borrar búsqueda"
                        class="flex items-center flex-shrink-0">
                        <Icon name="tabler:x" class="w-4 h-4 text-gray-dark" />
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-end gap-2 lg:gap-4">
                        <NuxtImg v-if="categoriaActual?.icon" :src="categoriaActual.icon"
                            :alt="`Icono de ${categoriaActual.nombre}`"
                            class="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 object-contain" />
                        <p class="text-xs md:text-base lg:text-xl font-bold">{{ productosFiltrados.length }} Resultados
                        </p>
                    </div>
                    <div class="flex items-center gap-2">
                        <FormSelect v-model="ordenarPor" :options="opcionesOrdenar" />
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <div v-if="cargandoInicial || loading" class="flex flex-col items-center justify-center py-12 px-5">
                    <Icon name="tabler:loader-2" class="w-8 h-8 text-primary animate-spin mb-4" />
                    <p class="text-gray-600 text-center">Cargando productos...</p>
                </div>

                <div v-else-if="productosFiltrados.length === 0" class="px-5 md:px-0">
                    <div
                        class="flex flex-col items-center text-center gap-4 lg:gap-5 xxl:gap-6 bg-dark rounded-[9px] text-light p-3 md:p-5 lg:p-6 xxl:p-8">
                        <p class="text-sm lg:text-base xxl:text-xl font-bold">No hay productos que coincidan con tu
                            búsqueda.</p>
                        <ButtonPrimary @click="limpiarFiltros">Limpiar filtros</ButtonPrimary>
                        <p class="text-xs lg:text-sm xxl:text-base font-bold">O <NuxtLink
                                :to="`https://wa.me/${ROUTE_NAMES.WHATSAPP}`" target="_blank" class="underline">ponete
                                en
                                contacto</NuxtLink> con
                            nosotros.</p>
                    </div>
                </div>

                <template v-else>
                    <div class="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 flex-col gap-3 md:gap-4 px-5 md:px-0">
                        <ProductCard v-for="(product, index) in primerosProductos" :key="product.id"
                            :product="product" :priority="index < 3" />
                    </div>

                    <CategoriaContacto v-if="mostrarBannerContacto" class="my-3 " />

                    <div class="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 flex-col gap-3 md:gap-4 px-5 md:px-0">
                        <ProductCard v-for="product in siguientesProductos" :key="product.id" :product="product" />
                    </div>

                    <div class="flex sm:grid sm:grid-cols-2 xl:grid-cols-3 flex-col gap-3 md:gap-4 px-5 md:px-0">
                        <ProductCard v-for="product in productosAdicionales" :key="product.id" :product="product" />
                    </div>

                    <ButtonPrimary v-if="mostrarBotonCargarMas" @click="cargarMasProductos" class="self-center">
                        Cargar más productos
                    </ButtonPrimary>
                </template>
            </div>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'
import { useDebounceFn } from '~/composables/useDebounce'

const route = useRoute()
const router = useRouter()
const { marcas, fetchMarcas } = useMarcas()
const { categorias, fetchCategorias, getSubcategoriasPorCategoria } = useCategorias()
const { productos, searchProductos, loading, generateSlug } = useProductos()
const productosStore = useProductosStore()
const cargandoInicial = ref(false)

const categoriaDeRuta = computed(() => {
    const param = decodeParam(route.params.categoria)
    if (!param) return null
    return categorias.value.find(cat =>
        cat.slug === param || cat.nombre === param || generateSlug(cat.nombre) === param
    ) || null
})

const categoriaSeleccionada = ref(null)

const categoriaActual = computed(() =>
    categorias.value.find(cat => cat.id === categoriaSeleccionada.value) || null
)

const subcategorias = computed(() => {
    if (!categoriaSeleccionada.value) return []
    return getSubcategoriasPorCategoria(categoriaSeleccionada.value)
})

const filtrosAbiertos = ref(false)

onMounted(() => {
    const checkScreenSize = () => {
        isXXL.value = window.innerWidth >= 1440
        isMD.value = window.innerWidth >= 768
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})
const ordenarPor = ref('precio-mayor')
const productosAdicionalesTotales = ref(0)
const busqueda = ref(decodeParam(route.query.q) || '')

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

    if (busqueda.value.trim()) {
        aplicados.push({ tipo: 'busqueda', valor: busqueda.value, label: `"${busqueda.value}"` })
    }

    if (categoriaActual.value) {
        aplicados.push({ tipo: 'categoria', valor: categoriaActual.value.id, label: categoriaActual.value.nombre })
    }

    filtrosSeleccionados.subcategorias.forEach(nombre => {
        aplicados.push({ tipo: 'subcategorias', valor: nombre, label: nombre })
    })
    filtrosSeleccionados.condicion.forEach(condicion => {
        aplicados.push({ tipo: 'condicion', valor: condicion, label: condicion })
    })
    filtrosSeleccionados.marcas.forEach(id => {
        const nombre = marcas.value.find(m => m.id === id)?.nombre
        if (nombre) aplicados.push({ tipo: 'marcas', valor: id, label: nombre })
    })
    filtrosSeleccionados.moneda.forEach(moneda => {
        aplicados.push({ tipo: 'moneda', valor: moneda, label: moneda === 'dolares' ? 'Dólares' : 'Pesos Argentinos' })
    })
    if (filtrosSeleccionados.oferta.length > 0) {
        aplicados.push({ tipo: 'oferta', valor: 'productosOferta', label: 'En oferta' })
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
    return productosVisibles.value < productosFiltrados.value.length
})

const cargarMasProductos = () => {
    productosAdicionalesTotales.value += productosPorCarga.value
}

const toggleFiltros = () => {
    filtrosAbiertos.value = !filtrosAbiertos.value
}

const toggleEnLista = (lista, valor, checked) => {
    if (checked) {
        if (!lista.includes(valor)) lista.push(valor)
    } else {
        const index = lista.indexOf(valor)
        if (index > -1) lista.splice(index, 1)
    }
}

const toggleCategoria = async (categoriaId, checked) => {
    categoriaSeleccionada.value = checked ? categoriaId : null
    filtrosSeleccionados.subcategorias = []
    await aplicarFiltros()
}

const toggleSubcategoria = async (subcategoria, checked) => {
    toggleEnLista(filtrosSeleccionados.subcategorias, subcategoria, checked)
    await aplicarFiltros()
}

const toggleCondicion = async (condicion, checked) => {
    toggleEnLista(filtrosSeleccionados.condicion, condicion, checked)
    await aplicarFiltros()
}

const toggleMarca = async (marca, checked) => {
    toggleEnLista(filtrosSeleccionados.marcas, marca.id, checked)
    await aplicarFiltros()
}

const toggleMoneda = async (moneda, checked) => {
    toggleEnLista(filtrosSeleccionados.moneda, moneda, checked)
    await aplicarFiltros()
}

const toggleOferta = async (oferta, checked) => {
    toggleEnLista(filtrosSeleccionados.oferta, oferta, checked)
    await aplicarFiltros()
}

const aplicarFiltros = async () => {
    const searchParams = {
        condicion: filtrosSeleccionados.condicion,
        marca_ids: filtrosSeleccionados.marcas,
        moneda: filtrosSeleccionados.moneda,
        en_oferta: filtrosSeleccionados.oferta.length > 0,
        search: busqueda.value.trim()
    }

    if (categoriaSeleccionada.value) {
        searchParams.categoria_id = categoriaSeleccionada.value
    }

    if (filtrosSeleccionados.subcategorias.length > 0) {
        searchParams.subcategoria_ids = subcategorias.value
            .filter(sub => filtrosSeleccionados.subcategorias.includes(sub.nombre))
            .map(sub => sub.id)
    }

    const originalPageSize = productosStore.pageSize
    productosStore.pageSize = 1000
    try {
        await searchProductos(searchParams, { soloListado: true })
    } finally {
        productosStore.pageSize = originalPageSize
    }
    productosAdicionalesTotales.value = 0
}

const limpiarFiltros = async () => {
    Object.keys(filtrosSeleccionados).forEach(key => {
        filtrosSeleccionados[key] = []
    })
    categoriaSeleccionada.value = null
    busqueda.value = ''
    productosAdicionalesTotales.value = 0
    await aplicarFiltros()
}

const removerFiltro = async (filtro) => {
    if (filtro.tipo === 'busqueda') {
        busqueda.value = ''
        return
    }

    if (filtro.tipo === 'categoria') {
        categoriaSeleccionada.value = null
        filtrosSeleccionados.subcategorias = []
        await aplicarFiltros()
        return
    }

    toggleEnLista(filtrosSeleccionados[filtro.tipo], filtro.valor, false)
    await aplicarFiltros()
}

await useAsyncData('filtros-datos', async () => {
    if (categorias.value.length === 0) {
        await fetchCategorias()
    }
    await fetchMarcas()
    return true
})

const buscarConDebounce = useDebounceFn(async () => {
    await aplicarFiltros()
}, 350)

watch(busqueda, (valor) => {
    const q = valor.trim()
    if (q !== (route.query.q || '')) {
        const query = { ...route.query }
        if (q) query.q = q
        else delete query.q
        router.replace({ query })
    }

    buscarConDebounce()
})

const reiniciarDesdeRuta = async (nuevaCategoria) => {
    cargandoInicial.value = true
    categoriaSeleccionada.value = nuevaCategoria?.id || null
    Object.keys(filtrosSeleccionados).forEach(key => {
        filtrosSeleccionados[key] = []
    })
    productosAdicionalesTotales.value = 0
    try {
        await aplicarFiltros()
    } finally {
        cargandoInicial.value = false
    }
}

await useAsyncData(`filtros-productos-${route.params.categoria || 'todos'}`, async () => {
    await reiniciarDesdeRuta(categoriaDeRuta.value)
    return productos.value.length
})

watch(categoriaDeRuta, reiniciarDesdeRuta)

watch(ordenarPor, async () => {
    productosStore.setSorting('precio', ordenarPor.value === 'precio-menor' ? 'asc' : 'desc')
    await aplicarFiltros()
})
</script>

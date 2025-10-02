import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', () => {

    const productos = ref([])
    const ofertas = ref([])
    const productosImagenes = ref([])
    const loading = ref(false)
    const error = ref(null)
    const currentProduct = ref(null)

    const currentPage = ref(1)
    const pageSize = ref(12)
    const totalCount = ref(0)
    const filters = ref({
        categoria_id: null,
        subcategoria_ids: [],
        condicion: [],
        marca: [],
        moneda: [],
        en_oferta: false,
        precio_min: null,
        precio_max: null,
        search: '',
        datos_dinamicos: {}
    })
    const sortBy = ref('created_at')
    const sortOrder = ref('desc')

    const getProductoById = computed(() => (id) => {
        return productos.value.find(producto => producto.id === id)
    })

    const getProductosByCategoria = computed(() => (categoriaId) => {
        return productos.value.filter(producto => producto.categoria_id === categoriaId)
    })

    const getImagenesByProducto = computed(() => (productoId) => {
        return productosImagenes.value.filter(img => img.producto_id === productoId)
    })

    const getCurrencySymbol = computed(() => (producto) => {
        return producto.moneda ? 'USD' : 'ARS'
    })

    const totalPages = computed(() => {
        return Math.ceil(totalCount.value / pageSize.value)
    })

    const fetchProductos = async (options = {}) => {
        try {
            loading.value = true
            error.value = null

            const supabase = useSupabaseClient()
            let selectQuery = `
                *,
                categorias(id, nombre, icon),
                subcategorias(id, nombre),
                producto_imagenes(storage_path, es_principal, orden)
            `

            let query = supabase
                .from('productos')
                .select(selectQuery, { count: 'exact' })
                .eq('activo', true)

            if (filters.value.categoria_id) {
                query = query.eq('categoria_id', filters.value.categoria_id)
            }

            if (filters.value.subcategoria_ids && filters.value.subcategoria_ids.length > 0) {
                query = query.in('subcategoria_id', filters.value.subcategoria_ids)
            }

            if (filters.value.condicion && filters.value.condicion.length > 0) {
                query = query.in('condicion', filters.value.condicion)
            }

            if (filters.value.marca && filters.value.marca.length > 0) {
                // La marca podría estar en datos_dinamicos
                const marcaConditions = filters.value.marca.map(marca =>
                    `datos_dinamicos->>marca.ilike.%${marca}%`
                )
                if (marcaConditions.length > 0) {
                    query = query.or(marcaConditions.join(','))
                }
            }

            if (filters.value.moneda && filters.value.moneda.length > 0) {
                const monedaConditions = filters.value.moneda.map(m => {
                    if (m === 'dolares') return 'moneda.eq.true'
                    if (m === 'pesos') return 'moneda.eq.false'
                    return null
                }).filter(Boolean)

                if (monedaConditions.length > 0) {
                    query = query.or(monedaConditions.join(','))
                }
            }

            if (filters.value.en_oferta) {
                // Productos en oferta: destacados O que tengan texto en el campo oferta
                query = query.or('destacado.eq.true,oferta.not.is.null')
            }

            if (filters.value.precio_min) {
                query = query.gte('precio', filters.value.precio_min)
            }

            if (filters.value.precio_max) {
                query = query.lte('precio', filters.value.precio_max)
            }

            if (filters.value.search) {
                query = query.or(`titulo.ilike.%${filters.value.search}%,descripcion_corta.ilike.%${filters.value.search}%`)
            }

            Object.entries(filters.value.datos_dinamicos).forEach(([key, value]) => {
                if (value) {
                    query = query.eq(`datos_dinamicos->>${key}`, value)
                }
            })

            query = query.order(sortBy.value, { ascending: sortOrder.value === 'asc' })

            const from = (currentPage.value - 1) * pageSize.value
            const to = from + pageSize.value - 1
            query = query.range(from, to)

            const { data, error: err, count } = await query

            if (err) throw err

            productos.value = data || []
            totalCount.value = count || 0


        } catch (err) {
            error.value = err.message
            console.error('Error fetching productos:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchProductoById = async (id, options = {}) => {
        try {
            loading.value = true
            error.value = null

            const supabase = useSupabaseClient()
            const { data, error: err } = await supabase
                .from('productos')
                .select(`
                    *,
                    categorias(id, nombre, icon),
                    subcategorias(id, nombre)
                `)
                .eq('id', id)
                .single()

            if (err) throw err

            currentProduct.value = data

            if (options.includeImages || options.includeAll) {
                await fetchProductosImagenes([id])
            }

            return data
        } catch (err) {
            error.value = err.message
            console.error('Error fetching producto:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchProductosImagenes = async (productoIds = null) => {
        try {
            const supabase = useSupabaseClient()
            let query = supabase
                .from('producto_imagenes')
                .select('*')
                .order('orden')

            if (productoIds && productoIds.length > 0) {
                query = query.in('producto_id', productoIds)
            }

            const { data, error: err } = await query

            if (err) throw err

            if (productoIds && productoIds.length > 0) {
                productosImagenes.value = productosImagenes.value.filter(
                    img => !productoIds.includes(img.producto_id)
                )
                productosImagenes.value.push(...(data || []))
            } else {
                productosImagenes.value = data || []
            }

        } catch (err) {
            error.value = err.message
            console.error('Error fetching productos imagenes:', err)
        }
    }


    const createProducto = async (productoData) => {
        try {
            loading.value = true
            error.value = null

            const supabase = useSupabaseClient()
            const { data, error: err } = await supabase
                .from('productos')
                .insert(productoData)
                .select()
                .single()

            if (err) throw err

            return data
        } catch (err) {
            error.value = err.message
            console.error('Error creating producto:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateProducto = async (id, productoData) => {
        try {
            loading.value = true
            error.value = null

            const supabase = useSupabaseClient()
            const { data, error: err } = await supabase
                .from('productos')
                .update(productoData)
                .eq('id', id)
                .select()
                .single()

            if (err) throw err

            const index = productos.value.findIndex(p => p.id === id)
            if (index !== -1) {
                productos.value[index] = { ...productos.value[index], ...data }
            }

            if (currentProduct.value?.id === id) {
                currentProduct.value = { ...currentProduct.value, ...data }
            }

            return data
        } catch (err) {
            error.value = err.message
            console.error('Error updating producto:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteProducto = async (id) => {
        try {
            loading.value = true
            error.value = null

            const supabase = useSupabaseClient()

            const imagenesDelProducto = productosImagenes.value.filter(img => img.producto_id === id)

            const { deleteProductoImagen } = useStorage()
            for (const imagen of imagenesDelProducto) {
                try {
                    await deleteProductoImagen(imagen.storage_path)
                } catch (storageError) {
                    console.warn(`Error deleting image ${imagen.storage_path}:`, storageError)
                }
            }

            const { error: imagenesError } = await supabase
                .from('producto_imagenes')
                .delete()
                .eq('producto_id', id)

            if (imagenesError) {
                console.warn('Error deleting image records:', imagenesError)
            }

            const { error: err } = await supabase
                .from('productos')
                .delete()
                .eq('id', id)

            if (err) throw err

            productos.value = productos.value.filter(p => p.id !== id)
            productosImagenes.value = productosImagenes.value.filter(img => img.producto_id !== id)

            if (currentProduct.value?.id === id) {
                currentProduct.value = null
            }

        } catch (err) {
            error.value = err.message
            console.error('Error deleting producto:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const setFilter = (key, value) => {
        filters.value[key] = value
        currentPage.value = 1
    }

    const setDynamicFilter = (key, value) => {
        if (value === null || value === '') {
            delete filters.value.datos_dinamicos[key]
        } else {
            filters.value.datos_dinamicos[key] = value
        }
        currentPage.value = 1
    }

    const clearFilters = () => {
        filters.value = {
            categoria_id: null,
            subcategoria_ids: [],
            condicion: [],
            marca: [],
            moneda: [],
            en_oferta: false,
            precio_min: null,
            precio_max: null,
            search: '',
            datos_dinamicos: {}
        }
        currentPage.value = 1
    }

    const setSorting = (field, order = 'desc') => {
        sortBy.value = field
        sortOrder.value = order
        currentPage.value = 1
    }

    const setPage = (page) => {
        currentPage.value = page
    }

    const getImageUrl = (storagePath) => {
        if (!storagePath) return null
        const config = useRuntimeConfig()
        return `${config.public.supabase.url}/storage/v1/object/public/productos-imagenes/${storagePath}`
    }

    const addSubcategoriaFilter = (subcategoriaId) => {
        if (!filters.value.subcategoria_ids.includes(subcategoriaId)) {
            filters.value.subcategoria_ids.push(subcategoriaId)
            currentPage.value = 1
        }
    }

    const removeSubcategoriaFilter = (subcategoriaId) => {
        const index = filters.value.subcategoria_ids.indexOf(subcategoriaId)
        if (index > -1) {
            filters.value.subcategoria_ids.splice(index, 1)
            currentPage.value = 1
        }
    }

    const setSubcategoriasFilter = (subcategoriaIds) => {
        filters.value.subcategoria_ids = subcategoriaIds || []
        currentPage.value = 1
    }

    const fetchOfertas = async (limit = 8) => {
        try {
            loading.value = true
            error.value = null

            const supabase = useSupabaseClient()
            const { data, error: err } = await supabase
                .from('productos')
                .select(`
                    *,
                    categorias(id, nombre, icon),
                    producto_imagenes(storage_path, es_principal)
                `)
                .eq('destacado', true)
                .eq('activo', true)
                .order('created_at', { ascending: false })
                .limit(limit)

            if (err) throw err
            ofertas.value = data || []
        } catch (err) {
            error.value = err.message
            console.error('Error fetching ofertas:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        productos,
        ofertas,
        productosImagenes,
        loading,
        error,
        currentProduct,
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        filters,
        sortBy,
        sortOrder,

        getProductoById,
        getProductosByCategoria,
        getImagenesByProducto,
        getCurrencySymbol,

        fetchProductos,
        fetchProductoById,
        fetchProductosImagenes,
        fetchOfertas,
        createProducto,
        updateProducto,
        deleteProducto,

        setFilter,
        setDynamicFilter,
        clearFilters,
        setSorting,
        setPage,
        addSubcategoriaFilter,
        removeSubcategoriaFilter,
        setSubcategoriasFilter,

        getImageUrl
    }
})
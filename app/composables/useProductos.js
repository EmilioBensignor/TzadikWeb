import { useProductosStore } from '~/stores/productos'

export const useProductos = () => {
  const productosStore = useProductosStore()

  const productos = computed(() => productosStore.productos)
  const ofertas = computed(() => productosStore.ofertas)
  const currentProduct = computed(() => productosStore.currentProduct)
  const loading = computed(() => productosStore.loading)
  const error = computed(() => productosStore.error)
  const totalPages = computed(() => productosStore.totalPages)
  const currentPage = computed(() => productosStore.currentPage)
  const totalCount = computed(() => productosStore.totalCount)
  const filters = computed(() => productosStore.filters)
  // Getters
  const getProductoById = (id) => productosStore.getProductoById(id)
  const getProductosByCategoria = (categoriaId) => productosStore.getProductosByCategoria(categoriaId)
  const getImagenesByProducto = (productoId) => productosStore.getImagenesByProducto(productoId)
  const getCurrencySymbol = (producto) => productosStore.getCurrencySymbol(producto)

  // Función para buscar productos con filtros avanzados
  const searchProductos = async (searchParams = {}) => {
    // Resetear filtros
    productosStore.clearFilters()

    // Aplicar nuevos filtros
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key === 'datos_dinamicos') {
        Object.entries(value).forEach(([campo, valor]) => {
          productosStore.setDynamicFilter(campo, valor)
        })
      } else {
        productosStore.setFilter(key, value)
      }
    })

    // Ejecutar búsqueda
    await productosStore.fetchProductos({ includeImages: true })
  }

  // Función para obtener productos populares/destacados
  const getFeaturedProductos = async (limit = 8) => {
    try {
      const { data, error } = await useSupabaseClient()
        .from('productos')
        .select(`
          *,
          categorias(id, nombre, icon),
          producto_imagenes!inner(storage_path, es_principal)
        `)
        .eq('producto_imagenes.es_principal', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching featured productos:', error)
      return []
    }
  }

  // Función para obtener productos relacionados
  const getRelatedProductos = async (productoId, categoriaId, limit = 4) => {
    try {
      const { data, error } = await useSupabaseClient()
        .from('productos')
        .select(`
          *,
          producto_imagenes!inner(storage_path, es_principal)
        `)
        .eq('categoria_id', categoriaId)
        .neq('id', productoId)
        .eq('producto_imagenes.es_principal', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Error fetching related productos:', error)
      return []
    }
  }

  // Función para formatear datos dinámicos para mostrar
  const formatDynamicData = (producto, campos) => {
    if (!producto.datos_dinamicos || !campos) return {}

    const formatted = {}

    campos.forEach(campo => {
      const value = producto.datos_dinamicos[campo.nombre_campo]
      if (value !== undefined && value !== null && value !== '') {
        // Formateo básico sin dependencia externa
        let formattedValue = value

        switch (campo.tipo) {
          case 'currency':
            formattedValue = new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(value)
            break
          case 'number':
            formattedValue = new Intl.NumberFormat('es-CO').format(value)
            break
          case 'date':
            formattedValue = new Date(value).toLocaleDateString('es-CO')
            break
          case 'boolean':
            formattedValue = value ? 'Sí' : 'No'
            break
          default:
            formattedValue = value
        }

        formatted[campo.label] = formattedValue
      }
    })

    return formatted
  }

  // Función para generar slug básico
  const generateSlug = (titulo) => {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
      .replace(/\s+/g, '-') // Espacios a guiones
      .replace(/-+/g, '-') // Múltiples guiones a uno
      .trim('-') // Remover guiones al inicio/final
  }

  // Función para generar slug único verificando duplicados
  const generateUniqueSlug = async (titulo, excludeId = null) => {
    const baseSlug = generateSlug(titulo)
    let slug = baseSlug
    let counter = 1

    while (true) {
      try {
        let query = useSupabaseClient()
          .from('productos')
          .select('id')
          .eq('slug', slug)

        if (excludeId) {
          query = query.neq('id', excludeId)
        }

        const { data } = await query

        if (!data || data.length === 0) {
          return slug
        }

        slug = `${baseSlug}-${counter}`
        counter++
      } catch (error) {
        console.error('Error checking slug uniqueness:', error)
        return `${baseSlug}-${Date.now()}`
      }
    }
  }


  return {
    // Estado reactivo
    productos,
    ofertas,
    currentProduct,
    loading,
    error,
    totalPages,
    currentPage,
    totalCount,
    filters,

    // Getters
    getProductoById,
    getProductosByCategoria,
    getImagenesByProducto,
    getCurrencySymbol,

    // Search & filtering
    searchProductos,
    setFilter: productosStore.setFilter,
    setDynamicFilter: productosStore.setDynamicFilter,
    clearFilters: productosStore.clearFilters,
    setSorting: productosStore.setSorting,
    setPage: productosStore.setPage,

    // Data fetching
    fetchProductos: productosStore.fetchProductos,
    fetchProductoById: productosStore.fetchProductoById,
    fetchOfertas: productosStore.fetchOfertas,
    getFeaturedProductos,
    getRelatedProductos,

    // Utilities
    formatDynamicData,
    generateSlug,
    generateUniqueSlug,
    getImageUrl: productosStore.getImageUrl
  }
}
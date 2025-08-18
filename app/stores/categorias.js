import { defineStore } from 'pinia'

export const useCategoriasStore = defineStore('categorias', () => {
  // Estado
  const categorias = ref([])
  const subcategorias = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const getCategoriaById = computed(() => (id) => {
    return categorias.value.find(cat => cat.id === id)
  })

  // Actions
  const fetchCategorias = async () => {
    try {
      loading.value = true
      error.value = null

      const supabase = useSupabaseClient()
      const { data, error: err } = await supabase
        .from('categorias')
        .select('*')
        .order('id')

      if (err) throw err
      categorias.value = data || []
    } catch (err) {
      error.value = err.message
      console.error('Error fetching categorias:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchSubcategorias = async (categoriaId = null) => {
    try {
      loading.value = true
      error.value = null

      const supabase = useSupabaseClient()
      let query = supabase
        .from('subcategorias')
        .select('*')
        .order('nombre')

      if (categoriaId) {
        query = query.eq('categoria_id', categoriaId)
      }

      const { data, error: err } = await query

      if (err) throw err

      if (categoriaId) {
        // Si estamos cargando subcategorías de una categoría específica,
        // reemplazar solo las de esa categoría
        const otherSubs = subcategorias.value.filter(sub => sub.categoria_id !== categoriaId)
        subcategorias.value = [...otherSubs, ...(data || [])]
      } else {
        // Si estamos cargando todas, reemplazar completamente
        subcategorias.value = data || []
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching subcategorias:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    // Estado
    categorias,
    subcategorias,
    loading,
    error,

    // Getters
    getCategoriaById,

    // Actions
    fetchCategorias,
    fetchSubcategorias
  }
})
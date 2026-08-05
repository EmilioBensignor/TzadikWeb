import { defineStore } from 'pinia'

export const useMarcasStore = defineStore('marcas', () => {
  const marcas = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getMarcaBySlug = computed(() => (slug) => {
    return marcas.value.find(marca => marca.slug === slug)
  })

  const marcasDestacadas = computed(() => {
    return marcas.value.filter(marca => marca.destacada)
  })

  const fetchMarcas = async () => {
    if (marcas.value.length > 0) return

    try {
      loading.value = true
      error.value = null

      const supabase = useSupabaseClient()
      const { data, error: err } = await supabase
        .from('marcas')
        .select('*')
        .eq('activa', true)
        .order('orden')

      if (err) throw err
      marcas.value = data || []
    } catch (err) {
      error.value = err.message
      console.error('Error fetching marcas:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    marcas,
    loading,
    error,
    getMarcaBySlug,
    marcasDestacadas,
    fetchMarcas
  }
})

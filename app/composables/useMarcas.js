import { computed } from 'vue'
import { useMarcasStore } from '~/stores/marcas'

export const useMarcas = () => {
  const marcasStore = useMarcasStore()

  const marcas = computed(() => marcasStore.marcas)
  const marcasDestacadas = computed(() => marcasStore.marcasDestacadas)
  const loading = computed(() => marcasStore.loading)
  const error = computed(() => marcasStore.error)

  const getMarcaBySlug = (slug) => marcasStore.getMarcaBySlug(slug)

  const getMarcasOrdenadas = (slugActual) => {
    const lista = marcasStore.marcasDestacadas
    const index = lista.findIndex(m => m.slug === slugActual)

    if (index === -1) return lista

    return [
      lista[index],
      ...lista.slice(0, index),
      ...lista.slice(index + 1)
    ]
  }

  return {
    marcas,
    marcasDestacadas,
    loading,
    error,
    getMarcaBySlug,
    getMarcasOrdenadas,
    fetchMarcas: marcasStore.fetchMarcas
  }
}

export const useOgMeta = () => {
  const { $setOgMeta } = useNuxtApp()

  const setPageMeta = (options) => {
    $setOgMeta(options)
  }

  return {
    setPageMeta
  }
}

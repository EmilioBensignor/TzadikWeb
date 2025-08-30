import { useReviewsStore } from '~/stores/reviews'

export const useReviews = () => {
  const reviewsStore = useReviewsStore()
  
  const reviews = computed(() => reviewsStore.reviews)
  const currentReview = computed(() => reviewsStore.currentReview)
  const loading = computed(() => reviewsStore.loading)
  const error = computed(() => reviewsStore.error)

  const getReviewById = (id) => reviewsStore.getReviewById(id)


  const getReviewImage = (imageUrl) => {
    if (!imageUrl) return null
    
    try {
      const config = useRuntimeConfig()
      return `${config.public.supabase.url}/storage/v1/object/public/reviews-imagenes/${imageUrl}`
    } catch (error) {
      console.error('Error getting review image:', error)
      return null
    }
  }






  return {
    reviews,
    currentReview,
    loading,
    error,
    getReviewById,
    getReviewImage,
    fetchReviews: reviewsStore.fetchReviews,
    fetchReviewById: reviewsStore.fetchReviewById
  }
}
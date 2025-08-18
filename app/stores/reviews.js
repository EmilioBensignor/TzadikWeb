import { defineStore } from 'pinia'

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: [],
    currentReview: null,
    loading: false,
    error: null
  }),

  getters: {
    getReviewById: (state) => (id) => {
      return state.reviews.find(review => review.id === id)
    }
  },

  actions: {
    async fetchReviews(limit = 10) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useSupabaseClient()
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit)

        if (error) throw error

        this.reviews = data || []

      } catch (error) {
        console.error('Error fetching reviews:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchReviewById(id) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await useSupabaseClient()
          .from('reviews')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        this.currentReview = data
        return data

      } catch (error) {
        console.error('Error fetching review:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
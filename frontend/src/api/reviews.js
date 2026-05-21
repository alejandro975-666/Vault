import api from './axios'

export const getReviews = (gameId) => api.get(`/games/${gameId}/reviews`)

export const createReview = (gameId, data) => api.post(`/games/${gameId}/reviews`, data)

export const deleteReview = (id) => api.delete(`/reviews/${id}`)

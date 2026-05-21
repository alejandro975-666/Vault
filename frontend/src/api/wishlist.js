import api from './axios'

export const getWishlist = () => api.get('/wishlist')

export const addToWishlist = (gameId) => api.post(`/wishlist/${gameId}`)

export const removeFromWishlist = (gameId) => api.delete(`/wishlist/${gameId}`)
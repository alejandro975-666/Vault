import api from './axios'

export const purchaseGame = (gameId) => api.post('/purchases', { game_id: gameId })

export const getLibrary = () => api.get('/library')

export const getPurchases = () => api.get('/purchases')
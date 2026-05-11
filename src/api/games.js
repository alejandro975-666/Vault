import api from './axios'

export const getGames = (params) => api.get('/games', { params })

export const getGame = (id) => api.get(`/games/${id}`)

export const createGame = (data) => api.post('/games', data)

export const updateGame = (id, data) => api.put(`/games/${id}`, data)

export const deleteGame = (id) => api.delete(`/games/${id}`)

export const searchGames = (data) => api.post('/search', data)

export const getCategories = () => api.get('/categories')
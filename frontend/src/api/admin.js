import api from './axios'

// ─── Usuarios ──────────────────────────────────────────
export const getUsers      = ()         => api.get('/admin/users')
export const toggleUser    = (id, data) => api.put(`/admin/users/${id}`, data)
export const getAdminStats = ()         => api.get('/admin/stats')

// ─── Juegos (admin) ────────────────────────────────────
export const createGame = (data) => api.post('/admin/games', data)
export const updateGame = (id, data) => api.put(`/admin/games/${id}`, data)
export const deleteGame = (id) => api.delete(`/admin/games/${id}`)

// ─── Categorías ────────────────────────────────────────
export const createCategory = (data) => api.post('/admin/categories', data)
export const deleteCategory = (id)   => api.delete(`/admin/categories/${id}`)

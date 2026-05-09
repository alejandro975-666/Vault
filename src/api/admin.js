import api from './axios'

export const getUsers = () => api.get('/admin/users')

export const toggleUser = (id, data) => api.put(`/admin/users/${id}`, data)

export const createCategory = (data) => api.post('/categories', data)

export const deleteCategory = (id) => api.delete(`/categories/${id}`)
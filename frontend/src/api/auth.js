import api from './axios'
 
export const register = (data) => api.post('/register', data)
 
export const login = (data) => api.post('/login', data)
 
export const logout = () => api.post('/logout')
 
export const updateProfile = (data) => api.put('/profile', data)
 
export const changePassword = (data) => api.put('/password', data)
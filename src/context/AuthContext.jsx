import React, { createContext, useState, useEffect, useCallback } from 'react'
import { login as loginApi, logout as logoutApi } from '../api/auth'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    /*useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) setUser(JSON.parse(storedUser))
        setLoading(false)
    }, [])*/

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        } else {
            // Usuario mock temporal para desarrollo
            const mockUser = { id: 1, name: 'Alejandro', email: 'alejandro@vault.com', role: 'admin' }
            setUser(mockUser)
            setToken('mock-token')
            localStorage.setItem('user', JSON.stringify(mockUser))
            localStorage.setItem('token', 'mock-token')
        }
        setLoading(false)
    }, [])

    const login = useCallback(async (credentials) => {
        try {
            setError(null)
            const res = await loginApi(credentials)
            const { user, token } = res.data
            setUser(user)
            setToken(token)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (err) {
            setError(err.message)
            throw err
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            setError(null)
            await logoutApi()
            setUser(null)
            setToken(null)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } catch (err) {
            setError(err.message)
            throw err
        }
    }, [])

    const isAdmin = () => user?.role === 'admin'

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin, loading, error }}>
            {children}
        </AuthContext.Provider>
    )
}
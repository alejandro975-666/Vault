import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
        const user = await login({ email, password })
        if (user.role === 'admin') {
            navigate('/admin')
        } else {
            navigate('/')
        }
        } catch (err) {
        setError('Credenciales incorrectas. Acceso denegado.')
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-vault-black flex items-center justify-center px-4 font-mono">

        <div className="w-full max-w-md">

            <div className="text-center mb-10">
            <p className="text-vault-muted text-sm tracking-widest uppercase mb-2">Bienvenido a</p>
            <Link to="/" className="text-5xl font-bold text-vault-green tracking-wider">VAULT</Link>
            <p className="text-vault-hint text-xs tracking-widest mt-2 uppercase">Acceso restringido — identifícate</p>
            </div>

            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-8">

            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-vault-green animate-pulse"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Terminal activo</span>
            </div>

            {error && (
                <div className="border border-vault-error/40 bg-vault-error/10 text-vault-error rounded px-4 py-3 mb-6 text-sm">
                ⚠ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                <label className="block text-vault-muted text-xs tracking-widest uppercase mb-2">
                    Identificador
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@vault.com"
                    required
                    className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-3 text-vault-text placeholder-vault-hint text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                />
                </div>

                <div>
                <label className="block text-vault-muted text-xs tracking-widest uppercase mb-2">
                    Contraseña
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-3 text-vault-text placeholder-vault-hint text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full bg-vault-green hover:bg-vault-green-hover disabled:opacity-40 text-vault-black font-bold py-3 rounded tracking-widest uppercase text-sm transition-colors"
                >
                {loading ? 'Verificando...' : 'Acceder al Vault'}
                </button>
            </form>

            <p className="text-center text-vault-hint text-xs mt-6 tracking-wide">
                ¿No tienes acceso?{' '}
                <Link to="/register" className="text-vault-green hover:text-vault-green-hover transition-colors">
                Solicitar entrada
                </Link>
            </p>

            </div>

            <p className="text-center text-vault-hint text-xs mt-6 tracking-widest">
            VAULT-GAMES INDUSTRIES © 2026 
            </p>

        </div>
        </div>
    )
}
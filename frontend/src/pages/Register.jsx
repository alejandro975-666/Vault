import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (password !== passwordConfirm) {
        setError('Las contraseñas no coinciden.')
        return
        }

        setLoading(true)
        try {
        await register({ name, email, password, password_confirmation: passwordConfirm })
        navigate('/login')
        } catch (err) {
        setError('Error al crear la cuenta. Inténtalo de nuevo.')
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-vault-black flex items-center justify-center px-4 font-mono">

        <div className="w-full max-w-md">

            <div className="text-center mb-10">
            <p className="text-vault-muted text-sm tracking-widest uppercase mb-2">Solicitud de acceso</p>
            <Link to="/" className="text-5xl font-bold text-vault-green tracking-wider">VAULT</Link>
            <p className="text-vault-hint text-xs tracking-widest mt-2 uppercase">Registro de nuevo residente</p>
            </div>

            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-8">

            <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-vault-warning animate-pulse"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Formulario de admisión</span>
            </div>

            {error && (
                <div className="border border-vault-error/40 bg-vault-error/10 text-vault-error rounded px-4 py-3 mb-6 text-sm">
                ⚠ {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                <label className="block text-vault-muted text-xs tracking-widest uppercase mb-2">
                    Nombre
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                    className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-3 text-vault-text placeholder-vault-hint text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                />
                </div>

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

                <div>
                <label className="block text-vault-muted text-xs tracking-widest uppercase mb-2">
                    Confirmar contraseña
                </label>
                <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
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
                {loading ? 'Procesando...' : 'Solicitar entrada'}
                </button>
            </form>

            <p className="text-center text-vault-hint text-xs mt-6 tracking-wide">
                ¿Ya tienes acceso?{' '}
                <Link to="/login" className="text-vault-green hover:text-vault-green-hover transition-colors">
                Iniciar sesión
                </Link>
            </p>

            </div>

            <p className="text-center text-vault-hint text-xs mt-6 tracking-widest">
            VAULT-TEC INDUSTRIES © 2077
            </p>

        </div>
        </div>
    )
}
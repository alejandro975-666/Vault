import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <nav className="bg-vault-dark border-b border-vault-green-dark font-mono">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

            <div className="flex items-center gap-8">
            <Link to="/" className="text-vault-green font-bold text-xl tracking-widest hover:text-vault-green-hover transition-colors">
                VAULT
            </Link>
            <div className="hidden md:flex items-center gap-6">
                {user && (
                <Link to="/feed" className="text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors">
                    Mi feed
                </Link>
                )}
                {isAdmin && isAdmin() && (
                <Link to="/admin" className="text-vault-warning hover:text-yellow-300 text-xs tracking-widest uppercase transition-colors">
                    Admin
                </Link>
                )}
            </div>
            </div>

            <div className="flex items-center gap-4">
            {user ? (
                <>
                <Link to="/profile" className="text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors">
                    {user.name}
                </Link>
                <button
                    onClick={handleLogout}
                    className="border border-vault-green-dark hover:border-vault-error text-vault-muted hover:text-vault-error text-xs tracking-widest uppercase px-4 py-1.5 rounded transition-colors"
                >
                    Salir
                </button>
                </>
            ) : (
                <>
                <Link to="/login" className="text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors">
                    Acceder
                </Link>
                <Link
                    to="/register"
                    className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-4 py-1.5 rounded transition-colors"
                >
                    Registrarse
                </Link>
                </>
            )}
            </div>

        </div>
        </nav>
    )
}
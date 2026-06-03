import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-vault-dark border-b border-vault-green-dark font-mono">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Izquierda — Logo y links */}
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

        {/* Derecha — Carrito y usuario */}
        <div className="flex items-center gap-4">

          {/* Icono carrito */}
          <Link to="/cart" className="relative text-vault-muted hover:text-vault-green transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-vault-green text-vault-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cart.length}
              </span>
            )}
          </Link>

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
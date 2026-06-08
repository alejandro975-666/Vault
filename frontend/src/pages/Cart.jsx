import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckout = () => {
    if (!token) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-vault-hint text-xs tracking-widest mb-2">
              <Link to="/" className="hover:text-vault-green transition-colors">Catálogo</Link>
              <span className="mx-2">›</span>
              <span className="text-vault-muted">Carrito</span>
            </div>
            <h1 className="text-vault-green text-2xl font-bold tracking-widest uppercase">Carrito</h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-vault-hint hover:text-vault-error text-xs tracking-widest uppercase transition-colors"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-vault-hint text-4xl mb-4">🛒</p>
            <p className="text-vault-text text-sm font-bold mb-2">Tu carrito está vacío</p>
            <p className="text-vault-hint text-xs mb-8 tracking-wide">Añade juegos desde el catálogo</p>
            <Link to="/" className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-3 rounded transition-colors">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="flex gap-8 flex-col lg:flex-row">

            {/* Lista de juegos */}
            <div className="flex-1 flex flex-col gap-3">
              {cart.map((game) => (
                <div key={game.id} className="bg-vault-dark border border-vault-green-dark rounded-lg p-4 flex items-center gap-4 hover:border-vault-green transition-colors">
                  {/* Imagen */}
                  <div className="w-16 h-16 bg-vault-card rounded border border-vault-green-dark flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {game.image_url
                      ? <img src={game.image_url} alt={game.title} className="w-full h-full object-cover" />
                      : <span className="text-vault-hint text-xl font-bold">V</span>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-vault-text text-sm font-bold truncate mb-1">{game.title}</p>
                    <div className="flex items-center gap-2">
                      {game.platform && (
                        <span className="text-vault-hint text-xs">{game.platform}</span>
                      )}
                      {game.categories?.[0] && (
                        <span className="text-vault-hint text-xs">· {game.categories[0].name}</span>
                      )}
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="text-right flex-shrink-0">
                    {game.discount > 0 && (
                      <p className="text-vault-hint text-xs line-through">
                        {parseFloat(game.original_price).toFixed(2)}€
                      </p>
                    )}
                    <p className="text-vault-green font-bold text-sm">
                      {parseFloat(game.discount_price || game.price).toFixed(2)}€
                    </p>
                    {game.discount > 0 && (
                      <span className="text-vault-green text-xs">-{game.discount}%</span>
                    )}
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(game.id)}
                    className="text-vault-hint hover:text-vault-error transition-colors text-lg flex-shrink-0 ml-2"
                    title="Eliminar del carrito"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Panel de pago */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 sticky top-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                  <span className="text-vault-muted text-xs tracking-widest uppercase">Resumen del pedido</span>
                </div>

                {/* Desglose */}
                <div className="flex flex-col gap-2 mb-4 border-b border-vault-green-dark pb-4">
                  {cart.map((game) => (
                    <div key={game.id} className="flex justify-between">
                      <span className="text-vault-muted text-xs truncate flex-1 mr-2">{game.title}</span>
                      <span className="text-vault-text text-xs font-bold flex-shrink-0">
                        {parseFloat(game.discount_price || game.price).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ahorro total */}
                {cart.some((g) => g.discount > 0) && (
                  <div className="flex justify-between mb-2">
                    <span className="text-vault-hint text-xs">Precio original</span>
                    <span className="text-vault-hint text-xs line-through">
                      {cart.reduce((acc, g) => acc + parseFloat(g.original_price || g.price), 0).toFixed(2)}€
                    </span>
                  </div>
                )}
                {cart.some((g) => g.discount > 0) && (
                  <div className="flex justify-between mb-4">
                    <span className="text-vault-green text-xs">Ahorro total</span>
                    <span className="text-vault-green text-xs font-bold">
                      -{(cart.reduce((acc, g) => acc + parseFloat(g.original_price || g.price), 0) - total).toFixed(2)}€
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center mb-6 pt-2 border-t border-vault-green-dark">
                  <span className="text-vault-text text-sm font-bold">TOTAL</span>
                  <span className="text-vault-green text-xl font-bold">{total.toFixed(2)}€</span>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-vault-error/10 border border-vault-error/30 rounded p-3 mb-4">
                    <p className="text-vault-error text-xs">{error}</p>
                  </div>
                )}

                {/* Botón ir a pagar */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-vault-green hover:bg-vault-green-hover disabled:opacity-50 text-vault-black font-bold text-xs tracking-widest uppercase py-3 rounded transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Spinner size="sm" text="" /> : '→ Ir a pagar'}
                </button>

                {!token && (
                  <p className="text-vault-hint text-xs text-center mt-3 tracking-wide">
                    Necesitas{' '}
                    <Link to="/login" className="text-vault-green hover:underline">iniciar sesión</Link>
                    {' '}para completar la compra
                  </p>
                )}

                <Link to="/" className="block text-center text-vault-hint hover:text-vault-muted text-xs tracking-widest uppercase mt-4 transition-colors">
                  ← Seguir comprando
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
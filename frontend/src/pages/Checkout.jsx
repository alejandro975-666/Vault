import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'
import api from '../api/axios'

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: datos, 2: confirmación
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    cardName:   '',
    cardNumber: '',
    expiry:     '',
    cvv:        '',
  })

  // Formatear número de tarjeta con espacios cada 4 dígitos
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  // Formatear fecha de expiración MM/YY
  const formatExpiry = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 4)
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
    return clean
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'cardNumber') {
      setForm((f) => ({ ...f, cardNumber: formatCardNumber(value) }))
    } else if (name === 'expiry') {
      setForm((f) => ({ ...f, expiry: formatExpiry(value) }))
    } else if (name === 'cvv') {
      setForm((f) => ({ ...f, cvv: value.replace(/\D/g, '').slice(0, 3) }))
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cart.length === 0) return
    setLoading(true)
    setError(null)
    try {
      await api.post('/cart/checkout', {
        game_ids: cart.map((g) => g.id)
      })
      clearCart()
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar el pago. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Pantalla de confirmación
  if (step === 2) {
    return (
      <div className="bg-vault-black min-h-screen font-mono flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div
            className="text-vault-green text-7xl mb-6"
            style={{ filter: 'drop-shadow(0 0 20px #39ff14)' }}
          >
            ✓
          </div>
          <h1 className="text-vault-green text-2xl font-bold tracking-widest mb-3 uppercase">
            ¡Pago completado!
          </h1>
          <p className="text-vault-muted text-sm mb-2 tracking-wide">
            Tu compra ha sido procesada correctamente.
          </p>
          <p className="text-vault-hint text-xs mb-8 tracking-wide">
            Tus claves de activación ya están disponibles en tu biblioteca.
          </p>
          <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-4 mb-8 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
              <span className="text-vault-muted text-xs tracking-widest uppercase">Resumen</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-vault-hint text-xs">Método de pago</span>
              <span className="text-vault-muted text-xs">
                •••• {form.cardNumber.replace(/\s/g, '').slice(-4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-vault-hint text-xs">Total pagado</span>
              <span className="text-vault-green font-bold text-sm">{total.toFixed(2)}€</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              to="/profile"
              className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-3 rounded transition-colors"
            >
              Ver mis claves
            </Link>
            <Link
              to="/"
              className="border border-vault-green-dark hover:border-vault-green text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase px-6 py-3 rounded transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="text-vault-hint text-xs tracking-widest mb-2">
            <Link to="/" className="hover:text-vault-green transition-colors">Catálogo</Link>
            <span className="mx-2">›</span>
            <Link to="/cart" className="hover:text-vault-green transition-colors">Carrito</Link>
            <span className="mx-2">›</span>
            <span className="text-vault-muted">Pago</span>
          </div>
          <h1 className="text-vault-green text-2xl font-bold tracking-widest uppercase">Finalizar compra</h1>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">

          {/* Formulario de pago */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Datos de la tarjeta */}
              <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                  <span className="text-vault-muted text-xs tracking-widest uppercase">Datos de la tarjeta</span>
                </div>

                {/* Preview de la tarjeta */}
                <div
                  className="w-full h-44 rounded-xl mb-6 p-6 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1a2a1a 0%, #0a1a0a 50%, #1a3a1a 100%)',
                    border: '1px solid #39ff14',
                    boxShadow: '0 0 20px rgba(57,255,20,0.1)',
                  }}
                >
                  {/* Chip */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-7 bg-vault-warning rounded-sm opacity-80 flex items-center justify-center">
                      <div className="w-8 h-5 border border-yellow-600 rounded-sm grid grid-cols-2 gap-0">
                        <div className="border-r border-yellow-600"></div>
                        <div></div>
                      </div>
                    </div>
                    <span className="text-vault-green text-xs font-bold tracking-widest">VAULT PAY</span>
                  </div>

                  {/* Número */}
                  <div className="text-vault-text text-lg font-bold tracking-widest">
                    {form.cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  {/* Titular y fecha */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-vault-hint text-xs tracking-widest uppercase mb-1">Titular</p>
                      <p className="text-vault-text text-sm font-bold tracking-widest uppercase">
                        {form.cardName || 'NOMBRE APELLIDOS'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-vault-hint text-xs tracking-widest uppercase mb-1">Válida hasta</p>
                      <p className="text-vault-text text-sm font-bold tracking-widest">
                        {form.expiry || 'MM/YY'}
                      </p>
                    </div>
                  </div>

                  {/* Decoración */}
                  <div
                    className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
                    style={{ background: '#39ff14' }}
                  ></div>
                  <div
                    className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-5"
                    style={{ background: '#39ff14' }}
                  ></div>
                </div>

                {/* Campos del formulario */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">
                      Nombre del titular
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleChange}
                      placeholder="Como aparece en la tarjeta"
                      required
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono placeholder-vault-hint"
                    />
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono placeholder-vault-hint tracking-widest"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">
                        Fecha de expiración
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono placeholder-vault-hint"
                      />
                    </div>
                    <div>
                      <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="•••"
                        required
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono placeholder-vault-hint"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Aviso de seguridad */}
              <div className="flex items-center gap-3 px-4 py-3 bg-vault-dark border border-vault-green-dark rounded-lg">
                <span className="text-vault-green text-lg">🔒</span>
                <p className="text-vault-hint text-xs tracking-wide">
                  Pago seguro simulado. En un entorno real los datos se cifrarían con TLS y se procesarían mediante Stripe.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-vault-error/10 border border-vault-error/30 rounded p-3">
                  <p className="text-vault-error text-xs">{error}</p>
                </div>
              )}

              {/* Botón de pago */}
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-vault-green hover:bg-vault-green-hover disabled:opacity-50 text-vault-black font-bold tracking-widest uppercase py-4 rounded transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {loading
                  ? <Spinner size="sm" text="" />
                  : `🔒 Pagar ${total.toFixed(2)}€`
                }
              </button>

              <Link
                to="/cart"
                className="text-center text-vault-hint hover:text-vault-muted text-xs tracking-widest uppercase transition-colors"
              >
                ← Volver al carrito
              </Link>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Resumen del pedido</span>
              </div>

              <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-vault-green-dark">
                {cart.map((game) => (
                  <div key={game.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-vault-card rounded border border-vault-green-dark flex-shrink-0 overflow-hidden">
                      {game.image_url
                        ? <img src={game.image_url} alt={game.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-vault-hint text-xs font-bold">V</div>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-vault-text text-xs font-bold truncate">{game.title}</p>
                      <p className="text-vault-hint text-xs">{game.platform}</p>
                    </div>
                    <span className="text-vault-green text-xs font-bold flex-shrink-0">
                      {parseFloat(game.discount_price || game.price).toFixed(2)}€
                    </span>
                  </div>
                ))}
              </div>

              {cart.some((g) => g.discount > 0) && (
                <div className="flex justify-between mb-2">
                  <span className="text-vault-hint text-xs">Ahorro total</span>
                  <span className="text-vault-green text-xs font-bold">
                    -{(cart.reduce((acc, g) => acc + parseFloat(g.original_price || g.price), 0) - total).toFixed(2)}€
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-vault-green-dark">
                <span className="text-vault-text text-sm font-bold">TOTAL</span>
                <span className="text-vault-green text-xl font-bold">{total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
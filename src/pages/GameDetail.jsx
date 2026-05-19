import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ReviewForm from '../components/forms/ReviewForm'
import ReviewCard from '../components/ui/ReviewCard'
import Spinner from '../components/ui/Spinner'
import { getGame } from '../api/games'
import { purchaseGame } from '../api/purchases'
import { addToWishlist, removeFromWishlist, getWishlist } from '../api/wishlist'
 
export default function GameDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [purchased, setPurchased] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
 
  useEffect(() => {
    setLoading(true)
    getGame(id)
      .then((res) => setGame(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])
 
  // Comprobar si ya está en biblioteca o wishlist
  useEffect(() => {
    if (!user) return
    getWishlist()
      .then((res) => {
        const inList = res.data.some((g) => g.id === parseInt(id))
        setInWishlist(inList)
      })
      .catch(() => {})
  }, [user, id])
 
  const handlePurchase = async () => {
    if (!user) return
    setPurchasing(true)
    try {
      await purchaseGame(parseInt(id))
      setPurchased(true)
    } catch (err) {
      if (err.response?.status === 409) {
        setPurchased(true) // ya lo tenía
      }
    } finally {
      setPurchasing(false)
    }
  }
 
  const toggleWishlist = async () => {
    if (!user) return
    try {
      if (inWishlist) {
        await removeFromWishlist(game.id)
        setInWishlist(false)
      } else {
        await addToWishlist(game.id)
        setInWishlist(true)
      }
    } catch (err) {
      console.error(err)
    }
  }
 
  const handleReviewAdded = () => {
    // Recargar el juego para mostrar la nueva reseña
    getGame(id).then((res) => setGame(res.data))
  }
 
  if (loading) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center">
        <Spinner text="Cargando juego..." />
      </div>
    )
  }
 
  if (error || !game) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center font-mono">
        <div className="text-center">
          <p className="text-vault-error text-sm mb-4">⚠ No se pudo cargar el juego</p>
          <Link to="/" className="text-vault-green text-xs tracking-widest uppercase hover:text-vault-green-hover">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }
 
  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-6 py-10">
 
        {/* Breadcrumb */}
        <div className="text-vault-hint text-xs tracking-widest mb-8">
          <Link to="/" className="hover:text-vault-green transition-colors">Catálogo</Link>
          <span className="mx-2">›</span>
          <span className="text-vault-muted">{game.categories[0]?.name}</span>
          <span className="mx-2">›</span>
          <span className="text-vault-green">{game.title}</span>
        </div>
 
        <div className="flex gap-10">
 
          {/* Columna izquierda */}
          <div className="flex-1">
 
            {/* Imagen principal */}
            <div className="w-full h-72 bg-vault-dark border border-vault-green-dark rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {game.image_url ? (
                <img src={game.image_url} alt={game.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-vault-hint text-8xl font-bold">V</span>
              )}
            </div>
 
            {/* Miniaturas */}
            <div className="flex gap-3 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-14 bg-vault-dark border border-vault-green-dark rounded cursor-pointer hover:border-vault-green transition-colors flex items-center justify-center">
                  <span className="text-vault-hint text-xs">V</span>
                </div>
              ))}
            </div>
 
            {/* Descripción */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Descripción</span>
              </div>
              <p className="text-vault-text text-sm leading-relaxed">{game.description}</p>
            </div>
 
            {/* Etiquetas */}
            <div className="flex flex-wrap gap-2 mb-10">
              {game.categories.map((cat) => (
                <span key={cat.name} className="bg-vault-card border border-vault-green-dark text-vault-green text-xs px-3 py-1 rounded tracking-widest uppercase">
                  {cat.name}
                </span>
              ))}
            </div>
 
            {/* Reseñas */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Reseñas de usuarios</span>
                <span className="text-vault-hint text-xs">({game.reviews?.length || 0})</span>
              </div>
 
              <div className="flex flex-col gap-4 mb-6">
                {game.reviews?.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
                {game.reviews?.length === 0 && (
                  <p className="text-vault-hint text-xs tracking-wide">Aún no hay reseñas. ¡Sé el primero!</p>
                )}
              </div>
 
              {user && purchased && (
                <ReviewForm gameId={game.id} onReviewAdded={handleReviewAdded} />
              )}
 
              {user && !purchased && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-4 text-center">
                  <p className="text-vault-hint text-xs tracking-wide">Debes comprar el juego para escribir una reseña</p>
                </div>
              )}
 
              {!user && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-4 text-center">
                  <p className="text-vault-hint text-xs tracking-wide">
                    <Link to="/login" className="text-vault-green hover:text-vault-green-hover">Inicia sesión</Link> para escribir una reseña
                  </p>
                </div>
              )}
            </div>
          </div>
 
          {/* Columna derecha sticky */}
          <div className="w-72 min-w-72">
            <div className="sticky top-6 bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-4">
 
              <h1 className="text-vault-text text-xl font-bold tracking-wide">{game.title}</h1>
              <p className="text-vault-hint text-xs">{game.developer} · {game.release_date}</p>
 
              {/* Valoración */}
              <div className="flex items-center gap-2">
                <span className="text-vault-warning text-lg">★</span>
                <span className="text-vault-text text-sm font-bold">
                  {game.reviews_avg_rating ? parseFloat(game.reviews_avg_rating).toFixed(1) : 'Sin valorar'}
                </span>
                <span className="text-vault-hint text-xs">({game.reviews?.length || 0} reseñas)</span>
              </div>
 
              {/* Precio */}
              <div className="text-vault-green text-3xl font-bold tracking-widest border-t border-vault-green-dark pt-4">
                {parseFloat(game.price) === 0 ? 'GRATIS' : `${parseFloat(game.price).toFixed(2)}€`}
              </div>
 
              {/* Botones */}
              {purchased ? (
                <div className="bg-vault-card border border-vault-green text-vault-green text-xs text-center py-3 rounded tracking-widest uppercase">
                  ✓ En tu biblioteca
                </div>
              ) : (
                <button
                  onClick={handlePurchase}
                  disabled={purchasing || !user}
                  className="w-full bg-vault-green hover:bg-vault-green-hover disabled:opacity-40 text-vault-black font-bold py-3 rounded tracking-widest uppercase text-sm transition-colors"
                >
                  {!user ? 'Inicia sesión para comprar' : purchasing ? 'Procesando...' : 'Comprar ahora'}
                </button>
              )}
 
              {user && (
                <button
                  onClick={toggleWishlist}
                  className={`w-full py-2.5 rounded tracking-widest uppercase text-xs transition-colors border ${
                    inWishlist
                      ? 'bg-vault-green/10 border-vault-green text-vault-green'
                      : 'border-vault-green-dark text-vault-muted hover:border-vault-green hover:text-vault-green'
                  }`}
                >
                  {inWishlist ? '♥ En lista de deseos' : '♡ Añadir a deseos'}
                </button>
              )}
 
              {/* Detalles */}
              <div className="flex flex-col gap-2 border-t border-vault-green-dark pt-4">
                <div className="flex justify-between">
                  <span className="text-vault-hint text-xs">Género</span>
                  <span className="text-vault-muted text-xs">{game.categories[0]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vault-hint text-xs">Desarrollador</span>
                  <span className="text-vault-muted text-xs">{game.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vault-hint text-xs">Lanzamiento</span>
                  <span className="text-vault-muted text-xs">{game.release_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vault-hint text-xs">Idiomas</span>
                  <span className="text-vault-muted text-xs">{game.languages}</span>
                </div>
              </div>
 
            </div>
          </div>
 
        </div>
      </div>
    </div>
  )
}
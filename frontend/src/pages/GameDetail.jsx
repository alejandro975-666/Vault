import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../context/CartContext'
import ReviewForm from '../components/forms/ReviewForm'
import ReviewCard from '../components/ui/ReviewCard'
import Spinner from '../components/ui/Spinner'
import { getGame } from '../api/games'
import { getLibrary } from '../api/purchases'
import { addToWishlist, removeFromWishlist, getWishlist } from '../api/wishlist'

const getYouTubeId = (url) => {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

export default function GameDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addToCart, cart } = useCart()
  const navigate = useNavigate()

  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [purchased, setPurchased] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)
  const [activeMedia, setActiveMedia] = useState(null)

  const inCart = cart.some((g) => g.id === game?.id)

  useEffect(() => {
    setLoading(true)
    getGame(id)
      .then((res) => setGame(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!user) return
    getWishlist()
      .then((res) => setInWishlist(res.data.some((g) => g.id === id)))
      .catch(() => {})
    getLibrary()
      .then((res) => { if (res.data.some((g) => g.id === id)) setPurchased(true) })
      .catch(() => {})
  }, [user, id])

  const handlePurchase = () => {
    if (!user) return
    addToCart(game)
    navigate('/checkout')
  }

  const toggleWishlist = async () => {
    if (!user) return
    try {
      if (inWishlist) { await removeFromWishlist(game.id); setInWishlist(false) }
      else            { await addToWishlist(game.id);      setInWishlist(true)  }
    } catch (err) { console.error(err) }
  }

  const handleReviewAdded = () => getGame(id).then((res) => setGame(res.data))

  if (loading) return (
    <div className="bg-vault-black min-h-screen flex items-center justify-center">
      <Spinner text="Cargando juego..." />
    </div>
  )

  if (error || !game) return (
    <div className="bg-vault-black min-h-screen flex items-center justify-center font-mono">
      <div className="text-center">
        <p className="text-vault-error text-sm mb-4">⚠ No se pudo cargar el juego</p>
        <Link to="/" className="text-vault-green text-xs tracking-widest uppercase hover:text-vault-green-hover">← Volver al catálogo</Link>
      </div>
    </div>
  )

  const price         = game.discount_price || game.original_price
  const originalPrice = game.original_price
  const hasDiscount   = game.discount && game.discount > 0
  const youtubeId     = getYouTubeId(game.trailer_url)
  const extraImages   = Array.isArray(game.images) ? game.images.filter(Boolean) : []

  const renderMainMedia = () => {
    if (activeMedia === 'trailer' && youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={`Trailer de ${game.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      )
    }
    if (typeof activeMedia === 'number' && extraImages[activeMedia]) {
      return (
        <img
          src={extraImages[activeMedia]}
          alt={`${game.title} imagen ${activeMedia + 1}`}
          className="w-full h-full object-contain"
          style={{ background: '#0a0c0a' }}
        />
      )
    }
    if (game.image_url) {
      return (
        <img
          src={game.image_url}
          alt={game.title}
          className="w-full h-full object-contain"
          style={{ background: '#0a0c0a' }}
        />
      )
    }
    return <span className="text-vault-hint text-8xl font-bold">V</span>
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

            {/* Visor principal — formato panorámico 21:9 */}
            <div
              className="w-full bg-vault-dark border border-vault-green-dark rounded-lg mb-4 overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: '21/9', maxHeight: '420px' }}
            >
              {renderMainMedia()}
            </div>

            {/* Miniaturas */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-1">

              {/* Imagen principal */}
              <button
                onClick={() => setActiveMedia(null)}
                className={`w-24 h-16 flex-shrink-0 rounded border overflow-hidden transition-colors ${
                  activeMedia === null ? 'border-vault-green' : 'border-vault-green-dark hover:border-vault-green'
                }`}
              >
                {game.image_url
                  ? <img src={game.image_url} alt="Principal" className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-vault-dark flex items-center justify-center text-vault-hint text-xs">V</div>
                }
              </button>

              {/* Trailer */}
              {youtubeId && (
                <button
                  onClick={() => setActiveMedia('trailer')}
                  className={`w-24 h-16 flex-shrink-0 rounded border overflow-hidden relative transition-colors ${
                    activeMedia === 'trailer' ? 'border-vault-green' : 'border-vault-green-dark hover:border-vault-green'
                  }`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                    alt="Trailer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xl">▶</span>
                  </div>
                </button>
              )}

              {/* Imágenes adicionales */}
              {extraImages.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMedia(i)}
                  className={`w-24 h-16 flex-shrink-0 rounded border overflow-hidden transition-colors ${
                    activeMedia === i ? 'border-vault-green' : 'border-vault-green-dark hover:border-vault-green'
                  }`}
                >
                  <img src={url} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
                </button>
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
                {game.reviews?.map((review) => <ReviewCard key={review.id} review={review} />)}
                {game.reviews?.length === 0 && (
                  <p className="text-vault-hint text-xs tracking-wide">Aún no hay reseñas. ¡Sé el primero!</p>
                )}
              </div>
              {user && purchased && <ReviewForm gameId={game.id} onReviewAdded={handleReviewAdded} />}
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
              <div className="border-t border-vault-green-dark pt-4">
                {hasDiscount && (
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-vault-hint text-sm line-through">{parseFloat(originalPrice).toFixed(2)}€</span>
                    <span className="bg-vault-green text-vault-black text-xs font-bold px-2 py-0.5 rounded tracking-widest">-{game.discount}%</span>
                  </div>
                )}
                <span className="text-vault-green text-3xl font-bold tracking-widest">
                  {parseFloat(price) === 0 ? 'GRATIS' : `${parseFloat(price).toFixed(2)}€`}
                </span>
              </div>

              {/* Botones de acción */}
              {purchased ? (
                <div className="flex flex-col gap-2">
                  <div className="bg-vault-card border border-vault-green text-vault-green text-xs text-center py-3 rounded tracking-widest uppercase">
                    ✓ En tu biblioteca
                  </div>
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full border border-vault-green-dark hover:border-vault-green text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase py-2.5 rounded transition-colors"
                  >
                    Ver en mi biblioteca →
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handlePurchase}
                    disabled={!user}
                    className="w-full bg-vault-green hover:bg-vault-green-hover disabled:opacity-40 text-vault-black font-bold py-3 rounded tracking-widest uppercase text-sm transition-colors"
                  >
                    {!user ? 'Inicia sesión para comprar' : 'Comprar ahora'}
                  </button>

                  {user && parseFloat(price) > 0 && (
                    <button
                      onClick={() => addToCart(game)}
                      disabled={inCart}
                      className={`w-full py-2.5 rounded tracking-widest uppercase text-xs transition-colors border font-bold ${
                        inCart
                          ? 'border-vault-green bg-vault-green/10 text-vault-green cursor-default'
                          : 'border-vault-green-dark text-vault-muted hover:border-vault-green hover:text-vault-green'
                      }`}
                    >
                      {inCart ? '✓ En el carrito' : '+ Añadir al carrito'}
                    </button>
                  )}
                </div>
              )}

              {/* Wishlist */}
              {user && !purchased && (
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
                <div className="flex justify-between"><span className="text-vault-hint text-xs">Género</span><span className="text-vault-muted text-xs">{game.categories[0]?.name}</span></div>
                <div className="flex justify-between"><span className="text-vault-hint text-xs">Plataforma</span><span className="text-vault-muted text-xs">{game.platform}</span></div>
                <div className="flex justify-between"><span className="text-vault-hint text-xs">Desarrollador</span><span className="text-vault-muted text-xs">{game.developer}</span></div>
                <div className="flex justify-between"><span className="text-vault-hint text-xs">Lanzamiento</span><span className="text-vault-muted text-xs">{game.release_date}</span></div>
                <div className="flex justify-between"><span className="text-vault-hint text-xs">Idiomas</span><span className="text-vault-muted text-xs">{game.languages}</span></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

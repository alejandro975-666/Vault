import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ReviewForm from '../components/forms/ReviewForm'
import ReviewCard from '../components/ui/ReviewCard'

// Mock data temporal hasta que Luis tenga el backend
const mockGame = {
    id: 1,
    title: 'Elden Realm',
    price: '59.99',
    description: 'Un épico RPG de mundo abierto donde cada decisión moldea el destino del reino. Explora vastos paisajes, combate criaturas legendarias y descubre los secretos de un mundo en ruinas. Con más de 80 horas de contenido principal y un sistema de combate profundo y satisfactorio.',
    image_url: null,
    categories: [{ name: 'RPG' }, { name: 'Mundo abierto' }, { name: 'Fantasía' }],
    reviews_avg_rating: '4.9',
    developer: 'FromSoft Studios',
    release_date: '12 mar 2024',
    languages: 'ES, EN, FR',
    reviews: [
        { id: 1, user: { name: 'juanma99' }, rating: 5, body: 'Increíble experiencia, de lo mejor que he jugado en años.', created_at: 'hace 3 días' },
        { id: 2, user: { name: 'sara_r' }, rating: 4, body: 'Muy buen juego, aunque la curva de dificultad al inicio es bastante dura.', created_at: 'hace 1 semana' },
        { id: 3, user: { name: 'player_one' }, rating: 5, body: 'Una obra maestra. El mundo es enorme y cada rincón tiene algo que descubrir.', created_at: 'hace 2 semanas' },
    ]
    }

    export default function GameDetail() {
    const { id } = useParams()
    const { user } = useAuth()
    const [purchased, setPurchased] = useState(false)
    const [inWishlist, setInWishlist] = useState(false)
    const game = mockGame

    const handlePurchase = () => {
        setPurchased(true)
    }

    const toggleWishlist = () => {
        setInWishlist(!inWishlist)
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
                    <span className="text-vault-hint text-xs">({game.reviews.length})</span>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    {game.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

                {user && purchased && (
                    <ReviewForm gameId={game.id} />
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
                    <span className="text-vault-text text-sm font-bold">{parseFloat(game.reviews_avg_rating).toFixed(1)}</span>
                    <span className="text-vault-hint text-xs">({game.reviews.length} reseñas)</span>
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
                    className="w-full bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold py-3 rounded tracking-widest uppercase text-sm transition-colors"
                    >
                    Comprar ahora
                    </button>
                )}

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
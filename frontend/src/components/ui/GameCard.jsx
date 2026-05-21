import React from 'react'
import { Link } from 'react-router-dom'

const platformColors = {
    Steam: { bg: '#1b2838', color: '#c7d5e0' },
    Epic: { bg: '#2a2a2a', color: '#ffffff' },
    GOG: { bg: '#392069', color: '#ffffff' },
    Xbox: { bg: '#107c10', color: '#ffffff' },
    PlayStation: { bg: '#003087', color: '#ffffff' },
    }

    const platformIcons = {
    Steam: '🎮',
    Epic: '⚡',
    GOG: '👁️',
    Xbox: '🎯',
    PlayStation: '🎮',
    }

    export default function GameCard({ game }) {
    const hasDiscount = game.discount && game.discount > 0
    const price = game.discount_price || game.price
    const originalPrice = game.original_price || game.price

    return (
        <Link
        to={`/games/${game.id}`}
        className="group bg-vault-dark border border-vault-green-dark hover:border-vault-green rounded-lg overflow-hidden transition-colors duration-200 flex flex-col"
        >
        {/* Imagen */}
        <div className="relative h-40 bg-vault-card overflow-hidden">
            {game.image_url ? (
            <img
                src={game.image_url}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-vault-hint text-4xl font-bold tracking-widest">V</span>
            </div>
            )}

            {/* Badge descuento */}
            {hasDiscount && (
            <div className="absolute top-2 right-2 bg-vault-green text-vault-black text-xs font-bold px-2 py-1 rounded tracking-widest">
                -{game.discount}%
            </div>
            )}

            {/* Badge plataforma */}
            {game.platform && (
            <div
                className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded tracking-widest font-bold"
                style={{
                background: platformColors[game.platform]?.bg || '#1a1f1a',
                color: platformColors[game.platform]?.color || '#7ab87a',
                }}
            >
                {platformIcons[game.platform]} {game.platform}
            </div>
            )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1 font-mono">
            <h3 className="text-vault-text text-sm font-bold tracking-wide truncate group-hover:text-vault-green transition-colors">
            {game.title}
            </h3>

            {/* Categoría y valoración */}
            <div className="flex items-center justify-between">
            {game.categories && game.categories[0] && (
                <span className="text-vault-hint text-xs tracking-widest uppercase">{game.categories[0].name}</span>
            )}
            {game.reviews_avg_rating && (
                <div className="flex items-center gap-1">
                <span className="text-vault-warning text-xs">★</span>
                <span className="text-vault-muted text-xs">{parseFloat(game.reviews_avg_rating).toFixed(1)}</span>
                </div>
            )}
            </div>

            {/* Precios */}
            <div className="mt-auto pt-2 border-t border-vault-green-dark">
            {hasDiscount ? (
                <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-vault-hint text-xs line-through">
                    {parseFloat(originalPrice).toFixed(2)}€
                    </span>
                    <span className="text-vault-green font-bold text-sm tracking-widest">
                    {parseFloat(price).toFixed(2)}€
                    </span>
                </div>
                <span className="text-vault-hint text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver →
                </span>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                <span className="text-vault-green font-bold text-sm tracking-widest">
                    {parseFloat(price) === 0 ? 'GRATIS' : `${parseFloat(price).toFixed(2)}€`}
                </span>
                <span className="text-vault-hint text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver →
                </span>
                </div>
            )}
            </div>
        </div>
        </Link>
    )
}
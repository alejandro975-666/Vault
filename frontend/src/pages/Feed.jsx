import React, { useState, useEffect } from 'react'
import GameCard from '../components/ui/GameCard'
import Spinner from '../components/ui/Spinner'
import { getFeed } from '../api/feed'
 
export default function Feed() {
  const [feed, setFeed] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dismissedSearches, setDismissedSearches] = useState([])
 
  useEffect(() => {
    getFeed()
      .then((res) => setFeed(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])
 
  if (loading) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center">
        <Spinner text="Cargando feed..." />
      </div>
    )
  }
 
  if (error) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center font-mono">
        <p className="text-vault-error text-sm">⚠ Error al cargar el feed: {error}</p>
      </div>
    )
  }
 
  const sections = [
    { id: 'recommended', label: 'Recomendado para ti',     badge: 'Para ti',    games: feed?.recommended || [] },
    { id: 'top_sellers', label: 'Más vendidos esta semana', badge: 'Top ventas', games: feed?.top_sellers  || [] },
    { id: 'newest',      label: 'Novedades del catálogo',  badge: 'Nuevo',      games: feed?.newest       || [] },
  ]
 
  const highlight = feed?.recommended?.[0] || feed?.top_sellers?.[0] || null
 
  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
 
        {/* Sidebar */}
        <aside className="w-56 min-w-56 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
              <span className="text-vault-muted text-xs tracking-widest uppercase">Búsquedas recientes</span>
            </div>
            <div className="flex flex-col gap-1">
              {dismissedSearches.length === 0 ? (
                <p className="text-vault-hint text-xs px-2">Sin búsquedas recientes</p>
              ) : null}
            </div>
          </div>
        </aside>
 
        {/* Contenido principal */}
        <div className="flex-1">
 
          <div className="mb-8">
            <h1 className="text-vault-text text-2xl font-bold tracking-wide mb-1">
              Tu <span className="text-vault-green">Feed</span>
            </h1>
            <p className="text-vault-hint text-xs tracking-widest">Recomendaciones basadas en tu biblioteca</p>
          </div>
 
          {/* Juego destacado */}
          {highlight && (
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg overflow-hidden flex mb-10 hover:border-vault-green transition-colors cursor-pointer">
              <div className="w-52 min-w-52 bg-vault-card flex items-center justify-center">
                {highlight.image_url ? (
                  <img src={highlight.image_url} alt={highlight.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-vault-hint text-6xl font-bold">V</span>
                )}
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-vault-hint text-xs tracking-widest uppercase">Recomendado para ti</span>
                    {highlight.categories?.[0] && (
                      <span className="bg-vault-green/10 border border-vault-green-dark text-vault-green text-xs px-2 py-0.5 rounded tracking-widest">
                        {highlight.categories[0].name}
                      </span>
                    )}
                  </div>
                  <h2 className="text-vault-text text-xl font-bold mb-2">{highlight.title}</h2>
                  <p className="text-vault-muted text-xs leading-relaxed mb-4">{highlight.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-vault-green text-2xl font-bold">
                    {parseFloat(highlight.price) === 0 ? 'GRATIS' : `${parseFloat(highlight.price).toFixed(2)}€`}
                  </span>
                </div>
              </div>
            </div>
          )}
 
          {/* Secciones del feed */}
          {sections.map((section) => (
            section.games.length > 0 && (
              <div key={section.id} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                    <span className="text-vault-text text-sm font-bold tracking-wide">{section.label}</span>
                    <span className="bg-vault-green/10 border border-vault-green-dark text-vault-green text-xs px-2 py-0.5 rounded tracking-widest">
                      {section.badge}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  {section.games.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            )
          ))}
 
          {sections.every(s => s.games.length === 0) && (
            <div className="text-center py-20">
              <p className="text-vault-hint text-sm tracking-widest">
                Compra algunos juegos para recibir recomendaciones personalizadas
              </p>
            </div>
          )}
 
        </div>
      </div>
    </div>
  )
}
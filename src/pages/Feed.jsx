import React, { useState } from 'react'
import GameCard from '../components/ui/GameCard'



    export default function Feed() {
    const [dismissedSearches, setDismissedSearches] = useState([])

    const activeSearches = mockRecentSearches.filter((_, i) => !dismissedSearches.includes(i))

    return (
        <div className="bg-vault-black min-h-screen font-mono">
        <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">

            {/* Sidebar intereses */}
            <aside className="w-56 min-w-56 flex flex-col gap-6">

            <div>
                <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Tus intereses</span>
                </div>
                <div className="flex flex-col gap-2">
                {mockInterests.map((interest) => (
                    <div key={interest.category} className="bg-vault-dark border border-vault-green-dark rounded px-3 py-2">
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: interest.color }}></div>
                        <span className="text-vault-text text-xs font-bold">{interest.category}</span>
                        </div>
                        <span className="text-vault-hint text-xs">{interest.searches}</span>
                    </div>
                    <div className="h-1 bg-vault-card rounded">
                        <div
                        className="h-1 rounded transition-all"
                        style={{
                            width: `${(interest.searches / mockInterests[0].searches) * 100}%`,
                            background: interest.color
                        }}
                        ></div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                <span className="text-vault-muted text-xs tracking-widest uppercase">Búsquedas recientes</span>
                </div>
                <div className="flex flex-col gap-1">
                {activeSearches.length === 0 ? (
                    <p className="text-vault-hint text-xs">Sin búsquedas recientes</p>
                ) : (
                    activeSearches.map((search, i) => (
                    <div key={i} className="flex items-center gap-2 group px-2 py-1.5 rounded hover:bg-vault-card transition-colors">
                        <svg className="w-3 h-3 text-vault-hint flex-shrink-0" viewBox="0 0 16 16" fill="none">
                        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="text-vault-muted text-xs flex-1 truncate">{search}</span>
                        <button
                        onClick={() => setDismissedSearches((d) => [...d, mockRecentSearches.indexOf(search)])}
                        className="text-vault-hint hover:text-vault-error text-xs opacity-0 group-hover:opacity-100 transition-all"
                        >
                        ✕
                        </button>
                    </div>
                    ))
                )}
                </div>
            </div>

            </aside>

            {/* Contenido principal */}
            <div className="flex-1">

            {/* Saludo */}
            <div className="mb-8">
                <h1 className="text-vault-text text-2xl font-bold tracking-wide mb-1">
                Hola, <span className="text-vault-green">Alejandro</span>
                </h1>
                <p className="text-vault-hint text-xs tracking-widest">Recomendaciones basadas en tus búsquedas y gustos</p>
            </div>

            {/* Juego destacado */}
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg overflow-hidden flex mb-10 hover:border-vault-green transition-colors cursor-pointer">
                <div className="w-52 min-w-52 bg-vault-card flex items-center justify-center">
                <span className="text-vault-hint text-6xl font-bold">V</span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                    <span className="text-vault-hint text-xs tracking-widest uppercase">Recomendado para ti</span>
                    <span className="bg-vault-green/10 border border-vault-green-dark text-vault-green text-xs px-2 py-0.5 rounded tracking-widest">
                        {mockHighlight.categories[0].name}
                    </span>
                    </div>
                    <h2 className="text-vault-text text-xl font-bold mb-2">{mockHighlight.title}</h2>
                    <p className="text-vault-muted text-xs leading-relaxed mb-4">{mockHighlight.description}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-vault-green text-2xl font-bold">{parseFloat(mockHighlight.price).toFixed(2)}€</span>
                    <button className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors">
                    Comprar
                    </button>
                    <button className="border border-vault-green-dark hover:border-vault-green text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors">
                    + Deseos
                    </button>
                </div>
                </div>
            </div>

            {/* Secciones del feed */}
            {mockFeedSections.map((section) => (
                <div key={section.id} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                    <span className="text-vault-text text-sm font-bold tracking-wide">{section.reason}</span>
                    <span className="bg-vault-green/10 border border-vault-green-dark text-vault-green text-xs px-2 py-0.5 rounded tracking-widest">
                        {section.badge}
                    </span>
                    </div>
                    <button className="text-vault-hint text-xs tracking-widest uppercase hover:text-vault-green transition-colors">
                    Ver más
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {section.games.map((game) => (
                    <GameCard key={game.id} game={game} />
                    ))}
                </div>
                </div>
            ))}

            </div>
        </div>
        </div>
    )
}

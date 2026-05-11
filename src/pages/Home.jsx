import React, { useEffect, useRef, useState } from 'react'
import GameCard from '../components/ui/GameCard'
import SearchBar from '../components/forms/SearchBar'
import FilterSidebar from '../components/ui/FilterSidebar'



    export default function Home() {
    const doorRef = useRef(null)
    const leftPanelRef = useRef(null)
    const rightPanelRef = useRef(null)
    const catalogRef = useRef(null)
    const [doorOpen, setDoorOpen] = useState(false)
    const prevProgressRef = useRef(0)
    const [filters, setFilters] = useState({ categories: [], price: 'all', rating: null, query: '' })
    const [sort, setSort] = useState('popular')

    const filteredGames = mockGames
        .filter((g) => {
        if (filters.query && !g.title.toLowerCase().includes(filters.query.toLowerCase())) return false
        if (filters.categories.length > 0 && !filters.categories.includes(g.categories[0]?.name)) return false
        if (filters.price === 'free' && parseFloat(g.price) !== 0) return false
        if (filters.price === 'under10' && parseFloat(g.price) >= 10) return false
        if (filters.price === '10to30' && (parseFloat(g.price) < 10 || parseFloat(g.price) > 30)) return false
        if (filters.price === 'over30' && parseFloat(g.price) <= 30) return false
        if (filters.rating && parseFloat(g.reviews_avg_rating) < parseFloat(filters.rating)) return false
        if (filters.platform && g.platform !== filters.platform) return false
        return true
        })
        .sort((a, b) => {
        if (sort === 'price_asc') return parseFloat(a.price) - parseFloat(b.price)
        if (sort === 'price_desc') return parseFloat(b.price) - parseFloat(a.price)
        if (sort === 'rating') return parseFloat(b.reviews_avg_rating) - parseFloat(a.reviews_avg_rating)
        return 0
        })

    useEffect(() => {
        const glitchIn = (el) => {
        if (!el) return
        el.style.opacity = '1'
        let count = 0
        const interval = setInterval(() => {
            el.style.opacity = count % 2 === 0 ? '0.1' : '1'
            el.style.transform = `translateX(${Math.random() * 6 - 3}px) translateY(${Math.random() * 4 - 2}px)`
            count++
            if (count > 10) {
            clearInterval(interval)
            el.style.opacity = '1'
            el.style.transform = 'none'
            }
        }, 60)
        }

        const glitchOut = (el) => {
        if (!el) return
        let count = 0
        const interval = setInterval(() => {
            el.style.opacity = count % 2 === 0 ? '0.1' : '0.8'
            el.style.transform = `translateX(${Math.random() * 8 - 4}px) translateY(${Math.random() * 4 - 2}px)`
            count++
            if (count > 10) {
            clearInterval(interval)
            el.style.opacity = '0'
            el.style.transform = 'none'
            }
        }, 60)
        }

        const handleScroll = () => {
        const scrollY = window.scrollY
        const maxScroll = window.innerHeight * 1.2
        const progress = Math.min(scrollY / maxScroll, 1)
        const prevProgress = prevProgressRef.current
        prevProgressRef.current = progress

        const spinProgress = Math.min(progress / 0.5, 1)
        const rotation = spinProgress * 360
        const openProgress = Math.max((progress - 0.5) / 0.5, 0)
        const translateX = openProgress * 110

        if (doorRef.current) {
            doorRef.current.style.transform = `rotate(${rotation}deg)`
        }

        if (leftPanelRef.current && rightPanelRef.current) {
            leftPanelRef.current.style.transform = `translateX(-${translateX}%)`
            rightPanelRef.current.style.transform = `translateX(${translateX}%)`
        }

        if (progress >= 1 && prevProgress < 1 && !doorOpen) {
            setDoorOpen(true)
            glitchIn(catalogRef.current)
        }

        if (progress < 1 && prevProgress >= 1 && doorOpen) {
            setDoorOpen(false)
            glitchOut(catalogRef.current)
        }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [doorOpen])

    return (
        <div className="bg-vault-black min-h-screen font-mono">

        <div className="relative h-[250vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

            {/* Fondo */}
            <div className="absolute inset-0 bg-vault-black">
                <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #39ff14 0px, transparent 1px, transparent 40px)',
                }}
                />
            </div>

            {/* Panel izquierdo */}
            <div
                ref={leftPanelRef}
                className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-end"
                style={{ zIndex: 5, transition: 'none' }}
            >
                <div className="w-full h-full bg-[#111410] border-r-2 border-[#1a7a0a] flex items-center justify-end pr-12">
                <div className="flex flex-col gap-6">
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-28 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-16 h-10 border-2 border-[#1a7a0a] rounded flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-vault-green animate-pulse"></div>
                    </div>
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-28 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                </div>
                </div>
            </div>

            {/* Panel derecho */}
            <div
                ref={rightPanelRef}
                className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-start"
                style={{ zIndex: 5, transition: 'none' }}
            >
                <div className="w-full h-full bg-[#111410] border-l-2 border-[#1a7a0a] flex items-center justify-start pl-12">
                <div className="flex flex-col gap-6">
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-28 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-16 h-10 border-2 border-[#1a7a0a] rounded flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-vault-green animate-pulse"></div>
                    </div>
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-28 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                    <div className="w-40 h-3 bg-[#1a1f1a] rounded border border-[#1a7a0a]"></div>
                </div>
                </div>
            </div>

            {/* Marco ovalado */}
            <div
                className="absolute w-[500px] h-[260px] rounded-full border-8 border-[#0a0c0a] flex items-center justify-center"
                style={{ zIndex: 6, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9)' }}
            >
                <div className="w-[480px] h-[240px] rounded-full bg-[#0d0f0d] border-4 border-[#1a2a1a]"></div>
            </div>

            {/* PUERTA CIRCULAR */}
            <div
                ref={doorRef}
                className="relative"
                style={{ width: 340, height: 340, zIndex: 10, transition: 'none' }}
            >
                <svg viewBox="0 0 340 340" width="340" height="340">
                <defs>
                    <radialGradient id="metalGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#5a5f4a" />
                    <stop offset="100%" stopColor="#2a2f2a" />
                    </radialGradient>
                    <radialGradient id="innerGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#2a2f2a" />
                    <stop offset="100%" stopColor="#0a0c0a" />
                    </radialGradient>
                    <radialGradient id="goldGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="100%" stopColor="#b8860b" />
                    </radialGradient>
                    <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                    </filter>
                </defs>

                <circle cx="170" cy="170" r="165" fill="url(#metalGrad)" stroke="#4a5040" strokeWidth="4" />

                {[...Array(16)].map((_, i) => {
                    const angle = (i * 22.5 * Math.PI) / 180
                    const x1 = 170 + 148 * Math.cos(angle)
                    const y1 = 170 + 148 * Math.sin(angle)
                    const x2 = 170 + 163 * Math.cos(angle)
                    const y2 = 170 + 163 * Math.sin(angle)
                    return (
                    <g key={i}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8860b" strokeWidth="10" strokeLinecap="round" />
                        <circle cx={x2} cy={y2} r="5" fill="url(#goldGrad)" />
                    </g>
                    )
                })}

                <circle cx="170" cy="170" r="138" fill="url(#innerGrad)" stroke="#3a4030" strokeWidth="5" />

                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180
                    const x = 170 + 124 * Math.cos(angle)
                    const y = 170 + 124 * Math.sin(angle)
                    return (
                    <g key={i}>
                        <circle cx={x} cy={y} r="8" fill="#1a1f1a" stroke="#b8860b" strokeWidth="2.5" />
                        <circle cx={x} cy={y} r="3" fill="#b8860b" />
                    </g>
                    )
                })}

                <circle cx="170" cy="170" r="108" fill="#0d0f0d" stroke="#1a7a0a" strokeWidth="4" />

                {[...Array(8)].map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180
                    const x1 = 170 + 112 * Math.cos(angle)
                    const y1 = 170 + 112 * Math.sin(angle)
                    const x2 = 170 + 90 * Math.cos(angle)
                    const y2 = 170 + 90 * Math.sin(angle)
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a7a0a" strokeWidth="3" />
                })}

                <circle cx="170" cy="170" r="86" fill="#0a0c0a" stroke="#39ff14" strokeWidth="2" />
                <circle cx="170" cy="170" r="78" fill="none" stroke="#1a7a0a" strokeWidth="1" strokeDasharray="6 4" />

                <text
                    x="170"
                    y="196"
                    textAnchor="middle"
                    fontSize="90"
                    fontWeight="bold"
                    fontFamily="monospace"
                    fill="#39ff14"
                    filter="url(#glow)"
                >
                    V
                </text>

                <path id="topArc" d="M 70,170 A 100,100 0 0,1 270,170" fill="none" />
                <path id="bottomArc" d="M 70,170 A 100,100 0 0,0 270,170" fill="none" />
                <text fontSize="11" fill="#7ab87a" letterSpacing="5">
                    <textPath href="#topArc" startOffset="10%">VAULT · GAMES</textPath>
                </text>
                <text fontSize="11" fill="#7ab87a" letterSpacing="5">
                    <textPath href="#bottomArc" startOffset="10%">EST · 2026</textPath>
                </text>

                </svg>
            </div>

            {/* Indicador scroll */}
            {!doorOpen && (
                <div className="absolute bottom-10 left-10 text-left" style={{ zIndex: 20 }}>
                <p className="text-vault-hint text-xs tracking-widest uppercase mb-3">Scroll para abrir</p>
                <div className="w-6 h-10 border-2 border-vault-green-dark rounded-full flex items-start justify-center pt-2">
                    <div className="w-1 h-2 bg-vault-green rounded-full animate-bounce"></div>
                </div>
                </div>
            )}

            </div>
        </div>

        {/* CATÁLOGO */}
        <div
            ref={catalogRef}
            className="px-6 py-12 max-w-7xl mx-auto"
            style={{ opacity: 0 }}
        >
            <div className="mb-6">
            <h2 className="text-vault-green text-2xl font-bold tracking-widest uppercase mb-2">Catálogo</h2>
            <p className="text-vault-muted text-sm tracking-wide mb-4">Explora nuestra colección de títulos</p>
            <SearchBar onSearch={(q) => setFilters((f) => ({ ...f, query: q }))} />
            </div>

            <div className="flex gap-8">
            <FilterSidebar filters={filters} onChange={setFilters} />
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                <span className="text-vault-hint text-xs tracking-widest">{filteredGames.length} resultados</span>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-vault-card border border-vault-green-dark text-vault-muted text-xs rounded px-3 py-2 font-mono focus:outline-none focus:border-vault-green"
                >
                    <option value="popular">Más populares</option>
                    <option value="price_asc">Precio: menor</option>
                    <option value="price_desc">Precio: mayor</option>
                    <option value="rating">Mejor valorados</option>
                </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
                </div>
            </div>
            </div>
        </div>

        </div>
    )
}

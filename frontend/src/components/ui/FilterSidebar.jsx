import React from 'react'

const categories = ['RPG', 'Acción', 'Indie', 'Estrategia', 'Aventura', 'Deportes', 'Terror', 'Simulación']

const prices = [
  { label: 'Todos',        value: 'all' },
  { label: 'Gratis',       value: 'free' },
  { label: 'Menos de 10€', value: 'under10' },
  { label: '10€ – 30€',    value: '10to30' },
  { label: 'Más de 30€',   value: 'over30' },
]

const ratings = [
  { label: '★★★★★ (4.5+)', value: '4.5' },
  { label: '★★★★ (4+)',    value: '4' },
  { label: '★★★ (3+)',     value: '3' },
]

export default function FilterSidebar({ filters, onChange }) {

  const toggleCategory = (cat) => {
    const current = filters.category
    onChange({ ...filters, category: current === cat ? null : cat })
  }

  return (
    <aside className="w-56 min-w-56 font-mono flex flex-col gap-6">

      {/* Categorías */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
          <span className="text-vault-muted text-xs tracking-widest uppercase">Categorías</span>
        </div>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const active = filters.category === cat
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`text-left px-3 py-2 rounded text-xs tracking-wide transition-colors ${
                  active
                    ? 'bg-vault-green text-vault-black font-bold'
                    : 'text-vault-muted hover:text-vault-green hover:bg-vault-card'
                }`}
              >
                {active ? '▶ ' : ''}{cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Precio */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
          <span className="text-vault-muted text-xs tracking-widest uppercase">Precio</span>
        </div>
        <div className="flex flex-col gap-1">
          {prices.map((p) => {
            const active = filters.price === p.value
            return (
              <button
                key={p.value}
                onClick={() => onChange({ ...filters, price: p.value })}
                className={`text-left px-3 py-2 rounded text-xs tracking-wide transition-colors ${
                  active
                    ? 'bg-vault-green text-vault-black font-bold'
                    : 'text-vault-muted hover:text-vault-green hover:bg-vault-card'
                }`}
              >
                {active ? '▶ ' : ''}{p.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Valoración */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
          <span className="text-vault-muted text-xs tracking-widest uppercase">Valoración</span>
        </div>
        <div className="flex flex-col gap-1">
          {ratings.map((r) => {
            const active = filters.rating === r.value
            return (
              <button
                key={r.value}
                onClick={() => onChange({ ...filters, rating: r.value })}
                className={`text-left px-3 py-2 rounded text-xs tracking-wide transition-colors ${
                  active
                    ? 'bg-vault-green text-vault-black font-bold'
                    : 'text-vault-muted hover:text-vault-green hover:bg-vault-card'
                }`}
              >
                {active ? '▶ ' : ''}{r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Plataforma */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
          <span className="text-vault-muted text-xs tracking-widest uppercase">Plataforma</span>
        </div>
        <div className="flex flex-col gap-1">
          {['Steam', 'Epic', 'GOG', 'Xbox', 'PlayStation'].map((platform) => {
            const active = filters.platform === platform
            return (
              <button
                key={platform}
                onClick={() => onChange({ ...filters, platform: active ? null : platform })}
                className={`text-left px-3 py-2 rounded text-xs tracking-wide transition-colors ${
                  active
                    ? 'bg-vault-green text-vault-black font-bold'
                    : 'text-vault-muted hover:text-vault-green hover:bg-vault-card'
                }`}
              >
                {active ? '▶ ' : ''}{platform}
              </button>
            )
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({ category: null, price: 'all', rating: null, platform: null, query: '' })}
        className="text-vault-error text-xs tracking-widest uppercase hover:text-red-400 transition-colors text-left px-3"
      >
        ✕ Limpiar filtros
      </button>

    </aside>
  )
}

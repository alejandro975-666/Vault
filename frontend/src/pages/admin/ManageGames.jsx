import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/ui/Spinner'
import { getGames, getCategories } from '../../api/games'
import { createGame, updateGame, deleteGame } from '../../api/admin'

const PLATFORMS = [
  'Steam', 'Epic', 'GOG', 'Xbox', 'PlayStation',
  'Battle.net', 'EA', 'Ubisoft', 'Nintendo', 'Rockstar'
]

const emptyForm = {
  title: '', price: '', original_price: '', discount: '',
  description: '', image_url: '', platform: '',
  developer: '', status: 'draft', categories: []
}

export default function ManageGames() {
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      getGames({ status: 'all' }),
      getCategories(),
    ])
      .then(([gamesRes, catsRes]) => {
        setGames(gamesRes.data)
        setCategories(catsRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filteredGames = games.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (game) => {
    setSelectedGame(game)
    setForm({
      title:          game.title,
      price:          game.price,
      original_price: game.original_price || '',
      discount:       game.discount || '',
      description:    game.description || '',
      image_url:      game.image_url || '',
      platform:       game.platform || '',
      developer:      game.developer || '',
      status:         game.status,
      categories:     game.categories?.map((c) => c.id) || [],
    })
    setShowModal(true)
    setError(null)
  }

  const handleNew = () => {
    setSelectedGame(null)
    setForm(emptyForm)
    setShowModal(true)
    setError(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      if (selectedGame) {
        const res = await updateGame(selectedGame.id, form)
        setGames((prev) => prev.map((g) => g.id === selectedGame.id ? res.data : g))
      } else {
        const res = await createGame(form)
        setGames((prev) => [res.data, ...prev])
      }
      setShowModal(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el juego')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteConfirm = (game) => {
    setSelectedGame(game)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      await deleteGame(selectedGame.id)
      setGames((prev) => prev.filter((g) => g.id !== selectedGame.id))
      setShowDeleteModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const toggleCategory = (catId) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(catId)
        ? f.categories.filter((id) => id !== catId)
        : [...f.categories, catId],
    }))
  }

  if (loading) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center">
        <Spinner text="Cargando juegos..." />
      </div>
    )
  }

  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-vault-hint text-xs tracking-widest mb-2">
              <Link to="/admin" className="hover:text-vault-green transition-colors">Dashboard</Link>
              <span className="mx-2">›</span>
              <span className="text-vault-muted">Juegos</span>
            </div>
            <h1 className="text-vault-green text-2xl font-bold tracking-widest uppercase">Gestión de juegos</h1>
          </div>
          <button
            onClick={handleNew}
            className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
          >
            + Nuevo juego
          </button>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar juego..."
            className="w-full max-w-sm bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
          />
        </div>

        {/* Tabla */}
        <div className="bg-vault-dark border border-vault-green-dark rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-vault-green-dark">
            <span className="col-span-4 text-vault-hint text-xs tracking-widest uppercase">Título</span>
            <span className="col-span-2 text-vault-hint text-xs tracking-widest uppercase">Categoría</span>
            <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Precio</span>
            <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Desc.</span>
            <span className="col-span-2 text-vault-hint text-xs tracking-widest uppercase">Estado</span>
            <span className="col-span-2 text-vault-hint text-xs tracking-widest uppercase">Acciones</span>
          </div>

          {filteredGames.map((game, i) => (
            <div
              key={game.id}
              className={`grid grid-cols-12 gap-4 px-5 py-4 items-center ${
                i < filteredGames.length - 1 ? 'border-b border-vault-green-dark' : ''
              } hover:bg-vault-card transition-colors`}
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-vault-card border border-vault-green-dark overflow-hidden flex-shrink-0">
                  {game.image_url
                    ? <img src={game.image_url} alt={game.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-vault-green">V</div>
                  }
                </div>
                <span className="text-vault-text text-sm font-bold truncate">{game.title}</span>
              </div>
              <span className="col-span-2 text-vault-muted text-xs truncate">
                {game.categories?.map((c) => c.name).join(', ') || '—'}
              </span>
              <span className="col-span-1 text-vault-text text-xs">
                {parseFloat(game.discount_price || game.price).toFixed(2)}€
              </span>
              <span className="col-span-1">
                {game.discount > 0
                  ? <span className="text-vault-green text-xs font-bold">-{game.discount}%</span>
                  : <span className="text-vault-hint text-xs">—</span>
                }
              </span>
              <span className="col-span-2">
                <span className={`text-xs px-2 py-1 rounded tracking-widest border ${
                  game.status === 'published'
                    ? 'bg-vault-green/10 border-vault-green-dark text-vault-green'
                    : 'bg-vault-card border-vault-hint text-vault-hint'
                }`}>
                  {game.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </span>
              <div className="col-span-2 flex gap-2">
                <button
                  onClick={() => handleEdit(game)}
                  className="text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors border border-vault-green-dark hover:border-vault-green px-3 py-1.5 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteConfirm(game)}
                  className="text-vault-error text-xs tracking-widest uppercase transition-colors border border-vault-error/30 hover:border-vault-error px-3 py-1.5 rounded"
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}

          {filteredGames.length === 0 && (
            <div className="px-5 py-10 text-center text-vault-hint text-xs tracking-widest">
              No se encontraron juegos
            </div>
          )}
        </div>

        {/* Modal crear/editar */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 w-full max-w-lg font-mono max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                  <span className="text-vault-muted text-xs tracking-widest uppercase">
                    {selectedGame ? 'Editar juego' : 'Nuevo juego'}
                  </span>
                </div>
                <button onClick={() => setShowModal(false)} className="text-vault-hint hover:text-vault-error transition-colors text-lg">✕</button>
              </div>

              {error && (
                <div className="border border-vault-error/40 bg-vault-error/10 text-vault-error rounded px-4 py-3 mb-4 text-xs">
                  ⚠ {error}
                </div>
              )}

              <div className="flex flex-col gap-4">

                {/* Título */}
                <div>
                  <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Título</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                  />
                </div>

                {/* Precios */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Precio original (€)</label>
                    <input
                      type="number"
                      value={form.original_price}
                      onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Precio rebajado (€)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Descuento (%)</label>
                    <input
                      type="number"
                      value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: e.target.value })}
                      min="0"
                      max="100"
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Plataforma y desarrollador */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Plataforma</label>
                    <select
                      value={form.platform}
                      onChange={(e) => setForm({ ...form, platform: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    >
                      <option value="">Seleccionar...</option>
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Desarrollador</label>
                    <input
                      type="text"
                      value={form.developer}
                      onChange={(e) => setForm({ ...form, developer: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Descripción</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono resize-none"
                  />
                </div>

                {/* URL imagen */}
                <div>
                  <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">URL de imagen</label>
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                  />
                  {form.image_url && (
                    <img src={form.image_url} alt="preview" className="mt-2 h-20 rounded border border-vault-green-dark object-cover" />
                  )}
                </div>

                {/* Categorías */}
                <div>
                  <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Categorías</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-3 py-1.5 rounded text-xs tracking-widest uppercase border transition-colors ${
                          form.categories.includes(cat.id)
                            ? 'bg-vault-green text-vault-black border-vault-green font-bold'
                            : 'border-vault-green-dark text-vault-hint hover:border-vault-green'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Estado</label>
                  <div className="flex gap-2">
                    {['draft', 'published'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setForm({ ...form, status: s })}
                        className={`px-4 py-2 rounded text-xs tracking-widest uppercase border transition-colors ${
                          form.status === s
                            ? 'bg-vault-green text-vault-black border-vault-green font-bold'
                            : 'border-vault-green-dark text-vault-hint hover:border-vault-green'
                        }`}
                      >
                        {s === 'draft' ? 'Borrador' : 'Publicado'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="border border-vault-green-dark text-vault-hint hover:text-vault-muted text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-vault-green hover:bg-vault-green-hover disabled:opacity-40 text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
                >
                  {saving ? 'Guardando...' : selectedGame ? 'Guardar cambios' : 'Crear juego'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal confirmar borrado */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-vault-dark border border-vault-error/50 rounded-lg p-6 w-full max-w-sm font-mono">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-error"></div>
                <span className="text-vault-error text-xs tracking-widest uppercase">Confirmar eliminación</span>
              </div>
              <p className="text-vault-text text-sm mb-2">
                ¿Eliminar <span className="text-vault-green font-bold">{selectedGame?.title}</span>?
              </p>
              <p className="text-vault-hint text-xs mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="border border-vault-green-dark text-vault-hint text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors hover:text-vault-muted"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-vault-error hover:bg-red-600 text-white font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

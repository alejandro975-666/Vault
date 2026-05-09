import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const mockGames = [
    { id: 1, title: 'Elden Realm', price: '59.99', category: 'RPG', sales: 412, rating: '4.9', status: 'published' },
    { id: 2, title: 'Neon Strike', price: '19.99', category: 'Acción', sales: 328, rating: '4.4', status: 'published' },
    { id: 3, title: 'Pixel Farm', price: '9.99', category: 'Indie', sales: 264, rating: '4.8', status: 'published' },
    { id: 4, title: 'Empire Wars', price: '29.99', category: 'Estrategia', sales: 198, rating: '4.2', status: 'draft' },
    { id: 5, title: 'Lost Worlds', price: '14.99', category: 'Aventura', sales: 134, rating: '3.8', status: 'published' },
    { id: 6, title: 'Dark Echoes', price: '39.99', category: 'RPG', sales: 98, rating: '4.7', status: 'published' },
    ]

    const emptyForm = { title: '', price: '', category: '', description: '', image_url: '', status: 'draft' }

    export default function ManageGames() {
    const [games, setGames] = useState(mockGames)
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedGame, setSelectedGame] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [search, setSearch] = useState('')

    const filteredGames = games.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase())
    )

    const handleEdit = (game) => {
        setSelectedGame(game)
        setForm({ ...game })
        setShowModal(true)
    }

    const handleNew = () => {
        setSelectedGame(null)
        setForm(emptyForm)
        setShowModal(true)
    }

    const handleSave = () => {
        if (selectedGame) {
        setGames((prev) => prev.map((g) => g.id === selectedGame.id ? { ...g, ...form } : g))
        } else {
        setGames((prev) => [...prev, { ...form, id: Date.now(), sales: 0, rating: '0.0' }])
        }
        setShowModal(false)
    }

    const handleDeleteConfirm = (game) => {
        setSelectedGame(game)
        setShowDeleteModal(true)
    }

    const handleDelete = () => {
        setGames((prev) => prev.filter((g) => g.id !== selectedGame.id))
        setShowDeleteModal(false)
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
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Ventas</span>
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Rating</span>
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Estado</span>
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
                    <div className="w-8 h-8 rounded bg-vault-card border border-vault-green-dark flex items-center justify-center text-xs font-bold text-vault-green flex-shrink-0">
                    V
                    </div>
                    <span className="text-vault-text text-sm font-bold truncate">{game.title}</span>
                </div>
                <span className="col-span-2 text-vault-muted text-xs">{game.category}</span>
                <span className="col-span-1 text-vault-text text-xs">{parseFloat(game.price).toFixed(2)}€</span>
                <span className="col-span-1 text-vault-muted text-xs">{game.sales}</span>
                <span className="col-span-1 text-vault-warning text-xs">★ {game.rating}</span>
                <span className="col-span-1">
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
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 w-full max-w-lg font-mono">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                    <span className="text-vault-muted text-xs tracking-widest uppercase">
                        {selectedGame ? 'Editar juego' : 'Nuevo juego'}
                    </span>
                    </div>
                    <button onClick={() => setShowModal(false)} className="text-vault-hint hover:text-vault-error transition-colors text-lg">✕</button>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Título</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Precio (€)</label>
                        <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Categoría</label>
                        <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                        >
                        <option value="">Seleccionar...</option>
                        <option value="RPG">RPG</option>
                        <option value="Acción">Acción</option>
                        <option value="Indie">Indie</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Deportes">Deportes</option>
                        </select>
                    </div>
                    </div>

                    <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Descripción</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono resize-none"
                    />
                    </div>

                    <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">URL de imagen</label>
                    <input
                        type="text"
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                    />
                    </div>

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
                    className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
                    >
                    {selectedGame ? 'Guardar cambios' : 'Crear juego'}
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
                <p className="text-vault-text text-sm mb-2">¿Eliminar <span className="text-vault-green font-bold">{selectedGame?.title}</span>?</p>
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
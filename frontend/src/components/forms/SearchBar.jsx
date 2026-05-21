import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) onSearch(query.trim())
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 font-mono">
        <div className="flex-1 relative">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en el Vault..."
            className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text placeholder-vault-hint text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
            />
        </div>
        <button
            type="submit"
            className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
        >
            Buscar
        </button>
        </form>
    )
}
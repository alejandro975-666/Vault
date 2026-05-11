import React, { useState } from 'react'

export default function ReviewForm({ gameId }) {
    const [rating, setRating] = useState(0)
    const [body, setBody] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating === 0) return
        setSubmitted(true)
    }

    if (submitted) {
        return (
        <div className="bg-vault-dark border border-vault-green rounded-lg p-4 text-center font-mono">
            <p className="text-vault-green text-xs tracking-widest">✓ Reseña publicada correctamente</p>
        </div>
        )
    }

    return (
        <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-5 font-mono">
        <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
            <span className="text-vault-muted text-xs tracking-widest uppercase">Escribe tu reseña</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${star <= rating ? 'text-vault-warning' : 'text-vault-hint'}`}
                >
                ★
                </button>
            ))}
            </div>

            <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Comparte tu opinión..."
            required
            rows={3}
            className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-3 text-vault-text placeholder-vault-hint text-sm focus:outline-none focus:border-vault-green transition-colors font-mono resize-none"
            />

            <button
            type="submit"
            className="self-end bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors"
            >
            Publicar
            </button>
        </form>
        </div>
    )
}
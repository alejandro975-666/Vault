import React from 'react'

export default function ReviewCard({ review }) {
  const fecha = new Date(review.created_at).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-4 font-mono">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-7 h-7 rounded-full bg-vault-card border border-vault-green-dark flex items-center justify-center text-xs text-vault-green font-bold">
          {review.user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-vault-text text-xs font-bold">{review.user.name}</span>
        <span className="text-vault-hint text-xs ml-auto">{fecha}</span>
      </div>
      <div className="text-vault-warning text-xs mb-2">
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      <p className="text-vault-muted text-xs leading-relaxed">{review.body}</p>
    </div>
  )
}

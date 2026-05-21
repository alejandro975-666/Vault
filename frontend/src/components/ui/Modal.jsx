import React from 'react'

export default function Modal({ title, children, onClose, danger = false }) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
        <div className={`bg-vault-dark border rounded-lg p-6 w-full max-w-md font-mono ${
            danger ? 'border-vault-error/50' : 'border-vault-green-dark'
        }`}>

            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${danger ? 'bg-vault-error' : 'bg-vault-green'}`}></div>
                <span className={`text-xs tracking-widest uppercase ${danger ? 'text-vault-error' : 'text-vault-muted'}`}>
                {title}
                </span>
            </div>
            <button
                onClick={onClose}
                className="text-vault-hint hover:text-vault-error transition-colors text-lg"
            >
                ✕
            </button>
            </div>

            {children}

        </div>
        </div>
    )
}
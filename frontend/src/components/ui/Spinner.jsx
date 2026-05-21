import React from 'react'

export default function Spinner({ size = 'md', text = 'Cargando...' }) {
    const sizes = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3 font-mono">
        <div className={`${sizes[size]} relative`}>
            <svg viewBox="0 0 40 40" className="w-full h-full animate-spin">
            <circle
                cx="20" cy="20" r="16"
                fill="none"
                stroke="#1a7a0a"
                strokeWidth="3"
            />
            <path
                d="M 20 4 A 16 16 0 0 1 36 20"
                fill="none"
                stroke="#39ff14"
                strokeWidth="3"
                strokeLinecap="round"
            />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-vault-green animate-pulse"></div>
            </div>
        </div>
        {text && <p className="text-vault-hint text-xs tracking-widest uppercase">{text}</p>}
        </div>
    )
}
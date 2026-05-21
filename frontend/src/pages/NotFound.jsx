import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    const glitchRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
        if (glitchRef.current) {
            glitchRef.current.style.transform = `translateX(${Math.random() * 6 - 3}px)`
            setTimeout(() => {
            if (glitchRef.current) glitchRef.current.style.transform = 'none'
            }, 80)
        }
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-vault-black min-h-screen font-mono flex items-center justify-center px-4">
        <div className="text-center">

            <div ref={glitchRef} className="mb-6 transition-none">
            <p className="text-vault-hint text-xs tracking-widest uppercase mb-4">Error del sistema</p>
            <h1 className="text-vault-green font-bold tracking-widest" style={{ fontSize: '8rem', lineHeight: 1, filter: 'drop-shadow(0 0 20px #39ff14)' }}>
                404
            </h1>
            </div>

            <div className="mb-8">
            <p className="text-vault-text text-lg font-bold tracking-wide mb-2">Sector no encontrado</p>
            <p className="text-vault-muted text-sm tracking-wide">La zona a la que intentas acceder no existe o ha sido destruida.</p>
            </div>

            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-4 mb-8 max-w-sm mx-auto text-left">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-vault-error animate-pulse"></div>
                <span className="text-vault-error text-xs tracking-widest uppercase">Terminal de diagnóstico</span>
            </div>
            <p className="text-vault-hint text-xs leading-relaxed">
                <span className="text-vault-green">{'>'}</span> Ruta no encontrada en el sistema<br />
                <span className="text-vault-green">{'>'}</span> Comprobando registros...<br />
                <span className="text-vault-green">{'>'}</span> Sector eliminado o inaccesible<br />
                <span className="text-vault-green">{'>'}</span> Recomendación: volver al Vault
            </p>
            </div>

            <Link
            to="/"
            className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-8 py-3 rounded transition-colors inline-block"
            >
            Volver al Vault
            </Link>

        </div>
        </div>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-vault-dark border-t border-vault-green-dark font-mono mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Link to="/" className="text-vault-green font-bold text-2xl tracking-widest hover:text-vault-green-hover transition-colors">
              VAULT
            </Link>
            <p className="text-vault-hint text-xs leading-relaxed mt-3 max-w-xs">
              La plataforma de distribución de videojuegos del futuro. Explora y compra tu contenido favorito.
            </p>
            <p className="text-vault-hint text-xs mt-4 tracking-widest">
              VAULT-TEC INDUSTRIES © 2026
            </p>
          </div>

          {/* Links tienda */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
              <span className="text-vault-muted text-xs tracking-widest uppercase">Tienda</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-vault-hint text-xs hover:text-vault-green transition-colors tracking-wide">
                Catálogo
              </Link>
            </div>
          </div>

          {/* Links cuenta */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
              <span className="text-vault-muted text-xs tracking-widest uppercase">Mi cuenta</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Perfil',          to: '/profile' },
                { label: 'Biblioteca',      to: '/profile?tab=Biblioteca' },
                { label: 'Lista de deseos', to: '/profile?tab=Lista de deseos' },
                { label: 'Mi feed',         to: '/feed' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-vault-hint text-xs hover:text-vault-green transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-vault-green-dark pt-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-6">
            {['Términos de uso', 'Privacidad', 'Cookies', 'Contacto'].map((item) => (
              <span key={item} className="text-vault-hint text-xs hover:text-vault-green transition-colors cursor-pointer tracking-wide">
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-vault-green animate-pulse"></div>
            <span className="text-vault-hint text-xs tracking-widest">Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

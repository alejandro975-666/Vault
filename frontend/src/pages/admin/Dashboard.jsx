import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/ui/Spinner'
import api from '../../api/axios'
 
export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [topGames, setTopGames] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/users'),
    ])
      .then(([statsRes, usersRes]) => {
        setStats(statsRes.data)
        const users = usersRes.data
        setRecentUsers(users.slice(0, 5))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])
 
  if (loading) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center">
        <Spinner text="Cargando dashboard..." />
      </div>
    )
  }
 
  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-6 py-10">
 
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-vault-green text-2xl font-bold tracking-widest uppercase mb-1">Dashboard</h1>
            <p className="text-vault-hint text-xs tracking-widest">Panel de control — Vault Games</p>
          </div>
          <Link
            to="/admin/games"
            className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors"
          >
            + Nuevo juego
          </Link>
        </div>
 
        {/* Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Usuarios totales',  value: stats?.users?.toLocaleString()     || '0' },
            { label: 'Juegos publicados', value: stats?.games                        || '0' },
            { label: 'Compras totales',   value: stats?.purchases?.toLocaleString() || '0' },
            { label: 'Ingresos totales',  value: `${parseFloat(stats?.revenue || 0).toFixed(2)}€` },
          ].map((stat) => (
            <div key={stat.label} className="bg-vault-dark border border-vault-green-dark rounded-lg p-5">
              <p className="text-vault-hint text-xs tracking-widest uppercase mb-2">{stat.label}</p>
              <p className="text-vault-text text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
 
        {/* Últimos usuarios */}
        <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
              <span className="text-vault-muted text-xs tracking-widest uppercase">Últimos usuarios</span>
            </div>
            <Link to="/admin/users" className="text-vault-hint text-xs hover:text-vault-green transition-colors">Ver todos</Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-2 border-b border-vault-green-dark last:border-0">
                <div className="w-7 h-7 rounded-full bg-vault-card border border-vault-green-dark flex items-center justify-center text-xs text-vault-green font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-vault-text text-xs font-bold">{user.name}</p>
                  <p className="text-vault-hint text-xs">{user.email}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded tracking-widest border ${
                  user.active
                    ? 'bg-vault-green/10 border-vault-green-dark text-vault-muted'
                    : 'bg-vault-error/10 border-vault-error/30 text-vault-error'
                }`}>
                  {user.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            ))}
          </div>
        </div>
 
        {/* Accesos rápidos */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Gestionar juegos',   to: '/admin/games', desc: 'Añadir, editar y eliminar' },
            { label: 'Gestionar usuarios', to: '/admin/users', desc: 'Activar y desactivar cuentas' },
            { label: 'Ver catálogo',        to: '/',            desc: 'Como lo ve el usuario' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-vault-dark border border-vault-green-dark hover:border-vault-green rounded-lg p-4 transition-colors group"
            >
              <p className="text-vault-text text-xs font-bold tracking-wide mb-1 group-hover:text-vault-green transition-colors">
                {item.label}
              </p>
              <p className="text-vault-hint text-xs">{item.desc}</p>
            </Link>
          ))}
        </div>
 
      </div>
    </div>
  )
}
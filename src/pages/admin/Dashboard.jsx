import React from 'react'
import { Link } from 'react-router-dom'



    export default function Dashboard() {
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
                { label: 'Usuarios totales', value: mockStats.users.toLocaleString(), delta: '+12% este mes', up: true },
                { label: 'Juegos publicados', value: mockStats.games, delta: '+4 esta semana', up: true },
                { label: 'Compras totales', value: mockStats.purchases.toLocaleString(), delta: '+8% este mes', up: true },
                { label: 'Ingresos totales', value: `${mockStats.revenue.toLocaleString()}€`, delta: '-2% vs anterior', up: false },
            ].map((stat) => (
                <div key={stat.label} className="bg-vault-dark border border-vault-green-dark rounded-lg p-5">
                <p className="text-vault-hint text-xs tracking-widest uppercase mb-2">{stat.label}</p>
                <p className="text-vault-text text-2xl font-bold mb-1">{stat.value}</p>
                <p className={`text-xs tracking-wide ${stat.up ? 'text-vault-green' : 'text-vault-error'}`}>
                    {stat.delta}
                </p>
                </div>
            ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Juegos más vendidos */}
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                    <span className="text-vault-muted text-xs tracking-widest uppercase">Más vendidos</span>
                </div>
                <Link to="/admin/games" className="text-vault-hint text-xs hover:text-vault-green transition-colors">Ver todos</Link>
                </div>
                <div className="flex flex-col gap-3">
                {mockTopGames.map((game, i) => {
                    const maxSales = mockTopGames[0].sales
                    const pct = (game.sales / maxSales) * 100
                    return (
                    <div key={game.title}>
                        <div className="flex justify-between mb-1">
                        <span className="text-vault-text text-xs">{game.title}</span>
                        <span className="text-vault-hint text-xs">{game.sales} ventas</span>
                        </div>
                        <div className="h-1.5 bg-vault-card rounded">
                        <div
                            className="h-1.5 bg-vault-green rounded transition-all"
                            style={{ width: `${pct}%` }}
                        ></div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>

            {/* Últimos usuarios */}
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                    <span className="text-vault-muted text-xs tracking-widest uppercase">Últimos usuarios</span>
                </div>
                <Link to="/admin/users" className="text-vault-hint text-xs hover:text-vault-green transition-colors">Ver todos</Link>
                </div>
                <div className="flex flex-col gap-3">
                {mockRecentUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 py-2 border-b border-vault-green-dark last:border-0">
                    <div className="w-7 h-7 rounded-full bg-vault-card border border-vault-green-dark flex items-center justify-center text-xs text-vault-green font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <p className="text-vault-text text-xs font-bold">{user.name}</p>
                        <p className="text-vault-hint text-xs">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {user.isNew && (
                        <span className="text-xs bg-vault-green/10 border border-vault-green text-vault-green px-2 py-0.5 rounded tracking-widest">
                            Nuevo
                        </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded tracking-widest border ${
                        user.active
                            ? 'bg-vault-green/10 border-vault-green-dark text-vault-muted'
                            : 'bg-vault-error/10 border-vault-error/30 text-vault-error'
                        }`}>
                        {user.active ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            </div>

            {/* Accesos rápidos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { label: 'Gestionar juegos', to: '/admin/games', desc: 'Añadir, editar y eliminar' },
                { label: 'Gestionar usuarios', to: '/admin/users', desc: 'Activar y desactivar cuentas' },
                { label: 'Ver catálogo', to: '/', desc: 'Como lo ve el usuario' },
                { label: 'Exportar datos', to: '#', desc: 'Próximamente' },
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

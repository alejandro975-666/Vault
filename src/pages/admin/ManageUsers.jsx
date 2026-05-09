import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const mockUsers = [
    { id: 1, name: 'María R.', email: 'maria@mail.com', role: 'user', active: true, joined: '23 abr 2025', purchases: 5, spent: '189.95' },
    { id: 2, name: 'José L.', email: 'jose@mail.com', role: 'user', active: true, joined: '18 mar 2025', purchases: 3, spent: '89.97' },
    { id: 3, name: 'Ana N.', email: 'ana@mail.com', role: 'user', active: false, joined: '2 feb 2025', purchases: 1, spent: '9.99' },
    { id: 4, name: 'Carlos G.', email: 'carlos@mail.com', role: 'admin', active: true, joined: '1 ene 2025', purchases: 8, spent: '342.92' },
    { id: 5, name: 'Laura M.', email: 'laura@mail.com', role: 'user', active: true, joined: '10 may 2025', purchases: 2, spent: '49.98' },
    ]

    export default function ManageUsers() {
    const [users, setUsers] = useState(mockUsers)
    const [search, setSearch] = useState('')
    const [filterRole, setFilterRole] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const filtered = users.filter((u) => {
        if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false
        if (filterRole !== 'all' && u.role !== filterRole) return false
        if (filterStatus === 'active' && !u.active) return false
        if (filterStatus === 'inactive' && u.active) return false
        return true
    })

    const toggleActive = (id) => {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, active: !u.active } : u))
    }

    const toggleRole = (id) => {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u))
    }

    const openModal = (user) => {
        setSelectedUser(user)
        setShowModal(true)
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
                <span className="text-vault-muted">Usuarios</span>
                </div>
                <h1 className="text-vault-green text-2xl font-bold tracking-widest uppercase">Gestión de usuarios</h1>
            </div>
            <div className="flex gap-3 text-xs tracking-widest">
                <div className="bg-vault-dark border border-vault-green-dark rounded px-4 py-2">
                <span className="text-vault-hint">Total: </span>
                <span className="text-vault-green font-bold">{users.length}</span>
                </div>
                <div className="bg-vault-dark border border-vault-green-dark rounded px-4 py-2">
                <span className="text-vault-hint">Activos: </span>
                <span className="text-vault-green font-bold">{users.filter(u => u.active).length}</span>
                </div>
                <div className="bg-vault-dark border border-vault-green-dark rounded px-4 py-2">
                <span className="text-vault-hint">Inactivos: </span>
                <span className="text-vault-error font-bold">{users.filter(u => !u.active).length}</span>
                </div>
            </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-3 mb-6 flex-wrap">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o email..."
                className="bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono w-72"
            />
            <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
            >
                <option value="all">Todos los roles</option>
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
            </select>
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
            >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
            </select>
            </div>

            {/* Tabla */}
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-vault-green-dark">
                <span className="col-span-3 text-vault-hint text-xs tracking-widest uppercase">Usuario</span>
                <span className="col-span-3 text-vault-hint text-xs tracking-widest uppercase">Email</span>
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Rol</span>
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Compras</span>
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Gastado</span>
                <span className="col-span-1 text-vault-hint text-xs tracking-widest uppercase">Estado</span>
                <span className="col-span-2 text-vault-hint text-xs tracking-widest uppercase">Acciones</span>
            </div>

            {filtered.map((user, i) => (
                <div
                key={user.id}
                className={`grid grid-cols-12 gap-4 px-5 py-4 items-center ${
                    i < filtered.length - 1 ? 'border-b border-vault-green-dark' : ''
                } hover:bg-vault-card transition-colors`}
                >
                <div className="col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-vault-card border border-vault-green-dark flex items-center justify-center text-xs font-bold text-vault-green flex-shrink-0">
                    {user.name.charAt(0)}
                    </div>
                    <div>
                    <p className="text-vault-text text-xs font-bold">{user.name}</p>
                    <p className="text-vault-hint text-xs">Desde {user.joined}</p>
                    </div>
                </div>
                <span className="col-span-3 text-vault-muted text-xs truncate">{user.email}</span>
                <span className="col-span-1">
                    <span className={`text-xs px-2 py-1 rounded tracking-widest border ${
                    user.role === 'admin'
                        ? 'bg-vault-warning/10 border-vault-warning text-vault-warning'
                        : 'bg-vault-card border-vault-green-dark text-vault-muted'
                    }`}>
                    {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                </span>
                <span className="col-span-1 text-vault-muted text-xs">{user.purchases}</span>
                <span className="col-span-1 text-vault-green text-xs font-bold">{parseFloat(user.spent).toFixed(2)}€</span>
                <span className="col-span-1">
                    <span className={`text-xs px-2 py-1 rounded tracking-widest border ${
                    user.active
                        ? 'bg-vault-green/10 border-vault-green-dark text-vault-green'
                        : 'bg-vault-error/10 border-vault-error/30 text-vault-error'
                    }`}>
                    {user.active ? 'Activo' : 'Inactivo'}
                    </span>
                </span>
                <div className="col-span-2 flex gap-2">
                    <button
                    onClick={() => openModal(user)}
                    className="text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors border border-vault-green-dark hover:border-vault-green px-3 py-1.5 rounded"
                    >
                    Ver
                    </button>
                    <button
                    onClick={() => toggleActive(user.id)}
                    className={`text-xs tracking-widest uppercase transition-colors border px-3 py-1.5 rounded ${
                        user.active
                        ? 'text-vault-error border-vault-error/30 hover:border-vault-error'
                        : 'text-vault-green border-vault-green-dark hover:border-vault-green'
                    }`}
                    >
                    {user.active ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
                </div>
            ))}

            {filtered.length === 0 && (
                <div className="px-5 py-10 text-center text-vault-hint text-xs tracking-widest">
                No se encontraron usuarios
                </div>
            )}
            </div>

            {/* Modal detalle usuario */}
            {showModal && selectedUser && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 w-full max-w-md font-mono">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-vault-green"></div>
                    <span className="text-vault-muted text-xs tracking-widest uppercase">Detalle de usuario</span>
                    </div>
                    <button onClick={() => setShowModal(false)} className="text-vault-hint hover:text-vault-error transition-colors text-lg">✕</button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-vault-card border-2 border-vault-green flex items-center justify-center text-xl font-bold text-vault-green">
                    {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                    <p className="text-vault-text text-lg font-bold">{selectedUser.name}</p>
                    <p className="text-vault-hint text-xs">{selectedUser.email}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    {[
                    { label: 'Rol', value: selectedUser.role === 'admin' ? 'Administrador' : 'Usuario' },
                    { label: 'Estado', value: selectedUser.active ? 'Activo' : 'Inactivo' },
                    { label: 'Miembro desde', value: selectedUser.joined },
                    { label: 'Compras realizadas', value: selectedUser.purchases },
                    { label: 'Total gastado', value: `${parseFloat(selectedUser.spent).toFixed(2)}€` },
                    ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-vault-green-dark last:border-0">
                        <span className="text-vault-hint text-xs">{item.label}</span>
                        <span className="text-vault-text text-xs font-bold">{item.value}</span>
                    </div>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                    onClick={() => { toggleActive(selectedUser.id); setShowModal(false) }}
                    className={`flex-1 py-2.5 rounded text-xs tracking-widest uppercase font-bold border transition-colors ${
                        selectedUser.active
                        ? 'border-vault-error/30 text-vault-error hover:border-vault-error'
                        : 'border-vault-green-dark text-vault-green hover:border-vault-green'
                    }`}
                    >
                    {selectedUser.active ? 'Desactivar cuenta' : 'Activar cuenta'}
                    </button>
                    <button
                    onClick={() => { toggleRole(selectedUser.id); setShowModal(false) }}
                    className="flex-1 py-2.5 rounded text-xs tracking-widest uppercase font-bold border border-vault-warning/30 text-vault-warning hover:border-vault-warning transition-colors"
                    >
                    {selectedUser.role === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                    </button>
                </div>
                </div>
            </div>
            )}

        </div>
        </div>
    )
}
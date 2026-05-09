import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import GameCard from '../components/ui/GameCard'



    const tabs = ['Biblioteca', 'Lista de deseos', 'Historial', 'Amigos', 'Logros', 'Configuración']

    function Toggle({ value, onChange }) {
    return (
        <button
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${
            value ? 'bg-vault-green' : 'bg-vault-card border border-vault-green-dark'
        }`}
        >
        <div className={`w-3.5 h-3.5 rounded-full bg-vault-black absolute top-0.5 transition-all ${
            value ? 'left-5' : 'left-0.5'
        }`}></div>
        </button>
    )
    }

    function SectionTitle({ title }) {
    return (
        <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-vault-green flex-shrink-0"></div>
        <span className="text-vault-muted text-xs tracking-widest uppercase">{title}</span>
        </div>
    )
    }

    function InputField({ label, type = 'text', defaultValue, placeholder }) {
    return (
        <div>
        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
        />
        </div>
    )
    }

    const statusColors = { online: 'bg-vault-green', busy: 'bg-vault-warning', offline: 'bg-vault-hint' }
    const statusLabels = { online: 'En línea', busy: 'Ocupado', offline: 'Desconectado' }

    export default function Profile() {
    const { user, logout } = useAuth()
    const mockUser = user || { name: 'Alejandro', email: 'alejandro@vault.com' }
    const [activeTab, setActiveTab] = useState('Biblioteca')
    const [activeConfigTab, setActiveConfigTab] = useState('Perfil')

    const [notifications, setNotifications] = useState({
        reviews: true, offers: true, news: false, friends: true, achievements: true
    })
    const [privacy, setPrivacy] = useState({
        publicProfile: true, showLibrary: true, searchHistory: true, showStatus: true, showAchievements: true
    })
    const [security, setSecurity] = useState({ twoFactor: false, parentalControl: false })
    const [status, setStatus] = useState('online')
    const [currency, setCurrency] = useState('EUR')
    const [language, setLanguage] = useState('ES')
    const [country, setCountry] = useState('ES')

    const configTabs = ['Perfil', 'Cuenta', 'Preferencias', 'Privacidad', 'Seguridad', 'Pagos', 'Sesión']

    return (
        <div className="bg-vault-black min-h-screen font-mono">
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Cabecera */}
            <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 mb-8 flex items-center gap-6">
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-vault-card border-2 border-vault-green flex items-center justify-center text-2xl font-bold text-vault-green cursor-pointer hover:border-vault-green-hover transition-colors">
                {mockUser.name?.charAt(0).toUpperCase()}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-vault-black ${statusColors[status]}`}></div>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                <h1 className="text-vault-text text-xl font-bold tracking-wide">{mockUser.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded tracking-widest border ${
                    status === 'online' ? 'border-vault-green text-vault-green' :
                    status === 'busy' ? 'border-vault-warning text-vault-warning' :
                    'border-vault-hint text-vault-hint'
                }`}>
                    {statusLabels[status]}
                </span>
                </div>
                <p className="text-vault-hint text-xs tracking-widest mb-3">{mockUser.email}</p>
                <div className="flex gap-6">
                <div className="text-center">
                    <div className="text-vault-green text-lg font-bold">{mockLibrary.length}</div>
                    <div className="text-vault-hint text-xs tracking-widest uppercase">Juegos</div>
                </div>
                <div className="text-center">
                    <div className="text-vault-green text-lg font-bold">{mockWishlist.length}</div>
                    <div className="text-vault-hint text-xs tracking-widest uppercase">Deseos</div>
                </div>
                <div className="text-center">
                    <div className="text-vault-green text-lg font-bold">{mockFriends.length}</div>
                    <div className="text-vault-hint text-xs tracking-widest uppercase">Amigos</div>
                </div>
                <div className="text-center">
                    <div className="text-vault-green text-lg font-bold">
                    {mockPurchases.reduce((acc, p) => acc + parseFloat(p.price_paid), 0).toFixed(2)}€
                    </div>
                    <div className="text-vault-hint text-xs tracking-widest uppercase">Gastado</div>
                </div>
                <div className="text-center">
                    <div className="text-vault-green text-lg font-bold">318h</div>
                    <div className="text-vault-hint text-xs tracking-widest uppercase">Jugadas</div>
                </div>
                </div>
            </div>
            </div>

            {/* Tabs principales */}
            <div className="flex gap-1 mb-6 border-b border-vault-green-dark overflow-x-auto">
            {tabs.map((tab) => (
                <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-colors whitespace-nowrap ${
                    activeTab === tab
                    ? 'text-vault-green border-b-2 border-vault-green'
                    : 'text-vault-hint hover:text-vault-muted'
                }`}
                >
                {tab}
                </button>
            ))}
            </div>

            {/* BIBLIOTECA */}
            {activeTab === 'Biblioteca' && (
            <div>
                <p className="text-vault-hint text-xs tracking-widest mb-6">{mockLibrary.length} juegos en tu biblioteca</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockLibrary.map((game) => <GameCard key={game.id} game={game} />)}
                </div>
            </div>
            )}

            {/* LISTA DE DESEOS */}
            {activeTab === 'Lista de deseos' && (
            <div>
                <p className="text-vault-hint text-xs tracking-widest mb-6">{mockWishlist.length} juegos en tu lista</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockWishlist.map((game) => <GameCard key={game.id} game={game} />)}
                </div>
            </div>
            )}

            {/* HISTORIAL */}
            {activeTab === 'Historial' && (
            <div className="flex flex-col gap-3">
                {mockPurchases.map((purchase) => (
                <div key={purchase.id} className="bg-vault-dark border border-vault-green-dark rounded-lg px-5 py-4 flex items-center justify-between">
                    <div>
                    <p className="text-vault-text text-sm font-bold mb-1">{purchase.game.title}</p>
                    <p className="text-vault-hint text-xs">{purchase.purchased_at}</p>
                    </div>
                    <div className="flex items-center gap-4">
                    <span className="text-vault-green font-bold text-sm">{parseFloat(purchase.price_paid).toFixed(2)}€</span>
                    <span className="bg-vault-card border border-vault-green text-vault-green text-xs px-3 py-1 rounded tracking-widest">✓ En biblioteca</span>
                    <button className="text-vault-hint text-xs hover:text-vault-warning transition-colors tracking-widest uppercase">Reembolso</button>
                    </div>
                </div>
                ))}
            </div>
            )}

            {/* AMIGOS */}
            {activeTab === 'Amigos' && (
            <div>
                <div className="flex items-center justify-between mb-6">
                <p className="text-vault-hint text-xs tracking-widest">{mockFriends.length} amigos</p>
                <div className="flex gap-2">
                    <input
                    type="text"
                    placeholder="Buscar por nombre de usuario..."
                    className="bg-vault-card border border-vault-green-dark rounded px-4 py-2 text-vault-text text-xs focus:outline-none focus:border-vault-green transition-colors font-mono w-64"
                    />
                    <button className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-4 py-2 rounded transition-colors">
                    Añadir
                    </button>
                </div>
                </div>
                <div className="flex flex-col gap-3">
                {mockFriends.map((friend) => (
                    <div key={friend.id} className="bg-vault-dark border border-vault-green-dark rounded-lg px-5 py-4 flex items-center gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-vault-card border border-vault-green-dark flex items-center justify-center text-sm font-bold text-vault-green">
                        {friend.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-vault-black ${statusColors[friend.status]}`}></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-vault-text text-sm font-bold">{friend.name}</p>
                        <p className="text-vault-hint text-xs">
                        {friend.game ? `Jugando a ${friend.game}` : statusLabels[friend.status]}
                        </p>
                    </div>
                    <button className="text-vault-error text-xs tracking-widest uppercase hover:text-red-400 transition-colors">
                        Eliminar
                    </button>
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* LOGROS */}
            {activeTab === 'Logros' && (
            <div>
                <p className="text-vault-hint text-xs tracking-widest mb-6">
                {mockAchievements.filter(a => a.unlocked).length} / {mockAchievements.length} logros desbloqueados
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className={`bg-vault-dark border rounded-lg px-5 py-4 flex items-center gap-4 ${
                    achievement.unlocked ? 'border-vault-green' : 'border-vault-green-dark opacity-50'
                    }`}>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg ${
                        achievement.unlocked ? 'border-vault-green text-vault-green' : 'border-vault-green-dark text-vault-hint'
                    }`}>
                        {achievement.unlocked ? '★' : '☆'}
                    </div>
                    <div>
                        <p className={`text-sm font-bold mb-1 ${achievement.unlocked ? 'text-vault-text' : 'text-vault-hint'}`}>
                        {achievement.title}
                        </p>
                        <p className="text-vault-hint text-xs">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                        <span className="ml-auto text-vault-green text-xs tracking-widest">✓ Desbloqueado</span>
                    )}
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* CONFIGURACIÓN */}
            {activeTab === 'Configuración' && (
            <div className="flex gap-6">

                {/* Sub-tabs configuración */}
                <div className="w-44 min-w-44 flex flex-col gap-1">
                {configTabs.map((tab) => (
                    <button
                    key={tab}
                    onClick={() => setActiveConfigTab(tab)}
                    className={`text-left px-4 py-2.5 rounded text-xs tracking-widest uppercase transition-colors ${
                        activeConfigTab === tab
                        ? 'bg-vault-green text-vault-black font-bold'
                        : 'text-vault-hint hover:text-vault-green hover:bg-vault-card'
                    }`}
                    >
                    {activeConfigTab === tab ? '▶ ' : ''}{tab}
                    </button>
                ))}
                </div>

                {/* Contenido sub-tabs */}
                <div className="flex-1">

                {/* PERFIL */}
                {activeConfigTab === 'Perfil' && (
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                    <SectionTitle title="Información pública" />

                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 rounded-full bg-vault-card border-2 border-vault-green-dark flex items-center justify-center text-2xl font-bold text-vault-green">
                        {mockUser.name?.charAt(0).toUpperCase()}
                        </div>
                        <button className="text-vault-green text-xs tracking-widest uppercase hover:text-vault-green-hover transition-colors border border-vault-green-dark px-4 py-2 rounded">
                        Cambiar avatar
                        </button>
                    </div>

                    <InputField label="Nombre de usuario (público)" defaultValue={mockUser.name} />
                    <InputField label="Nombre real (privado)" defaultValue="Alejandro García" />
                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Resumen del perfil</label>
                        <textarea
                        rows={3}
                        placeholder="Cuéntanos algo sobre ti..."
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Estado online</label>
                        <div className="flex gap-2">
                        {['online', 'busy', 'offline'].map((s) => (
                            <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`flex items-center gap-2 px-4 py-2 rounded text-xs tracking-widest uppercase border transition-colors ${
                                status === s
                                ? 'border-vault-green bg-vault-green/10 text-vault-green'
                                : 'border-vault-green-dark text-vault-hint hover:border-vault-green'
                            }`}
                            >
                            <div className={`w-2 h-2 rounded-full ${statusColors[s]}`}></div>
                            {statusLabels[s]}
                            </button>
                        ))}
                        </div>
                    </div>
                    <button className="self-start bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                        Guardar perfil
                    </button>
                    </div>
                )}

                {/* CUENTA */}
                {activeConfigTab === 'Cuenta' && (
                    <div className="flex flex-col gap-6">
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                        <SectionTitle title="Datos de cuenta" />
                        <InputField label="Email" type="email" defaultValue={mockUser.email} />
                        <InputField label="País / Región" defaultValue="España" />
                        <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Fecha de nacimiento</label>
                        <input
                            type="date"
                            className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                        />
                        </div>
                        <button className="self-start bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                        Guardar cambios
                        </button>
                    </div>

                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                        <SectionTitle title="Cambiar contraseña" />
                        <InputField label="Contraseña actual" type="password" placeholder="••••••••" />
                        <InputField label="Nueva contraseña" type="password" placeholder="••••••••" />
                        <InputField label="Confirmar contraseña" type="password" placeholder="••••••••" />
                        <button className="self-start bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                        Cambiar contraseña
                        </button>
                    </div>
                    </div>
                )}

                {/* PREFERENCIAS */}
                {activeConfigTab === 'Preferencias' && (
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-6">
                    <SectionTitle title="Preferencias generales" />

                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Idioma</label>
                        <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                        >
                        <option value="ES">Español</option>
                        <option value="EN">English</option>
                        <option value="FR">Français</option>
                        <option value="DE">Deutsch</option>
                        <option value="PT">Português</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Moneda</label>
                        <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                        >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dólar ($)</option>
                        <option value="GBP">Libra (£)</option>
                        <option value="JPY">Yen (¥)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">País</label>
                        <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono"
                        >
                        <option value="ES">España</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="US">Estados Unidos</option>
                        <option value="GB">Reino Unido</option>
                        </select>
                    </div>

                    <div className="border-t border-vault-green-dark pt-4">
                        <p className="text-vault-muted text-xs tracking-widest uppercase mb-3">Notificaciones</p>
                        <div className="flex flex-col gap-3">
                        {[
                            { key: 'reviews', label: 'Nuevas reseñas en mis juegos' },
                            { key: 'offers', label: 'Ofertas y descuentos' },
                            { key: 'news', label: 'Novedades del catálogo' },
                            { key: 'friends', label: 'Actividad de amigos' },
                            { key: 'achievements', label: 'Logros desbloqueados' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                            <span className="text-vault-muted text-xs">{item.label}</span>
                            <Toggle value={notifications[item.key]} onChange={(v) => setNotifications((n) => ({ ...n, [item.key]: v }))} />
                            </div>
                        ))}
                        </div>
                    </div>

                    <button className="self-start bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                        Guardar preferencias
                    </button>
                    </div>
                )}

                {/* PRIVACIDAD */}
                {activeConfigTab === 'Privacidad' && (
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-6">
                    <SectionTitle title="Configuración de privacidad" />

                    <div className="flex flex-col gap-4">
                        {[
                        { key: 'publicProfile', label: 'Perfil público', desc: 'Otros usuarios pueden ver tu perfil' },
                        { key: 'showLibrary', label: 'Mostrar biblioteca', desc: 'Visible para tus amigos' },
                        { key: 'showStatus', label: 'Mostrar estado online', desc: 'Otros ven si estás conectado' },
                        { key: 'showAchievements', label: 'Mostrar logros', desc: 'Visible en tu perfil público' },
                        { key: 'searchHistory', label: 'Guardar historial de búsquedas', desc: 'Mejora las recomendaciones del feed' },
                        ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-2 border-b border-vault-green-dark last:border-0">
                            <div>
                            <p className="text-vault-text text-xs font-bold mb-0.5">{item.label}</p>
                            <p className="text-vault-hint text-xs">{item.desc}</p>
                            </div>
                            <Toggle value={privacy[item.key]} onChange={(v) => setPrivacy((p) => ({ ...p, [item.key]: v }))} />
                        </div>
                        ))}
                    </div>

                    <div className="border-t border-vault-green-dark pt-4">
                        <button className="text-vault-warning hover:text-yellow-300 text-xs tracking-widest uppercase transition-colors">
                        ⚠ Borrar historial de búsquedas
                        </button>
                    </div>
                    </div>
                )}

                {/* SEGURIDAD */}
                {activeConfigTab === 'Seguridad' && (
                    <div className="flex flex-col gap-6">
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                        <SectionTitle title="Seguridad de la cuenta" />

                        <div className="flex items-center justify-between py-2 border-b border-vault-green-dark">
                        <div>
                            <p className="text-vault-text text-xs font-bold mb-0.5">Autenticación en dos pasos</p>
                            <p className="text-vault-hint text-xs">Añade una capa extra de seguridad a tu cuenta</p>
                        </div>
                        <Toggle value={security.twoFactor} onChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))} />
                        </div>

                        {security.twoFactor && (
                        <div className="bg-vault-card border border-vault-green rounded p-4">
                            <p className="text-vault-green text-xs tracking-wide mb-2">✓ Autenticación en dos pasos activada</p>
                            <p className="text-vault-hint text-xs">Se enviará un código a tu email cada vez que inicies sesión.</p>
                        </div>
                        )}

                        <div className="flex items-center justify-between py-2 border-b border-vault-green-dark">
                        <div>
                            <p className="text-vault-text text-xs font-bold mb-0.5">Control parental</p>
                            <p className="text-vault-hint text-xs">Restringe el acceso a contenido para adultos</p>
                        </div>
                        <Toggle value={security.parentalControl} onChange={(v) => setSecurity((s) => ({ ...s, parentalControl: v }))} />
                        </div>

                        {security.parentalControl && (
                        <div>
                            <InputField label="PIN de control parental" type="password" placeholder="••••" />
                        </div>
                        )}
                    </div>

                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-4">
                        <SectionTitle title="Actividad reciente" />
                        {[
                        { device: 'Chrome — Windows', location: 'Murcia, España', time: 'Ahora mismo', current: true },
                        { device: 'Opera — Windows', location: 'Murcia, España', time: 'Hace 2 días', current: false },
                        ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-vault-green-dark last:border-0">
                            <div>
                            <p className="text-vault-text text-xs font-bold mb-0.5">{session.device}</p>
                            <p className="text-vault-hint text-xs">{session.location} · {session.time}</p>
                            </div>
                            {session.current ? (
                            <span className="text-vault-green text-xs tracking-widest">Sesión actual</span>
                            ) : (
                            <button className="text-vault-error text-xs tracking-widest uppercase hover:text-red-400 transition-colors">
                                Cerrar
                            </button>
                            )}
                        </div>
                        ))}
                        <button className="self-start text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors mt-2">
                        → Cerrar todas las sesiones
                        </button>
                    </div>
                    </div>
                )}

                {/* PAGOS */}
                {activeConfigTab === 'Pagos' && (
                    <div className="flex flex-col gap-6">
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                        <SectionTitle title="Métodos de pago" />
                        <div className="bg-vault-card border border-vault-green-dark rounded-lg px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-7 bg-vault-dark border border-vault-green-dark rounded flex items-center justify-center text-xs text-vault-muted font-bold">
                            VISA
                            </div>
                            <div>
                            <p className="text-vault-text text-xs font-bold">•••• •••• •••• 4242</p>
                            <p className="text-vault-hint text-xs">Caduca 12/27</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-vault-green text-xs tracking-widest">Principal</span>
                            <button className="text-vault-error text-xs tracking-widest uppercase hover:text-red-400 transition-colors">Eliminar</button>
                        </div>
                        </div>
                        <button className="self-start border border-vault-green-dark hover:border-vault-green text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors">
                        + Añadir método de pago
                        </button>
                    </div>

                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-4">
                        <SectionTitle title="Saldo en cuenta" />
                        <div className="flex items-center justify-between">
                        <div>
                            <p className="text-vault-green text-3xl font-bold">0,00€</p>
                            <p className="text-vault-hint text-xs mt-1">Saldo disponible en Vault</p>
                        </div>
                        <button className="bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-colors">
                            Añadir saldo
                        </button>
                        </div>
                    </div>

                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-4">
                        <SectionTitle title="Historial de reembolsos" />
                        <p className="text-vault-hint text-xs">No tienes solicitudes de reembolso.</p>
                        <p className="text-vault-hint text-xs">Puedes solicitar un reembolso desde el historial de compras en un plazo de 14 días.</p>
                    </div>
                    </div>
                )}

                {/* SESIÓN */}
                {activeConfigTab === 'Sesión' && (
                    <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                    <SectionTitle title="Gestión de sesión" />

                    <div className="flex flex-col gap-3">
                        <button className="self-start text-vault-muted hover:text-vault-green text-xs tracking-widest uppercase transition-colors">
                        → Cerrar sesión en todos los dispositivos
                        </button>
                        <button
                        onClick={logout}
                        className="self-start text-vault-error hover:text-red-400 text-xs tracking-widest uppercase transition-colors"
                        >
                        ✕ Cerrar sesión
                        </button>
                    </div>

                    <div className="border-t border-vault-green-dark pt-5">
                        <SectionTitle title="Zona de peligro" />
                        <div className="bg-vault-error/5 border border-vault-error/30 rounded-lg p-4 flex flex-col gap-3">
                        <p className="text-vault-error text-xs tracking-wide">⚠ Esta acción es irreversible. Se eliminarán todos tus datos, biblioteca y compras.</p>
                        <button className="self-start text-vault-error hover:text-red-400 text-xs tracking-widest uppercase transition-colors border border-vault-error/30 hover:border-vault-error px-4 py-2 rounded">
                            Eliminar cuenta permanentemente
                        </button>
                        </div>
                    </div>
                    </div>
                )}

                </div>
            </div>
            )}

        </div>
        </div>
    )
}

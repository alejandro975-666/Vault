import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import GameCard from '../components/ui/GameCard'
import Spinner from '../components/ui/Spinner'
import { getLibrary, getPurchases } from '../api/purchases'
import { getWishlist } from '../api/wishlist'
 
const tabs = ['Biblioteca', 'Lista de deseos', 'Historial', 'Configuración']
 
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
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Biblioteca')
  const [activeConfigTab, setActiveConfigTab] = useState('Perfil')
  const [status, setStatus] = useState('online')
 
  const [library, setLibrary] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
 
  const [notifications, setNotifications] = useState({
    reviews: true, offers: true, news: false, friends: true, achievements: true
  })
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showLibrary: true, searchHistory: true, showStatus: true, showAchievements: true
  })
 
  useEffect(() => {
    Promise.all([getLibrary(), getWishlist(), getPurchases()])
      .then(([libRes, wishRes, purRes]) => {
        setLibrary(libRes.data)
        setWishlist(wishRes.data)
        setPurchases(purRes.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])
 
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }
 
  const configTabs = ['Perfil', 'Cuenta', 'Privacidad', 'Sesión']
 
  if (loading) {
    return (
      <div className="bg-vault-black min-h-screen flex items-center justify-center">
        <Spinner text="Cargando perfil..." />
      </div>
    )
  }
 
  return (
    <div className="bg-vault-black min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-6 py-10">
 
        {/* Cabecera */}
        <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 mb-8 flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-vault-card border-2 border-vault-green flex items-center justify-center text-2xl font-bold text-vault-green">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-vault-black ${statusColors[status]}`}></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-vault-text text-xl font-bold tracking-wide">{user?.name}</h1>
              <span className={`text-xs px-2 py-0.5 rounded tracking-widest border ${
                status === 'online' ? 'border-vault-green text-vault-green' :
                status === 'busy'   ? 'border-vault-warning text-vault-warning' :
                                      'border-vault-hint text-vault-hint'
              }`}>
                {statusLabels[status]}
              </span>
            </div>
            <p className="text-vault-hint text-xs tracking-widest mb-3">{user?.email}</p>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-vault-green text-lg font-bold">{library.length}</div>
                <div className="text-vault-hint text-xs tracking-widest uppercase">Juegos</div>
              </div>
              <div className="text-center">
                <div className="text-vault-green text-lg font-bold">{wishlist.length}</div>
                <div className="text-vault-hint text-xs tracking-widest uppercase">Deseos</div>
              </div>
              <div className="text-center">
                <div className="text-vault-green text-lg font-bold">
                  {purchases.reduce((acc, p) => acc + parseFloat(p.price_paid), 0).toFixed(2)}€
                </div>
                <div className="text-vault-hint text-xs tracking-widest uppercase">Gastado</div>
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
            <p className="text-vault-hint text-xs tracking-widests mb-6">{library.length} juegos en tu biblioteca</p>
            {library.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-vault-hint text-sm">Aún no tienes juegos. ¡Explora el catálogo!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {library.map((item) => (
                  <div key={item.id} className="bg-vault-dark border border-vault-green-dark rounded-lg overflow-hidden flex flex-col hover:border-vault-green transition-colors">
                    {/* Imagen */}
                    <div className="h-36 bg-vault-card overflow-hidden relative">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-vault-hint text-4xl font-bold">V</div>
                      }
                      <div className="absolute top-2 right-2 bg-vault-green text-vault-black text-xs font-bold px-2 py-0.5 rounded tracking-widest">
                        ✓ Tuyo
                      </div>
                     </div>
                    {/* Info */}
                    <div className="p-4 flex flex-col gap-2 flex-1 font-mono">
                      <p className="text-vault-text text-sm font-bold truncate">{item.title}</p>
                      <p className="text-vault-hint text-xs">{item.platform}</p>
                      {/* Clave de activación */}
                      <div className="bg-vault-card border border-vault-green-dark rounded px-3 py-2 mt-1">
                        <p className="text-vault-hint text-xs tracking-widest uppercase mb-1">Clave</p>
                        <p className="text-vault-green text-xs font-bold tracking-widest">{item.activation_key}</p>
                      </div>
                      {/* Precio pagado */}
                      <div className="mt-auto pt-2 border-t border-vault-green-dark flex justify-between items-center">
                        <span className="text-vault-hint text-xs tracking-widest uppercase">Pagado</span>
                        <span className="text-vault-green font-bold text-sm">
                          {item.price_paid ? parseFloat(item.price_paid).toFixed(2) + '€' : 'Gratis'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
 
        {/* LISTA DE DESEOS */}
        {activeTab === 'Lista de deseos' && (
          <div>
            <p className="text-vault-hint text-xs tracking-widest mb-6">{wishlist.length} juegos en tu lista</p>
            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-vault-hint text-sm">Tu lista de deseos está vacía.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((game) => <GameCard key={game.id} game={game} />)}
              </div>
            )}
          </div>
        )}
 
        {/* HISTORIAL */}
        {activeTab === 'Historial' && (
          <div className="flex flex-col gap-3">
            {purchases.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-vault-hint text-sm">No tienes compras aún.</p>
              </div>
            ) : (
              purchases.map((purchase) => (
                <div key={purchase.id} className="bg-vault-dark border border-vault-green-dark rounded-lg px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-vault-text text-sm font-bold mb-1">{purchase.game?.title}</p>
                    <p className="text-vault-hint text-xs">{new Date(purchase.purchased_at).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-vault-green font-bold text-sm">{parseFloat(purchase.price_paid).toFixed(2)}€</span>
                    <span className="bg-vault-card border border-vault-green text-vault-green text-xs px-3 py-1 rounded tracking-widest">✓ En biblioteca</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
 
        {/* CONFIGURACIÓN */}
        {activeTab === 'Configuración' && (
          <div className="flex gap-6">
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
 
            <div className="flex-1">
 
              {activeConfigTab === 'Perfil' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                  <SectionTitle title="Información pública" />
                  <InputField label="Nombre de usuario" defaultValue={user?.name} />
                  <InputField label="Email" type="email" defaultValue={user?.email} />
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
                    Guardar cambios
                  </button>
                </div>
              )}
 
              {activeConfigTab === 'Cuenta' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                  <SectionTitle title="Cambiar contraseña" />
                  <InputField label="Contraseña actual" type="password" placeholder="••••••••" />
                  <InputField label="Nueva contraseña" type="password" placeholder="••••••••" />
                  <InputField label="Confirmar contraseña" type="password" placeholder="••••••••" />
                  <button className="self-start bg-vault-green hover:bg-vault-green-hover text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                    Cambiar contraseña
                  </button>
                </div>
              )}
 
              {activeConfigTab === 'Privacidad' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-6">
                  <SectionTitle title="Configuración de privacidad" />
                  <div className="flex flex-col gap-4">
                    {[
                      { key: 'publicProfile',    label: 'Perfil público',                desc: 'Otros usuarios pueden ver tu perfil' },
                      { key: 'showLibrary',      label: 'Mostrar biblioteca',            desc: 'Visible para tus amigos' },
                      { key: 'showStatus',       label: 'Mostrar estado online',         desc: 'Otros ven si estás conectado' },
                      { key: 'showAchievements', label: 'Mostrar logros',                desc: 'Visible en tu perfil público' },
                      { key: 'searchHistory',    label: 'Guardar historial de búsquedas', desc: 'Mejora las recomendaciones' },
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
                </div>
              )}
 
              {activeConfigTab === 'Sesión' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                  <SectionTitle title="Gestión de sesión" />
                  <button
                    onClick={handleLogout}
                    className="self-start text-vault-error hover:text-red-400 text-xs tracking-widest uppercase transition-colors border border-vault-error/30 hover:border-vault-error px-5 py-2.5 rounded"
                  >
                    ✕ Cerrar sesión
                  </button>
                  <div className="border-t border-vault-green-dark pt-5">
                    <SectionTitle title="Zona de peligro" />
                    <div className="bg-vault-error/5 border border-vault-error/30 rounded-lg p-4">
                      <p className="text-vault-error text-xs tracking-wide mb-3">⚠ Esta acción es irreversible.</p>
                      <button className="text-vault-error hover:text-red-400 text-xs tracking-widest uppercase transition-colors border border-vault-error/30 hover:border-vault-error px-4 py-2 rounded">
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

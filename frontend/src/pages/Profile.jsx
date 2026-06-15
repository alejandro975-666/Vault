import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import GameCard from '../components/ui/GameCard'
import Spinner from '../components/ui/Spinner'
import { getLibrary, getPurchases } from '../api/purchases'
import { getWishlist } from '../api/wishlist'
import api from '../api/axios'

const tabs = ['Biblioteca', 'Lista de deseos', 'Historial', 'Configuración']

const THEMES = [
  { key: 'green',  label: 'Vault Green',  color: '#39ff14' },
  { key: 'cyan',   label: 'Cyber Cyan',   color: '#00ffff' },
  { key: 'purple', label: 'Neon Purple',  color: '#bf00ff' },
  { key: 'orange', label: 'Rust Orange',  color: '#ff6a00' },
  { key: 'red',    label: 'Alert Red',    color: '#ff2020' },
]

const COUNTRIES = [
  { name: 'Afghanistan',              flag: '🇦🇫' },
  { name: 'Albania',                  flag: '🇦🇱' },
  { name: 'Algeria',                  flag: '🇩🇿' },
  { name: 'Andorra',                  flag: '🇦🇩' },
  { name: 'Angola',                   flag: '🇦🇴' },
  { name: 'Argentina',                flag: '🇦🇷' },
  { name: 'Armenia',                  flag: '🇦🇲' },
  { name: 'Australia',                flag: '🇦🇺' },
  { name: 'Austria',                  flag: '🇦🇹' },
  { name: 'Azerbaijan',               flag: '🇦🇿' },
  { name: 'Bahamas',                  flag: '🇧🇸' },
  { name: 'Bahrain',                  flag: '🇧🇭' },
  { name: 'Bangladesh',               flag: '🇧🇩' },
  { name: 'Belarus',                  flag: '🇧🇾' },
  { name: 'Belgium',                  flag: '🇧🇪' },
  { name: 'Belize',                   flag: '🇧🇿' },
  { name: 'Benin',                    flag: '🇧🇯' },
  { name: 'Bolivia',                  flag: '🇧🇴' },
  { name: 'Bosnia y Herzegovina',     flag: '🇧🇦' },
  { name: 'Botswana',                 flag: '🇧🇼' },
  { name: 'Brasil',                   flag: '🇧🇷' },
  { name: 'Brunei',                   flag: '🇧🇳' },
  { name: 'Bulgaria',                 flag: '🇧🇬' },
  { name: 'Burkina Faso',             flag: '🇧🇫' },
  { name: 'Burundi',                  flag: '🇧🇮' },
  { name: 'Cabo Verde',               flag: '🇨🇻' },
  { name: 'Camboya',                  flag: '🇰🇭' },
  { name: 'Camerún',                  flag: '🇨🇲' },
  { name: 'Canadá',                   flag: '🇨🇦' },
  { name: 'Chad',                     flag: '🇹🇩' },
  { name: 'Chile',                    flag: '🇨🇱' },
  { name: 'China',                    flag: '🇨🇳' },
  { name: 'Colombia',                 flag: '🇨🇴' },
  { name: 'Comoras',                  flag: '🇰🇲' },
  { name: 'Congo',                    flag: '🇨🇬' },
  { name: 'Corea del Norte',          flag: '🇰🇵' },
  { name: 'Corea del Sur',            flag: '🇰🇷' },
  { name: 'Costa de Marfil',          flag: '🇨🇮' },
  { name: 'Costa Rica',               flag: '🇨🇷' },
  { name: 'Croacia',                  flag: '🇭🇷' },
  { name: 'Cuba',                     flag: '🇨🇺' },
  { name: 'Dinamarca',                flag: '🇩🇰' },
  { name: 'Djibouti',                 flag: '🇩🇯' },
  { name: 'Ecuador',                  flag: '🇪🇨' },
  { name: 'Egipto',                   flag: '🇪🇬' },
  { name: 'El Salvador',              flag: '🇸🇻' },
  { name: 'Emiratos Árabes Unidos',   flag: '🇦🇪' },
  { name: 'Eritrea',                  flag: '🇪🇷' },
  { name: 'Eslovaquia',               flag: '🇸🇰' },
  { name: 'Eslovenia',                flag: '🇸🇮' },
  { name: 'España',                   flag: '🇪🇸' },
  { name: 'Estados Unidos',           flag: '🇺🇸' },
  { name: 'Estonia',                  flag: '🇪🇪' },
  { name: 'Etiopía',                  flag: '🇪🇹' },
  { name: 'Filipinas',                flag: '🇵🇭' },
  { name: 'Finlandia',                flag: '🇫🇮' },
  { name: 'Fiyi',                     flag: '🇫🇯' },
  { name: 'Francia',                  flag: '🇫🇷' },
  { name: 'Gabón',                    flag: '🇬🇦' },
  { name: 'Gambia',                   flag: '🇬🇲' },
  { name: 'Georgia',                  flag: '🇬🇪' },
  { name: 'Ghana',                    flag: '🇬🇭' },
  { name: 'Grecia',                   flag: '🇬🇷' },
  { name: 'Guatemala',                flag: '🇬🇹' },
  { name: 'Guinea',                   flag: '🇬🇳' },
  { name: 'Guinea Ecuatorial',        flag: '🇬🇶' },
  { name: 'Guinea-Bisáu',             flag: '🇬🇼' },
  { name: 'Guyana',                   flag: '🇬🇾' },
  { name: 'Haití',                    flag: '🇭🇹' },
  { name: 'Honduras',                 flag: '🇭🇳' },
  { name: 'Hungría',                  flag: '🇭🇺' },
  { name: 'India',                    flag: '🇮🇳' },
  { name: 'Indonesia',                flag: '🇮🇩' },
  { name: 'Irak',                     flag: '🇮🇶' },
  { name: 'Irán',                     flag: '🇮🇷' },
  { name: 'Irlanda',                  flag: '🇮🇪' },
  { name: 'Islandia',                 flag: '🇮🇸' },
  { name: 'Israel',                   flag: '🇮🇱' },
  { name: 'Italia',                   flag: '🇮🇹' },
  { name: 'Jamaica',                  flag: '🇯🇲' },
  { name: 'Japón',                    flag: '🇯🇵' },
  { name: 'Jordania',                 flag: '🇯🇴' },
  { name: 'Kazajistán',               flag: '🇰🇿' },
  { name: 'Kenia',                    flag: '🇰🇪' },
  { name: 'Kirguistán',               flag: '🇰🇬' },
  { name: 'Kuwait',                   flag: '🇰🇼' },
  { name: 'Laos',                     flag: '🇱🇦' },
  { name: 'Letonia',                  flag: '🇱🇻' },
  { name: 'Líbano',                   flag: '🇱🇧' },
  { name: 'Liberia',                  flag: '🇱🇷' },
  { name: 'Libia',                    flag: '🇱🇾' },
  { name: 'Liechtenstein',            flag: '🇱🇮' },
  { name: 'Lituania',                 flag: '🇱🇹' },
  { name: 'Luxemburgo',               flag: '🇱🇺' },
  { name: 'Madagascar',               flag: '🇲🇬' },
  { name: 'Malasia',                  flag: '🇲🇾' },
  { name: 'Malaui',                   flag: '🇲🇼' },
  { name: 'Maldivas',                 flag: '🇲🇻' },
  { name: 'Malí',                     flag: '🇲🇱' },
  { name: 'Malta',                    flag: '🇲🇹' },
  { name: 'Marruecos',                flag: '🇲🇦' },
  { name: 'Mauritania',               flag: '🇲🇷' },
  { name: 'México',                   flag: '🇲🇽' },
  { name: 'Moldavia',                 flag: '🇲🇩' },
  { name: 'Mónaco',                   flag: '🇲🇨' },
  { name: 'Mongolia',                 flag: '🇲🇳' },
  { name: 'Montenegro',               flag: '🇲🇪' },
  { name: 'Mozambique',               flag: '🇲🇿' },
  { name: 'Myanmar',                  flag: '🇲🇲' },
  { name: 'Namibia',                  flag: '🇳🇦' },
  { name: 'Nepal',                    flag: '🇳🇵' },
  { name: 'Nicaragua',                flag: '🇳🇮' },
  { name: 'Níger',                    flag: '🇳🇪' },
  { name: 'Nigeria',                  flag: '🇳🇬' },
  { name: 'Noruega',                  flag: '🇳🇴' },
  { name: 'Nueva Zelanda',            flag: '🇳🇿' },
  { name: 'Omán',                     flag: '🇴🇲' },
  { name: 'Países Bajos',             flag: '🇳🇱' },
  { name: 'Pakistán',                 flag: '🇵🇰' },
  { name: 'Panamá',                   flag: '🇵🇦' },
  { name: 'Papua Nueva Guinea',       flag: '🇵🇬' },
  { name: 'Paraguay',                 flag: '🇵🇾' },
  { name: 'Perú',                     flag: '🇵🇪' },
  { name: 'Polonia',                  flag: '🇵🇱' },
  { name: 'Portugal',                 flag: '🇵🇹' },
  { name: 'Puerto Rico',              flag: '🇵🇷' },
  { name: 'Qatar',                    flag: '🇶🇦' },
  { name: 'Reino Unido',              flag: '🇬🇧' },
  { name: 'República Checa',          flag: '🇨🇿' },
  { name: 'República Dominicana',     flag: '🇩🇴' },
  { name: 'Ruanda',                   flag: '🇷🇼' },
  { name: 'Rumanía',                  flag: '🇷🇴' },
  { name: 'Rusia',                    flag: '🇷🇺' },
  { name: 'San Marino',               flag: '🇸🇲' },
  { name: 'Santo Tomé y Príncipe',    flag: '🇸🇹' },
  { name: 'Arabia Saudita',           flag: '🇸🇦' },
  { name: 'Senegal',                  flag: '🇸🇳' },
  { name: 'Serbia',                   flag: '🇷🇸' },
  { name: 'Sierra Leona',             flag: '🇸🇱' },
  { name: 'Singapur',                 flag: '🇸🇬' },
  { name: 'Siria',                    flag: '🇸🇾' },
  { name: 'Somalia',                  flag: '🇸🇴' },
  { name: 'Sri Lanka',                flag: '🇱🇰' },
  { name: 'Sudáfrica',                flag: '🇿🇦' },
  { name: 'Sudán',                    flag: '🇸🇩' },
  { name: 'Suecia',                   flag: '🇸🇪' },
  { name: 'Suiza',                    flag: '🇨🇭' },
  { name: 'Surinam',                  flag: '🇸🇷' },
  { name: 'Tailandia',                flag: '🇹🇭' },
  { name: 'Tanzania',                 flag: '🇹🇿' },
  { name: 'Tayikistán',               flag: '🇹🇯' },
  { name: 'Timor Oriental',           flag: '🇹🇱' },
  { name: 'Togo',                     flag: '🇹🇬' },
  { name: 'Trinidad y Tobago',        flag: '🇹🇹' },
  { name: 'Túnez',                    flag: '🇹🇳' },
  { name: 'Turkmenistán',             flag: '🇹🇲' },
  { name: 'Turquía',                  flag: '🇹🇷' },
  { name: 'Ucrania',                  flag: '🇺🇦' },
  { name: 'Uganda',                   flag: '🇺🇬' },
  { name: 'Uruguay',                  flag: '🇺🇾' },
  { name: 'Uzbekistán',               flag: '🇺🇿' },
  { name: 'Venezuela',                flag: '🇻🇪' },
  { name: 'Vietnam',                  flag: '🇻🇳' },
  { name: 'Yemen',                    flag: '🇾🇪' },
  { name: 'Zambia',                   flag: '🇿🇲' },
  { name: 'Zimbabue',                 flag: '🇿🇼' },
]

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

const statusColors = { online: 'bg-vault-green', busy: 'bg-vault-warning', offline: 'bg-vault-hint' }
const statusLabels = { online: 'En línea', busy: 'Ocupado', offline: 'Desconectado' }

const getLevel = (gamesCount) => {
  if (gamesCount >= 50) return { level: 5, label: 'Leyenda del Vault',    color: '#ffaa00' }
  if (gamesCount >= 20) return { level: 4, label: 'Residente Veterano',   color: '#bf00ff' }
  if (gamesCount >= 10) return { level: 3, label: 'Explorador del Vault', color: '#00ffff' }
  if (gamesCount >= 5)  return { level: 2, label: 'Sobreviviente',        color: '#39ff14' }
  return                       { level: 1, label: 'Nuevo Residente',      color: '#7ab87a' }
}

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

  const [theme, setTheme] = useState(() => localStorage.getItem('vault_theme') || 'green')

  const [profileForm, setProfileForm] = useState({
    name: '', alias: '', bio: '', country: '', email: '', avatar_url: '',
  })
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [profileError, setProfileError] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  const [passwordForm, setPasswordForm] = useState({
    current_password: '', password: '', password_confirmation: '',
  })
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState(null)

  const [privacy, setPrivacy] = useState({
    publicProfile: true, showLibrary: true, searchHistory: true,
    showStatus: true, showAchievements: true,
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

  useEffect(() => {
    if (user) {
      setProfileForm({
        name:       user.name       || '',
        alias:      user.alias      || '',
        bio:        user.bio        || '',
        country:    user.country    || '',
        email:      user.email      || '',
        avatar_url: user.avatar_url || '',
      })
      setAvatarPreview(user.avatar_url || '')
    }
  }, [user])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleSaveProfile = async () => {
    setProfileSaving(true)
    setProfileError(null)
    setProfileSuccess(false)
    try {
      await api.put('/profile', profileForm)
      setProfileSuccess(true)
      setAvatarPreview(profileForm.avatar_url)
      setTimeout(() => setProfileSuccess(false), 3000)
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Error al guardar el perfil')
    } finally {
      setProfileSaving(false)
    }
  }

  const handleSavePassword = async () => {
    setPasswordSaving(true)
    setPasswordError(null)
    setPasswordSuccess(false)
    try {
      await api.put('/password', passwordForm)
      setPasswordSuccess(true)
      setPasswordForm({ current_password: '', password: '', password_confirmation: '' })
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Error al cambiar la contraseña')
    } finally {
      setPasswordSaving(false)
    }
  }

  const handleThemeChange = (themeKey) => {
    setTheme(themeKey)
    localStorage.setItem('vault_theme', themeKey)
  }

  const configTabs = ['Perfil', 'Apariencia', 'Cuenta', 'Privacidad', 'Sesión']

  const totalSpent  = purchases.reduce((acc, p) => acc + parseFloat(p.price_paid || 0), 0)
  const levelInfo   = getLevel(library.length)
  const currentTheme = THEMES.find(t => t.key === theme) || THEMES[0]
  const countryData = COUNTRIES.find(c => c.name === (profileForm.country || user?.country))

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
        <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 mb-8">
          <div className="flex items-start gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-20 h-20 rounded-full bg-vault-card overflow-hidden flex items-center justify-center text-3xl font-bold"
                style={{ border: `3px solid ${currentTheme.color}`, boxShadow: `0 0 16px ${currentTheme.color}33` }}
              >
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-vault-green">{user?.name?.charAt(0).toUpperCase()}</span>
                }
              </div>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-vault-black ${statusColors[status]}`}></div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h1 className="text-vault-text text-xl font-bold tracking-wide">
                  {profileForm.alias || user?.name}
                </h1>
                {profileForm.alias && (
                  <span className="text-vault-hint text-xs">({user?.name})</span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded tracking-widest border ${
                  status === 'online' ? 'border-vault-green text-vault-green' :
                  status === 'busy'   ? 'border-vault-warning text-vault-warning' :
                                        'border-vault-hint text-vault-hint'
                }`}>
                  {statusLabels[status]}
                </span>
              </div>

              {profileForm.bio && (
                <p className="text-vault-muted text-xs mb-2 max-w-md">{profileForm.bio}</p>
              )}

              <div className="flex items-center gap-4 mb-3 flex-wrap">
                {countryData && (
                  <span className="text-vault-hint text-xs flex items-center gap-1">
                    <span className="text-base">{countryData.flag}</span>
                    {countryData.name}
                  </span>
                )}
                <span className="text-vault-hint text-xs">
                  📅 Miembro desde {new Date(user?.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Nivel */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded tracking-widest border font-bold"
                  style={{ borderColor: levelInfo.color, color: levelInfo.color, background: `${levelInfo.color}11` }}>
                  Nv.{levelInfo.level} — {levelInfo.label}
                </span>
              </div>

              {/* Estadísticas */}
              <div className="flex gap-6 flex-wrap">
                <div className="text-center">
                  <div className="text-vault-green text-lg font-bold">{library.length}</div>
                  <div className="text-vault-hint text-xs tracking-widest uppercase">Juegos</div>
                </div>
                <div className="text-center">
                  <div className="text-vault-green text-lg font-bold">{wishlist.length}</div>
                  <div className="text-vault-hint text-xs tracking-widest uppercase">Deseos</div>
                </div>
                <div className="text-center">
                  <div className="text-vault-green text-lg font-bold">{totalSpent.toFixed(2)}€</div>
                  <div className="text-vault-hint text-xs tracking-widest uppercase">Gastado</div>
                </div>
                <div className="text-center">
                  <div className="text-vault-green text-lg font-bold">{purchases.length}</div>
                  <div className="text-vault-hint text-xs tracking-widest uppercase">Compras</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs principales */}
        <div className="flex gap-1 mb-6 border-b border-vault-green-dark overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-colors whitespace-nowrap ${
                activeTab === tab ? 'text-vault-green border-b-2 border-vault-green' : 'text-vault-hint hover:text-vault-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* BIBLIOTECA */}
        {activeTab === 'Biblioteca' && (
          <div>
            <p className="text-vault-hint text-xs tracking-widest mb-6">{library.length} juegos en tu biblioteca</p>
            {library.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-vault-hint text-sm">Aún no tienes juegos. ¡Explora el catálogo!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {library.map((item) => (
                  <div key={item.id} className="bg-vault-dark border border-vault-green-dark rounded-lg overflow-hidden flex flex-col hover:border-vault-green transition-colors">
                    <div className="h-36 bg-vault-card overflow-hidden relative">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-vault-hint text-4xl font-bold">V</div>
                      }
                      <div className="absolute top-2 right-2 bg-vault-green text-vault-black text-xs font-bold px-2 py-0.5 rounded tracking-widest">✓ Tuyo</div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 flex-1 font-mono">
                      <p className="text-vault-text text-sm font-bold truncate">{item.title}</p>
                      <p className="text-vault-hint text-xs">{item.platform}</p>
                      <div className="bg-vault-card border border-vault-green-dark rounded px-3 py-2 mt-1">
                        <p className="text-vault-hint text-xs tracking-widest uppercase mb-1">Clave</p>
                        <p className="text-vault-green text-xs font-bold tracking-widest">{item.activation_key}</p>
                      </div>
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
                <button key={tab} onClick={() => setActiveConfigTab(tab)}
                  className={`text-left px-4 py-2.5 rounded text-xs tracking-widest uppercase transition-colors ${
                    activeConfigTab === tab ? 'bg-vault-green text-vault-black font-bold' : 'text-vault-hint hover:text-vault-green hover:bg-vault-card'
                  }`}
                >
                  {activeConfigTab === tab ? '▶ ' : ''}{tab}
                </button>
              ))}
            </div>

            <div className="flex-1">

              {/* PERFIL */}
              {activeConfigTab === 'Perfil' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                  <SectionTitle title="Información pública" />

                  {profileError && <div className="border border-vault-error/40 bg-vault-error/10 text-vault-error rounded px-4 py-3 text-xs">⚠ {profileError}</div>}
                  {profileSuccess && <div className="border border-vault-green/40 bg-vault-green/10 text-vault-green rounded px-4 py-3 text-xs">✓ Perfil actualizado correctamente</div>}

                  {/* Foto de perfil */}
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Foto de perfil (URL)</label>
                    <div className="flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-full bg-vault-card overflow-hidden flex items-center justify-center flex-shrink-0"
                        style={{ border: `2px solid ${currentTheme.color}` }}>
                        {avatarPreview
                          ? <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" onError={() => setAvatarPreview('')} />
                          : <span className="text-vault-green text-xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                        }
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={profileForm.avatar_url}
                          onChange={(e) => {
                            setProfileForm({ ...profileForm, avatar_url: e.target.value })
                            setAvatarPreview(e.target.value)
                          }}
                          placeholder="https://ejemplo.com/mi-foto.jpg"
                          className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono placeholder-vault-hint"
                        />
                        <p className="text-vault-hint text-xs mt-1">Pega la URL de cualquier imagen pública</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Nombre real</label>
                    <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono" />
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Alias (nombre público)</label>
                    <input type="text" value={profileForm.alias} onChange={(e) => setProfileForm({ ...profileForm, alias: e.target.value })}
                      placeholder="Tu alias en el Vault..."
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono placeholder-vault-hint" />
                    <p className="text-vault-hint text-xs mt-1">Se mostrará en lugar de tu nombre real</p>
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Bio</label>
                    <textarea value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      rows={3} maxLength={500} placeholder="Cuéntanos algo sobre ti..."
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono resize-none placeholder-vault-hint" />
                    <p className="text-vault-hint text-xs mt-1 text-right">{profileForm.bio.length}/500</p>
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">País / Región</label>
                    <select value={profileForm.country} onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono">
                      <option value="">Seleccionar país...</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Email</label>
                    <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono" />
                  </div>

                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Estado online</label>
                    <div className="flex gap-2">
                      {['online', 'busy', 'offline'].map((s) => (
                        <button key={s} onClick={() => setStatus(s)}
                          className={`flex items-center gap-2 px-4 py-2 rounded text-xs tracking-widest uppercase border transition-colors ${
                            status === s ? 'border-vault-green bg-vault-green/10 text-vault-green' : 'border-vault-green-dark text-vault-hint hover:border-vault-green'
                          }`}>
                          <div className={`w-2 h-2 rounded-full ${statusColors[s]}`}></div>
                          {statusLabels[s]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleSaveProfile} disabled={profileSaving}
                    className="self-start bg-vault-green hover:bg-vault-green-hover disabled:opacity-40 text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                    {profileSaving ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </div>
              )}

              {/* APARIENCIA */}
              {activeConfigTab === 'Apariencia' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-6">
                  <SectionTitle title="Tema de color" />
                  <div className="flex flex-col gap-3">
                    {THEMES.map((t) => (
                      <button key={t.key} onClick={() => handleThemeChange(t.key)}
                        className={`flex items-center gap-4 px-4 py-3 rounded border transition-colors ${
                          theme === t.key ? 'border-vault-green bg-vault-card' : 'border-vault-green-dark hover:border-vault-green'
                        }`}>
                        <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }}></div>
                        <span className="text-vault-text text-xs tracking-widest uppercase">{t.label}</span>
                        {theme === t.key && <span className="ml-auto text-vault-green text-xs">✓ Activo</span>}
                      </button>
                    ))}
                  </div>
                  <p className="text-vault-hint text-xs">El tema se guarda en este dispositivo.</p>
                </div>
              )}

              {/* CUENTA */}
              {activeConfigTab === 'Cuenta' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                  <SectionTitle title="Cambiar contraseña" />
                  {passwordError && <div className="border border-vault-error/40 bg-vault-error/10 text-vault-error rounded px-4 py-3 text-xs">⚠ {passwordError}</div>}
                  {passwordSuccess && <div className="border border-vault-green/40 bg-vault-green/10 text-vault-green rounded px-4 py-3 text-xs">✓ Contraseña actualizada correctamente</div>}
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Contraseña actual</label>
                    <input type="password" value={passwordForm.current_password} onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                      placeholder="••••••••" className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Nueva contraseña</label>
                    <input type="password" value={passwordForm.password} onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                      placeholder="••••••••" className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-vault-hint text-xs tracking-widest uppercase mb-2">Confirmar contraseña</label>
                    <input type="password" value={passwordForm.password_confirmation} onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })}
                      placeholder="••••••••" className="w-full bg-vault-card border border-vault-green-dark rounded px-4 py-2.5 text-vault-text text-sm focus:outline-none focus:border-vault-green transition-colors font-mono" />
                  </div>
                  <button onClick={handleSavePassword} disabled={passwordSaving}
                    className="self-start bg-vault-green hover:bg-vault-green-hover disabled:opacity-40 text-vault-black font-bold text-xs tracking-widest uppercase px-6 py-2.5 rounded transition-colors">
                    {passwordSaving ? 'Guardando...' : 'Cambiar contraseña'}
                  </button>
                </div>
              )}

              {/* PRIVACIDAD */}
              {activeConfigTab === 'Privacidad' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-6">
                  <SectionTitle title="Configuración de privacidad" />
                  <div className="flex flex-col gap-4">
                    {[
                      { key: 'publicProfile',    label: 'Perfil público',                 desc: 'Otros usuarios pueden ver tu perfil' },
                      { key: 'showLibrary',      label: 'Mostrar biblioteca',             desc: 'Visible para otros usuarios' },
                      { key: 'showStatus',       label: 'Mostrar estado online',          desc: 'Otros ven si estás conectado' },
                      { key: 'showAchievements', label: 'Mostrar nivel e insignias',      desc: 'Visible en tu perfil público' },
                      { key: 'searchHistory',    label: 'Guardar historial de búsquedas', desc: 'Mejora las recomendaciones del feed' },
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

              {/* SESIÓN */}
              {activeConfigTab === 'Sesión' && (
                <div className="bg-vault-dark border border-vault-green-dark rounded-lg p-6 flex flex-col gap-5">
                  <SectionTitle title="Gestión de sesión" />
                  <button onClick={handleLogout}
                    className="self-start text-vault-error hover:text-red-400 text-xs tracking-widest uppercase transition-colors border border-vault-error/30 hover:border-vault-error px-5 py-2.5 rounded">
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

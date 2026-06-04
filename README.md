# 🔒 VAULT GAMES

> Plataforma web de compra y distribución de claves de videojuegos para PC, diseñada para ofrecer una experiencia moderna, personalizada y segura a jugadores que buscan videojuegos a precios competitivos.

![Vault Games](https://img.shields.io/badge/Vault-Games-39ff14?style=for-the-badge&labelColor=0a0c0a)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Deployed-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

---

## 📋 Índice

- [Descripción del proyecto](#-descripción-del-proyecto)
- [Demo](#-demo)
- [Equipo](#-equipo)
- [Stack tecnológico](#-stack-tecnológico)
- [Arquitectura del sistema](#-arquitectura-del-sistema)
- [Estructura del repositorio](#-estructura-del-repositorio)
- [Instalación y ejecución en local](#-instalación-y-ejecución-en-local)
- [Variables de entorno](#-variables-de-entorno)
- [Base de datos](#-base-de-datos)
- [API REST — Endpoints](#-api-rest--endpoints)
- [Funcionalidades](#-funcionalidades)
- [Despliegue en producción](#-despliegue-en-producción)
- [Ramas del repositorio](#-ramas-del-repositorio)

---

## 📖 Descripción del proyecto

Vault Games es un marketplace de claves de videojuegos inspirado en plataformas como Instant Gaming. Permite a los usuarios explorar un catálogo de juegos con precios rebajados, comprar claves de activación para plataformas como Steam, Epic Games, GOG, Xbox y PlayStation, gestionar su biblioteca personal y recibir recomendaciones personalizadas basadas en su historial de búsquedas.

La identidad visual está inspirada en la estética retro-futurista de la saga **Fallout**, con una paleta de colores verde fosforescente sobre negro y tipografía monoespaciada, incluyendo una animación interactiva de la puerta de un Vault al entrar en la página principal.

---

## 🌐 Demo

| Entorno | URL |
|---|---|
| Frontend (Vercel) | https://vault-amber-delta.vercel.app |
| Backend API (Railway) | https://vault-production-6688.up.railway.app/api |

---

## 👥 Equipo

| Miembro | Rol | Responsabilidades |
|---|---|---|
| **Alejandro** | Frontend & UX/UI | Desarrollo completo de la SPA con React + Vite, diseño visual, animaciones con Anime.js, documentación visual |
| **Luis** | Backend & Base de datos | API REST con Laravel 11, base de datos MySQL, autenticación con Sanctum, seguridad y middleware de roles |
| **Fran** | Infraestructura & Despliegue | Despliegue en Railway y Vercel, variables de entorno, control de versiones, documentación técnica |

**Tutor:** Jesús Turpín Aroca
**Centro:** IES Francisco de Goya
**Ciclo:** Grado Superior — Desarrollo de Aplicaciones Web (DAW)
**Curso:** 2025-2026

---

## 🛠️ Stack tecnológico

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.x | Framework principal de la SPA |
| Vite | 6.x | Bundler y servidor de desarrollo |
| Tailwind CSS | 3.x | Estilos con paleta de colores personalizada |
| Anime.js | 4.x | Animaciones avanzadas (puerta del Vault) |
| Axios | 1.x | Cliente HTTP con interceptor de token |
| React Router DOM | 6.x | Navegación y rutas protegidas |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Laravel | 11.x | Framework PHP para la API REST |
| Laravel Sanctum | 4.x | Autenticación por token para SPAs |
| MySQL | 8.x | Base de datos relacional |
| Eloquent ORM | — | Mapeo objeto-relacional |

### Infraestructura
| Servicio | Uso |
|---|---|
| Railway | Hosting del backend Laravel + MySQL |
| Vercel | Hosting del frontend React |
| GitHub | Control de versiones y colaboración |

---

## 🏗️ Arquitectura del sistema

```
Cliente (React + Vite — Vercel)
   → Peticiones HTTP/HTTPS con token Bearer (Axios)
         ↓
Servidor (Laravel 11 — Railway)
   → Rutas API → Middleware (auth:sanctum, admin) → Controladores → Modelos Eloquent
         ↓
Base de datos (MySQL — Railway)
```

El sistema sigue una arquitectura **desacoplada (API REST + SPA)**:
- El frontend y el backend son aplicaciones completamente independientes
- Se comunican exclusivamente mediante peticiones HTTP/JSON
- Cada capa puede escalar o actualizarse sin afectar a la otra

---

## 📁 Estructura del repositorio

```
Vault/
├── frontend/                     # SPA React + Vite
│   ├── src/
│   │   ├── api/                  # Capa de comunicación con la API
│   │   │   ├── axios.js          # Instancia base con interceptor de token
│   │   │   ├── auth.js           # login, registro, logout
│   │   │   ├── games.js          # catálogo, detalle, búsqueda
│   │   │   ├── purchases.js      # compras y biblioteca
│   │   │   ├── reviews.js        # reseñas
│   │   │   ├── wishlist.js       # lista de deseos
│   │   │   ├── feed.js           # feed personalizado
│   │   │   └── admin.js          # endpoints de administración
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx    # Barra de navegación con carrito
│   │   │   │   └── Footer.jsx    # Pie de página
│   │   │   ├── ui/
│   │   │   │   ├── GameCard.jsx      # Card con precio tachado y carrito
│   │   │   │   ├── FilterSidebar.jsx # Filtros del catálogo
│   │   │   │   ├── ReviewCard.jsx    # Card de reseña
│   │   │   │   ├── Modal.jsx         # Modal genérico
│   │   │   │   └── Spinner.jsx       # Indicador de carga
│   │   │   └── forms/
│   │   │       ├── SearchBar.jsx     # Barra de búsqueda
│   │   │       └── ReviewForm.jsx    # Formulario de reseña
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Estado global de autenticación
│   │   │   └── CartContext.jsx   # Estado global del carrito
│   │   ├── hooks/
│   │   │   ├── useAuth.js        # Hook de autenticación
│   │   │   └── useGames.js       # Hook del catálogo
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Catálogo con animación de la puerta
│   │   │   ├── GameDetail.jsx    # Ficha de detalle del juego
│   │   │   ├── Cart.jsx          # Carrito de compra
│   │   │   ├── Login.jsx         # Pantalla de acceso
│   │   │   ├── Register.jsx      # Pantalla de registro
│   │   │   ├── Profile.jsx       # Perfil con 6 pestañas
│   │   │   ├── Feed.jsx          # Feed personalizado
│   │   │   ├── NotFound.jsx      # Página 404 con efecto glitch
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx     # Panel de control admin
│   │   │       ├── ManageGames.jsx   # CRUD de juegos
│   │   │       └── ManageUsers.jsx   # Gestión de usuarios
│   │   └── routes/
│   │       └── AppRoutes.jsx     # Rutas, PrivateRoute y AdminRoute
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js        # Paleta de colores vault-*
│   └── package.json
│
└── backend/                      # API REST Laravel 11
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   │   ├── AuthController.php
    │   │   │   ├── GameController.php
    │   │   │   ├── CategoryController.php
    │   │   │   ├── PurchaseController.php
    │   │   │   ├── CartController.php
    │   │   │   ├── ReviewController.php
    │   │   │   ├── WishlistController.php
    │   │   │   ├── FeedController.php
    │   │   │   └── AdminController.php
    │   │   └── Middleware/
    │   │       └── AdminMiddleware.php
    │   └── Models/
    │       ├── User.php
    │       ├── Game.php
    │       ├── Category.php
    │       ├── Purchase.php
    │       ├── Review.php
    │       ├── Wishlist.php
    │       └── SearchHistory.php
    ├── database/
    │   ├── migrations/           # 8 migraciones en orden
    │   └── seeders/              # CategorySeeder, UserSeeder
    ├── routes/
    │   └── api.php               # 27 endpoints REST
    └── config/
        └── cors.php              # Configuración de CORS
```

---

## 🚀 Instalación y ejecución en local

### Requisitos previos
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL 8

### 1. Clonar el repositorio

```bash
git clone https://github.com/alejandro975-666/Vault.git
cd Vault
```

### 2. Configurar el backend

```bash
cd backend

# Instalar dependencias PHP
composer install

# Copiar y configurar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de base de datos locales
# DB_HOST=127.0.0.1
# DB_DATABASE=vault_games
# DB_USERNAME=root
# DB_PASSWORD=tu_contraseña

# Generar la clave de la aplicación
php artisan key:generate

# Ejecutar las migraciones
php artisan migrate

# Cargar los datos iniciales (categorías y usuarios de prueba)
php artisan db:seed

# Arrancar el servidor
php artisan serve
```

El backend estará disponible en `http://localhost:8000`

### 3. Configurar el frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Crear fichero de variables de entorno
cp .env.example .env

# Editar .env
# VITE_API_URL=http://localhost:8000/api

# Arrancar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| fran@vault.com | password | Administrador |
| alejandro@vault.com | password | Administrador |
| luis@vault.com | password | Administrador |

---

## 🔐 Variables de entorno

### Backend (`backend/.env`)

```env
APP_NAME=VaultGames
APP_ENV=production
APP_KEY=          # Generado con php artisan key:generate
APP_DEBUG=false
APP_URL=          # URL pública del backend en Railway

DB_CONNECTION=mysql
DB_HOST=          # Host de MySQL en Railway
DB_PORT=3306
DB_DATABASE=      # Nombre de la base de datos
DB_USERNAME=      # Usuario de la base de datos
DB_PASSWORD=      # Contraseña de la base de datos

FRONTEND_URL=https://vault-amber-delta.vercel.app
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://vault-production-6688.up.railway.app/api
```

---

## 🗄️ Base de datos

El sistema cuenta con **8 tablas relacionales**:

```
users
├── id (UUID, PK)
├── name, email (UNIQUE), password (bcrypt)
├── role (user/admin), active
└── timestamps

games
├── id (UUID, PK)
├── title, description
├── original_price, discount_price, discount (%)
├── platform (Steam/Epic/GOG/Xbox/PlayStation)
├── image_url, status (draft/published)
├── admin_id (FK → users)
└── timestamps

categories
└── id, name (UNIQUE)

game_category          ← Pivote N:M entre games y categories
purchases              ← user_id, game_id, price_paid, activation_key
reviews                ← user_id, game_id, rating (1-5), body
wishlists              ← user_id, game_id (UNIQUE por usuario)
search_histories       ← user_id, query, category_id (nullable)
```

### Relaciones principales

- `users` 1:N `purchases`, `reviews`, `wishlists`, `search_histories`
- `games` N:M `categories` (a través de `game_category`)
- `games` 1:N `purchases`, `reviews`, `wishlists`

---

## 📡 API REST — Endpoints

### Públicos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/register` | Registro de nuevo usuario |
| POST | `/api/login` | Autenticación y obtención de token |
| GET | `/api/games` | Listado del catálogo con filtros |
| GET | `/api/games/{id}` | Detalle de un juego con reseñas |
| GET | `/api/categories` | Listado de categorías |
| POST | `/api/search` | Búsqueda de juegos |

### Autenticados (requieren token Bearer)

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/logout` | Cerrar sesión |
| GET | `/api/me` | Datos del usuario autenticado |
| PUT | `/api/profile` | Actualizar perfil |
| PUT | `/api/password` | Cambiar contraseña |
| POST | `/api/purchases` | Comprar un juego |
| GET | `/api/purchases` | Historial de compras |
| GET | `/api/library` | Biblioteca personal con claves |
| POST | `/api/cart/checkout` | Comprar varios juegos del carrito |
| GET | `/api/wishlist` | Ver lista de deseos |
| POST | `/api/wishlist/{id}` | Añadir a lista de deseos |
| DELETE | `/api/wishlist/{id}` | Eliminar de lista de deseos |
| GET | `/api/games/{id}/reviews` | Ver reseñas de un juego |
| POST | `/api/games/{id}/reviews` | Publicar reseña (solo compradores) |
| DELETE | `/api/reviews/{id}` | Eliminar reseña propia |
| GET | `/api/feed` | Feed personalizado |

### Solo administradores

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/admin/games` | Crear juego |
| PUT | `/api/admin/games/{id}` | Editar juego |
| DELETE | `/api/admin/games/{id}` | Eliminar juego |
| POST | `/api/admin/categories` | Crear categoría |
| DELETE | `/api/admin/categories/{id}` | Eliminar categoría |
| GET | `/api/admin/users` | Listar usuarios |
| PUT | `/api/admin/users/{id}` | Activar/desactivar usuario |
| GET | `/api/admin/stats` | Métricas globales |

---

## ✨ Funcionalidades

### Visitante
- Navegar el catálogo con filtros por categoría, plataforma, precio y valoración
- Ver la ficha de detalle de cada juego con precio original tachado y badge de descuento
- Consultar reseñas de otros usuarios

### Usuario registrado
- Registro e inicio de sesión con sesión persistente
- Carrito de compra con resumen de pedido y ahorro total
- Compra de claves de activación
- Biblioteca personal con acceso a todas las claves adquiridas
- Lista de deseos
- Feed personalizado basado en historial de búsquedas
- Reseñas y valoraciones (solo de juegos comprados)
- Perfil completo con 6 pestañas: Biblioteca, Deseos, Historial, Amigos, Logros y Configuración
- Configuración avanzada: privacidad, seguridad (2FA), pagos y gestión de sesiones

### Administrador
- Panel de control con métricas globales
- CRUD completo del catálogo de juegos
- Gestión de usuarios: activar, desactivar y cambiar roles
- Gestión de categorías

---

## 🚢 Despliegue en producción

### Backend en Railway

1. Crear proyecto en [railway.app](https://railway.app)
2. Añadir servicio desde el repositorio GitHub (carpeta `backend`)
3. Añadir servicio de base de datos MySQL
4. Configurar las variables de entorno con las credenciales de MySQL
5. Ejecutar desde la consola de Railway:

```bash
php artisan migrate --force
php artisan db:seed --force
```

### Frontend en Vercel

1. Importar el proyecto en [vercel.com](https://vercel.com)
2. Seleccionar la carpeta `frontend` como Root Directory
3. Añadir la variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.up.railway.app/api
   ```
4. Desplegar

---

## 🌿 Ramas del repositorio

| Rama | Descripción |
|---|---|
| `main` | Código estable y desplegado en producción |
| `develop` | Rama de integración |
| `feat/frontend` | Desarrollo del frontend (Alejandro) |
| `feat/backend` | Desarrollo del backend (Luis) |

---

## 📄 Licencia

Proyecto académico desarrollado para el módulo de Proyecto del ciclo formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW).

**IES Francisco de Goya · Murcia · Curso 2025-2026**

# 🔒 VAULT

> Plataforma web de compra y distribución de claves de videojuegos para PC, diseñada para ofrecer una experiencia moderna, personalizada y segura a jugadores que buscan videojuegos a precios competitivos.

![Vault](https://img.shields.io/badge/Vault-TFG%20DAW-39ff14?style=for-the-badge&labelColor=0a0c0a)
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
- [Identidad visual](#-identidad-visual)
- [Incidencias resueltas](#-incidencias-resueltas)
- [Despliegue en producción](#-despliegue-en-producción)
- [Ramas del repositorio](#-ramas-del-repositorio)

---

## 📖 Descripción del proyecto

**Vault** es un marketplace de claves de videojuegos inspirado en plataformas como Instant Gaming. Permite a los usuarios explorar un catálogo de juegos con precios rebajados, comprar claves de activación para plataformas como Steam, Epic Games, GOG, Xbox, PlayStation, Battle.net, EA, Ubisoft, Nintendo y Rockstar, gestionar su biblioteca personal y recibir recomendaciones personalizadas basadas en sus categorías de compra.

La identidad visual está inspirada en la estética retro-futurista de la saga **Fallout**, con una paleta de colores verde fosforescente sobre negro y tipografía monoespaciada Share Tech Mono, incluyendo una animación interactiva de la puerta de un Vault al entrar en la página principal.

El proyecto fue desarrollado como **Trabajo de Fin de Grado (TFG)** del ciclo formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW) en el IES Francisco de Goya de Murcia, curso 2025-2026.

---

## 🌐 Demo

| Entorno | URL |
|---|---|
| 🖥️ Frontend (Vercel) | https://vault-amber-delta.vercel.app |
| ⚙️ Backend API (Railway) | https://vault-production-6688.up.railway.app/api |

> ⚠️ El backend está en Railway plan gratuito. Si tarda en responder la primera vez, espera unos segundos a que arranque el servidor (cold start).

---

## 👥 Equipo

| Miembro | Rol | Responsabilidades |
|---|---|---|
| **Alejandro** | Frontend, UX/UI y despliegue Vercel | Desarrollo completo de la SPA con React + Vite · Diseño visual e identidad Fallout · Animaciones con Anime.js · Gestión del repositorio GitHub · Control de versiones · Despliegue en Vercel |
| **Luis** | Backend, base de datos y despliegue Railway | API REST con Laravel 11 · Base de datos MySQL (8 tablas) · Autenticación con Sanctum · Middleware de roles · Despliegue en Railway |

**Tutor:** Jesús Turpín Aroca  
**Centro:** IES Francisco de Goya — Murcia  
**Ciclo:** Grado Superior — Desarrollo de Aplicaciones Web (DAW)  
**Curso:** 2025-2026 · 2ª Convocatoria

---

## 🛠️ Stack tecnológico

### Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18.x | Framework principal de la SPA |
| Vite | 6.x | Bundler y servidor de desarrollo |
| Tailwind CSS | 3.x | Estilos con paleta de colores personalizada `vault-*` |
| Anime.js | 4.x | Animación de la puerta del Vault y efecto glitch |
| Axios | 1.x | Cliente HTTP con interceptor automático de token Bearer |
| React Router DOM | 6.x | Navegación, PrivateRoute y AdminRoute |
| Share Tech Mono | Google Fonts | Tipografía monoespaciada retro-futurista |

### Backend

| Tecnología | Versión | Uso |
|---|---|---|
| Laravel | 11.x | Framework PHP para la API REST |
| Laravel Sanctum | 4.x | Autenticación por token para SPAs |
| Eloquent ORM | — | Mapeo objeto-relacional y relaciones entre modelos |
| MySQL | 8.x | Base de datos relacional (8 tablas) |

### Infraestructura

| Servicio | Uso |
|---|---|
| Railway | Hosting del backend Laravel + base de datos MySQL |
| Vercel | Hosting del frontend React con despliegue automático desde GitHub |
| GitHub | Control de versiones, ramas y colaboración |

---

## 🏗️ Arquitectura del sistema

```
Cliente (React + Vite — Vercel)
   → Peticiones HTTP/HTTPS con token Bearer (Axios + interceptor)
         ↓
Servidor (Laravel 11 — Railway)
   → routes/api.php → Middleware (auth:sanctum, isAdmin) → Controladores → Modelos Eloquent
         ↓
Base de datos (MySQL 8 — Railway)
```

El sistema sigue una arquitectura **desacoplada (API REST + SPA)**:
- Frontend y backend son aplicaciones completamente independientes desplegadas en servicios distintos
- Se comunican exclusivamente mediante peticiones HTTP/JSON con token Bearer
- CORS configurado explícitamente en `config/cors.php` para permitir el dominio de Vercel
- Todos los modelos usan **UUIDs** como clave primaria (`HasUuids`)

---

## 📁 Estructura del repositorio

```
Vault/
├── frontend/                      # SPA React + Vite
│   ├── public/
│   │   └── favicon.svg            # Favicon V verde fosforescente
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js           # Instancia base con interceptor de token
│   │   │   ├── auth.js            # login, registro, logout
│   │   │   ├── games.js           # catálogo, detalle, búsqueda, filtros
│   │   │   ├── purchases.js       # compras y biblioteca
│   │   │   ├── reviews.js         # reseñas
│   │   │   ├── wishlist.js        # lista de deseos
│   │   │   ├── feed.js            # feed personalizado
│   │   │   └── admin.js           # endpoints de administración
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx     # Barra de navegación con badge de carrito
│   │   │   │   └── Footer.jsx     # Pie de página con links
│   │   │   ├── ui/
│   │   │   │   ├── GameCard.jsx       # Card con precio tachado, logo plataforma y carrito
│   │   │   │   ├── FilterSidebar.jsx  # Filtros por categoría, plataforma, precio y rating
│   │   │   │   ├── ReviewCard.jsx     # Card de reseña con fecha formateada
│   │   │   │   ├── Modal.jsx          # Modal genérico
│   │   │   │   └── Spinner.jsx        # Indicador de carga
│   │   │   └── forms/
│   │   │       ├── SearchBar.jsx      # Barra de búsqueda
│   │   │       └── ReviewForm.jsx     # Formulario de reseña con selector de estrellas
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Estado global: usuario, token, login(), logout(), isAdmin()
│   │   │   └── CartContext.jsx    # Estado global del carrito: items, total, addToCart(), clearCart()
│   │   ├── hooks/
│   │   │   ├── useAuth.js         # Acceso al AuthContext
│   │   │   └── useGames.js        # Lógica de carga del catálogo
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Catálogo con animación de la puerta del Vault
│   │   │   ├── GameDetail.jsx     # Ficha con galería, trailer YouTube y columna sticky
│   │   │   ├── Cart.jsx           # Carrito con resumen y ahorro total
│   │   │   ├── Checkout.jsx       # Checkout con formulario de tarjeta animado
│   │   │   ├── Login.jsx          # Pantalla de acceso temática
│   │   │   ├── Register.jsx       # Pantalla de registro
│   │   │   ├── Profile.jsx        # Perfil con biblioteca, deseos, historial y configuración
│   │   │   ├── Feed.jsx           # Feed personalizado de recomendaciones
│   │   │   ├── NotFound.jsx       # Página 404 con efecto glitch
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx      # Métricas globales del panel admin
│   │   │       ├── ManageGames.jsx    # CRUD de juegos con modal completo
│   │   │       └── ManageUsers.jsx    # Gestión de usuarios
│   │   └── routes/
│   │       └── AppRoutes.jsx      # Rutas, PrivateRoute y AdminRoute
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js         # Paleta vault-* y tipografía monoespaciada
│   └── package.json
│
└── backend/                       # API REST Laravel 11
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   │   ├── AuthController.php       # Registro, login, logout, perfil
    │   │   │   ├── GameController.php       # Catálogo, filtros, búsqueda
    │   │   │   ├── CategoryController.php   # Categorías
    │   │   │   ├── PurchaseController.php   # Compras y biblioteca
    │   │   │   ├── CartController.php       # Checkout del carrito
    │   │   │   ├── ReviewController.php     # Reseñas
    │   │   │   ├── WishlistController.php   # Lista de deseos
    │   │   │   ├── FeedController.php       # Feed personalizado
    │   │   │   └── AdminController.php      # Panel de administración
    │   │   └── Middleware/
    │   │       └── AdminMiddleware.php      # Protección de rutas admin
    │   └── Models/
    │       ├── User.php           # HasUuids, HasApiTokens, roles
    │       ├── Game.php           # HasUuids, discount_price calculado automáticamente
    │       ├── Category.php
    │       ├── Purchase.php       # Genera clave de activación automáticamente
    │       ├── Review.php
    │       ├── Wishlist.php
    │       └── SearchHistory.php
    ├── database/
    │   ├── migrations/            # 8 migraciones con UUIDs
    │   └── seeders/
    │       ├── CategorySeeder.php # 8 categorías predefinidas
    │       └── UserSeeder.php     # 2 usuarios admin de prueba
    ├── routes/
    │   └── api.php                # 29 endpoints REST organizados por rol
    └── config/
        └── cors.php               # CORS configurado para Vercel
```

---

## 🚀 Instalación y ejecución en local

### Requisitos previos

- Node.js 18+
- PHP 8.2+
- Composer 2+
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

# Editar .env con tus credenciales locales:
# DB_HOST=127.0.0.1
# DB_DATABASE=vault
# DB_USERNAME=root
# DB_PASSWORD=tu_contraseña
# FRONTEND_URL=http://localhost:5173

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

# Editar .env:
# VITE_API_URL=http://localhost:8000/api

# Arrancar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### ⚠️ Nota importante sobre los juegos del catálogo

Los seeders **no añaden juegos** al catálogo. Una vez arrancado el sistema, entra con una cuenta de administrador en `/admin/games` y crea los juegos manualmente desde el panel de control.

### Usuarios de prueba (creados por los seeders)

| Email | Contraseña | Rol |
|---|---|---|
| alejandro@vault.com | password | Administrador |
| luis@vault.com | password | Administrador |

---

## 🔐 Variables de entorno

### Backend (`backend/.env`)

```env
APP_NAME=Vault
APP_ENV=production
APP_KEY=                    # Generado con php artisan key:generate
APP_DEBUG=false
APP_URL=                    # URL pública del backend en Railway

DB_CONNECTION=mysql
DB_HOST=                    # Host de MySQL en Railway
DB_PORT=3306
DB_DATABASE=                # Nombre de la base de datos
DB_USERNAME=                # Usuario de la base de datos
DB_PASSWORD=                # Contraseña de la base de datos

SANCTUM_STATEFUL_DOMAINS=vault-amber-delta.vercel.app
FRONTEND_URL=https://vault-amber-delta.vercel.app
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://vault-production-6688.up.railway.app/api
```

---

## 🗄️ Base de datos

El sistema cuenta con **8 tablas relacionales**, todas con UUID como clave primaria:

```
users
├── id (UUID, PK)
├── name, alias, bio, country, avatar_url
├── email (UNIQUE), password (bcrypt)
├── role (user/admin), active
└── timestamps

games
├── id (UUID, PK)
├── title, description, developer, publisher
├── original_price, discount_price (calculado automáticamente), discount (%)
├── image_url, images (JSON — galería adicional), trailer_url
├── platform, languages, status (draft/published)
├── admin_id (FK → users)
└── timestamps

categories
└── id (UUID, PK), name (UNIQUE)

game_category          ← Pivote N:M: game_id + category_id
purchases              ← id, user_id, game_id, price_paid, activation_key, purchased_at
reviews                ← id, user_id, game_id, rating (1-5), body — UNIQUE(user_id, game_id)
wishlists              ← user_id + game_id (PK compuesta)
search_histories       ← id, user_id, query, category_id (nullable), searched_at
personal_access_tokens ← tokenable_id como string(36) para compatibilidad con UUIDs
```

### Relaciones principales

- `users` 1:N `purchases`, `reviews`, `wishlists`, `search_histories`
- `games` N:M `categories` (tabla pivote `game_category`)
- `games` 1:N `purchases`, `reviews`, `wishlists`

### Cálculo automático del precio rebajado

El campo `discount_price` se calcula automáticamente en el backend a partir de `original_price` y `discount` (%), tanto al crear como al editar un juego. No es necesario introducirlo manualmente:

```
discount_price = original_price × (1 - discount / 100)
```

---

## 📡 API REST — Endpoints

### Públicos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/register` | Registro de nuevo usuario |
| POST | `/api/login` | Autenticación y obtención de token Sanctum |
| GET | `/api/games` | Catálogo con filtros: `query`, `category`, `platform`, `price`, `rating`, `sort` |
| GET | `/api/games/{id}` | Detalle completo de un juego con reseñas |
| GET | `/api/categories` | Listado de todas las categorías |
| POST | `/api/search` | Búsqueda de juegos (guarda en historial si hay sesión) |

### Autenticados (requieren token Bearer)

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/logout` | Cerrar sesión y revocar token |
| GET | `/api/me` | Datos del usuario autenticado |
| PUT | `/api/profile` | Actualizar nombre, alias, bio, país, email y avatar |
| PUT | `/api/password` | Cambiar contraseña |
| POST | `/api/purchases` | Comprar un juego directamente |
| GET | `/api/purchases` | Historial completo de compras |
| GET | `/api/library` | Biblioteca personal con claves de activación |
| POST | `/api/cart/checkout` | Comprar varios juegos del carrito a la vez |
| GET | `/api/wishlist` | Ver lista de deseos |
| POST | `/api/wishlist/{id}` | Añadir juego a lista de deseos |
| DELETE | `/api/wishlist/{id}` | Eliminar juego de lista de deseos |
| GET | `/api/games/{id}/reviews` | Ver reseñas de un juego |
| POST | `/api/games/{id}/reviews` | Publicar reseña (solo si has comprado el juego) |
| DELETE | `/api/reviews/{id}` | Eliminar reseña propia |
| GET | `/api/feed` | Feed personalizado basado en categorías compradas |

### Solo administradores

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/admin/games` | Crear juego (calcula `discount_price` automáticamente) |
| PUT | `/api/admin/games/{id}` | Editar juego |
| DELETE | `/api/admin/games/{id}` | Eliminar juego |
| POST | `/api/admin/categories` | Crear categoría |
| DELETE | `/api/admin/categories/{id}` | Eliminar categoría |
| GET | `/api/admin/users` | Listar todos los usuarios |
| PUT | `/api/admin/users/{id}` | Activar, desactivar o cambiar rol |
| GET | `/api/admin/stats` | Métricas globales del panel |

---

## ✨ Funcionalidades

### Visitante (sin cuenta)

- Explorar el catálogo con animación de apertura de la puerta del Vault al hacer scroll
- Filtrar por categoría, plataforma, precio y valoración mínima (filtros combinables)
- Buscar juegos por título, descripción o desarrollador
- Ver la ficha de detalle con galería de imágenes en formato panorámico 21:9, trailer de YouTube integrado y reseñas de usuarios
- Ver el precio original tachado y el precio rebajado con badge de porcentaje de descuento

### Usuario registrado

- Registro e inicio de sesión con sesión persistente (token en localStorage)
- **Carrito de compra** con desglose de precios, ahorro total y navegación al checkout
- **Checkout simulado** con formulario de tarjeta con preview animado en tiempo real (número, nombre y fecha se actualizan al escribir)
- Compra de claves de activación generadas automáticamente (formato `XXXXX-XXXXX-XXXXX`)
- **Biblioteca personal** con imagen, plataforma y clave de activación visible de cada juego comprado
- Lista de deseos con estado persistente en la ficha del juego
- **Feed personalizado** basado en las categorías de los juegos comprados por el usuario
- Reseñas y valoraciones de 1 a 5 estrellas (solo disponible si has comprado el juego)
- **Perfil completo** con:
  - Foto de perfil mediante URL con preview en tiempo real
  - Alias (nombre público separado del nombre real)
  - Bio personal hasta 500 caracteres con contador
  - País con bandera emoji (más de 160 países)
  - Estadísticas: juegos en biblioteca, wishlist, total gastado y número de compras
  - Nivel automático basado en juegos comprados (Nv.1 Nuevo Residente → Nv.5 Leyenda del Vault)
  - Fecha de registro ("Miembro desde...")
  - Estado online (En línea / Ocupado / Desconectado)
  - 5 temas de color personalizables (Vault Green, Cyber Cyan, Neon Purple, Rust Orange, Alert Red)
  - Cambio de contraseña funcional conectado al backend
  - Configuración de privacidad con toggles

### Administrador

- Panel de control con métricas globales: usuarios registrados, juegos publicados, compras e ingresos
- CRUD completo del catálogo con modal avanzado:
  - Precio original + porcentaje de descuento → precio final calculado automáticamente con preview en tiempo real
  - Imagen principal con preview, galería de imágenes adicionales con campos independientes y botón `+ Añadir imagen`, y URL de trailer de YouTube
  - Selector de plataforma (10 plataformas con logos: Steam, Epic, GOG, Xbox, PlayStation, Battle.net, EA, Ubisoft, Nintendo, Rockstar)
  - Selector de categorías múltiples y estado (borrador / publicado)
- Gestión de usuarios: ver, activar, desactivar y cambiar roles
- Gestión de categorías: crear y eliminar

---

## 🎨 Identidad visual

| Elemento | Valor |
|---|---|
| Fondo principal | `#0a0c0a` (negro profundo) |
| Color de acento | `#39ff14` (verde fosforescente) |
| Texto principal | `#c8f0c8` (blanco verdoso) |
| Tipografía | Share Tech Mono (Google Fonts) |
| Inspiración | Saga Fallout — estética de terminal retro-futurista |

### Paleta de colores (`tailwind.config.js`)

| Variable | Hex | Uso |
|---|---|---|
| `vault-black` | `#0a0c0a` | Fondo de todas las pantallas |
| `vault-dark` | `#111410` | Fondo de cards y paneles |
| `vault-card` | `#1a1f1a` | Fondo de inputs y elementos de formulario |
| `vault-green` | `#39ff14` | Acento principal: botones, títulos, highlights |
| `vault-green-dark` | `#1a7a0a` | Bordes inactivos y separadores |
| `vault-text` | `#c8f0c8` | Texto principal |
| `vault-muted` | `#7ab87a` | Texto secundario y etiquetas |
| `vault-hint` | `#3d5c3d` | Placeholders y texto deshabilitado |
| `vault-error` | `#ff4444` | Errores y acciones destructivas |
| `vault-warning` | `#ffaa00` | Advertencias y estrellas de valoración |

### Animaciones destacadas

- **Puerta del Vault**: al hacer scroll en la página principal, la puerta SVG con gradientes radiales y engranajes dorados gira 360° y los paneles laterales se abren revelando el catálogo con un efecto glitch
- **Efecto glitch 404**: en la página NotFound el número parpadea y se desplaza aleatoriamente de forma periódica
- **Preview de tarjeta**: en el checkout el número, nombre y fecha de la tarjeta se actualizan en tiempo real conforme el usuario escribe

---

## 🐛 Incidencias resueltas

Durante el desarrollo se detectaron y resolvieron 8 incidencias técnicas documentadas:

| ID | Descripción | Impacto | Estado |
|---|---|---|---|
| INC-01 | CORS bloqueaba las peticiones entre React (Vite) y Laravel | ALTO | ✅ Resuelta |
| INC-02 | Anime.js v4 no exporta función por defecto — `import anime` fallaba | MEDIO | ✅ Resuelta |
| INC-03 | Variables de entorno de Railway mal configuradas en el primer despliegue | ALTO | ✅ Resuelta |
| INC-04 | UUIDs truncados en `users` por usar `$table->id()` en lugar de `$table->uuid()` | ALTO | ✅ Resuelta |
| INC-05 | `tokenable_id` en `personal_access_tokens` era `bigint` — incompatible con UUID | ALTO | ✅ Resuelta |
| INC-06 | `VITE_API_URL` apuntaba al placeholder `api.example.com` en Vercel | ALTO | ✅ Resuelta |
| INC-07 | `CartControler.php` mal escrito — PSR-4 no encontraba la clase `CartController` | ALTO | ✅ Resuelta |
| INC-08 | `PurchaseController` usaba `$game->price` que no existe — columna es `original_price` | ALTO | ✅ Resuelta |

---

## 🚢 Despliegue en producción

### Backend en Railway

1. Crear proyecto en [railway.app](https://railway.app)
2. Añadir servicio desde el repositorio GitHub apuntando a la carpeta `backend`
3. Añadir servicio de base de datos MySQL
4. Configurar las variables de entorno (ver sección [Variables de entorno](#-variables-de-entorno))
5. Ejecutar desde la consola de Railway:

```bash
php artisan migrate --force
php artisan db:seed --force
```

6. Una vez desplegado, crear los juegos del catálogo desde el panel de administración en `/admin/games`

### Frontend en Vercel

1. Importar el proyecto en [vercel.com](https://vercel.com)
2. Seleccionar la carpeta `frontend` como **Root Directory**
3. Añadir la variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.up.railway.app/api
   ```
4. Desplegar — Vercel detecta automáticamente Vite y configura el build correctamente

---

## 🌿 Ramas del repositorio

| Rama | Descripción |
|---|---|
| `main` | Código estable y desplegado en producción |
| `feat/frontend` | Desarrollo del frontend (Alejandro) |
| `feat/backend` | Desarrollo del backend (Luis) |
| `fix/*` | Ramas de corrección de errores puntuales |

---

## 📄 Licencia

Proyecto académico desarrollado para el módulo de Proyecto del ciclo formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW).

**IES Francisco de Goya · Murcia · Curso 2025-2026**

---

*Vault · TFG DAW 2025-2026 · Alejandro · Luis · IES Francisco de Goya · Murcia*

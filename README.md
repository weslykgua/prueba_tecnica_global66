# ⚡ Global66 - Vue 3 + TypeScript Pokédex Technical Solution

Una aplicación web de grado de producción desarrollada en **Vue 3**, **TypeScript**, **Vite** y **Pinia** para visualizar, buscar y administrar Pokémon utilizando la [PokeAPI](https://pokeapi.co/). Diseñada siguiendo arquitectura limpia (Clean Architecture), principios SOLID, DRY y KISS, priorizando la mantenibilidad, escalabilidad, rendimiento y experiencia de usuario (UX).

---

## 🚀 Vista Previa del Proyecto

- **Pokébola animada 100% CSS** durante la carga de la aplicación.
- **Buscador en tiempo real** con filtrado optimizado (Debounce).
- **Gestión de Favoritos** con reactividad automática sin duplicidad de datos en Pinia Store.
- **Modal de Detalle** consumiendo `GET /pokemon/{name}`.
- **Acción Compartir** que copia al portapapeles exactamente en el formato: `Nombre, Peso, Altura, Tipos, Habilidades` (Ej: `Pikachu, 60, 4, Electric, Static`) con notificación Toast.
- **Diseño Moderno & Responsive**: Glassmorphic UI, animaciones fluidas a 60fps, tarjetas responsivas y accesibilidad ARIA.

---

## 🛠️ Stack Tecnológico

| Tecnología | Rol en el Proyecto |
| :--- | :--- |
| **Vue 3** | Framework progresivo con Composition API y sintaxis `<script setup lang="ts">`. |
| **TypeScript** | Tipado estricto (Modo `strict`, 0 `any`) para prevención de errores en compilación. |
| **Vite** | Build tool ultrarrápido y servidor de desarrollo con HMR instantáneo. |
| **Pinia** | Gestión de estado local centralizada, dividida en stores puros independientes (`usePokemonStore` y `useFavoritesStore`). |
| **Vue Router** | Enrutamiento cliente para navegar entre la Pokedex principal y Favoritos. |
| **Axios** | Cliente HTTP con tiempo de espera (10s) e interceptores para manejo amigable de errores. |
| **Sass / SCSS** | Estilos modernos utilizando variables, mixins de glassmorphism y keyframes. |
| **Vitest & Vue Test Utils** | Framework de pruebas unitarias para Stores, Composables y Componentes. |
| **ESLint & Prettier** | Estándar de código y formateador automático. |

---

## 📐 Arquitectura del Proyecto & Separación de Capas

El proyecto aplica **Arquitectura Limpia en Capas (Clean Architecture)** separando explícitamente el **estado local (Stores de Pinia)** del **servicio de llamadas a la API**:

```
src/
├── api/                  # Instancia Axios, interceptores de red y configuración de timeouts
├── assets/
│   └── styles/           # Sistema de diseño SCSS (variables, mixins, animaciones, estilos globales)
├── components/
│   ├── common/           # Componentes UI reutilizables (PokeballLoader, SearchBar, EmptyState, ErrorState, ModalDialog, ToastNotification)
│   ├── layout/           # Componentes de estructura (AppHeader)
│   └── pokemon/          # Componentes del dominio Pokémon (PokemonCard, PokemonList, PokemonDetailModal)
├── composables/          # Orquestadores reactivos (usePokemon) que ejecutan las llamadas a la API y actualizan los stores de Pinia
├── constants/            # Constantes globales de la API y límites
├── layouts/              # Layout base de la aplicación (MainLayout)
├── router/               # Configuración de rutas (Home, Favorites)
├── services/             # Servicios de dominio y peticiones HTTP puras (pokemon.service.ts)
├── stores/               # Stores locales puros de Pinia (useFavoritesStore.ts, usePokemonStore.ts) sin efectos secundarios HTTP
├── types/                # Interfaces de TypeScript (PokeAPI responses & modelos de dominio)
├── utils/                # Funciones puras (formatters, storage)
├── views/                # Vistas principales (HomeView, FavoritesView)
└── __tests__/            # Pruebas unitarias con Vitest (Stores, Composable, Componentes)
```

### Principio de Separación entre Store Local y API
- **Pinia Stores (`useFavoritesStore`, `usePokemonStore`)**: Son contenedores de estado **100% locales y puros**. No contienen importaciones de Axios ni ejecutan `async fetch` directamente en sus acciones. Se encargan únicamente de mutar y mantener el estado local de forma sincrónica y predecible.
- **Servicio API (`pokemonService.ts`)**: Encapsula exclusivamente las peticiones HTTP a la PokeAPI.
- **Composable Orquestador (`usePokemon.ts`)**: Conecta el servicio API con los Stores locales. Realiza las llamadas asíncronas, maneja errores y actualiza el estado de los stores de Pinia.

---

## 🧠 Decisiones Técnicas & Justificación

### 1. ¿Por qué Pinia en lugar de Vuex?
- **Tipado nativo superior**: Diseñado para TypeScript, infiriendo tipos automáticamente sin necesidad de `mapState` o `mapGetters`.
- **Estructura limpia**: Elimina las mutaciones verbosas de Vuex, permitiendo actualizar el estado directamente dentro de acciones asíncronas.
- **Rendimiento y Ligereza**: Peso de paquete ultra reducido (~1KB gzipped) e integración directa con las DevTools de Vue 3.
- **Gestión eficiente de Favoritos**: Los favoritos se almacenan mediante un `Set<string>` reactivo que guarda únicamente los identificadores/nombres de los Pokémon. De esta forma se garantiza **cero duplicación de información** y un tiempo de búsqueda $O(1)$.

### 2. ¿Por qué Composition API (`<script setup>`)?
- **Reutilización y Modulardad**: Facilita la extracción de lógica composable (`usePokemon`, `useClipboard`, `useDebounce`) manteniéndola agnóstica de los componentes UI.
- **Legibilidad**: Agrupa código relacionado funcionalmente en lugar de fragmentarlo por opciones del componente (`data`, `methods`, `computed`).
- **Mejor inferencia de TypeScript**: TypeScript comprende el alcance de las variables declaradas directamente en el top-level del bloque `<script setup>`.

---

## ⚡ Guía de Instalación y Ejecución

### Requisitos Previos
- Node.js versión **18.x** o superior.
- npm versión **9.x** o superior.

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### 3. Ejecutar Pruebas Unitarias

```bash
# Ejecutar tests una vez
npm run test

# Ejecutar tests en modo watch
npm run test:watch
```

### 4. Verificar Linter y Formato

```bash
# Corregir linting
npm run lint

# Formatear archivos con Prettier
npm run format
```

### 5. Compilar para Producción

```bash
npm run build
```

---

## 📋 Scripts Disponibles en `package.json`

- `npm run dev`: Inicia el servidor de desarrollo local con Vite.
- `npm run build`: Valida tipos con `vue-tsc` y genera el bundle optimizado para producción en `dist/`.
- `npm run preview`: Previsualiza localmente la build de producción.
- `npm run test`: Ejecuta la suite de pruebas unitarias con Vitest.
- `npm run test:watch`: Ejecuta Vitest en modo interactivo.
- `npm run lint`: Analiza el código buscando errores de sintaxis o violaciones del linter.
- `npm run format`: Formatea el código fuente según las reglas de Prettier.

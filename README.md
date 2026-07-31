# ⚡ Global66 - Vue 3 + TypeScript Pokédex Technical Solution

Una aplicación web de grado de producción desarrollada en **Vue 3**, **TypeScript**, **Vite** y **Pinia** para visualizar, buscar y administrar Pokémon utilizando la [PokeAPI](https://pokeapi.co/). Diseñada siguiendo **MVVM + Arquitectura Limpia (Clean Architecture)** y principios SOLID, DRY y KISS, priorizando la mantenibilidad, escalabilidad, rendimiento y experiencia de usuario (UX).

---

## 🚀 Vista Previa & Funcionalidades Clave

- **Pokébola animada 100% CSS (`PokeballLoader.vue`)**: Pantalla de carga animada mediante animaciones CSS puras (sin librerías externas).
- **Buscador en Tiempo Real con Carga Activa**: Filtrado por nombre e ID con indicador de carga sincrónico (`isSearching`), evitando sensaciones de pantalla congelada.
- **Catálogo Completo & Paginación Dinámica (`Pagination.vue`)**: Carga del catálogo completo (1025 Pokémon) distribuido en páginas numéricas configurables (30 ítems/pág) con desplazamiento suave (*smooth scroll*).
- **Navegación Instantánea con `<KeepAlive>`**: Cambio entre las pestañas "Todos" y "Favoritos" en **0ms** manteniendo el estado en memoria.
- **Gestión de Favoritos en Pinia Store**: Reactividad automática almacenando únicamente identificadores/nombres en un `Set<string>` para garantizar cero duplicidad de información.
- **Modal de Detalle (`PokemonDetailModal.vue`)**: Consumo de `GET /pokemon/{name}` mostrando imagen oficial, peso, altura, tipos y habilidades.
- **Acción Compartir**: Copia al portapapeles exactamente en el formato requerido: `Nombre, Peso, Altura, Tipos, Habilidades` (Ej: `Pikachu, 60, 4, Electric, Static`) con notificación flotante Toast.
- **Diseño Moderno & Responsive**: Estéticas minimalistas, animaciones a 60fps con aceleración por hardware GPU y accesibilidad ARIA.

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
| **Sass / SCSS** | Estilos modernos utilizando variables, mixins y keyframes. |
| **Vitest & Vue Test Utils** | Framework de pruebas unitarias para Stores, Composables y Componentes. |
| **ESLint & Prettier** | Estándar de código y formateador automático. |

---

## 📐 Arquitectura MVVM + Clean Architecture

El proyecto aplica **MVVM (Model-View-ViewModel)** combinado con **Clean Architecture en Capas**, separando estrictamente las responsabilidades del sistema:

```
src/
├── domain/                       # 1. Capa de Dominio (Pure Domain Layer)
│   ├── entities/                 # Entidades de negocio (PokemonListItemEntity, PokemonDetailEntity)
│   ├── repositories/             # Contrato / Interfaz del Repositorio (IPokemonRepository)
│   └── usecases/                 # Casos de Uso (GetPokemonListUseCase, GetPokemonDetailUseCase)
│
├── data/                         # 2. Capa de Datos (Data Layer)
│   ├── datasources/              # Data Source Remoto con Axios (PokemonRemoteDataSource)
│   ├── mappers/                  # Mapeadores DTO -> Entity (PokemonMapper)
│   └── repositories/             # Implementación del Repositorio (PokemonRepositoryImpl)
│
├── presentation/                 # 3. Capa de Presentación (MVVM Layer)
│   ├── viewmodels/               # ViewModels reactivos (usePokemonViewModel, useClipboardViewModel)
│   ├── stores/                   # Stores locales de Pinia (usePokemonStore, useFavoritesStore)
│   ├── components/               # Componentes de Vista (PokemonCard, PokemonList, SearchBar, Pagination)
│   └── views/                    # Vistas principales (HomeView, FavoritesView)
│
└── core/                         # 4. Núcleo / Shared Utilities
    ├── api/                      # Instancia e interceptores Axios
    ├── constants/                # Constantes globales de API y paginación
    └── utils/                    # Funciones puras (formatters)
```

### Flujo de Datos MVVM + Clean Architecture

1. **View (Vue Templates)**: Renderizan la interfaz de usuario y capturan interacciones del usuario.
2. **ViewModel (`usePokemonViewModel`)**: Expone propiedades reactivas y comandos. Llama a los **Casos de Uso**.
3. **Use Cases (`GetPokemonListUseCase`)**: Ejecutan la regla de negocio pura utilizando la interfaz del repositorio (`IPokemonRepository`).
4. **Repository Impl (`PokemonRepositoryImpl`)**: Solicita los datos a la **Data Source**, transforma los DTOs usando **Mappers** y devuelve entidades puras de dominio.
5. **Pinia Stores (`usePokemonStore`, `useFavoritesStore`)**: Mantienen el estado local cliente actualizado de forma reactiva y sincrónica.

---

## 🧠 Decisiones Técnicas & Justificación

### 1. ¿Por qué MVVM + Clean Architecture?
- **Desacoplamiento Total**: La capa de dominio no conoce ni depende de Vue, Pinia ni Axios. Puede reutilizarse o probarse en aislamiento.
- **Testabilidad Excepcional**: Cada caso de uso y mapper se prueba independientemente con mocks.
- **Mantenibilidad Senior**: Las reglas de negocio, llamadas a la API e interfaces visuales están claramente delimitadas.

### 2. ¿Por qué Pinia en lugar de Vuex?
- **Tipado nativo superior**: Diseñado para TypeScript, infiriendo tipos automáticamente.
- **Gestión eficiente de Favoritos**: Los favoritos se almacenan mediante un `Set<string>` reactivo que guarda únicamente los nombres de los Pokémon. Garantiza **cero duplicación de información** y tiempos de búsqueda de $O(1)$.

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
# Ejecutar suite de tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch
```

### 4. Verificar Linter y Formato

```bash
# Corregir linting con ESLint
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

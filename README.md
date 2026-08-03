# ⚡ Global66 - Vue 3 + TypeScript Pokédex Technical Solution

Una aplicación web de grado de producción desarrollada en **Vue 3**, **TypeScript**, **Vite** y **Pinia** para visualizar, buscar y administrar Pokémon utilizando la [PokeAPI](https://pokeapi.co/). Diseñada siguiendo una **Arquitectura por Módulos Autocontenidos (Domain-Driven Module Architecture)**, principios SOLID, DRY y KISS, priorizando la mantenibilidad, escalabilidad, rendimiento y experiencia de usuario (UX).

---

## 🚀 Vista Previa & Funcionalidades Clave

- **Pokébola animada 100% CSS (`PokeballLoader.vue`)**: Pantalla de carga animada mediante animaciones CSS puras (sin librerías externas).
- **Buscador en Tiempo Real con Carga Activa**: Filtrado por nombre e ID con indicador de carga sincrónico (`isSearching`), evitando sensaciones de pantalla congelada.
- **Catálogo Completo & Scroll infinito**: Carga del catálogo completo (1025 Pokémon) distribuido en páginas numéricas configurables (30 ítems/pág) con desplazamiento suave (_smooth scroll_).
- **Navegación Instantánea con `<KeepAlive>`**: Cambio entre las pestañas "Todos" y "Favoritos" en **0ms** manteniendo el estado en memoria.
- **Gestión de Favoritos en Pinia Store**: Reactividad automática almacenando únicamente identificadores/nombres en un `Set<string>` para garantizar cero duplicidad de información.
- **Pantalla de Detalle**: Consumo de `GET /pokemon/{name}` mostrando imagen oficial, peso, altura, tipos y habilidades.
- **Acción Compartir**: Copia al portapapeles exactamente en el formato requerido: `Nombre, Peso, Altura, Tipos, Habilidades` (Ej: `Pikachu, 60, 4, Electric, Static`) con notificación flotante Toast.
- **Diseño Responsive**: Estéticas adaptables y animaciones a 60fps con aceleración por hardware GPU.

---

## 🧱 Arquitectura y mejoras de diseño

El proyecto está organizado con una arquitectura modular orientada a mantener el código desacoplado, fácil de escalar y sencillo de probar. La estructura refleja una separación clara entre presentación, lógica de dominio y acceso a datos:

- **Módulos por dominio**: carpetas como `pokemon`, `onboarding`, `home` y `dashboard` concentran la lógica y los componentes de cada área, evitando que el proyecto crezca como una sola bola de negocio.

- **Separación de capas**: las vistas y componentes se encargan de la UI; los `composables` y `stores` centralizan la lógica reactiva y el estado; la capa `remote` gestiona el consumo de la API; y los `mappers` traducen los DTOs remotos a modelos locales.
- **Estado centralizado con Pinia**: los stores para Pokémon, favoritos y onboarding evitan duplicar estado y facilitan la comunicación entre vistas.

- **Acceso a datos aislado**: la API remota está separada del resto de la app, lo que facilita reemplazar o extender la integración con PokeAPI sin afectar la experiencia de usuario.

- **Enrutamiento y guardas**: el router centraliza la navegación y protege el flujo de onboarding, lo que mejora la coherencia del producto.

Además, algunas mejoras de arquitectura que ya se aprecian en el proyecto son la reducción de lógica en las vistas, la reutilización de piezas comunes a través de composables y componentes dando la posibilidad de evolucionar hacia servicios o repositorios adicionales si el sistema crece en complejidad.

Esta combinación de principios facilita futuras mejoras, como agregar nuevas vistas, introducir más fuentes de datos o refactorizar módulos sin afectar el resto de la aplicación.

---

## 🛠️ Stack Tecnológico

| Tecnología                  | Rol en el Proyecto                                                                       |
| :-------------------------- | :--------------------------------------------------------------------------------------- |
| **Vue 3**                   | Framework progresivo con Composition API y sintaxis `<script setup lang="ts">`.          |
| **TypeScript**              | Tipado estricto (Modo `strict`, 0 `any`) para prevención de errores en compilación.      |
| **Vite**                    | Build tool ultrarrápido y servidor de desarrollo con HMR instantáneo.                    |
| **Pinia**                   | Gestión de estado local centralizada (`pokemon.store.ts` y `favorites.store.ts`).        |
| **Vue Router**              | Enrutamiento cliente para navegar entre la Pokedex principal y Favoritos.                |
| **Axios**                   | Cliente HTTP con tiempo de espera (10s) e interceptores para manejo amigable de errores. |
| **Sass / SCSS**             | Estilos modernos utilizando variables, mixins y keyframes.                               |
| **Vitest & Vue Test Utils** | Framework de pruebas unitarias para Stores, Composables y Componentes.                   |
| **ESLint & Prettier**       | Estándar de código y formateador automático.                                             |

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

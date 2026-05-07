# Tzadik Web — CLAUDE.md

Web pública de **Tzadik**: maquinaria agrícola y vial. Catálogo de productos por categoría/marca, secciones institucionales y formularios de contacto. Producción: `https://www.tzadik.com.ar` (Vercel).

## Stack

- **Nuxt 4** (`compatibilityDate: 2025-07-15`, `ssr: true`)
- **Vue 3** + Composition API
- **Tailwind 6** con breakpoints custom (`sm 480 / md 768 / lg 1080 / xl 1280 / xxl 1440`)
- **Supabase** (`@nuxtjs/supabase`) — DB + Storage públicos
- **Pinia** stores
- `@nuxt/image` (provider auto: Vercel en prod), `@nuxt/fonts`, `@nuxt/icon` (tabler), `@nuxtjs/seo` (sitemap, robots, og-image, schema-org)

## Layout del repo

```
app/
  app.vue                 # NuxtLayout > NuxtPage
  layouts/
    default.vue           # Header + slot + Whatsapp + Footer (todo el sitio)
    contact.vue           # layout reducido para /contacto
  pages/
    index.vue             # Home
    contacto.vue          # Hub de WhatsApp por sucursal
    quienes-somos.vue
    servicios.vue
    categorias/
      index.vue           # (a crear) listado de categorías
      [categoria]/
        index.vue         # listado de productos por categoría
        [producto].vue    # detalle de producto
    marcas/
      [nombre].vue        # detalle por marca (lista hardcodeada en shared/marcas.js)
  components/
    home/                 # Hero, Ofertas, Marcas, Servicios, Reviews, Ubicaciones, Contacto
    default/              # Header, Footer, Main (wrappers globales)
    nav/                  # Categorias (sticky), Drawer (mobile)
    product/, review/, marca/, categoria/, servicios/, somos/, contact/, form/, button/, carousel/, heading/
  composables/
    useProductos.js       # wrapper sobre stores/productos
    useCategorias.js      # wrapper sobre stores/categorias
    useReviews.js         # wrapper sobre stores/reviews
    useStorage.js         # subida + URL helpers de Supabase Storage
    useSupabaseCache.js   # ⚠️ definido pero NO usado (limpiar o cablear)
    useDebounce.js, useDynamicForm.js, useNotification.js
  stores/                 # productos.js, categorias.js, reviews.js (Pinia)
  shared/                 # marcas.js (lista hardcodeada), menu.js
  constants/ROUTE_NAMES.js
  utils/                  # categoryImages.js, formatCurrency.js
  assets/css/main.css
public/images/             # Webp por breakpoint en home/, contacto/, servicios/, somos/, categorias/, marcas/, redes/
```

## Convenciones

- **Idioma UI**: español. Idioma código: inglés. Comentarios en español.
- **Tailwind**: orden de clases obligatorio (sizing → layout → position → bg → border → typography → effects → interactivity → overflow → svg → a11y → spacing). Breakpoints: base → sm → md → lg → xl → xxl. Estados (`hover:`, `focus:`) pegados a su propiedad base.
- **Imágenes**: usar `<NuxtImg>` salvo casos donde `<picture>` con `<source media>` aporte más (heros responsivos). NUNCA armar URLs Supabase a mano fuera del store/composable correspondiente — usar `getImageUrl()` o el image provider.
- **Imágenes de productos**: vienen de Supabase Storage bucket `productos-imagenes`. Las marcas/categorías/servicios/redes son SVG/WebP en `public/images/`.
- **Naming SEO**: archivos públicos siguen patrón `<descripcion-keyword>-Tzadik-<Breakpoint>.webp`.

## Datos (Supabase)

Org: **Tzadik** — MCP server: `supabase-tzadik`. Project URL: `https://bueiuoskfgmfakhfzrqf.supabase.co`.

Tablas consumidas por la web:

| Tabla | Uso | Columnas clave |
|---|---|---|
| `productos` | listados, detalle | id, titulo, slug?, descripcion_corta, descripcion_larga, precio, precio_descuento, moneda, condicion, oferta, destacado, activo, categoria_id, subcategoria_id, datos_dinamicos (JSONB), ficha_tecnica, videos, created_at |
| `producto_imagenes` | imágenes producto | id, producto_id, storage_path, es_principal, orden |
| `categorias` | nav + filtros | id, nombre, icon |
| `subcategorias` | filtros | id, categoria_id, nombre |
| `categoria_campos` | filtros dinámicos por categoría | categoria_id, nombre_campo, label, tipo, opciones, orden, activo, requerido |
| `reviews` | testimonios home | id, autor, ciudad, provincia, titulo, comentario, rating, img, created_at |

**Marcas no están en DB** — viven hardcoded en `app/shared/marcas.js` (cada marca: `{ nombre, slug, img, alt, caracteristicas[] }`). Es un punto de mejora a futuro.

Buckets storage públicos: `productos-imagenes`, `productos-videos`, `productos-pdfs`, `reviews-imagenes`.

## Comandos

```bash
npm run dev        # http://localhost:3000
npm run build      # producción
npm run preview    # preview del build
npm run start      # git pull + npm i + dev (no usar en sesiones normales)
```

## Variables de entorno

```
SUPABASE_URL=
SUPABASE_KEY=             # anon key
GOOGLE_MAPS_API_KEY=      # mapa en home (Ubicaciones.vue)
NUXT_PUBLIC_SITE_URL=     # opcional, default https://tzadik.com.ar
```

## CMS hermano

El catálogo lo administra **PcmTzadik** (`/Users/lio/Desktop/Peripeteia/Proyectos PCM/PcmTzadik`), que escribe sobre la misma DB de Supabase. Pendientes en CMS que afectan a la web:
- No persiste `alt_text`, `width`, `height` en `producto_imagenes` (la web no puede hacer `<img width height>` real).
- No convierte a WebP/AVIF al subir.
- Sin campos SEO opcionales por producto (`meta_title`, `meta_description`).

## Patrones a respetar / anti-patrones detectados

- **SSR en pages, no en hijos**: las pages que dependen de datos deben hacer top-level `await` con `useAsyncData` para que el HTML salga renderizado. Componentes hijos NO deben hacer `onMounted(fetch)` — eso rompe SEO y CWV. Hoy `Reviews.vue` y `Ubicaciones.vue` siguen patrón viejo (CSR), pendiente refactor.
- **Image URLs**: `stores/productos.js#getImageUrl` arma URL Supabase a mano. Para `<NuxtImg>` se debe pasar el `storage_path` y dejar que el provider Vercel/IPX optimice.
- **`useSupabaseCache.js` está orfanado**: usarlo o eliminarlo. Hoy nadie lo invoca.
- **Marcas hardcoded**: cualquier alta/cambio requiere edit de código.
- **Caché HTML**: actualmente todas las rutas son SSR sin caché (`x-vercel-cache: MISS`). Considerar `routeRules` con `swr` para rutas estables.

## Verificaciones rápidas tras cambios

```bash
# build limpio
rm -rf .nuxt .output && npm run build

# inspeccionar SSR de la home
npm run dev &
curl -s http://localhost:3000/ | grep -i "og:image\|canonical\|<title"

# sitemap
curl -s http://localhost:3000/sitemap.xml | head -30
```

## Sucursales (datos canónicos)

5 sucursales en NEA (Resistencia/Sáenz Peña/Villa Ángela en Chaco; Corrientes capital; Posadas en Misiones). Coordenadas y direcciones en `app/components/home/Ubicaciones.vue`. Teléfonos por sucursal en `app/pages/contacto.vue`. Casa central: Ruta N 11 - Km 1006.2 Resistencia, Chaco. Horario: L-V 9-18.

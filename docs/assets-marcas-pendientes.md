# Assets de marcas — pedido al cliente

Las marcas ahora viven en la tabla `marcas` de Supabase (antes estaban hardcodeadas en `app/shared/marcas.js`,
archivo eliminado). Una marca aparece en el carrusel de la home y tiene página propia `/marcas/<slug>`
**solo si `destacada = true`**, y para eso necesita el set completo de assets.

## Qué necesita cada marca para publicarse

| # | Qué | Formato | Detalle |
|---|-----|---------|---------|
| 1 | **Logo** | `.webp`, ~200×80px, fondo transparente | Va en el carrusel y arriba de la página. Ej: `segway.webp` |
| 2 | **Foto de producto/ambiente** | `.webp`, ~600×400px, horizontal | Imagen grande de la ficha. Nombre descriptivo con guiones, ej: `Segway-Cuatriciclos-UTV.webp` |
| 3 | **Texto alternativo** | 1 línea | Para SEO y accesibilidad. Ej: "Segway cuatriciclos UTV off road" |
| 4 | **5 características** | 5 frases cortas | Una línea cada una: años de trayectoria, origen, catálogo, presencia en Argentina, diferencial técnico |
| 5 | **5 íconos** | uno por característica | Elegir de la lista de abajo, o mandar SVG nuevo |

Los archivos van a `public/images/marcas/` y los íconos a `public/images/marcas/caracteristicas/`.

## Íconos ya disponibles

`arbol` · `argentina` · `barco` · `caja-herramientas` · `calendario` · `cereal` · `equipos-maquinaria` ·
`evolucion` · `fabrica` · `grua` · `herramienta` · `locomotora` · `mundo` · `pacto` · `pala-cargadora` ·
`papiro` · `repuestos` · `robot` · `rueda` · `siglo` · `sol` · `soporte` · `tractor` · `ubicacion` ·
`vaca` · `valorada`

Si una característica no encaja con ninguno, pedir el SVG (monocromo, 32×32, trazo simple).

---

## PRIORIDAD 1 — Segway (marca nueva)

Es la que motivó todo esto. Ya tiene 1 producto cargado en el CMS y está en la tabla, pero **sin assets no
aparece en la web**. Necesita los 5 puntos de la tabla de arriba.

Además, definir: ¿Segway va asociada a la categoría **Off Road** que se creó? Si es así, conviene cargar
los productos de esa línea antes de publicar.

## PRIORIDAD 2 — Marcas con productos cargados pero sin ficha

Estas ya tienen productos publicados en la web, pero al no ser `destacada` no tienen página propia ni
aparecen en el carrusel. Ordenadas por cantidad de productos:

| Marca | Productos |
|-------|-----------|
| Tork | 5 |
| Bylion | 3 |
| Inronda | 2 |
| Lavrale | 2 |
| LGMG | 2 |
| Niwa | 2 |
| Sinomach | 2 |
| XCMG | 2 |
| Agroar, American Cut, BTA, Clark, Dowen Paggio, Fugleman, Heli, Massey Ferguson, Pauny, RolandH, Same, Toyota, Tzadik, Vica, Yuchai | 1 c/u |

**Decisión pendiente del cliente:** ¿cuáles de estas merecen ficha completa y cuáles quedan como marca
suelta (el producto se ve igual en el catálogo, solo que sin página de marca)? No hace falta hacerlas todas.

## Marcas publicadas hoy sin ningún producto

`Fema`, `Luqstoff`, `Montecor` tienen ficha completa y página activa, pero **cero productos**. La página
muestra "No hay productos disponibles de esta marca".

Preguntar al cliente: ¿se van a cargar productos de estas marcas, o se despublican (`destacada = false`)?

## Cómo se carga una marca nueva una vez que llegan los assets

1. Subir logo y foto a `public/images/marcas/`, íconos nuevos a `caracteristicas/`.
2. Actualizar la fila en Supabase (`logo`, `img`, `alt`, `caracteristicas`, `destacada = true`, `orden`).
3. Listo: la web la toma sola, sin deploy. El sitemap la incluye automáticamente.

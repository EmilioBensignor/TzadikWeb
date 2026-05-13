import { serverSupabaseClient } from '#supabase/server'
import marcas from '~/shared/marcas'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const slugify = (titulo: string) =>
    titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

  const urls: { loc: string; lastmod?: string; priority?: number; changefreq?: string }[] = []

  try {
    const { data: categorias } = await supabase
      .from('categorias')
      .select('nombre, updated_at')
      .order('id')

    if (categorias) {
      for (const cat of categorias) {
        if (!cat.nombre) continue
        urls.push({
          loc: `/categorias/${slugify(cat.nombre)}`,
          lastmod: cat.updated_at || undefined,
          priority: 0.8,
          changefreq: 'weekly'
        })
      }
    }

    const { data: productos } = await supabase
      .from('productos')
      .select('titulo, categoria_id, updated_at, categorias(nombre)')
      .eq('activo', true)

    if (productos) {
      for (const prod of productos) {
        const categoriaNombre = (prod as any).categorias?.nombre
        if (!categoriaNombre || !prod.titulo) continue
        const categoriaSlug = slugify(categoriaNombre)
        const productoSlug = slugify(prod.titulo)
        urls.push({
          loc: `/categorias/${categoriaSlug}/${productoSlug}`,
          lastmod: prod.updated_at || undefined,
          priority: 0.7,
          changefreq: 'weekly'
        })
      }
    }
  } catch (err) {
    console.error('[sitemap] error consultando Supabase:', err)
  }

  for (const marca of marcas) {
    urls.push({
      loc: `/marcas/${marca.slug}`,
      priority: 0.6,
      changefreq: 'monthly'
    })
  }

  return urls
})

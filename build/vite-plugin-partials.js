import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

/**
 * vite-plugin-partials
 * ---------------------
 * 1. Ensambla los parciales de sección en index.html y resuelve placeholders:
 *    {{ wa('...') }}   → https://wa.me/...?text=...
 *    {{ year }}                     → año actual
 *    {{ siteUrl }}                  → URL canónica del sitio
 *    {{ base }}                     → base de Vite (ej: /cm-stilista/)
 * 2. Emite robots.txt y sitemap.xml en dist/ resolviendo {{ siteUrl }} y {{ year }}.
 *
 * Funciona tanto en `vite dev` como en `vite build`.
 */
export default function partialsPlugin() {
  const root = process.cwd()
  const distDir = path.join(root, 'dist')

  // Capturar el base resuelto por Vite
  let resolvedBase = '/'

  async function readConfig() {
    const configPath = path.join(root, 'src', 'config.js')
    const mod = await import(pathToFileURL(configPath).href)
    return mod.default || mod.config
  }

  function waLink(text, config) {
    return `https://wa.me/${config.business.whatsapp}?text=${encodeURIComponent(text)}`
  }

  function processIncludes(html, filePath) {
    const dir = path.dirname(path.join(root, filePath))
    const includeRe = /<!--\s*@include\s+["']([^"']+)["']\s*-->/g

    return html.replace(includeRe, (match, relPath) => {
      const absPath = path.resolve(dir, relPath)
      if (!fs.existsSync(absPath)) {
        console.warn(`[vite-plugin-partials] include no encontrado: ${absPath}`)
        return match
      }
      let chunk = fs.readFileSync(absPath, 'utf8')
      chunk = processIncludes(chunk, absPath)
      return chunk
    })
  }

  function processPlaceholders(html, config, base) {
    return html
      .replace(/\{\{\s*wa\(\s*['"]([^'"]*)['"]\s*\)\s*\}\}/g, (_, text) =>
        waLink(text, config)
      )
      .replace(/\{\{\s*year\s*\}\}/g, String(config.business.copyrightYear))
      .replace(/\{\{\s*siteUrl\s*\}\}/g, config.business.siteUrl)
      .replace(/\{\{\s*base\s*\}\}/g, base)
  }

  return {
    name: 'vite-plugin-partials',
    enforce: 'pre',

    configResolved(config) {
      resolvedBase = config.base || '/'
    },

    async transformIndexHtml(html) {
      const config = await readConfig()
      const base = resolvedBase
      let result = processIncludes(html, 'index.html')
      result = processPlaceholders(result, config, base)
      return result
    },

    async writeBundle() {
      const config = await readConfig()
      const siteUrl = config.business.siteUrl.replace(/\/$/, '')
      const year = String(config.business.copyrightYear)
      const base = resolvedBase

      // robots.txt
      const robotsTpl = fs.readFileSync(path.join(root, 'src', 'robots.txt.tpl'), 'utf8')
      const robots = robotsTpl.replace(/\{\{\s*siteUrl\s*\}\}/g, siteUrl)
      fs.writeFileSync(path.join(distDir, 'robots.txt'), robots)

      // sitemap.xml
      const sitemapTpl = fs.readFileSync(path.join(root, 'src', 'sitemap.xml.tpl'), 'utf8')
      const sitemap = sitemapTpl
        .replace(/\{\{\s*siteUrl\s*\}\}/g, siteUrl)
        .replace(/\{\{\s*year\s*\}\}/g, year)
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)

      console.log('[vite-plugin-partials] robots.txt y sitemap.xml generados en dist/')
    }
  }
}

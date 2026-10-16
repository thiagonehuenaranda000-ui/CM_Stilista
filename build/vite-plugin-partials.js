import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

/**
 * vite-plugin-partials
 * ---------------------
 * Ensambla los parciales de sección en index.html y resuelve placeholders:
 *   <!-- @include "./src/sections/03-hero.html" -->  → contenido del archivo
 *   {{ wa('Hola Cintia! ...') }}                        → https://wa.me/...?text=...
 *   {{ year }}                                          → año actual (copyright dinámico)
 *   {{ siteUrl }}                                       → URL canónica del sitio
 *
 * Funciona tanto en `vite dev` como en `vite build` (transformIndexHtml).
 */
export default function partialsPlugin() {
  const root = process.cwd()

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

  function processPlaceholders(html, config) {
    return html
      .replace(/\{\{\s*wa\(\s*['"]([^'"]*)['"]\s*\)\s*\}\}/g, (_, text) =>
        waLink(text, config)
      )
      .replace(/\{\{\s*year\s*\}\}/g, String(config.business.copyrightYear))
      .replace(/\{\{\s*siteUrl\s*\}\}/g, config.business.siteUrl)
  }

  return {
    name: 'vite-plugin-partials',
    enforce: 'pre',

    async transformIndexHtml(html) {
      const config = await readConfig()
      let result = processIncludes(html, 'index.html')
      result = processPlaceholders(result, config)
      return result
    }
  }
}

import fs from 'fs'
import path from 'path'

/**
 * vite-plugin-partials
 * ---------------------
 * Ensambla los parciales de sección en index.html y resuelve placeholders:
 *   <!-- @include "./src/sections/03-hero.html" -->  → contenido del archivo
 *   {{ wa('Hola Cintia! ...') }}                        → https://wa.me/...?text=...
 *   {{ year }}                                          → año actual (copyright dinámico)
 *
 * Funciona tanto en `vite dev` como en `vite build` (transformIndexHtml).
 */
export default function partialsPlugin() {
  const root = process.cwd()

  function readConfig() {
    const configPath = path.join(root, 'src', 'config.js')
    const source = fs.readFileSync(configPath, 'utf8')

    // Extrae el objeto exportado como "export const config = { ... }"
    const match = source.match(/export\s+const\s+config\s*=\s*(\{[\s\S]*\n?\})/)
    if (!match) throw new Error('No se pudo parsear src/config.js')

    // Usamos new Function en un contexto aislado para convertir el literal de
    // objeto JS en un objeto real (sin ejecutar efectos secundarios).
    /* eslint-disable no-new-func */
    const config = new Function(`return ${match[1]};`)()
    /* eslint-enable no-new-func */

    return config
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
      // Resuelve includes anidados recursivamente (por si acaso)
      chunk = processIncludes(chunk, absPath)
      return chunk
    })
  }

  function processPlaceholders(html, config) {
    return html
      // {{ wa('texto con espacios') }}
      .replace(/\{\{\s*wa\(\s*['"]([^'"]*)['"]\s*\)\s*\}\}/g, (_, text) =>
        waLink(text, config)
      )
      // {{ year }}
      .replace(/\{\{\s*year\s*\}\}/g, String(config.business.copyrightYear))
      // {{ siteUrl }}
      .replace(/\{\{\s*siteUrl\s*\}\}/g, config.business.siteUrl)
  }

  return {
    name: 'vite-plugin-partials',
    enforce: 'pre',

    async transformIndexHtml(html) {
      const config = readConfig()

      // 1. Includes de parciales (relativos a index.html, que está en la raíz)
      let result = processIncludes(html, 'index.html')

      // 2. Placeholders de config y WhatsApp
      result = processPlaceholders(result, config)

      return result
    }
  }
}

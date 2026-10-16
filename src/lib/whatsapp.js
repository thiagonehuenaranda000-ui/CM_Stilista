/**
 * src/lib/whatsapp.js
 * Helper de WhatsApp disponible en runtime (navegador).
 * El build-time (plugin de parciales) ya resuelve la mayoría de enlaces,
 * pero el widget de reserva necesita generarlos dinámicamente.
 */
import { config, waLink } from '../config.js'

export { config, waLink }

/**
 * Abre WhatsApp con un mensaje pre-cargado.
 * @param {string} text
 */
export function openWhatsApp(text) {
  const url = waLink(text)
  window.open(url, '_blank')
}

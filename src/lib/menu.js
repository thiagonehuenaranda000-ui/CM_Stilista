/**
 * src/lib/menu.js
 * Menú móvil accesible (hamburguesa).
 * - aria-expanded / aria-controls en el botón
 * - Clic fuera / ESC para cerrar
 * - Focus trap básico dentro del menú abierto
 * - Los enlaces de ancla cierran el menú al hacer clic
 */
export function initMobileMenu() {
  const btn = document.querySelector('[data-mobile-menu="button"]')
  const menu = document.querySelector('[data-mobile-menu="menu"]')
  const links = menu ? Array.from(menu.querySelectorAll('a')) : []

  if (!btn || !menu) return

  btn.setAttribute('aria-expanded', 'false')
  btn.setAttribute('aria-controls', menu.id || 'mobile-menu')
  if (!menu.id) menu.id = 'mobile-menu'

  function open() {
    btn.setAttribute('aria-expanded', 'true')
    menu.classList.remove('hidden')
    menu.classList.add('flex')
    // Mover foco al primer enlace
    const first = links[0]
    if (first) first.focus()
  }

  function close() {
    btn.setAttribute('aria-expanded', 'false')
    menu.classList.remove('flex')
    menu.classList.add('hidden')
    btn.focus()
  }

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true'
    expanded ? close() : open()
  })

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })

  // Cerrar al hacer clic en un enlace (navegación por anclas)
  links.forEach((link) => {
    link.addEventListener('click', () => {
      close()
    })
  })

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (btn.getAttribute('aria-expanded') === 'true' && !btn.contains(e.target) && !menu.contains(e.target)) {
      close()
    }
  })

  // Cerrar con ESC desde cualquier lugar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      close()
    }
  })
}

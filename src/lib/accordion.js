/**
 * src/lib/accordion.js
 * Acordeones accesibles para precios y preguntas frecuentes.
 * - <button> con aria-expanded / aria-controls
 * - Teclado: Enter y Espacio alternan
 * - Animación por clases (nunca style.display inline)
 * - Foco visible con el magenta de marca (definido en main.css)
 */
export function initAccordions() {
  const headers = document.querySelectorAll('[data-accordion="header"]')

  headers.forEach((header) => {
    const contentId = header.getAttribute('aria-controls')
    const content = contentId ? document.getElementById(contentId) : header.nextElementSibling
    const icon = header.querySelector('.accordion-icon, .faq-icon')

    // Estado inicial: cerrado
    header.setAttribute('aria-expanded', 'false')
    if (content) {
      content.setAttribute('hidden', '')
      content.setAttribute('data-open', 'false')
    }

    const toggle = () => {
      const expanded = header.getAttribute('aria-expanded') === 'true'
      const next = !expanded

      header.setAttribute('aria-expanded', String(next))

      if (content) {
        content.setAttribute('data-open', String(next))
        if (next) {
          content.removeAttribute('hidden')
          // Pequeño timeout para permitir que la transición de max-height arranque
          requestAnimationFrame(() => {
            content.classList.add('open')
          })
        } else {
          content.classList.remove('open')
          content.addEventListener(
            'transitionend',
            () => {
              if (!content.classList.contains('open')) {
                content.setAttribute('hidden', '')
              }
            },
            { once: true }
          )
        }
      }

      if (icon) {
        icon.style.transform = next ? 'rotate(180deg)' : 'rotate(0deg)'
        icon.setAttribute('aria-label', next ? 'Contraer' : 'Expandir')
      }
    }

    header.addEventListener('click', toggle)
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle()
      }
    })
  })
}

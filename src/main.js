/**
 * src/main.js
 * Punto de entrada de la aplicación. Importa CSS y módulos de interacción.
 * No hay frameworks: solo JavaScript vanilla.
 */
import './styles/main.css'

import { initBooking } from './lib/booking.js'
import { initAccordions } from './lib/accordion.js'
import { initMobileMenu } from './lib/menu.js'

document.addEventListener('DOMContentLoaded', () => {
  initBooking()
  initAccordions()
  initMobileMenu()
})

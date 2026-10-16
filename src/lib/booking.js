/**
 * src/lib/booking.js
 * Widget de reserva: servicio, día y horario como grupos de botones estilo radio
 * (role="radiogroup"), accesibles por teclado y con foco visible.
 *
 * Estado inicial: Alisado Biomolecular, Miércoles, 10:00 hs.
 * El mensaje de WhatsApp sigue el formato exacto del prototipo.
 */
import { config, waLink } from '../config.js'

const SELECTORS = {
  serviceGroup: '#service-selector',
  dateGroup: '#date-selector',
  timeGroup: '#time-selector',
  nameInput: '#client-name',
  msgInput: '#client-msg',
  btn: '#btn-confirm-booking'
}

let selectedService = config.services.find((s) => s.id === 'alisado-biomolecular')?.name || 'Alisado Biomolecular'
let selectedDay = config.days.find((d) => d.initial)?.day || 'Miércoles'
let selectedTime = config.times.find((t) => t.initial)?.label || '10:00 hs (Mañana)'

function setPillState(groupSelector, activeKey, activeAttr) {
  const pills = document.querySelectorAll(`${groupSelector} [type="button"]`)
  pills.forEach((pill) => {
    const isActive = pill.getAttribute(activeAttr) === activeKey
    if (isActive) {
      pill.classList.remove(
        'bg-surface-container-high',
        'text-on-surface'
      )
      pill.classList.add('bg-primary', 'text-white', 'ring-1', 'ring-primary')
      pill.setAttribute('aria-checked', 'true')
      pill.setAttribute('tabindex', '0')
    } else {
      pill.classList.remove('bg-primary', 'text-white', 'active-service', 'active-date', 'active-time', 'ring-1', 'ring-primary')
      pill.classList.add('bg-surface-container-high', 'text-on-surface')
      pill.setAttribute('aria-checked', 'false')
      pill.setAttribute('tabindex', '-1')
    }
  })
}

function updateSelection(key, value) {
  if (key === 'service') selectedService = value
  if (key === 'day') selectedDay = value
  if (key === 'time') selectedTime = value
}

function buildMessage() {
  const nameInput = document.querySelector(SELECTORS.nameInput)
  const msgInput = document.querySelector(SELECTORS.msgInput)
  const clientName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Hola'
  const clientNote = (msgInput && msgInput.value.trim()) ? ` (${msgInput.value.trim()})` : ''

  // Formato idéntico al prototipo
  return `Hola Cintia! Mi nombre es ${clientName}. Quisiera consultar turno para *${selectedService}* el día *${selectedDay}* en el horario de *${selectedTime}*${clientNote}. ¿Tenés disponibilidad? Muchas gracias!`
}

function handleSend() {
  const text = buildMessage()
  const url = waLink(text)
  window.open(url, '_blank')
}

function initGroup(groupSelector, activeAttr, onSelect) {
  const container = document.querySelector(groupSelector)
  if (!container) return

  container.setAttribute('role', 'radiogroup')
  container.setAttribute('aria-label', 'Selección de opción')

  const pills = Array.from(container.querySelectorAll('[type="button"]'))

  // Inicializar estados ARIA y tabindex
  pills.forEach((pill) => {
    pill.setAttribute('aria-checked', 'false')
    pill.setAttribute('tabindex', '-1')
    pill.addEventListener('click', () => {
      const key = pill.getAttribute('data-srv') || pill.getAttribute('data-day') || pill.textContent.trim()
      updateSelection(onSelect, key)
      setPillState(groupSelector, key, activeAttr)
    })

    // Teclado: Enter y Espacio activan; flechas se mueven entre opciones
    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        pill.click()
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const idx = pills.indexOf(pill)
        const next = pills[(idx + 1) % pills.length]
        next?.focus()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const idx = pills.indexOf(pill)
        const prev = pills[(idx - 1 + pills.length) % pills.length]
        prev?.focus()
      }
      if (e.key === 'Home') {
        e.preventDefault()
        pills[0]?.focus()
      }
      if (e.key === 'End') {
        e.preventDefault()
        pills[pills.length - 1]?.focus()
      }
    })
  })

  // Estado inicial: marcar la opción activa
  const initialKey = pills.find((p) => p.classList.contains('bg-primary'))?.getAttribute(activeAttr) ||
    pills.find((p) => p.getAttribute('data-initial') === 'true')?.getAttribute(activeAttr) ||
    pills[0]?.getAttribute(activeAttr)
  if (initialKey) setPillState(groupSelector, initialKey, activeAttr)
}

export function initBooking() {
  // Servicio (inicial: Alisado Biomolecular)
  initGroup(SELECTORS.serviceGroup, 'data-srv', 'service')

  // Día (inicial: Miércoles)
  initGroup(SELECTORS.dateGroup, 'data-day', 'day')

  // Horario (inicial: 10:00 hs)
  initGroup(SELECTORS.timeGroup, null, 'time')

  // Botón de envío
  const btn = document.querySelector(SELECTORS.btn)
  if (btn) {
    btn.setAttribute('aria-label', 'Consultá tu turno con Cintia por WhatsApp')
    btn.addEventListener('click', handleSend)
  }
}

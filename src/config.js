/**
 * src/config.js
 * Única fuente de datos del negocio. Todos los valores del sitio se leen
 * desde aquí; no hay valores hardcodeados en los parciales ni en el JS.
 */
export const config = {
  business: {
    name: 'CM Stilista',
    stylist: 'Cintia M.',
    whatsapp: '5491158682890',             // sin +, formato internacional para wa.me
    whatsappDisplay: '+54 9 11 5868-2890', // para mostrar en la UI
    instagram: 'cm_stilista',
    instagramUrl: 'https://www.instagram.com/cm_stilista/',
    tagline: 'Alta Peluquería · Atención 1 a 1 con turno previo',
    locationPlaceholder: '[zona, Argentina]', // reemplazar por la zona real (ej. Palermo, CABA)
    siteUrl: 'https://usuario.github.io/cm-stilista/', // sobrescribir con .env / variable de entorno al desplegar
    copyrightYear: new Date().getFullYear()
  },

  // Servicios mostrados en la sección Servicios y en el widget de reserva.
  // El campo `waMessage` es el texto exacto que se envía por WhatsApp.
  services: [
    {
      id: 'alisado-biomolecular',
      name: 'Alisado Biomolecular',
      duration: '120 - 180 min',
      category: 'Especialidad',
      subtitle: 'Lacio espejo',
      badge: 'Servicio Estrella',
      borderColor: 'border-primary/50',
      shadow: 'shadow-[0_4px_30px_rgba(240,45,125,0.15)]',
      waMessage: 'Hola Cintia! Quiero consultar por Alisado Biomolecular'
    },
    {
      id: 'balayage-mechas',
      name: 'Balayage & Mechas',
      duration: '180 - 240 min',
      category: 'Técnica de Autor',
      subtitle: 'Rubios & Miel',
      waMessage: 'Hola Cintia! Quiero consultar por Balayage y Mechas'
    },
    {
      id: 'colorimetria',
      name: 'Colorimetría & Baño de Brillo',
      duration: '90 min',
      category: 'Color Pro',
      subtitle: 'Cobertura de canas',
      waMessage: 'Hola Cintia! Quiero consultar por Colorimetría y Tinte'
    },
    {
      id: 'botox-capilar',
      name: 'Botox & Nutrición',
      duration: '60 - 90 min',
      category: 'Restauración',
      subtitle: 'Antifrizz profundo',
      waMessage: 'Hola Cintia! Quiero consultar por Botox Capilar y Tratamientos'
    },
    {
      id: 'trenzas-peinados',
      name: 'Trenzas & Peinados',
      duration: '45 - 90 min',
      category: 'Diseño & Eventos',
      subtitle: 'Diseño de autor',
      waMessage: 'Hola Cintia! Quiero consultar por Trenzas y Peinados'
    },
    {
      id: 'corte-styling',
      name: 'Cortes de Diseño & Ondas',
      duration: '60 min',
      category: 'Corte Personalizado',
      subtitle: 'Líneas limpias',
      waMessage: 'Hola Cintia! Quiero consultar por Corte y Styling'
    }
  ],

  // Días sugeridos para el widget de reserva (estado inicial: Miércoles)
  days: [
    { key: 'martes', label: 'Mar', day: 'Martes' },
    { key: 'miercoles', label: 'Mié', day: 'Miércoles', initial: true },
    { key: 'jueves', label: 'Jue', day: 'Jueves' },
    { key: 'viernes', label: 'Vie', day: 'Viernes' },
    { key: 'sabado', label: 'Sáb', day: 'Sábado' }
  ],

  // Franjas horarias (estado inicial: 10:00 hs (Mañana))
  times: [
    { key: 'manana', label: '10:00 hs (Mañana)', initial: true },
    { key: 'mediodia', label: '13:00 hs (Mediodía)' },
    { key: 'tarde', label: '15:30 hs (Tarde)' },
    { key: 'tarde-noche', label: '18:00 hs (Tarde-noche)' }
  ],

  // Pasos de la experiencia (sección "¿Cómo es la experiencia con Cintia?")
  steps: [
    {
      number: 1,
      title: 'Diagnóstico & Consulta',
      body: 'Me contás qué estás buscando y vemos fotos de referencia. Evaluamos el estado de tu fibra, historial de tintes y tus hábitos de cuidado.'
    },
    {
      number: 2,
      title: 'Servicio 100% Exclusivo',
      body: 'Realizamos el alisado, color o peinado con tiempo y prolijidad. Un ambiente agradable, relajado y sin esperas incómodas.'
    },
    {
      number: 3,
      title: 'Tips de Mantenimiento',
      body: 'Te explico cómo lavar, secar y cuidar el alisado o color para que el brillo y la duración se prolonguen por meses en tu casa.'
    }
  ],

  // Acordeón de precios (sección Precios)
  prices: [
    {
      title: 'Alisados & Restauración Capilar',
      icon: 'auto_awesome',
      items: [
        {
          name: 'Alisado Biomolecular (Efecto Lacio Espejo)',
          detail: 'Duración: 2 a 3 hs · Sellado térmico y anti-frizz total',
          waMessage: 'Hola Cintia! Quiero presupuesto por Alisado Biomolecular'
        },
        {
          name: 'Botox Capilar Reconstituyente',
          detail: 'Duración: 60 - 90 min · Reposición de masa y suavidad',
          waMessage: 'Hola Cintia! Quiero presupuesto por Botox Capilar'
        },
        {
          name: 'Baño de Crema & Nutrición Profunda',
          detail: 'Duración: 45 min · Óleos concentrados y brillo',
          waMessage: 'Hola Cintia! Quiero presupuesto por Nutrición Profunda'
        }
      ]
    },
    {
      title: 'Colorimetría, Mechas & Balayage',
      icon: 'palette',
      items: [
        {
          name: 'Balayage & Babylights (Técnica Personalizada)',
          detail: 'Duración: 3 a 4 hs · A mano alzada o bandas térmicas',
          waMessage: 'Hola Cintia! Quiero presupuesto por Balayage'
        },
        {
          name: 'Color Global o Raíz',
          detail: 'Duración: 90 min · Cobertura 100% de canas',
          waMessage: 'Hola Cintia! Quiero presupuesto por Color y Raíz'
        },
        {
          name: 'Tonalizador Gloss & Neutralización',
          detail: 'Duración: 45 min · Revitaliza el rubio y elimina amarillos',
          waMessage: 'Hola Cintia! Quiero presupuesto por Tonalizador'
        }
      ]
    },
    {
      title: 'Trenzas de Diseño, Peinados & Corte',
      icon: 'content_cut',
      items: [
        {
          name: 'Trenzas Cosidas de Diseño (Boxer, Esculpidas, Rodete)',
          detail: 'Duración: 60 - 90 min · Acabado limpio y ultra durable',
          waMessage: 'Hola Cintia! Quiero presupuesto por Trenzas Cosidas'
        },
        {
          name: 'Peinados para Eventos & Ondas al Agua',
          detail: 'Duración: 60 min · Semirecogidos, recogidos y peinados fiesta',
          waMessage: 'Hola Cintia! Quiero presupuesto por Peinado para Evento'
        },
        {
          name: 'Corte Personalizado (Largo, Capas, Flequillo)',
          detail: 'Duración: 45 min · Diagnóstico morfológico y finalizado',
          waMessage: 'Hola Cintia! Quiero presupuesto por Corte de Cabello'
        }
      ]
    }
  ],

  // Preguntas frecuentes (sección FAQ)
  faqs: [
    {
      q: '¿Cómo reservo mi turno con Cintia?',
      a: 'Escribime directo por WhatsApp al <strong>+54 9 11 5868-2890</strong> indicando qué servicio te interesa (podés mandar foto actual de tu pelo) y coordinamos el día y horario que mejor te quede.'
    },
    {
      q: '¿Cuánto tiempo dura el Alisado Biomolecular?',
      a: 'Dependiendo del tipo de cabello y de los cuidados post-tratamiento (shampoo sin sulfatos, secado con secador), la duración habitual oscila entre 3 y 5 meses con un brillo y caída impecable.'
    },
    {
      q: '¿El alisado daña el cabello decolorado o teñido?',
      a: 'No, siempre realizo un test de mecha si el cabello viene sensibilizado. Los productos que utilizo están formulados con activos de nutrición que sellan cutículas y reponen masa capilar.'
    },
    {
      q: '¿Cómo es la modalidad de atención?',
      a: 'La atención es 100% personalizada con turno previo exclusivo. Al contactarme por WhatsApp coordinamos la modalidad, fecha y detalles para brindarte la mejor experiencia.'
    }
  ],

  // Enlaces de confianza de la barra de beneficios
  benefits: [
    {
      icon: 'auto_awesome',
      title: 'Alisados Pro',
      text: 'Lacio sedoso y sin frizz'
    },
    {
      icon: 'palette',
      title: 'Color & Balayage',
      text: 'Degradé rubio y morena iluminada'
    },
    {
      icon: 'face_3',
      title: 'Peinados & Trenzas',
      text: 'Diseños cosidos de alta fijación'
    },
    {
      icon: 'favorite',
      title: 'Turno 1 a 1',
      text: 'Atención cálida y personalizada'
    }
  ],

  // Galería antes/después (sección Trabajos)
  gallery: [
    {
      image: 'images/antes-despues-alisado.webp',
      badge: 'Alisado Biomolecular',
      title: 'Alisado Espejo & Brillo Extremo',
      category: 'Transformación Extrema',
      text: 'Lacio perfecto, alineación milimétrica de fibra y sedosidad absoluta de raíz a puntas con cero encrespamiento.',
      waMessage: 'Hola Cintia! Vi el Alisado Espejo y quiero hacerme el tratamiento'
    },
    {
      image: 'images/antes-despues-rubio.webp',
      badge: 'Balayage & Babylights',
      title: 'Rubio Dorado & Balayage Luminoso',
      category: 'Rubio Radiante',
      text: 'Degradé cálido y luminoso con ondas fluidas, transición suave desde raíz y cuidado intensivo de la fibra.',
      waMessage: 'Hola Cintia! Vi el Rubio Dorado Balayage y quiero consultar'
    },
    {
      image: 'images/antes-despues-morena.webp',
      badge: 'Morena Iluminada & Ondas',
      title: 'Balayage Caramelo & Morena Iluminada',
      category: 'Color & Movimiento',
      text: 'Puntos de luz miel y toques caramelo sobre base castaña, finalizado con ondas suaves y brillo natural.',
      waMessage: 'Hola Cintia! Quiero hacerme el Balayage Caramelo Morena Iluminada'
    },
    {
      image: 'images/antes-despues-bob.webp',
      badge: 'Corte & Nutrición Pro',
      title: 'Corte Bob & Baño de Brillo',
      category: 'Diseño & Brillo Espejo',
      text: 'Líneas limpias, textura sedosa y nutrición profunda para un corte bob pulido con caída ligera y radiante.',
      waMessage: 'Hola Cintia! Quiero consultar por Corte Bob y Baño de Brillo'
    },
    {
      image: 'images/antes-despues-trenzas.webp',
      badge: 'Trenzas & Peinado Esculpido',
      title: 'Trenzas Cosidas & Rodete',
      category: 'Peinados de Autor',
      text: 'Trabajo milimétrico de trenzas con precisión geométrica y terminación en moño superior de alta duración.',
      waMessage: 'Hola Cintia! Quiero hacerme trenzas cosidas'
    }
  ],

  // Datos del footer y contacto
  contact: {
    whatsappMessage: 'Hola Cintia! Quiero consultar por un turno en CM Stilista',
    instagramMessage: 'Fotos y videos actualizados',
    address: 'TODO', // dirección no inventada (pendiente)
    hours: 'TODO'    // horarios no inventados (pendiente)
  }
}

/**
 * Genera un enlace de WhatsApp (wa.me) con el texto codificado.
 * Se usa tanto en build time (plugin de parciales) como en runtime (widget).
 */
export function waLink(text) {
  return `https://wa.me/${config.business.whatsapp}?text=${encodeURIComponent(text)}`
}

export default config

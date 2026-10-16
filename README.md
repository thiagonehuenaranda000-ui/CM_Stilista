# CM Stilista — Sitio web (landing de una sola página)

Sitio de **Cintia M.**, estilista independiente en Argentina. Atención 1 a 1 con turno previo.
Objetivo del negocio: maximizar consultas y reservas de turno por WhatsApp.

Stack: **Vite + HTML estático + JavaScript vanilla**, **Tailwind CSS** compilado con PostCSS, sin frameworks.

---

## Estructura del proyecto

```
cm-stilista/
├─ .github/workflows/deploy-pages.yml   # Despliegue automático a GitHub Pages
├─ .gitignore
├─ .gitattributes
├─ .editorconfig
├─ .env.example                         # Copia a .env y ajusta BASE_PATH y SITE_URL
├─ .nvmrc                               # Node.js LTS (24.20.0)
├─ index.html                           # Shell SEO + includes de secciones
├─ package.json / package-lock.json
├─ postcss.config.js
├─ tailwind.config.js                   # Traslado literal del prototipo de Stitch
├─ vite.config.js                       # base desde BASE_PATH (GitHub Pages listo)
├─ build/
│   └─ vite-plugin-partials.js          # Ensambla parciales y resuelve {{ wa(...) }}, {{ year }}, {{ siteUrl }}
├─ public/
│   ├─ favicon-*.png, favicon.ico, apple-touch-icon.png
│   ├─ images/                          # 7 imágenes locales optimizadas a WebP
│   └─ scripts/                         # generate-favicons.js, optimize-images.js
├─ referencia-stitch/                   # Respaldo: code.html, DESIGN.md, screen.png
├─ scripts/
│   ├─ generate-favicons.js
│   └─ optimize-images.js
├─ src/
│   ├─ config.js                        # Única fuente de datos del negocio
│   ├─ main.js                          # Punto de entrada
│   ├─ styles/main.css                  # Tailwind + keyframes + accesibilidad
│   ├─ lib/
│   │   ├─ whatsapp.js                  # Helper waLink() con encodeURIComponent
│   │   ├─ booking.js                   # Widget de reserva (role="radiogroup")
│   │   ├─ accordion.js                 # Acordeones accesibles (aria-expanded)
│   │   └─ menu.js                      # Menú móvil accesible
│   └─ sections/                        # 15 parciales en orden (barra de aviso → barra móvil)
│       01-barra-aviso.html ... 15-barra-movil.html
└─ PENDIENTES.md
```

---

## Antes de empezar (obligatorio)

En tu repositorio de GitHub, ve a **Settings → Pages** y habilita GitHub Pages:
- **Source:** GitHub Actions
- Luego guarda.

Sin este paso, el despliegue fallará con error 404.

## Primer despliegue (GitHub Pages)

1. Crea el repositorio en GitHub (público o privado).
2. Sube el código:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

3. Activa GitHub Pages en la configuración del repositorio:
   - **Source:** GitHub Actions
4. El workflow `.github/workflows/deploy-pages.yml` se ejecutará automáticamente en cada push a `main`.

### BASE_PATH y SITE_URL

El sitio funciona tanto en dominio propio como en GitHub Pages de proyecto:

| Escenario | BASE_PATH | SITE_URL |
|---|---|---|
| `https://tu-usuario.github.io/` | `/` | `https://tu-usuario.github.io/` |
| `https://tu-usuario.github.io/cm-stilista/` | `/cm-stilista/` | `https://tu-usuario.github.io/cm-stilista/` |
| Dominio propio `https://cmstilista.com.ar/` | `/` | `https://cmstilista.com.ar/` |

Copia `.env.example` a `.env` y ajusta `BASE_PATH` y `SITE_URL`:

```bash
cp .env.example .env
```

Luego edita `.env` con tus valores reales. El workflow de GitHub Actions calcula `BASE_PATH` automáticamente a partir del nombre del repositorio.

---

## Desarrollo local

```bash
# Instalar dependencias (una sola vez)
npm install

# Servidor de desarrollo con recarga automática
npm run dev

# Build de producción
npm run build

# Previsualizar build localmente
npm run preview

# (Opcional) Regenerar favicons desde el logo
node scripts/generate-favicons.js

# (Opcional) Re-optimizar imágenes
node scripts/optimize-images.js
```

---

## Datos del negocio (`src/config.js`)

Todos los datos del sitio viven en `src/config.js` (número de WhatsApp, Instagram, servicios, duraciones, mensajes de WhatsApp, año del copyright). Los enlaces de WhatsApp se generan con el helper `waLink()` usando `encodeURIComponent`, por lo que no hay valores repetidos a mano.

---

## Accesibilidad

- Acordeones (precios y FAQ): `<button>` con `aria-expanded`/`aria-controls`, teclado (Enter/Espacio), animación por clases.
- Widget de reserva: grupos de botones con `role="radiogroup"`, `aria-checked`, foco visible con el magenta de marca (`#f02d7d`).
- Menú móvil: hamburguesa con `aria-expanded`, cierre con `Escape`, foco en el primer enlace al abrir.
- `prefers-reduced-motion`: se desactivan animaciones largas y el pulso suave.
- Un solo `<h1>`, jerarquía de títulos correcta, `<html lang="es-AR">`.

---

## Imágenes

Las 7 imágenes del prototipo se descargaron de los servidores de Stitch y se guardaron en `public/images/` en formato WebP, todas bajo 300 KB, con `width`/`height` explícitos y `loading="lazy"` (salvo el hero, que usa `fetchpriority="high"`).

Si alguna URL remota caduca, reemplázala en `public/images/` y ejecuta `node scripts/optimize-images.js`.

---

## Créditos

Diseño original exportado de Google Stitch (ver `referencia-stitch/`). Código y migración a producción: este repositorio.

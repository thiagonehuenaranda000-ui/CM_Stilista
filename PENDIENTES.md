# PENDIENTES.md — Imágenes y assets

Este archivo lista las tareas pendientes de la Fase 3 (imágenes y assets).

## Estado: COMPLETADO

Todas las 7 imágenes del prototipo se descargaron y optimizaron correctamente. No hay URLs pendientes.

| Archivo | Dimensiones | Peso | Uso |
|---|---|---|---|
| `public/images/logo-cm-stilista.webp` | 150×150 | 3,6 KB | Header, sobre mí, contacto, footer |
| `public/images/logo-hero-cm-stilista.webp` | 150×150 | 3,6 KB | Hero (fetchpriority="high") |
| `public/images/antes-despues-alisado-biomolecular.webp` | 236×512 | 21,6 KB | Galería card 1 |
| `public/images/antes-despues-rubio-balayage.webp` | 236×512 | 19,5 KB | Galería card 2 |
| `public/images/antes-despues-morena-balayage-caramelo.webp` | 236×512 | 20,3 KB | Galería card 3 |
| `public/images/antes-despues-corte-bob-brillo.webp` | 236×512 | 19,8 KB | Galería card 4 |
| `public/images/antes-despues-trenzas-cosidas.webp` | 270×336 | 12,1 KB | Galería card 5 |

Mejoras aplicadas:
- Todas en formato WebP, bajo los 300 KB (máximo 22 KB).
- `width`/`height` explícitos en todos los `` para evitar saltos de layout (CLS).
- `loading="lazy"` en todas las imágenes fuera del primer pantallazo.
- `fetchpriority="high"` en la imagen principal del hero.
- `alt` descriptivos del resultado (sin repetir "CM Stilista" en cada uno).

## Si en el futuro necesitas reemplazar alguna imagen

1. Coloca el nuevo archivo en `public/images/` con el mismo nombre descriptivo.
2. Ejecuta `npm run images:optimize` para convertir a WebP y actualizar `public/images/dimensions.json`.
3. Verifica que `width`/`height` coincidan con las nuevas dimensiones.

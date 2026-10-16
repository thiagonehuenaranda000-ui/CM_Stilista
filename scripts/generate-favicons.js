import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const logo = 'public/images/logo-cm-stilista.webp'
const publicDir = 'public'

// Favicon PNG en varios tamaños (calidad optimizada para < 200 KB cada uno)
const sizes = [16, 32, 48, 64, 128, 192, 256, 512]

for (const size of sizes) {
  const out = path.join(publicDir, `favicon-${size}x${size}.png`)
  await sharp(logo)
    .resize(size, size, { fit: 'contain', background: { r: 19, g: 19, b: 23, alpha: 1 } })
    .png({ quality: 75, compressionLevel: 9 })
    .toFile(out)
  const kb = (fs.statSync(out).size / 1024).toFixed(1)
  console.log(`OK: favicon-${size}x${size}.png (${kb} KB)`)
}

// Apple touch icon (180x180)
await sharp(logo)
  .resize(180, 180, { fit: 'contain', background: { r: 19, g: 19, b: 23, alpha: 1 } })
  .png({ quality: 75, compressionLevel: 9 })
  .toFile(path.join(publicDir, 'apple-touch-icon.png'))
console.log('OK: apple-touch-icon.png')

// Favicon ICO (16, 32, 48)
const icoBuffers = await Promise.all([16, 32, 48].map(size =>
  sharp(logo)
    .resize(size, size, { fit: 'contain', background: { r: 19, g: 19, b: 23, alpha: 1 } })
    .png({ quality: 75, compressionLevel: 9 })
    .toBuffer()
))
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffers[2])
console.log('OK: favicon.ico')

console.log('--- favicons generados ---')

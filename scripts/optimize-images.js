import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const dir = 'public/images'
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'))
const dims = {}

for (const file of files) {
  const inPath = path.join(dir, file)
  // Leer buffer completo antes de reescribir
  const inputBuffer = fs.readFileSync(inPath)
  const meta = await sharp(inputBuffer).metadata()
  const outBuffer = await sharp(inputBuffer)
    .webp({ quality: 82, effort: 6 })
    .toBuffer()
  fs.writeFileSync(inPath, outBuffer)
  const kb = (outBuffer.length / 1024).toFixed(1)
  dims[file.replace('.webp', '')] = { width: meta.width, height: meta.height, kb }
  console.log(`OK: ${file} -> ${meta.width}x${meta.height} ${kb} KB`)
}

fs.writeFileSync(path.join(dir, 'dimensions.json'), JSON.stringify(dims, null, 2))
console.log('--- dimensiones guardadas en public/images/dimensions.json ---')

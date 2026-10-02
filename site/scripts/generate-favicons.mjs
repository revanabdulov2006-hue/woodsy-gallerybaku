import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

// Helper to create valid ICO binary containing multiple PNGs
function createIco(images) {
  const count = images.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // Reserved
  header.writeUInt16LE(1, 2) // Type: 1 = ICO
  header.writeUInt16LE(count, 4) // Count

  let offset = 6 + 16 * count
  const dirEntries = []

  for (const img of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1)
    entry.writeUInt8(0, 2) // colorCount
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // planes
    entry.writeUInt16LE(32, 6) // bpp
    entry.writeUInt32LE(img.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)

    dirEntries.push(entry)
    offset += img.buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...images.map(i => i.buffer)])
}

async function generateAll() {
  const pubDir = 'public'
  const size = 640
  const cx = 320
  const cy = 319
  const radius = 311

  // Clean circle mask
  const maskSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${cx}" cy="${cy}" r="${radius}" fill="#ffffff"/></svg>`
  )

  // Master high-res transparent circular badge
  const masterBadgeBuffer = await sharp('public/img/logo.webp')
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer()

  // Generate 512x512
  const p512 = await sharp(masterBadgeBuffer)
    .resize(512, 512, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toBuffer()
  fs.writeFileSync(path.join(pubDir, 'android-chrome-512x512.png'), p512)

  // Generate 192x192
  const p192 = await sharp(masterBadgeBuffer)
    .resize(192, 192, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toBuffer()
  fs.writeFileSync(path.join(pubDir, 'android-chrome-192x192.png'), p192)

  // Generate 180x180 (Apple touch icon)
  const p180 = await sharp(masterBadgeBuffer)
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toBuffer()
  fs.writeFileSync(path.join(pubDir, 'apple-touch-icon.png'), p180)

  // Generate 48x48
  const p48 = await sharp(masterBadgeBuffer)
    .resize(48, 48, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer()
  fs.writeFileSync(path.join(pubDir, 'favicon-48x48.png'), p48)

  // Generate 32x32
  const p32 = await sharp(masterBadgeBuffer)
    .resize(32, 32, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.6, m1: 0.7, m2: 0.5 })
    .png()
    .toBuffer()
  fs.writeFileSync(path.join(pubDir, 'favicon-32x32.png'), p32)

  // Generate 16x16
  const p16 = await sharp(masterBadgeBuffer)
    .resize(16, 16, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.5, m1: 0.6, m2: 0.4 })
    .png()
    .toBuffer()
  fs.writeFileSync(path.join(pubDir, 'favicon-16x16.png'), p16)

  // Also create generic favicon.png (32x32)
  fs.writeFileSync(path.join(pubDir, 'favicon.png'), p32)

  // Create SVG favicon wrapping high-res base64 PNG
  const b64 = p512.toString('base64')
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${b64}" width="512" height="512" />
</svg>`
  fs.writeFileSync(path.join(pubDir, 'favicon.svg'), svgContent)

  // Create multi-resolution favicon.ico containing 16x16, 32x32, 48x48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 }
  ])
  fs.writeFileSync(path.join(pubDir, 'favicon.ico'), icoBuffer)

  // Manifest
  const manifest = {
    name: 'Woodsy Gallery Baku',
    short_name: 'Woodsy Gallery',
    description: 'Woodsy Gallery Baku — əl ilə hazırlanan premium taxta nərd, şahmat, masa, dekor və saatlar.',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#120d09',
    background_color: '#120d09',
    display: 'standalone'
  }
  fs.writeFileSync(path.join(pubDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2))

  console.log('All favicon assets successfully generated in public/ !')
}

generateAll()

// Instagram ekran görüntülərini kəsir (carousel oxları) və WebP-yə çevirir.
import sharp from 'sharp'
import fs from 'fs'
const src = '../assets'
const out = 'public/img'
const files = fs.readdirSync(src).filter(f => f.endsWith('.png')).sort()
// carousel oxları olan şəkillər: yan kənarlar kəsilir
const trimSides = new Set([4, 5, 6, 8, 10, 11, 12])
for (let i = 0; i < files.length; i++) {
  const n = i + 1
  let img = sharp(`${src}/${files[i]}`)
  const { width, height } = await img.metadata()
  if (trimSides.has(n)) {
    const cut = Math.round(width * 0.075)
    img = img.extract({ left: cut, top: 0, width: width - cut * 2, height })
  }
  await img.webp({ quality: 90, effort: 5 }).toFile(`${out}/products/p${String(n).padStart(2, '0')}.webp`)
}
await sharp(`${src}/logo.jpg`).resize(640).webp({ quality: 92 }).toFile(`${out}/logo.webp`)
for (let i = 1; i <= 4; i++) fs.copyFileSync(`../video${i}.MP4`, `public/videos/video${i}.mp4`)
console.log('ok')

// Generates PNG app icons from public/icon.svg.
// Run with: npm run icons
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const resolve = (file) => fileURLToPath(new URL(`../${file}`, import.meta.url))
const svg = await readFile(resolve('public/icon.svg'), 'utf8')

// Full-bleed square (no rounded clip): platforms apply their own mask.
const square = svg.replace(' clip-path="url(#icon)"', '')

// Maskable: content shrunk into the 80% safe zone over the full background.
const inner = (square.match(/<g>([\s\S]*)<\/g>\s*<\/svg>/)?.[1] ?? '').replace(
  '<rect width="1024" height="1024" fill="url(#bg)"/>',
  '',
)
const maskable = square.replace(
  /<g>[\s\S]*<\/g>\s*<\/svg>/,
  `<rect width="1024" height="1024" fill="url(#bg)"/>
  <g transform="translate(102.4 102.4) scale(0.8)">${inner}</g>
</svg>`,
)

const outputs = [
  { file: 'public/icon-192.png', src: svg, size: 192 },
  { file: 'public/icon-512.png', src: svg, size: 512 },
  { file: 'public/icon-maskable-512.png', src: maskable, size: 512 },
  { file: 'src/app/apple-icon.png', src: square, size: 180 },
]

for (const { file, src, size } of outputs) {
  await sharp(Buffer.from(src), { density: 300 }).resize(size, size).png().toFile(resolve(file))
  console.log('wrote', file)
}

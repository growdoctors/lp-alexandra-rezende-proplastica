/**
 * download-assets.mjs
 *
 * Downloads all remote images referenced in src/config/client.ts
 * and saves them to public/images/.
 *
 * Usage:
 *   node scripts/download-assets.mjs
 *
 * Requirements:
 *   - Node 18+ (native fetch)
 *   - Images referenced in CLIENT must use the /images/<filename> path convention
 *
 * This script only downloads external URLs (http/https).
 * Local paths (starting with /) are ignored.
 */

import { createWriteStream, mkdirSync } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.resolve(__dirname, '../public/images')

// ─── Add remote URLs to download here ──────────────────────────────────────
// Format: { url: 'https://...', filename: 'output-name.webp' }
const ASSETS = [
  // { url: 'https://example.com/hero.jpg', filename: 'bg-hero.png' },
  // { url: 'https://example.com/hero-mobile.jpg', filename: 'bg-hero-mobile.webp' },
  // { url: 'https://example.com/logo.svg', filename: 'logo.svg' },
]
// ────────────────────────────────────────────────────────────────────────────

mkdirSync(OUTPUT_DIR, { recursive: true })

if (ASSETS.length === 0) {
  console.log('Nenhum asset para baixar. Adicione URLs no array ASSETS.')
  process.exit(0)
}

let ok = 0
let fail = 0

for (const { url, filename } of ASSETS) {
  const dest = path.join(OUTPUT_DIR, filename)
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    await pipeline(res.body, createWriteStream(dest))
    console.log(`✓ ${filename}`)
    ok++
  } catch (err) {
    console.error(`✗ ${filename} — ${err.message}`)
    fail++
  }
}

console.log(`\n${ok} baixado(s), ${fail} erro(s).`)
if (fail > 0) process.exit(1)

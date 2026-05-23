import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log("Memecah data TMDB menjadi file-file lebih kecil...")

// Baca data TMDB
const tmdbPath = path.join(__dirname, "public", "data", "tmdb.json")
const tmdbData = JSON.parse(fs.readFileSync(tmdbPath, "utf8"))

// Buat folder untuk data TMDB yang dipecah
const tmdbDir = path.join(__dirname, "public", "data", "tmdb")
if (!fs.existsSync(tmdbDir)) {
  fs.mkdirSync(tmdbDir, { recursive: true })
}

// Pecah per kategori
let totalSize = 0
Object.keys(tmdbData).forEach((category) => {
  const categorySlug = category.toLowerCase().replace(/\s+/g, "-")
  const categoryPath = path.join(tmdbDir, `${categorySlug}.json`)
  const categoryData = tmdbData[category]

  fs.writeFileSync(categoryPath, JSON.stringify(categoryData, null, 2))

  const fileSize = fs.statSync(categoryPath).size / (1024 * 1024)
  totalSize += fileSize
  console.log(`✓ ${category}: ${categoryData.length} items (${fileSize.toFixed(2)} MB)`)
})

// Buat index file
const indexPath = path.join(tmdbDir, "index.json")
const indexData = {
  categories: Object.keys(tmdbData),
  totalItems: Object.values(tmdbData).reduce((sum, items) => sum + items.length, 0),
  files: Object.keys(tmdbData).map(cat => cat.toLowerCase().replace(/\s+/g, "-") + ".json")
}
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2))

console.log(`\n✓ Total: ${indexData.totalItems} items (${totalSize.toFixed(2)} MB)`)
console.log(`✓ Data dipecah menjadi ${Object.keys(tmdbData).length} file`)
console.log(`✓ Tersimpan di: public/data/tmdb/`)
console.log("\nSelesai!")

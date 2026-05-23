import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sourcePath = path.join(__dirname, "public", "data", "genres.json")
const outputDir = path.join(__dirname, "public", "data", "genres")

if (!fs.existsSync(sourcePath)) {
  console.error("genres.json tidak ditemukan")
  process.exit(1)
}

fs.mkdirSync(outputDir, { recursive: true })

const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"))
const index = { categories: [], files: {}, totalItems: 0 }

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

for (const [category, items] of Object.entries(data)) {
  const slug = slugify(category)
  const fileName = `${slug}.json`
  const filePath = path.join(outputDir, fileName)
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2))
  index.categories.push(category)
  index.files[category] = fileName
  index.totalItems += items.length
  const sizeMb = fs.statSync(filePath).size / 1024 / 1024
  console.log(`${category}: ${items.length} items (${sizeMb.toFixed(2)} MB)`)
}

fs.writeFileSync(path.join(outputDir, "index.json"), JSON.stringify(index, null, 2))
console.log(`\nSelesai pecah genres: ${index.categories.length} kategori, ${index.totalItems} items`)

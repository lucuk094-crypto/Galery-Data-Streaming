import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categoryMap = {
  "Film": "film",
  "Movies Now Playing": "movies-now-playing",
  "Movies Upcoming": "movies-upcoming",
  "Movies Top Rated": "movies-top-rated",
  "On TV": "on-tv",
  "Drama Korea": "drama-korea",
  "Drama Jepang": "drama-jepang",
  "Horor TV": "horor-tv",
  "Film Action": "film-action",
  "Film Comedy": "film-comedy",
  "Film Drama": "film-drama",
  "Film Romance": "film-romance",
  "Film Horror": "film-horror",
  "Film Thriller": "film-thriller",
  "Film Mystery": "film-mystery",
  "Film Animation": "film-animation"
}

const output = {}
let totalItems = 0

for (const [category, slug] of Object.entries(categoryMap)) {
  const filePath = path.join(__dirname, "public", "data", "tmdb", `${slug}.json`)
  const items = JSON.parse(fs.readFileSync(filePath, "utf8"))
  output[category] = items
  totalItems += items.length
  console.log(`${category}: ${items.length}`)
}

const outputPath = path.join(__dirname, "public", "data", "tmdb.json")
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))

const sizeMb = fs.statSync(outputPath).size / 1024 / 1024
console.log(`\nSelesai. Total: ${totalItems} items`)
console.log(`File full: ${outputPath}`)
console.log(`Ukuran: ${sizeMb.toFixed(2)} MB`)

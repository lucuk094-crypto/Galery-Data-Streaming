import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_KEY = process.env.TMDB_API_KEY
const API_URL = "https://api.themoviedb.org/3"
const IMAGE_URL = "https://image.tmdb.org/t/p"

if (!API_KEY) {
  console.error("TMDB_API_KEY belum diset. Jalankan: $env:TMDB_API_KEY='API_KEY_ANDA'; node fetch-tmdb-data.js")
  process.exit(1)
}

async function tmdbFetch(endpoint, params = {}, attempt = 1) {
  const url = new URL(`${API_URL}${endpoint}`)
  url.searchParams.set("api_key", API_KEY)
  url.searchParams.set("language", "id-ID")
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)))

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`TMDB error ${response.status}: ${await response.text()}`)
    return response.json()
  } catch (error) {
    if (attempt >= 4) throw error

    await new Promise((resolve) => setTimeout(resolve, attempt * 1500))
    return tmdbFetch(endpoint, params, attempt + 1)
  }
}

function image(pathValue, size = "w780") {
  return pathValue ? `${IMAGE_URL}/${size}${pathValue}` : "/placeholder.svg"
}

function formatDateParts(dateValue) {
  if (!dateValue) return {}
  const [year, month, day] = dateValue.split("-").map(Number)
  return { year, month, day }
}

function mapStatus(status) {
  return {
    Released: "SELESAI",
    Returning: "SEDANG_TAYANG",
    "Returning Series": "SEDANG_TAYANG",
    Ended: "SELESAI",
    Canceled: "DIBATALKAN",
    Planned: "AKAN_DATANG",
    "In Production": "PRODUKSI",
    Postproduction: "PASCA_PRODUKSI",
  }[status] || status || "TIDAK_DIKETAHUI"
}

function officialVideos(videos) {
  return (videos.results || [])
    .filter((video) => video.site === "YouTube" && ["Trailer", "Teaser", "Clip", "Featurette"].includes(video.type))
    .map((video) => ({
      id: video.key,
      site: "youtube",
      name: video.name,
      type: video.type,
      official: video.official,
      thumbnail: `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${video.key}`,
    }))
}

function castEdges(credits) {
  return (credits.cast || []).map((person) => ({
    id: person.credit_id || person.cast_id || person.id,
    role: person.character || "Pemeran",
    order: person.order,
    profilePath: image(person.profile_path, "w185"),
    node: {
      id: person.id,
      name: { full: person.name, native: person.original_name || person.name },
      gender: person.gender,
      popularity: person.popularity,
      knownForDepartment: person.known_for_department,
    },
  }))
}

function staffEdges(credits) {
  return (credits.crew || []).map((person) => ({
    id: person.credit_id || person.id,
    role: person.job || person.department || "Kru",
    department: person.department,
    profilePath: image(person.profile_path, "w185"),
    node: {
      id: person.id,
      name: { full: person.name, native: person.original_name || person.name },
      gender: person.gender,
      popularity: person.popularity,
      knownForDepartment: person.known_for_department,
    },
  }))
}

function links(kind, details, externalIds) {
  const base = kind === "movie" ? "movie" : "tv"
  return [
    details.homepage ? { id: details.id * 10 + 1, url: details.homepage, site: "Situs Resmi" } : null,
    externalIds.imdb_id ? { id: details.id * 10 + 2, url: `https://www.imdb.com/title/${externalIds.imdb_id}`, site: "IMDb" } : null,
    externalIds.facebook_id ? { id: details.id * 10 + 3, url: `https://www.facebook.com/${externalIds.facebook_id}`, site: "Facebook" } : null,
    externalIds.instagram_id ? { id: details.id * 10 + 4, url: `https://www.instagram.com/${externalIds.instagram_id}`, site: "Instagram" } : null,
    externalIds.twitter_id ? { id: details.id * 10 + 5, url: `https://x.com/${externalIds.twitter_id}`, site: "X/Twitter" } : null,
    { id: details.id * 10 + 6, url: `https://www.themoviedb.org/${base}/${details.id}`, site: "TMDB" },
  ].filter(Boolean)
}

function normalizeMovie(details, credits, videos, externalIds, context) {
  const videoList = officialVideos(videos)
  const genres = details.genres?.map((genre) => genre.name) || []
  const score = details.vote_average ? Math.round(details.vote_average * 10) : null

  return {
    id: details.id,
    idMal: null,
    mediaType: "MOVIE",
    title: {
      romaji: details.title || details.original_title,
      english: details.title || details.original_title,
      native: details.original_title || details.title,
    },
    description: details.overview || "Sinopsis belum tersedia.",
    coverImage: {
      extraLarge: image(details.poster_path, "w780"),
      large: image(details.poster_path, "w500"),
      medium: image(details.poster_path, "w342"),
      color: "#7c3aed",
    },
    bannerImage: image(details.backdrop_path, "w1280"),
    genres,
    tags: genres.map((name, index) => ({ id: index + 1, name, rank: 100 - index })),
    format: "FILM",
    season: null,
    seasonYear: details.release_date ? Number(details.release_date.slice(0, 4)) : null,
    episodes: 1,
    duration: details.runtime || null,
    status: mapStatus(details.status),
    startDate: formatDateParts(details.release_date),
    endDate: formatDateParts(details.release_date),
    averageScore: score,
    meanScore: score,
    popularity: Math.round(details.popularity || 0),
    favourites: details.vote_count || 0,
    studios: { nodes: (details.production_companies || []).map((studio) => ({ id: studio.id, name: studio.name })) },
    source: "TMDB",
    trailer: videoList[0] || null,
    videos: videoList,
    externalLinks: links("movie", details, externalIds),
    rankings: [{ id: details.id * 100 + 1, rank: Math.max(1, Math.round(100 - (details.vote_average || 0) * 10)), type: "RATING", format: "FILM", year: details.release_date ? Number(details.release_date.slice(0, 4)) : null, season: null, allTime: false, context }],
    relations: { edges: [] },
    characters: { edges: castEdges(credits) },
    staff: { edges: staffEdges(credits) },
    budget: details.budget,
    revenue: details.revenue,
    originalLanguage: details.original_language,
    productionCountries: details.production_countries,
    spokenLanguages: details.spoken_languages,
  }
}

function normalizeTv(details, credits, videos, externalIds, context, categoryName) {
  const videoList = officialVideos(videos)
  const genres = details.genres?.map((genre) => genre.name) || []
  const score = details.vote_average ? Math.round(details.vote_average * 10) : null

  return {
    id: details.id,
    idMal: null,
    mediaType: "TV",
    title: {
      romaji: details.name || details.original_name,
      english: details.name || details.original_name,
      native: details.original_name || details.name,
    },
    description: details.overview || "Sinopsis belum tersedia.",
    coverImage: {
      extraLarge: image(details.poster_path, "w780"),
      large: image(details.poster_path, "w500"),
      medium: image(details.poster_path, "w342"),
      color: "#7c3aed",
    },
    bannerImage: image(details.backdrop_path, "w1280"),
    genres,
    tags: genres.map((name, index) => ({ id: index + 1, name, rank: 100 - index })),
    format: categoryName,
    season: categoryName,
    seasonYear: details.first_air_date ? Number(details.first_air_date.slice(0, 4)) : null,
    episodes: details.number_of_episodes || null,
    duration: details.episode_run_time?.[0] || null,
    status: mapStatus(details.status),
    startDate: formatDateParts(details.first_air_date),
    endDate: formatDateParts(details.last_air_date),
    averageScore: score,
    meanScore: score,
    popularity: Math.round(details.popularity || 0),
    favourites: details.vote_count || 0,
    studios: { nodes: (details.production_companies || []).map((studio) => ({ id: studio.id, name: studio.name })) },
    source: "TMDB",
    trailer: videoList[0] || null,
    videos: videoList,
    externalLinks: links("tv", details, externalIds),
    rankings: [{ id: details.id * 100 + 1, rank: Math.max(1, Math.round(100 - (details.vote_average || 0) * 10)), type: "RATING", format: categoryName, year: details.first_air_date ? Number(details.first_air_date.slice(0, 4)) : null, season: categoryName, allTime: false, context }],
    relations: { edges: [] },
    characters: { edges: castEdges(credits) },
    staff: { edges: staffEdges(credits) },
    seasons: details.seasons,
    networks: details.networks,
    creators: details.created_by,
    originalLanguage: details.original_language,
    productionCountries: details.production_countries,
    spokenLanguages: details.spoken_languages,
  }
}

async function fetchPaged(endpoint, params = {}, pages = 3) {
  const results = []
  for (let page = 1; page <= pages; page++) {
    const data = await tmdbFetch(endpoint, { ...params, page })
    results.push(...(data.results || []))
  }
  return results
}

async function normalizeMovieList(items, context) {
  const collection = []
  const seen = new Set()
  for (const item of items) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    const [details, credits, videos, externalIds] = await Promise.all([
      tmdbFetch(`/movie/${item.id}`),
      tmdbFetch(`/movie/${item.id}/credits`),
      tmdbFetch(`/movie/${item.id}/videos`),
      tmdbFetch(`/movie/${item.id}/external_ids`),
    ])
    collection.push(normalizeMovie(details, credits, videos, externalIds, context))
  }
  return collection
}

async function normalizeTvList(items, context, categoryName) {
  const collection = []
  const seen = new Set()
  for (const item of items) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    const [details, credits, videos, externalIds] = await Promise.all([
      tmdbFetch(`/tv/${item.id}`),
      tmdbFetch(`/tv/${item.id}/credits`),
      tmdbFetch(`/tv/${item.id}/videos`),
      tmdbFetch(`/tv/${item.id}/external_ids`),
    ])
    collection.push(normalizeTv(details, credits, videos, externalIds, context, categoryName))
  }
  return collection
}

async function fetchMovieEndpointCollection(endpoint, context, pages = 3) {
  return normalizeMovieList(await fetchPaged(endpoint, {}, pages), context)
}

async function fetchMovieGenreCollection(genreId, context, pages = 5) {
  return normalizeMovieList(await fetchPaged("/discover/movie", {
    sort_by: "popularity.desc",
    include_adult: "false",
    with_genres: genreId,
  }, pages), context)
}

async function fetchKoreanDramaCollection(pages = 8) {
  const items = await fetchPaged("/discover/tv", {
    sort_by: "popularity.desc",
    with_origin_country: "KR",
    with_original_language: "ko",
    with_genres: 18,
    include_null_first_air_dates: "false",
  }, pages)
  return normalizeTvList(items, "Drama Korea populer berdasarkan data TMDB", "DRAMA_KOREA")
}

async function fetchJapaneseDramaCollection(pages = 8) {
  const items = await fetchPaged("/discover/tv", {
    sort_by: "popularity.desc",
    with_origin_country: "JP",
    with_original_language: "ja",
    with_genres: 18,
    include_null_first_air_dates: "false",
  }, pages)
  return normalizeTvList(items, "Drama Jepang populer berdasarkan data TMDB", "DRAMA_JEPANG")
}

async function fetchHorrorTvCollection(pages = 5) {
  const items = await fetchPaged("/discover/tv", {
    sort_by: "popularity.desc",
    with_genres: 9648,
    include_null_first_air_dates: "false",
  }, pages)
  return normalizeTvList(items, "Serial horor dan misteri berdasarkan data TMDB", "HOROR_TV")
}

async function main() {
  console.log("Mengambil data TMDB lengkap: movies, On TV, drama Korea, genre film, cast, crew, dan trailer resmi...")

  const output = {
    Film: await fetchMovieEndpointCollection("/movie/popular", "Film populer berdasarkan data TMDB", 8),
    "Movies Now Playing": await fetchMovieEndpointCollection("/movie/now_playing", "Film sedang tayang berdasarkan data TMDB", 5),
    "Movies Upcoming": await fetchMovieEndpointCollection("/movie/upcoming", "Film akan datang berdasarkan data TMDB", 5),
    "Movies Top Rated": await fetchMovieEndpointCollection("/movie/top_rated", "Film rating tertinggi berdasarkan data TMDB", 5),
    "On TV": await normalizeTvList(await fetchPaged("/tv/on_the_air", {}, 5), "Serial On TV berdasarkan data TMDB", "ON_TV"),
    "Drama Korea": await fetchKoreanDramaCollection(),
    "Drama Jepang": await fetchJapaneseDramaCollection(),
    "Horor TV": await fetchHorrorTvCollection(),
    "Film Action": await fetchMovieGenreCollection(28, "Film Action berdasarkan data TMDB"),
    "Film Comedy": await fetchMovieGenreCollection(35, "Film Comedy berdasarkan data TMDB"),
    "Film Drama": await fetchMovieGenreCollection(18, "Film Drama berdasarkan data TMDB"),
    "Film Romance": await fetchMovieGenreCollection(10749, "Film Romance berdasarkan data TMDB"),
    "Film Horror": await fetchMovieGenreCollection(27, "Film Horror berdasarkan data TMDB", 8),
    "Film Thriller": await fetchMovieGenreCollection(53, "Film Thriller berdasarkan data TMDB", 5),
    "Film Mystery": await fetchMovieGenreCollection(9648, "Film Mystery berdasarkan data TMDB", 5),
    "Film Animation": await fetchMovieGenreCollection(16, "Film Animation berdasarkan data TMDB"),
  }

  const outputDir = path.join(__dirname, "public", "data")
  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(path.join(outputDir, "tmdb.json"), JSON.stringify(output, null, 2))

  Object.entries(output).forEach(([category, items]) => console.log(`${category}: ${items.length}`))
  console.log("Selesai mengambil data TMDB lengkap.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

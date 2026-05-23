# Dokumentasi Teknis - Anime Albums Website

**Tanggal:** 23 Mei 2026  
**Dibuat untuk:** Bos Alwiy - Vanx Dev

---

## 🏗️ Arsitektur Aplikasi

### Flow Aplikasi

```
User → Homepage (Video Carousel) 
     → Menu Kategori 
     → Gallery Page (Dynamic Route)
     → Image Modal
```

### Routing Structure

```
/                           → Homepage dengan video carousel
/about                      → Halaman profil Vanx Dev
/gallery/[category]         → Gallery dinamis per kategori
  ├── /gallery/anime        → Kategori Anime
  ├── /gallery/movies       → Kategori Movies
  ├── /gallery/drama        → Kategori Drama
  └── /gallery/horor        → Kategori Horor
/fetch                      → Halaman fetch data
/results                    → Halaman hasil
/videos                     → Halaman video
```

---

## 🎬 Homepage - Video Carousel System

### File: `app/page.tsx`

#### Fitur Utama:
1. **Video Background Carousel**
   - Berganti otomatis setiap 15 detik
   - Smooth fade in/out transition (500ms)
   - Autoplay dengan muted
   - Loop continuous

2. **Video Loading**
   ```typescript
   // Load dari local-videos.json
   const response = await fetch("/data/local-videos.json")
   const videos = await response.json()
   ```

3. **Video Switching Logic**
   ```typescript
   // Interval 15 detik
   setInterval(() => {
     setIsFading(true)  // Fade out
     setTimeout(() => {
       setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
       setIsFading(false)  // Fade in
     }, 500)
   }, 15000)
   ```

4. **Menu Overlay**
   - Muncul saat klik "Masuk"
   - Menampilkan kategori: Anime, Movies, Drama, Horor, Profil
   - Click outside untuk close

#### State Management:
```typescript
const [menuActive, setMenuActive] = useState(false)
const [localVideos, setLocalVideos] = useState<LocalVideo[]>([])
const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
const [loading, setLoading] = useState(true)
const [isFading, setIsFading] = useState(false)
```

---

## 🖼️ Gallery System

### File: `app/gallery/[category]/CategoryGalleryClient.tsx`

#### Dynamic Routing
- URL: `/gallery/[category]`
- Category slug: `anime`, `movies`, `drama`, `horor`
- Conversion: slug ↔ category name

#### Data Loading Flow:
```typescript
1. Get category slug dari URL params
2. Convert slug ke category name (slugToCategory)
3. Load data dari JSON file (getCategoryData)
4. Set background image dari first item
5. Render gallery dengan ReliableGallery component
```

#### AnimeItem Interface:
```typescript
interface AnimeItem {
  id: number
  title: {
    romaji: string      // Judul romaji
    english: string     // Judul English
    native: string      // Judul native (Jepang)
  }
  coverImage: {
    extraLarge: string
    large: string
    medium: string
    color: string       // Dominant color
  }
  bannerImage: string
}
```

#### Background Effect:
- Background blur dari cover image pertama
- Opacity 20% untuk readability
- Black overlay 80% opacity

---

## 🎨 Gallery Layouts

### 1. Reliable Gallery (Default)
**File:** `components/gallery/reliable-gallery.tsx`
- Grid layout responsive
- Image lazy loading
- Modal view dengan navigation
- Infinite scroll support

### 2. Waterfall Gallery
**File:** `components/gallery/waterfall-gallery.tsx`
- Masonry/Pinterest style layout
- Dynamic column count
- Responsive breakpoints

### 3. Stacked Gallery
**File:** `components/gallery/stacked-gallery.tsx`
- Stacked card layout
- 3D transform effects
- Hover interactions

### 4. Simple Gallery
**File:** `components/gallery/simple-gallery.tsx`
- Basic grid layout
- Minimal styling
- Fast loading

---

## 📊 Data Management

### File: `lib/data-manager.ts`

#### Category Types:
```typescript
type CategoryName = "genres" | "formats" | "years" | "status"
```

#### Data Paths:
```typescript
const dataPaths = {
  genres: "/data/genres.json",      // 59.9 MB
  formats: "/data/formats.json",    // 4.8 MB
  years: "/data/years.json",        // 4.8 MB
  status: "/data/status.json"       // 4.8 MB
}
```

#### Caching System:
```typescript
const dataCache = new Map<string, unknown>()

// Cache untuk menghindari reload berulang
if (dataCache.has(path)) return dataCache.get(path)
```

#### Functions:
- `getCategories()` - Get list kategori
- `getCategoryData(category)` - Load data kategori
- `downloadCategoryData(category)` - Download as JSON

---

## 🎭 Live2D Integration

### File: `components/live2d/live2d-wrapper.tsx`

#### Features:
- Interactive character widget
- Hover responses
- Click interactions
- Customizable tips

#### Configuration: `waifu-tips.json`
```json
{
  "messages": {
    "welcome": "Selamat datang!",
    "hover": "Apa yang kamu lihat?",
    "click": "Jangan ganggu aku!"
  }
}
```

---

## 🌦️ Weather Effects System

### File: `components/weather/weather-provider.tsx`

#### Weather Types:
- ☀️ Sunny - Clear sky
- 🌧️ Rain - Animated rain drops
- ❄️ Snow - Falling snowflakes

#### Implementation:
- Canvas-based animation
- Particle system
- Performance optimized
- Toggle on/off

---

## 🎨 Theme System

### File: `components/theme-provider.tsx`

#### Features:
- Dark mode (default)
- Light mode
- System preference detection
- Persistent storage

#### Usage:
```typescript
<ThemeProvider 
  attribute="class" 
  defaultTheme="dark" 
  enableSystem 
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

---

## 🌐 Category Utils

### File: `lib/category-utils.ts`

#### Functions:

**1. categoryToSlug()**
```typescript
// Convert: "Anime" → "anime"
// Convert: "Movies" → "movies"
categoryToSlug("Anime") // "anime"
```

**2. slugToCategory()**
```typescript
// Convert: "anime" → "Anime"
// Convert: "movies" → "Movies"
slugToCategory("anime", MAIN_CATEGORIES) // "Anime"
```

#### Use Cases:
- URL generation
- Route matching
- Category display

---

## 📡 AniList API Integration

### File: `lib/anilist-api.ts`

#### GraphQL Endpoint:
```
https://graphql.anilist.co
```

#### Query Example:
```graphql
query {
  Page(page: 1, perPage: 50) {
    media(type: ANIME, genre: "Action") {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
    }
  }
}
```

#### Rate Limiting:
- 90 requests per minute
- Respect AniList terms

---

## 🔧 Data Fetching Script

### File: `scripts/fetch-anilist-data.js`

#### Cara Kerja:
1. Connect ke AniList GraphQL API
2. Fetch data berdasarkan kategori
3. Transform data ke format aplikasi
4. Save ke `public/data/*.json`

#### Menjalankan:
```bash
node scripts/fetch-anilist-data.js
```

#### Output Files:
- `genres.json` - Data per genre
- `formats.json` - Data per format
- `years.json` - Data per tahun
- `status.json` - Data per status

---

## 🎯 Static Site Generation

### File: `app/gallery/[category]/page.tsx`

#### generateStaticParams():
```typescript
export async function generateStaticParams() {
  return MAIN_CATEGORIES.map((category) => ({
    category: categoryToSlug(category)
  }))
}
```

#### Output:
```
out/
├── gallery/
│   ├── anime/
│   │   └── index.html
│   ├── movies/
│   │   └── index.html
│   ├── drama/
│   │   └── index.html
│   └── horor/
│       └── index.html
```

---

## 🎨 Styling System

### Global Styles: `app/globals.css`

#### Custom Classes:
```css
.hero-container { /* Video background container */ }
.hero-video { /* Video element styling */ }
.hero-overlay { /* Dark overlay */ }
.hero-content { /* Center content */ }
.menu-overlay { /* Menu popup */ }
.loading-spinner { /* Loading animation */ }
```

#### Animations:
```css
.fade-in { /* Fade in transition */ }
.fade-out { /* Fade out transition */ }
```

---

## 🔐 Environment & Config

### Next.js Config: `next.config.mjs`

```javascript
{
  eslint: {
    ignoreDuringBuilds: true  // Skip ESLint saat build
  },
  typescript: {
    ignoreBuildErrors: true   // Skip TS errors saat build
  },
  images: {
    unoptimized: true         // Untuk static export
  }
}
```

### Tailwind Config: `tailwind.config.ts`

#### Custom Theme:
- Extended colors
- Custom animations
- Dark mode class strategy
- Custom breakpoints

---

## 📱 Responsive Design

### Breakpoints:
```
sm: 640px   - Mobile landscape
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
2xl: 1536px - Extra large
```

### Mobile Optimizations:
- Touch-friendly buttons
- Responsive grid layouts
- Mobile menu overlay
- Optimized images

---

## ⚡ Performance Optimizations

### 1. Data Caching
```typescript
const dataCache = new Map<string, unknown>()
```

### 2. Image Optimization
- Lazy loading
- Responsive images
- Placeholder images

### 3. Code Splitting
- Dynamic imports
- Route-based splitting
- Component lazy loading

### 4. Static Generation
- Pre-render all routes
- Fast page loads
- SEO friendly

---

## 🐛 Debugging Tips

### 1. Video Not Playing
```typescript
// Check console logs
console.log("Video started playing")
console.error("Video autoplay failed:", error)
```

### 2. Data Not Loading
```typescript
// Check network tab
console.log("Successfully loaded local videos:", videos)
console.error("Failed to load local videos:", response.statusText)
```

### 3. Gallery Empty
```typescript
// Check data files
console.error(`Error loading data for category ${category}:`, error)
```

---

## 🔄 Update Workflow

### 1. Update Anime Data
```bash
node scripts/fetch-anilist-data.js
```

### 2. Test Locally
```bash
npm run dev
```

### 3. Build & Test
```bash
npm run build
npm run start
```

### 4. Deploy
```bash
# Vercel
vercel deploy

# Manual
npm run build
# Upload folder 'out' ke hosting
```

---

## 📝 Code Conventions

### File Naming:
- Components: `PascalCase.tsx`
- Utils: `kebab-case.ts`
- Pages: `page.tsx`
- Layouts: `layout.tsx`

### Component Structure:
```typescript
"use client" // Jika client component

import statements

interface Props { }

export default function Component() {
  // State
  // Effects
  // Handlers
  // Render
}
```

### CSS Classes:
- Tailwind utility classes
- Custom classes di globals.css
- BEM naming untuk custom classes

---

## 🎓 Best Practices

### 1. State Management
- Use useState untuk local state
- Use useEffect untuk side effects
- Cleanup di useEffect return

### 2. Error Handling
```typescript
try {
  // Operation
} catch (error) {
  console.error("Error:", error)
  // Fallback UI
}
```

### 3. Loading States
```typescript
if (loading) {
  return <LoadingSpinner />
}
```

### 4. Type Safety
- Define interfaces untuk data
- Use TypeScript strict mode
- Avoid 'any' type

---

## 🚀 Deployment Checklist

- [ ] Update anime data
- [ ] Test all routes
- [ ] Check video files
- [ ] Verify images load
- [ ] Test responsive design
- [ ] Check console errors
- [ ] Build production
- [ ] Test production build
- [ ] Deploy to hosting
- [ ] Verify live site

---

## 📞 Troubleshooting

### Issue: Build Failed
**Solution:**
- Check TypeScript errors
- Verify all imports
- Check data files exist

### Issue: Videos Not Loading
**Solution:**
- Check video files in public/
- Verify local-videos.json
- Check browser console

### Issue: Gallery Empty
**Solution:**
- Run fetch script
- Check data files size
- Verify JSON format

### Issue: Slow Loading
**Solution:**
- Optimize images
- Enable caching
- Use CDN for videos

---

**Dokumentasi dibuat oleh:** Bos Alwiy  
**Untuk project:** Vanx Dev - Anime Albums Website  
**Terakhir update:** 23 Mei 2026

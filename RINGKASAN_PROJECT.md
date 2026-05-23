# Ringkasan Project: Anime Albums Website

**Tanggal Analisis:** 23 Mei 2026  
**Lokasi Project:** C:\Users\vanx3\Desktop\project Vanx\anime-albums-website

---

## 📋 Informasi Umum

**Nama Project:** Anime Albums Website Template  
**Versi:** 0.1.0  
**Tipe:** Website Template untuk Koleksi Anime  
**Owner:** Vanx Dev  

---

## 🛠️ Tech Stack

### Framework & Bahasa
- **Framework:** Next.js 16.2.6 (App Router)
- **Bahasa:** TypeScript 5
- **React:** 18.2.0
- **Node.js:** Minimal versi 18.0

### Styling & UI
- **CSS Framework:** Tailwind CSS 3.4.17
- **UI Components:** shadcn/ui (Radix UI)
- **Animasi:** Framer Motion (implisit)
- **Icons:** Lucide React

### Library Utama
- **Form Handling:** React Hook Form + Zod validation
- **Date Handling:** date-fns
- **Charts:** Recharts
- **Carousel:** Embla Carousel React
- **Theme:** next-themes (dark/light mode)
- **Toast Notifications:** Sonner

---

## 🎯 Fitur Utama

### 1. **Video Background Carousel**
   - Video background dinamis yang berganti setiap 15 detik
   - Fade in/out transition
   - Autoplay dengan fallback
   - Lokasi: `app/page.tsx`

### 2. **Weather Effects**
   - Efek cuaca interaktif (hujan, salju, cerah)
   - Provider: `components/weather/weather-provider.tsx`

### 3. **Live2D Character**
   - Karakter interaktif Live2D
   - Wrapper: `components/live2d/live2d-wrapper.tsx`
   - Konfigurasi: `waifu-tips.json`

### 4. **Gallery System**
   - Multiple layout options:
     - Reliable Gallery (default)
     - Waterfall Gallery
     - Stacked Gallery
     - Simple Gallery
   - Infinite scroll loading
   - Image modal dengan navigasi
   - Lokasi: `components/gallery/`

### 5. **Multi-language Support**
   - Language switcher component
   - Lokasi: `components/language-switcher.tsx`

### 6. **Dark/Light Theme**
   - Theme provider dengan system detection
   - Lokasi: `components/theme-provider.tsx`

### 7. **Category-based Navigation**
   - Kategori utama: Anime, Movies, Drama, Horor
   - Dynamic routing: `/gallery/[category]`
   - Lokasi: `lib/categories.ts`

---

## 📁 Struktur Project

```
anime-albums-website/
├── app/                          # Next.js App Router
│   ├── about/                    # Halaman profil
│   ├── fetch/                    # Halaman fetch data
│   ├── gallery/[category]/       # Gallery dinamis per kategori
│   ├── results/                  # Halaman hasil
│   ├── videos/                   # Halaman video
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage dengan video carousel
│   └── globals.css               # Global styles
│
├── components/                   # React Components
│   ├── gallery/                  # Gallery components
│   │   ├── reliable-gallery.tsx
│   │   ├── waterfall-gallery.tsx
│   │   ├── stacked-gallery.tsx
│   │   └── simple-gallery.tsx
│   ├── live2d/                   # Live2D integration
│   │   └── live2d-wrapper.tsx
│   ├── weather/                  # Weather effects
│   │   └── weather-provider.tsx
│   ├── ui/                       # shadcn/ui components (40+ components)
│   ├── language-switcher.tsx
│   └── theme-provider.tsx
│
├── lib/                          # Utility functions
│   ├── i18n/                     # Internationalization
│   ├── anilist-api.ts            # AniList API integration
│   ├── categories.ts             # Category definitions
│   ├── category-utils.ts         # Category helpers
│   ├── data-manager.ts           # Data loading & caching
│   ├── data-utils.ts             # Data utilities
│   └── utils.ts                  # General utilities
│
├── public/                       # Static files
│   ├── data/                     # JSON data files
│   │   ├── genres.json           # 59.9 MB
│   │   ├── tmdb.json             # 40.4 MB
│   │   ├── formats.json          # 4.8 MB
│   │   ├── status.json           # 4.8 MB
│   │   ├── years.json            # 4.8 MB
│   │   ├── trailers.json         # 2.9 MB
│   │   └── local-videos.json     # 638 B
│   ├── video-1.mp4 sampai video-5.mp4
│   └── placeholder images
│
├── scripts/                      # Utility scripts
│   ├── fetch-anilist-data.js     # Fetch dari AniList API
│   └── check-videos.js           # Video validation
│
├── out/                          # Build output (static export)
├── .next/                        # Next.js build cache
├── .vercel/                      # Vercel deployment config
│
└── Config Files
    ├── package.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── components.json           # shadcn/ui config
    └── waifu-tips.json           # Live2D config
```

---

## 🗂️ Data Structure

### Local Videos (local-videos.json)
```json
[
  {
    "id": "video1",
    "title": "Anime Background 1",
    "videoPath": "/video-1.mp4",
    "thumbnailPath": ""
  }
]
```

### Category Data
- **genres.json** - Data anime berdasarkan genre
- **formats.json** - Data berdasarkan format (TV, Movie, OVA, dll)
- **years.json** - Data berdasarkan tahun rilis
- **status.json** - Data berdasarkan status (Ongoing, Completed, dll)
- **tmdb.json** - Data dari TMDB API
- **trailers.json** - Data trailer video

---

## 🚀 Cara Menjalankan

### Development Mode
```bash
npm run dev
# atau
yarn dev
```
Akses: http://localhost:3000

### Build Production
```bash
npm run build
npm run start
```

### Fetch Data Baru
```bash
node scripts/fetch-anilist-data.js
```

---

## 🔧 Konfigurasi Penting

### Next.js Config (next.config.mjs)
- ESLint: Disabled saat build
- TypeScript: Ignore build errors
- Images: Unoptimized (untuk static export)

### Tailwind Config
- Custom animations
- Extended theme colors
- Dark mode support

### TypeScript Config
- Strict mode enabled
- Path aliases: `@/*` → root directory

---

## 📦 Dependencies Utama

### UI & Styling
- @radix-ui/* (40+ packages) - Headless UI components
- tailwindcss + tailwindcss-animate
- lucide-react - Icons
- class-variance-authority - Variant styling
- clsx + tailwind-merge - Class utilities

### Forms & Validation
- react-hook-form
- @hookform/resolvers
- zod

### Data Visualization
- recharts - Charts
- embla-carousel-react - Carousel

### Utilities
- date-fns - Date formatting
- next-themes - Theme management
- sonner - Toast notifications

---

## 🌐 API Integration

### AniList GraphQL API
- File: `lib/anilist-api.ts`
- Script: `scripts/fetch-anilist-data.js`
- Rate limiting: Sesuai AniList terms

### TMDB API (Optional)
- File: `fetch-tmdb-data.js`
- Data: `public/data/tmdb.json`

---

## 🎨 Customization Points

### 1. Anime Data
- Edit JSON files di `public/data/`
- Jalankan fetch script untuk update data
- Buat custom JSON dengan struktur yang sama

### 2. Weather Effects
- File: `components/weather/weather-effects.tsx`
- Styles: `app/globals.css`

### 3. Live2D Character
- Config: `waifu-tips.json`
- Wrapper: `components/live2d/live2d-wrapper.tsx`

### 4. Categories
- Edit: `lib/categories.ts`
- Tambah/kurangi kategori di `MAIN_CATEGORIES`

### 5. Theme & Colors
- Config: `tailwind.config.ts`
- Global styles: `app/globals.css`

---

## 🚢 Deployment

### Vercel (Recommended)
- One-click deploy support
- Config: `.vercel/project.json`
- Static export ke folder `out/`

### EdgeOne
- Deploy button tersedia di README
- Build command: `npm run build`
- Output directory: `./out`

---

## 📝 Scripts Available

```json
{
  "dev": "next dev",           // Development server
  "build": "next build",       // Production build
  "start": "next start",       // Production server
  "lint": "next lint"          // ESLint check
}
```

### Custom Scripts
- `scripts/fetch-anilist-data.js` - Fetch anime data
- `scripts/check-videos.js` - Validate video files

---

## 🔐 License & Terms

- **Project License:** MIT
- **Live2D:** Lihat terms di https://www.live2d.com/en/terms/
- **AniList API:** Rate limiting berlaku

---

## 🎯 Use Cases

1. **Personal Anime Collection** - Showcase koleksi anime pribadi
2. **Anime Database** - Database anime dengan filter kategori
3. **Portfolio Website** - Template untuk portfolio dengan tema anime
4. **Fan Site** - Website fan untuk anime tertentu

---

## 🐛 Known Issues & Notes

1. **Build Warnings Ignored**
   - ESLint disabled during builds
   - TypeScript errors ignored
   - Untuk production, sebaiknya fix warnings

2. **Large Data Files**
   - genres.json: 59.9 MB
   - tmdb.json: 40.4 MB
   - Pertimbangkan pagination atau lazy loading

3. **Video Files**
   - 5 video background (video-1.mp4 sampai video-5.mp4)
   - Pastikan video files ada di public folder

---

## 🔄 Update & Maintenance

### Update Anime Data
```bash
node scripts/fetch-anilist-data.js
```

### Update Dependencies
```bash
npm update
# atau
yarn upgrade
```

### Build untuk Deploy
```bash
npm run build
```

---

## 📞 Support & Resources

- **GitHub:** https://github.com/tomcomtang/anime-albums-website
- **AniList API Docs:** https://anilist.gitbook.io/anilist-apiv2-docs/
- **Live2D Widget:** https://github.com/stevenjoezhang/live2d-widget
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com/

---

## 🎓 Learning Points

Project ini bagus untuk belajar:
- Next.js App Router
- TypeScript dengan React
- Tailwind CSS advanced usage
- shadcn/ui component system
- API integration (AniList, TMDB)
- Static site generation
- Theme management
- Internationalization

---

**Dibuat oleh:** Bos Alwiy  
**Untuk:** Vanx Dev Project Collection  
**Tanggal:** 23 Mei 2026

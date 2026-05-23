# Panduan Lengkapi Data TMDB - Anime Albums Website

**Tanggal:** 23 Mei 2026  
**Untuk:** Bos Alwiy - Vanx Dev

---

## 📊 Status Data TMDB Saat Ini

### Yang Sudah Ada (60% Lengkap):
- ✅ Film: 95 items
- ✅ Movies Now Playing: 56 items
- ✅ Movies Upcoming: 60 items
- ✅ Movies Top Rated: 60 items
- ✅ On TV: 59 items
- ✅ Drama Korea: 100 items
- ✅ Film Action: 39 items
- ✅ Film Comedy: 40 items
- ✅ Film Drama: 40 items
- ✅ Film Romance: 38 items
- ✅ Film Horror: 39 items
- ✅ Film Animation: 40 items

**Total:** 666 items

### Yang Akan Ditambah (Script Sudah Siap):
- 🆕 Drama Jepang: ~80 items
- 🆕 Horor TV: ~50 items
- 🆕 Film Thriller: ~50 items
- 🆕 Film Mystery: ~50 items
- ➕ Lebih banyak items per kategori (2x lipat)
- ➕ Video & Trailer lengkap untuk semua item
- ➕ Cast & Crew lengkap
- ➕ External links (IMDb, Facebook, Instagram, Twitter)

**Total Setelah Fetch:** ~1500+ items dengan video lengkap

---

## 🔑 Cara Mendapatkan TMDB API Key

### Step 1: Daftar Akun TMDB

1. Buka: https://www.themoviedb.org/signup
2. Isi form pendaftaran:
   - Username
   - Password
   - Email
3. Verifikasi email
4. Login ke akun TMDB

### Step 2: Request API Key

1. Setelah login, buka: https://www.themoviedb.org/settings/api
2. Klik **"Request an API Key"**
3. Pilih **"Developer"** (untuk personal use)
4. Isi form:
   - **Application Name:** Anime Albums Website
   - **Application URL:** https://your-website.com (atau localhost)
   - **Application Summary:** Personal anime and movie collection website
5. Setuju terms & conditions
6. Klik **"Submit"**

### Step 3: Copy API Key

Setelah approved (instant), Anda akan dapat:
- **API Key (v3 auth)** - Copy ini!
- **API Read Access Token (v4 auth)** - Tidak perlu

**Format API Key:**
```
1234567890abcdef1234567890abcdef
```

---

## 🚀 Cara Menjalankan Script Fetch

### Option 1: Set API Key & Run (Windows PowerShell)

```powershell
# 1. Set API Key (ganti dengan API Key Anda)
$env:TMDB_API_KEY = "1234567890abcdef1234567890abcdef"

# 2. Masuk ke folder project
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"

# 3. Jalankan script
node fetch-tmdb-data.js
```

### Option 2: Set API Key Permanent (Recommended)

```powershell
# 1. Buka PowerShell sebagai Administrator

# 2. Set environment variable permanent
[System.Environment]::SetEnvironmentVariable('TMDB_API_KEY', '1234567890abcdef1234567890abcdef', 'User')

# 3. Restart PowerShell

# 4. Jalankan script
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"
node fetch-tmdb-data.js
```

### Option 3: Buat File .env (Alternative)

```bash
# 1. Buat file .env di root project
echo TMDB_API_KEY=1234567890abcdef1234567890abcdef > .env

# 2. Install dotenv
npm install dotenv

# 3. Edit fetch-tmdb-data.js (tambah di baris 1)
import 'dotenv/config'

# 4. Jalankan script
node fetch-tmdb-data.js
```

---

## 📦 Apa Yang Akan Di-Fetch

### Kategori Movies (8 kategori):
1. **Film** - 160 items (dari 95)
   - Film populer terbaru
   - Rating tinggi
   - Poster HD
   - Trailer resmi

2. **Movies Now Playing** - 100 items (dari 56)
   - Film sedang tayang di bioskop
   - Update terbaru

3. **Movies Upcoming** - 100 items (dari 60)
   - Film akan datang
   - Release date

4. **Movies Top Rated** - 100 items (dari 60)
   - Film rating tertinggi sepanjang masa
   - Classic movies

5. **Film Action** - 100 items (dari 39)
   - Genre: Action, Adventure
   - Blockbuster movies

6. **Film Comedy** - 100 items (dari 40)
   - Genre: Comedy
   - Feel-good movies

7. **Film Drama** - 100 items (dari 40)
   - Genre: Drama
   - Award-winning movies

8. **Film Romance** - 100 items (dari 38)
   - Genre: Romance
   - Love stories

9. **Film Horror** - 160 items (dari 39)
   - Genre: Horror
   - Scary movies

10. **Film Thriller** - 100 items (BARU!)
    - Genre: Thriller
    - Suspense movies

11. **Film Mystery** - 100 items (BARU!)
    - Genre: Mystery
    - Detective stories

12. **Film Animation** - 100 items (dari 40)
    - Genre: Animation
    - Animated movies

### Kategori TV Series (4 kategori):

1. **On TV** - 100 items (dari 59)
   - Serial TV sedang tayang
   - Popular shows

2. **Drama Korea** - 160 items (dari 100)
   - K-Drama populer
   - Romance, Action, Thriller

3. **Drama Jepang** - 160 items (BARU!)
   - J-Drama populer
   - Anime live-action

4. **Horor TV** - 100 items (BARU!)
   - Serial horor & mystery
   - Thriller series

---

## 📹 Data Yang Akan Ditambahkan

### Untuk Setiap Item:

#### 1. **Video & Trailer Lengkap**
```json
{
  "trailer": {
    "id": "youtube_video_id",
    "site": "youtube",
    "name": "Official Trailer",
    "type": "Trailer",
    "official": true,
    "thumbnail": "https://i.ytimg.com/vi/...",
    "url": "https://www.youtube.com/watch?v=..."
  },
  "videos": [
    {
      "id": "video_id_1",
      "name": "Official Trailer",
      "type": "Trailer",
      "thumbnail": "...",
      "url": "..."
    },
    {
      "id": "video_id_2",
      "name": "Teaser",
      "type": "Teaser",
      "thumbnail": "...",
      "url": "..."
    },
    {
      "id": "video_id_3",
      "name": "Behind the Scenes",
      "type": "Featurette",
      "thumbnail": "...",
      "url": "..."
    }
  ]
}
```

#### 2. **Cast & Crew Lengkap**
```json
{
  "characters": {
    "edges": [
      {
        "role": "Character Name",
        "node": {
          "name": { "full": "Actor Name" },
          "profilePath": "https://..."
        }
      }
    ]
  },
  "staff": {
    "edges": [
      {
        "role": "Director",
        "node": {
          "name": { "full": "Director Name" }
        }
      }
    ]
  }
}
```

#### 3. **External Links**
```json
{
  "externalLinks": [
    { "site": "Situs Resmi", "url": "https://..." },
    { "site": "IMDb", "url": "https://www.imdb.com/..." },
    { "site": "Facebook", "url": "https://www.facebook.com/..." },
    { "site": "Instagram", "url": "https://www.instagram.com/..." },
    { "site": "X/Twitter", "url": "https://x.com/..." },
    { "site": "TMDB", "url": "https://www.themoviedb.org/..." }
  ]
}
```

#### 4. **Detail Lengkap**
- Budget & Revenue
- Production Companies
- Production Countries
- Spoken Languages
- Release Dates
- Episode Count (untuk TV)
- Season Info (untuk TV)
- Networks (untuk TV)

---

## ⏱️ Estimasi Waktu Fetch

### Berdasarkan Kategori:

- **Film (160 items):** ~8 menit
- **Movies Now Playing (100):** ~5 menit
- **Movies Upcoming (100):** ~5 menit
- **Movies Top Rated (100):** ~5 menit
- **On TV (100):** ~5 menit
- **Drama Korea (160):** ~8 menit
- **Drama Jepang (160):** ~8 menit
- **Horor TV (100):** ~5 menit
- **Film Action (100):** ~5 menit
- **Film Comedy (100):** ~5 menit
- **Film Drama (100):** ~5 menit
- **Film Romance (100):** ~5 menit
- **Film Horror (160):** ~8 menit
- **Film Thriller (100):** ~5 menit
- **Film Mystery (100):** ~5 menit
- **Film Animation (100):** ~5 menit

**Total Estimasi:** ~90-120 menit (1.5-2 jam)

**Note:** Script akan fetch data secara bertahap dengan retry mechanism untuk menghindari rate limit.

---

## 📊 Hasil Setelah Fetch

### File Output:
```
public/data/tmdb.json
```

### Ukuran File:
- **Sebelum:** 41 MB (666 items)
- **Setelah:** ~100-120 MB (1500+ items dengan video lengkap)

### Total Data:
- **Movies:** ~1200 items
- **TV Series:** ~520 items
- **Total:** ~1720 items
- **Videos/Trailers:** ~3000+ videos

---

## 🔄 Cara Update Data Berkala

### Update Mingguan (Recommended):

```powershell
# Setiap minggu, jalankan:
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"
node fetch-tmdb-data.js
npm run build
vercel --prod
```

### Update Otomatis (Advanced):

Buat scheduled task di Windows:
1. Open Task Scheduler
2. Create Basic Task
3. Name: "Update TMDB Data"
4. Trigger: Weekly (Minggu pagi)
5. Action: Start a program
   - Program: `powershell.exe`
   - Arguments: `-File "C:\path\to\update-script.ps1"`

---

## 🐛 Troubleshooting

### Error: TMDB_API_KEY belum diset
**Solution:**
```powershell
$env:TMDB_API_KEY = "YOUR_API_KEY_HERE"
```

### Error: Rate limit exceeded
**Solution:**
- Script sudah include retry mechanism
- Tunggu beberapa menit dan coba lagi
- TMDB free tier: 40 requests per 10 seconds

### Error: Network timeout
**Solution:**
- Check internet connection
- Script akan auto-retry 4x
- Jika masih error, jalankan ulang

### Error: Invalid API Key
**Solution:**
- Verify API Key di TMDB dashboard
- Copy ulang API Key
- Pastikan tidak ada spasi di awal/akhir

---

## ✅ Checklist Sebelum Fetch

- [ ] Sudah punya akun TMDB
- [ ] Sudah dapat API Key
- [ ] API Key sudah di-set di environment
- [ ] Internet connection stabil
- [ ] Punya waktu 1.5-2 jam
- [ ] Backup data lama (optional)

---

## 🚀 Quick Start (Copy & Paste)

```powershell
# 1. Set API Key (ganti dengan API Key Anda)
$env:TMDB_API_KEY = "PASTE_YOUR_API_KEY_HERE"

# 2. Masuk ke folder project
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"

# 3. Backup data lama (optional)
Copy-Item "public\data\tmdb.json" "public\data\tmdb.json.backup"

# 4. Jalankan fetch
node fetch-tmdb-data.js

# 5. Setelah selesai, build & deploy
npm run build
vercel --prod
```

---

## 📞 Support

### Jika Ada Masalah:

1. **Check console output** - Error message biasanya jelas
2. **Verify API Key** - Login ke TMDB dashboard
3. **Check internet** - Pastikan koneksi stabil
4. **Read error message** - Script akan kasih info detail

### TMDB Resources:

- **API Docs:** https://developers.themoviedb.org/3
- **API Status:** https://status.themoviedb.org/
- **Support:** https://www.themoviedb.org/talk

---

## 🎯 Kesimpulan

### Setelah Fetch Lengkap:

✅ **1720+ items** (dari 666)  
✅ **3000+ videos & trailers**  
✅ **Cast & crew lengkap**  
✅ **External links lengkap**  
✅ **4 kategori baru** (Drama Jepang, Horor TV, Film Thriller, Film Mystery)  
✅ **Data 100% lengkap dari TMDB**

### Website Akan Punya:

- Ribuan anime (dari AniList)
- 1720+ movies & TV series (dari TMDB)
- 3000+ video trailers
- Cast & crew info
- External links
- Rating & reviews

**Total Content:** 3000+ items dengan video lengkap! 🎉

---

**Dibuat oleh:** Bos Alwiy  
**Tanggal:** 23 Mei 2026, 19:14 WIB  
**Status:** Siap Fetch Data TMDB Lengkap! 🚀

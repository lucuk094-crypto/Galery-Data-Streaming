# 🚀 Quick Deploy Guide - Anime Albums Website

**Status:** ✅ SIAP DEPLOY  
**Build:** SUCCESS  
**Tanggal:** 23 Mei 2026

---

## 📦 Yang Sudah Disiapkan

✅ Build production berhasil  
✅ Semua data files valid  
✅ Video files ready  
✅ Config files fixed  
✅ Static export ready di folder `out/`

---

## 🚀 Deploy Sekarang (Pilih Salah Satu)

### 🔷 Option 1: Vercel (PALING MUDAH - Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"
vercel --prod
```

**Selesai!** URL otomatis: `https://anime-albums-website.vercel.app`

---

### 🟢 Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"
netlify deploy --dir=out --prod
```

**Selesai!** URL otomatis: `https://anime-albums-website.netlify.app`

---

### 🟣 Option 3: GitHub Pages

```bash
# 1. Push ke GitHub
cd "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"
git init
git add .
git commit -m "Deploy Anime Albums Website"
git branch -M main
git remote add origin https://github.com/USERNAME/anime-albums-website.git
git push -u origin main

# 2. Enable GitHub Pages di Settings > Pages
# 3. Pilih branch: main, folder: /out
```

**URL:** `https://USERNAME.github.io/anime-albums-website`

---

### 📁 Option 4: Manual Upload (Hosting Biasa)

```bash
# 1. Build (sudah dilakukan)
npm run build

# 2. Upload folder 'out/' ke hosting
# - cPanel: Upload ke public_html
# - FTP: Upload ke www atau htdocs
# - Pastikan index.html ada di root
```

---

## 🧪 Test Sebelum Deploy (Optional)

```bash
# Test di local
npx serve out

# Buka browser: http://localhost:3000
```

**Test Checklist:**
- [ ] Homepage dengan video carousel
- [ ] Menu kategori berfungsi
- [ ] Gallery pages loading
- [ ] Images dan modal berfungsi
- [ ] Responsive di mobile

---

## 🌐 Custom Domain (Setelah Deploy)

### Di Vercel/Netlify:
1. Beli domain (contoh: vanxdev.com)
2. Add domain di dashboard
3. Update DNS records:
   ```
   CNAME: www → your-app.vercel.app
   A: @ → [IP dari hosting]
   ```
4. Tunggu 24-48 jam untuk DNS propagation

---

## 📊 File Structure (Yang Di-Deploy)

```
out/
├── index.html              # Homepage
├── about/                  # Halaman profil
├── gallery/
│   ├── anime/             # Gallery anime
│   ├── movies/            # Gallery movies
│   ├── drama/             # Gallery drama
│   └── horor/             # Gallery horor
├── data/                  # JSON data files
├── _next/                 # Next.js assets
├── video-1.mp4 s/d video-5.mp4
└── images/                # Placeholder images
```

**Total Size:** ~120 MB (termasuk data & video)

---

## ⚡ Performance Tips

### Setelah Deploy:
1. **Enable CDN** - Vercel/Netlify sudah include
2. **Compress Images** - Gunakan imagemin
3. **Compress Videos** - Gunakan ffmpeg
4. **Enable Caching** - Auto di Vercel/Netlify

---

## 🔧 Update Website (Setelah Deploy)

### Update Content:
```bash
# 1. Edit files yang perlu diubah
# 2. Build ulang
npm run build

# 3. Deploy ulang
vercel --prod
# atau
netlify deploy --dir=out --prod
```

### Update Data Anime:
```bash
# 1. Fetch data baru
node scripts/fetch-anilist-data.js

# 2. Build & deploy
npm run build
vercel --prod
```

---

## 🐛 Troubleshooting

### Build Error:
```bash
rm -rf .next out node_modules
npm install
npm run build
```

### Deploy Error:
- Check internet connection
- Verify CLI login
- Check file permissions

### Website Not Loading:
- Wait 2-3 minutes after deploy
- Clear browser cache
- Check console for errors

---

## 📞 Need Help?

### Documentation:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Next.js: https://nextjs.org/docs

### Contact:
- GitHub Issues
- Discord Community
- Stack Overflow

---

## 🎉 Selamat!

Website Bos Alwiy siap dipublikasikan ke dunia! 🚀

**Estimasi waktu deploy:** 2-5 menit  
**Gratis:** Ya (Vercel & Netlify free tier)  
**Custom domain:** Bisa ditambahkan nanti

---

**Dibuat oleh:** Bos Alwiy  
**Project:** Vanx Dev - Anime Albums Website  
**Status:** READY TO DEPLOY ✅

# Catatan Upload GitHub - Anime All Genre

Folder ini sudah dirapikan agar lebih aman dimasukkan ke GitHub.

## Perubahan yang dilakukan

1. File besar `public/data/tmdb.json` ukuran 107 MB dipindahkan ke:
   ```text
   data-full-archive/tmdb-full-107mb.json
   ```

2. File besar `public/data/genres.json` ukuran 60 MB dipindahkan ke:
   ```text
   data-full-archive/genres-full-60mb.json
   ```

3. Data yang dipakai website tetap lengkap, tapi sudah dipecah:
   ```text
   public/data/tmdb/*.json
   public/data/genres/*.json
   ```

4. File terbesar di `public` sekarang sekitar 11 MB, aman untuk GitHub.

5. `.gitignore` sudah ditambah agar folder besar tidak ikut masuk GitHub:
   ```text
   node_modules
   .vercel
   .next
   out
   data-full-archive
   *.backup
   ```

## Catatan penting

- Data full **tidak dihapus**, hanya dipindahkan ke `data-full-archive`.
- Folder `data-full-archive` tidak akan ikut di-upload ke GitHub karena masuk `.gitignore`.
- Website tetap memakai data lengkap dari file split di `public/data/tmdb/` dan `public/data/genres/`.

## Status build

Build sudah dites dan berhasil:

```text
npm run build
```

Route berhasil dibuat:
- `/`
- `/about`
- `/fetch`
- `/gallery/anime`
- `/gallery/movies`
- `/gallery/drama`
- `/gallery/horor`
- `/results`
- `/videos`

## Cara upload ke GitHub

```powershell
cd "C:\Users\vanx3\Desktop\project Vanx\anime all genre"
git init
git add .
git commit -m "Initial commit anime all genre"
git branch -M main
git remote add origin https://github.com/USERNAME/anime-all-genre.git
git push -u origin main
```

Ganti `USERNAME` dan URL repository sesuai akun GitHub Bos Alwiy.

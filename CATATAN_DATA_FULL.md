# Catatan Data Full - Anime All Genre

Folder ini adalah salinan lengkap dari project `anime-albums-website` dengan data penuh tanpa pengurangan.

## Lokasi
`C:\Users\vanx3\Desktop\project Vanx\anime all genre`

## Data TMDB Full
File full tersedia di:

```text
public/data/tmdb.json
```

Ukuran: sekitar 107 MB  
Total data: 1.828 item

Isi kategori:
- Film: 158
- Movies Now Playing: 98
- Movies Upcoming: 100
- Movies Top Rated: 100
- On TV: 99
- Drama Korea: 160
- Drama Jepang: 160
- Horor TV: 97
- Film Action: 100
- Film Comedy: 99
- Film Drama: 99
- Film Romance: 100
- Film Horror: 159
- Film Thriller: 99
- Film Mystery: 100
- Film Animation: 100

## Data TMDB Split
File split juga tetap tersedia di:

```text
public/data/tmdb/
```

File split dipakai agar aman untuk deploy ke Vercel karena limit file Vercel adalah 100 MB per file.

## Catatan Penting
- `tmdb.json` adalah data full tanpa pengurangan.
- `public/data/tmdb/*.json` adalah versi pecahan dari data yang sama.
- Untuk deploy ke Vercel, gunakan versi split agar tidak terkena error `File size limit exceeded (100 MB)`.
- Untuk arsip/data master, gunakan `public/data/tmdb.json`.

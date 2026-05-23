# Script Helper - Fetch TMDB Data
# Untuk: Bos Alwiy - Vanx Dev
# Tanggal: 23 Mei 2026

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TMDB Data Fetcher - Anime Albums" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cek API Key
if (-not $env:TMDB_API_KEY) {
    Write-Host "ERROR: TMDB_API_KEY belum diset!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Cara set API Key:" -ForegroundColor Yellow
    Write-Host '  $env:TMDB_API_KEY = "YOUR_API_KEY_HERE"' -ForegroundColor White
    Write-Host ""
    Write-Host "Atau set permanent:" -ForegroundColor Yellow
    Write-Host '  [System.Environment]::SetEnvironmentVariable("TMDB_API_KEY", "YOUR_API_KEY_HERE", "User")' -ForegroundColor White
    Write-Host ""
    Write-Host "Dapatkan API Key di: https://www.themoviedb.org/settings/api" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host "✓ API Key ditemukan" -ForegroundColor Green
Write-Host ""

# Cek lokasi
$projectPath = "C:\Users\vanx3\Desktop\project Vanx\anime-albums-website"
if (-not (Test-Path $projectPath)) {
    Write-Host "ERROR: Project folder tidak ditemukan!" -ForegroundColor Red
    Write-Host "Path: $projectPath" -ForegroundColor Yellow
    exit 1
}

Set-Location $projectPath
Write-Host "✓ Project folder ditemukan" -ForegroundColor Green
Write-Host ""

# Backup data lama
Write-Host "Backup data lama..." -ForegroundColor Yellow
$backupPath = "public\data\tmdb.json.backup"
if (Test-Path "public\data\tmdb.json") {
    Copy-Item "public\data\tmdb.json" $backupPath -Force
    Write-Host "✓ Backup tersimpan: $backupPath" -ForegroundColor Green
} else {
    Write-Host "! File tmdb.json tidak ditemukan (first time fetch)" -ForegroundColor Yellow
}
Write-Host ""

# Konfirmasi
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  READY TO FETCH" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Akan fetch data dari TMDB:" -ForegroundColor White
Write-Host "  - 16 kategori (Movies & TV Series)" -ForegroundColor White
Write-Host "  - ~1720 items total" -ForegroundColor White
Write-Host "  - Video & trailer lengkap" -ForegroundColor White
Write-Host "  - Cast & crew info" -ForegroundColor White
Write-Host "  - External links" -ForegroundColor White
Write-Host ""
Write-Host "Estimasi waktu: 90-120 menit" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Lanjutkan? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Dibatalkan." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FETCHING DATA..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Jalankan fetch
$startTime = Get-Date
node fetch-tmdb-data.js

# Cek hasil
if ($LASTEXITCODE -eq 0) {
    $endTime = Get-Date
    $duration = $endTime - $startTime

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  FETCH BERHASIL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "✓ Data TMDB berhasil di-fetch" -ForegroundColor Green
    Write-Host "✓ File tersimpan: public\data\tmdb.json" -ForegroundColor Green
    Write-Host "✓ Waktu: $($duration.ToString('hh\:mm\:ss'))" -ForegroundColor Green
    Write-Host ""

    # Cek ukuran file
    $fileSize = (Get-Item "public\data\tmdb.json").Length / 1MB
    Write-Host "Ukuran file: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  NEXT STEPS" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Build production:" -ForegroundColor White
    Write-Host "   npm run build" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "2. Test local:" -ForegroundColor White
    Write-Host "   npx serve out" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Deploy:" -ForegroundColor White
    Write-Host "   vercel --prod" -ForegroundColor Yellow
    Write-Host ""

} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  FETCH GAGAL!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error code: $LASTEXITCODE" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check API Key valid" -ForegroundColor White
    Write-Host "  2. Check internet connection" -ForegroundColor White
    Write-Host "  3. Check console error message" -ForegroundColor White
    Write-Host "  4. Restore backup jika perlu:" -ForegroundColor White
    Write-Host "     Copy-Item $backupPath public\data\tmdb.json" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

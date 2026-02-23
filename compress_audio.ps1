# Audio Compression Script
# This script compresses the interview audio file to reduce size by ~50%

Write-Host "🎵 Audio Compression Utility" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$audioPath = "public\audio\interview_film.m4a"

if (Test-Path $audioPath) {
    $originalSize = (Get-Item $audioPath).Length / 1MB
    Write-Host "✓ Found: $audioPath" -ForegroundColor Green
    Write-Host "  Original size: $([math]::Round($originalSize, 2)) MB" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Recommended compression with FFmpeg:" -ForegroundColor Cyan
    Write-Host "  ffmpeg -i $audioPath -c:a aac -b:a 96k -ar 44100 public\audio\interview_film_compressed.m4a" -ForegroundColor White
    Write-Host ""
    Write-Host "  Or convert to MP3:" -ForegroundColor Cyan
    Write-Host "  ffmpeg -i $audioPath -c:a libmp3lame -b:a 128k public\audio\interview_film.mp3" -ForegroundColor White
    Write-Host ""
    Write-Host "Expected size reduction: ~50% (from $([math]::Round($originalSize, 2)) MB to ~$([math]::Round($originalSize * 0.5, 2)) MB)" -ForegroundColor Green
} else {
    Write-Host "✗ Audio file not found at: $audioPath" -ForegroundColor Red
    Write-Host "  Please verify the path" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💡 Note: You need FFmpeg installed to run the compression commands" -ForegroundColor Cyan
Write-Host "   Download from: https://ffmpeg.org/download.html" -ForegroundColor Gray

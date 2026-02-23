# Build Verification Script
# Checks build output and optimization status

Write-Host "🔍 XoroX Rising - Build Verification" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if build directory exists
if (Test-Path ".next") {
    Write-Host "✓ Build directory found" -ForegroundColor Green
    
    # Check build size
    $buildSize = (Get-ChildItem -Path ".next" -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "  Build size: $([math]::Round($buildSize, 2)) MB" -ForegroundColor Yellow
    
    # Check for static export
    if (Test-Path "out") {
        Write-Host "✓ Static export found" -ForegroundColor Green
        $outSize = (Get-ChildItem -Path "out" -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host "  Export size: $([math]::Round($outSize, 2)) MB" -ForegroundColor Yellow
    } else {
        Write-Host "⚠ No static export (run: npm run build)" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ Build directory not found" -ForegroundColor Red
    Write-Host "  Run: npm run build" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Configuration Checks:" -ForegroundColor Cyan
Write-Host ""

# Check tsconfig
if (Test-Path "tsconfig.json") {
    $tsconfig = Get-Content "tsconfig.json" | ConvertFrom-Json
    if ($tsconfig.compilerOptions.strict -eq $true) {
        Write-Host "✓ TypeScript strict mode: enabled" -ForegroundColor Green
    } else {
        Write-Host "⚠ TypeScript strict mode: disabled" -ForegroundColor Yellow
    }
    
    if ($tsconfig.compilerOptions.jsx -eq "preserve") {
        Write-Host "✓ JSX mode: preserve (correct for Next.js)" -ForegroundColor Green
    } else {
        Write-Host "⚠ JSX mode: $($tsconfig.compilerOptions.jsx) (should be 'preserve')" -ForegroundColor Yellow
    }
}

Write-Host ""

# Check SEO files
$seoFiles = @(
    @{Path = "src\app\sitemap.ts"; Name = "Sitemap generator"},
    @{Path = "src\app\robots.ts"; Name = "Robots.txt generator"},
    @{Path = "public\manifest.json"; Name = "PWA Manifest"}
)

foreach ($file in $seoFiles) {
    if (Test-Path $file.Path) {
        Write-Host "✓ $($file.Name): exists" -ForegroundColor Green
    } else {
        Write-Host "✗ $($file.Name): missing" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📊 Asset Analysis:" -ForegroundColor Cyan
Write-Host ""

# Check video files
if (Test-Path "public\assets\hero_videos") {
    $videoCount = (Get-ChildItem -Path "public\assets\hero_videos" -Filter "*.webm").Count
    Write-Host "  Hero videos found: $videoCount" -ForegroundColor Yellow
    
    $videoSize = (Get-ChildItem -Path "public\assets\hero_videos" -Filter "*.webm" | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "  Total video size: $([math]::Round($videoSize, 2)) MB" -ForegroundColor Yellow
}

# Check audio file
if (Test-Path "public\audio\interview_film.m4a") {
    $audioSize = (Get-Item "public\audio\interview_film.m4a").Length / 1MB
    Write-Host "  Audio size: $([math]::Round($audioSize, 2)) MB" -ForegroundColor Yellow
    
    if ($audioSize -gt 5) {
        Write-Host "  ⚠ Audio could be compressed (>5MB)" -ForegroundColor Yellow
        Write-Host "    Run: .\compress_audio.ps1" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "🎯 Recommended Actions:" -ForegroundColor Cyan
Write-Host ""

$hasWarnings = $false

if (-not (Test-Path "out")) {
    Write-Host "1. Run production build: npm run build" -ForegroundColor White
    $hasWarnings = $true
}

if (Test-Path "public\audio\interview_film.m4a") {
    $audioSize = (Get-Item "public\audio\interview_film.m4a").Length / 1MB
    if ($audioSize -gt 5) {
        Write-Host "2. Compress audio: .\compress_audio.ps1" -ForegroundColor White
        $hasWarnings = $true
    }
}

if (-not (Test-Path "src\app\sitemap.ts")) {
    Write-Host "3. Add sitemap generator (missing)" -ForegroundColor White
    $hasWarnings = $true
}

if (-not $hasWarnings) {
    Write-Host "✓ All optimizations in place!" -ForegroundColor Green
    Write-Host "  Ready for deployment 🚀" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "📚 Full documentation: OPTIMIZATIONS.md" -ForegroundColor Gray

$ffmpeg = "$env:TEMP\ffmpeg_global\ffmpeg.exe"
$baseDir = "c:\PROJETS DESIGN_FiLMS\BD\FILM\Portfolio\l-artefact-de-la-verite\public"
$files = @(Get-ChildItem -Path $baseDir -Recurse -Filter "*.mp4")
$total = $files.Count
$count = 0
foreach ($file in $files) {
    $count++
    if ($file.Name -eq "creature3.mp4" -or $file.Name -like "*_optimized*") { continue }
    $outPath = [System.IO.Path]::ChangeExtension($file.FullName, ".webm")
    if (Test-Path $outPath) { 
        $size = (Get-Item $outPath).Length
        if ($size -gt 0) {
            Write-Host "Skipping ($count/$total) - Already exists: $($file.Name)" -ForegroundColor Yellow
            continue 
        }
    }
    Write-Host "`n=====================================================" -ForegroundColor Cyan
    Write-Host " Converting ($count/$total): $($file.Name)" -ForegroundColor Green
    Write-Host "=====================================================" -ForegroundColor Cyan
    $p = Start-Process -FilePath $ffmpeg -ArgumentList "-v", "warning", "-stats", "-y", "-i", "`"$($file.FullName)`"", "-c:v", "libvpx-vp9", "-crf", "35", "-b:v", "0", "-cpu-used", "5", "-deadline", "realtime", "-row-mt", "1", "-c:a", "libopus", "-b:a", "48k", "`"$outPath`"" -Wait -NoNewWindow
}
Write-Host "`n=====================================================" -ForegroundColor Green
Write-Host " ALL MEDIA CONVERTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host " You can close this window now." -ForegroundColor Yellow
Write-Host "=====================================================`n" -ForegroundColor Green

$ffmpegDir = "$env:TEMP\ffmpeg_global"
New-Item -ItemType Directory -Force -Path $ffmpegDir | Out-Null
$zipPath = "$ffmpegDir\ffmpeg.zip"
if (-Not (Test-Path "$ffmpegDir\ffmpeg.exe")) {
    Write-Host "Downloading FFmpeg..."
    Invoke-WebRequest -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $ffmpegDir -Force
    $binPath = (Get-ChildItem -Path $ffmpegDir -Recurse -Filter "ffmpeg.exe" | Select-Object -First 1).FullName
    Copy-Item $binPath "$ffmpegDir\ffmpeg.exe"
}
$ffmpeg = "$ffmpegDir\ffmpeg.exe"
$baseDir = "c:\PROJETS DESIGN_FiLMS\BD\FILM\Portfolio\l-artefact-de-la-verite\public"
$files = @(Get-ChildItem -Path $baseDir -Recurse -Filter "*.mp4")
$total = $files.Count
$count = 0
foreach ($file in $files) {
    $count++
    if ($file.Name -eq "creature3.mp4" -or $file.Name -like "*_optimized*") { continue }
    $outPath = [System.IO.Path]::ChangeExtension($file.FullName, ".webm")
    if (Test-Path $outPath) { 
        Write-Host "Skipping ($count/$total) - Already exists: $($file.Name)"
        continue 
    }
    Write-Host "Converting ($count/$total): $($file.Name)"
    $p = Start-Process -FilePath $ffmpeg -ArgumentList "-y", "-i", "`"$($file.FullName)`"", "-c:v", "libvpx-vp9", "-crf", "35", "-b:v", "0", "-cpu-used", "5", "-deadline", "realtime", "-row-mt", "1", "-c:a", "libopus", "-b:a", "48k", "`"$outPath`"" -Wait -NoNewWindow -PassThru
}
Write-Host "ALL MEDIA CONVERTED SUCCESSFULLY"

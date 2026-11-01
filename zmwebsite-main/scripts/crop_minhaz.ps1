
Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\public\images\run_news_image\0Y3A8889.jpg"
if (-not (Test-Path $srcPath)) {
    $srcPath = Join-Path $PSScriptRoot "..\public\assets\images\0Y3A8889_orig.jpg"
}

if (Test-Path $srcPath) {
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $srcPath))
    Write-Host "Image Size: $($img.Width) x $($img.Height)"
    $wRatio = $img.Width / 6720
    $hRatio = $img.Height / 4480
    $x = [int](2550 * $wRatio)
    $y = [int](1150 * $hRatio)
    $w = [int](950 * $wRatio)
    $h = [int](950 * $hRatio)

    $cropRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $bmp = New-Object System.Drawing.Bitmap(600, 600)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle(0, 0, 600, 600)
    $g.DrawImage($img, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $img.Dispose()

    $outPath = Join-Path $PSScriptRoot "..\public\images\team\md-mahmudul-hasan-minhaz.webp"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Created $outPath"
}
else {
    Write-Host "Source image not found"
}

Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param (
        [string]$Path,
        [int]$MaxWidth = 1000,
        [long]$Quality = 80
    )

    if (-not (Test-Path $Path)) { return }

    $origFile = Get-Item $Path
    $origSize = $origFile.Length

    if ($origSize -lt 250KB) {
        return
    }

    try {
        $bytes = [System.IO.File]::ReadAllBytes($Path)
        $ms = New-Object System.IO.MemoryStream($bytes, 0, $bytes.Length)
        $img = [System.Drawing.Image]::FromStream($ms)

        $width = $img.Width
        $height = $img.Height

        if ($width -gt $MaxWidth) {
            $newHeight = [int](($MaxWidth / $width) * $height)
            $newWidth = $MaxWidth
        } else {
            $newWidth = $width
            $newHeight = $height
        }

        $destBmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $g = [System.Drawing.Graphics]::FromImage($destBmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $destRect = New-Object System.Drawing.Rectangle(0, 0, $newWidth, $newHeight)
        $g.DrawImage($img, $destRect)

        $encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
        $jpegEncoder = $encoders | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)

        $tempPath = $Path + ".tmp.jpg"
        $destBmp.Save($tempPath, $jpegEncoder, $encoderParams)

        $g.Dispose()
        $destBmp.Dispose()
        $img.Dispose()
        $ms.Dispose()

        Move-Item -Path $tempPath -Destination $Path -Force
        $newSize = (Get-Item $Path).Length
        $saving = [math]::Round(($origSize - $newSize) / 1MB, 2)
        Write-Host "[OK] $($origFile.Name): $([math]::Round($origSize/1MB, 2)) MB -> $([math]::Round($newSize/1KB, 1)) KB (Saved $saving MB)"
    } catch {
        Write-Warning "Failed to optimize ${Path} - $_"
    }
}

$allJpgs = Get-ChildItem -Path "public" -Recurse -Filter "*.jpg" | Where-Object { $_.Length -gt 300KB }
Write-Host "Found $($allJpgs.Count) files to optimize..."
foreach ($f in $allJpgs) {
    Optimize-Image -Path $f.FullName -MaxWidth 1000 -Quality 80
}

$allJpegs = Get-ChildItem -Path "public" -Recurse -Filter "*.jpeg" | Where-Object { $_.Length -gt 300KB }
foreach ($f in $allJpegs) {
    Optimize-Image -Path $f.FullName -MaxWidth 1000 -Quality 80
}

Write-Host "All large images optimized successfully!"

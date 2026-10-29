Add-Type -AssemblyName System.Drawing

$clientDir = "C:\Users\USER\Desktop\zm website\zmwebsite-main\zmwebsite-main\public\images\clients"
$files = Get-ChildItem -Path $clientDir -File

Write-Output "Processing $($files.Count) files in $clientDir..."

foreach ($file in $files) {
    $filePath = $file.FullName
    $ext = $file.Extension.ToLower()
    if ($ext -ne ".png" -and $ext -ne ".jpg" -and $ext -ne ".jpeg") {
        continue
    }

    $imgBytes = [System.IO.File]::ReadAllBytes($filePath)
    $ms = New-Object System.IO.MemoryStream(,$imgBytes)
    $bmp = [System.Drawing.Bitmap]::FromStream($ms)

    $width = $bmp.Width
    $height = $bmp.Height

    $minX = $width
    $minY = $height
    $maxX = 0
    $maxY = 0

    # Scan for content pixels (non-transparent AND non-white)
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            $p = $bmp.GetPixel($x, $y)
            $isTransparent = ($p.A -lt 30)
            $isWhite = ($p.R -gt 245 -and $p.G -gt 245 -and $p.B -gt 245)
            if (-not $isTransparent -and -not $isWhite) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    if ($maxX -ge $minX -and $maxY -ge $minY) {
        $cropW = $maxX - $minX + 1
        $cropH = $maxY - $minY + 1
        Write-Output "$($file.Name): Original ${width}x${height} -> BoundingBox ${cropW}x${cropH} at ($minX, $minY)"
        
        # Add a small 8px safety padding around content
        $pad = 8
        $newMinX = [Math]::Max(0, $minX - $pad)
        $newMinY = [Math]::Max(0, $minY - $pad)
        $newMaxX = [Math]::Min($width - 1, $maxX + $pad)
        $newMaxY = [Math]::Min($height - 1, $maxY + $pad)
        $finalW = $newMaxX - $newMinX + 1
        $finalH = $newMaxY - $newMinY + 1

        # Only crop if there was significant waste padding (e.g. at least 15% reduction)
        if ($finalW -lt ($width * 0.85) -or $finalH -lt ($height * 0.85)) {
            $croppedBmp = New-Object System.Drawing.Bitmap($finalW, $finalH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
            $g = [System.Drawing.Graphics]::FromImage($croppedBmp)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

            $srcRect = New-Object System.Drawing.Rectangle($newMinX, $newMinY, $finalW, $finalH)
            $destRect = New-Object System.Drawing.Rectangle(0, 0, $finalW, $finalH)
            $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
            $g.Dispose()

            # Close stream and write cropped image back
            $bmp.Dispose()
            $ms.Dispose()

            # Save as PNG
            $croppedBmp.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
            $croppedBmp.Dispose()
            Write-Output " -> CROPPED & SAVED: ${finalW}x${finalH}"
        } else {
            $bmp.Dispose()
            $ms.Dispose()
            Write-Output " -> Kept original (already tight)"
        }
    } else {
        $bmp.Dispose()
        $ms.Dispose()
        Write-Output "$($file.Name): No content detected or already plain."
    }
}

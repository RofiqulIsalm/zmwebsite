Add-Type -AssemblyName System.Drawing

$file = "C:\Users\USER\Desktop\zm website\zmwebsite-main\zmwebsite-main\public\images\clients\76c8c73aea67243fcc8b48418bdeb665.w734.h698.jpg"
$imgBytes = [System.IO.File]::ReadAllBytes($file)
$ms = New-Object System.IO.MemoryStream(,$imgBytes)
$bmp = [System.Drawing.Bitmap]::FromStream($ms)

$width = $bmp.Width
$height = $bmp.Height

$minX = $width
$minY = $height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # 6th Sense is black on white, so pixels with R < 220 are content
        if ($p.R -lt 220 -or $p.G -lt 220 -or $p.B -lt 220) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "6th Sense Content: $($maxX - $minX + 1)x$($maxY - $minY + 1) at ($minX, $minY) in ${width}x${height}"

$pad = 12
$newMinX = [Math]::Max(0, $minX - $pad)
$newMinY = [Math]::Max(0, $minY - $pad)
$newMaxX = [Math]::Min($width - 1, $maxX + $pad)
$newMaxY = [Math]::Min($height - 1, $maxY + $pad)
$finalW = $newMaxX - $newMinX + 1
$finalH = $newMaxY - $newMinY + 1

$croppedBmp = New-Object System.Drawing.Bitmap($finalW, $finalH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($croppedBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$srcRect = New-Object System.Drawing.Rectangle($newMinX, $newMinY, $finalW, $finalH)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $finalW, $finalH)
$g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$bmp.Dispose()
$ms.Dispose()

# Save cropped as PNG and replace or update
$pngFile = "C:\Users\USER\Desktop\zm website\zmwebsite-main\zmwebsite-main\public\images\clients\6th-sense.png"
$croppedBmp.Save($pngFile, [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Dispose()
Write-Output "Saved 6th Sense cropped to: $pngFile (${finalW}x${finalH})"

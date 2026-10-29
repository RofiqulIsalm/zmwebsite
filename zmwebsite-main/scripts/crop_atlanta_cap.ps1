Add-Type -AssemblyName System.Drawing

$file = "C:\Users\USER\Desktop\zm website\zmwebsite-main\zmwebsite-main\public\images\clients\ATLANTA CAP.png"
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

$pad = 10
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

$croppedBmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Dispose()
Write-Output "Cropped Atlanta Cap to: ${finalW}x${finalH}"

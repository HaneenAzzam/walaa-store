# Crops the two supplied source images (source\hero.png, source\editorial-art.png)
# into the JPEG assets the site uses. Re-run after replacing a source image.
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root 'source'
$out = Join-Path $root 'public\assets'
New-Item -ItemType Directory -Force $out | Out-Null

$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]84)

function Save-Crop($img, $name, $x, $y, $w, $h, $outW) {
  $outH = [int][math]::Round($outW * $h / $w)
  $bmp = New-Object System.Drawing.Bitmap $outW, $outH
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $dest = New-Object System.Drawing.Rectangle 0, 0, $outW, $outH
  $from = New-Object System.Drawing.Rectangle $x, $y, $w, $h
  $g.DrawImage($img, $dest, $from, [System.Drawing.GraphicsUnit]::Pixel)
  $bmp.Save((Join-Path $out "$name.jpg"), $jpeg, $ep)
  $g.Dispose(); $bmp.Dispose()
}

$hero = [System.Drawing.Image]::FromFile((Join-Path $src 'hero.png'))     # 1536 x 1024
$art = [System.Drawing.Image]::FromFile((Join-Path $src 'editorial-art.png')) # 1254 x 1254, 2x2 sheet

# hero.png: brass bowl, mallet, dried flowers, linen
Save-Crop $hero 'hero'         0 0 1536 1024 1536
Save-Crop $hero 'entry-bowl'   800 399 500 625 500
Save-Crop $hero 'about-main'   0 60 1000 964 1000
Save-Crop $hero 'event-side'   916 249 620 775 620
Save-Crop $hero 'cov-bowl'     230 300 700 700 600

# editorial-art.png quadrants: iris (0,0) olive (627,0) arch (0,627) journal (627,627)
Save-Crop $art 'entry-olive'   700 0 502 627 502
Save-Crop $art 'entry-journal' 720 627 502 627 502
Save-Crop $art 'entry-arch'    60 627 502 627 502
Save-Crop $art 'private'       100 0 502 627 502
Save-Crop $art 'writing'       627 670 627 470 627
Save-Crop $art 'research'      627 130 627 392 627
Save-Crop $art 'cov-iris'      0 0 627 627 600
Save-Crop $art 'cov-olive'     627 0 627 627 600
Save-Crop $art 'cov-arch'      0 627 627 627 600
Save-Crop $art 'cov-journal'   627 627 627 627 600

$hero.Dispose(); $art.Dispose()
Get-ChildItem $out -Filter *.jpg | ForEach-Object { '{0,-18} {1,6} KB' -f $_.Name, [math]::Round($_.Length / 1KB) }

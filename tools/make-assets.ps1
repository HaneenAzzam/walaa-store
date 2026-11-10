# Crops Walaa's photos (Google Drive folder «صور للموقع»:
# https://drive.google.com/drive/folders/1yjpKNC8D491ImqNbCShN9iYDkFo4NAx1) into public\assets.
# The originals are not kept in the repo (about 36 MB). Download the folder, then:
#   powershell -ExecutionPolicy Bypass -File tools\make-assets.ps1 -In "<downloaded folder>"
# Files are expected with these names: 14.png, Post1-3.png, P1062687/94/96/703/724/769.jpg ("Copy of " prefix removed).
# The banner (hero-hand.webp) is not touched.
param($In = (Join-Path (Split-Path $PSScriptRoot -Parent) 'source\drive'), $Out = (Join-Path (Split-Path $PSScriptRoot -Parent) 'public\assets'))
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $Out | Out-Null
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

# name, source, x, y, w, h, outW
$jobs = @(
  @('about-main',     'P1062687.jpg',    0,  500, 1584, 1980,  800),
  @('about-2',        'Post2.png',       0,  420, 3375, 3375,  600),
  @('about-3',        'Post3.png',       0,  250, 3240, 3240,  600),
  @('need-bg',        'P1062769.jpg',    0,    0, 2816, 1584, 1600),
  @('need-private',   'P1062703.jpg',    0,  700, 1584, 1980,  640),
  @('event-left',     'P1062694.jpg',    0,  450, 1584, 1980,  600),
  @('event-right',    'P1062724.jpg',    0,  450, 1584, 1980,  600),
  @('cover-1',        'Post1.png',       0,  300, 3375, 3375,  600),
  @('cover-2',        'P1062687.jpg',    0,  850, 1584, 1584,  600),
  @('cover-3',        '14.png',          0,  844, 3375, 3375,  600),
  @('cover-4',        'P1062696.jpg',    0,  850, 1584, 1584,  600),
  @('cover-5',        'Post2.png',       0,  420, 3375, 3375,  600),
  @('cover-group',    'Post3.png',       0,  250, 3240, 3240,  600),
  @('cover-private-1','P1062703.jpg',    0,  750, 1584, 1584,  600),
  @('cover-private-2','P1062724.jpg',    0,  650, 1584, 1584,  600),
  @('cover-journal',  'P1062769.jpg',  950,    0, 1584, 1584,  600)
)

$cache = @{}
function Get-Upright($name) {
  if (-not $cache[$name]) {
    $im = [System.Drawing.Image]::FromFile((Join-Path $In $name))
    if ($im.PropertyIdList -contains 0x0112) {
      switch ($im.GetPropertyItem(0x0112).Value[0]) { 3 { $im.RotateFlip('Rotate180FlipNone') } 6 { $im.RotateFlip('Rotate90FlipNone') } 8 { $im.RotateFlip('Rotate270FlipNone') } }
    }
    $cache[$name] = $im
  }
  $cache[$name]
}

foreach ($j in $jobs) {
  $name, $src, $x, $y, $w, $h, $outW = $j
  $im = Get-Upright $src
  $outH = [int][math]::Round($outW * $h / $w)
  $bmp = New-Object System.Drawing.Bitmap $outW, $outH
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($im, (New-Object System.Drawing.Rectangle 0, 0, $outW, $outH), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), 'Pixel')
  $file = Join-Path $Out "$name.jpg"
  $bmp.Save($file, $jpeg, $ep)
  '{0,-16} {1}x{2} {3,4} KB' -f $name, $outW, $outH, [math]::Round((Get-Item $file).Length / 1KB)
  $g.Dispose(); $bmp.Dispose()
}
$cache.Values | ForEach-Object { $_.Dispose() }

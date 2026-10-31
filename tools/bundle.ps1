# Builds walaa-store-preview.html in the project root: one standalone file (CSS, JS, data and images inlined)
# that opens by double-click in any browser or can be sent to the client. Re-run after editing anything in public\.
# Fonts still load from Google Fonts, so the preview needs an internet connection for them.
$project = Split-Path $PSScriptRoot -Parent
$dist = Join-Path $project 'public'
$out = Join-Path $project 'walaa-store-preview.html'
$enc = New-Object System.Text.UTF8Encoding($false)
$read = { param($n) [IO.File]::ReadAllText((Join-Path $dist $n), $enc) }

$html = & $read 'index.html'
$css = (& $read 'theme.css') + "`n" + (& $read 'redesign.css')
$data = & $read 'data.js'
$app = & $read 'app.js'

# app.js asks for images by name through window.ASSET_MAP, so each image is embedded once
$pairs = Get-ChildItem (Join-Path $dist 'assets') -Filter *.jpg | Sort-Object Name | ForEach-Object {
  '"' + $_.BaseName + '":"data:image/jpeg;base64,' + [Convert]::ToBase64String([IO.File]::ReadAllBytes($_.FullName)) + '"'
}
$assetMap = 'window.ASSET_MAP={' + ($pairs -join ',') + '};'

$html = $html.Replace('<link rel="stylesheet" href="redesign.css">', '').Replace('<link rel="stylesheet" href="theme.css">', "<style>`n$css`n</style>")
$html = $html.Replace('<script src="data.js"></script>', "<script>`n$assetMap`n$data`n</script>")
$html = $html.Replace('<script src="app.js" defer></script>', '')
$html = $html.Replace('</body>', "<script>`n$app`n</script>`n</body>")
[IO.File]::WriteAllText($out, $html, $enc)
"Built $out ($([math]::Round((Get-Item $out).Length / 1MB, 1)) MB)"

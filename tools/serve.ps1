# Minimal static server for previewing public\ without Node:  powershell -ExecutionPolicy Bypass -File tools\serve.ps1
# Then open http://127.0.0.1:4174
$root = Join-Path (Split-Path $PSScriptRoot -Parent) 'public'
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.jpg'='image/jpeg'; '.png'='image/png'; '.webp'='image/webp'; '.svg'='image/svg+xml'; '.woff2'='font/woff2' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add('http://127.0.0.1:4174/')
$l.Start()
Write-Host 'Local: http://127.0.0.1:4174'
while ($l.IsListening) {
  $ctx = $l.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
  if ($path -eq '/') { $path = '/index.html' }
  $file = [IO.Path]::GetFullPath((Join-Path $root $path.TrimStart('/')))
  $res = $ctx.Response
  $res.Headers.Add('Cache-Control', 'no-cache')
  if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($file)
    $ext = [IO.Path]::GetExtension($file)
    $res.ContentType = if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' }
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else { $res.StatusCode = 404 }
  $res.Close()
}

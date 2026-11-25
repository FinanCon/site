Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$distDir = (Resolve-Path ".\dist").Path.TrimEnd('\', '/')
$zipPath = Join-Path (Get-Location) "financon-deploy.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zipStream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $distDir -Recurse -File -Force

foreach ($file in $files) {
    # Calculate relative path and FORCE POSIX forward slashes (/) for Linux/Hostinger compatibility
    $relPath = $file.FullName.Substring($distDir.Length + 1).Replace('\', '/')
    $entry = $archive.CreateEntry($relPath, [System.IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    $fileStream = [System.IO.File]::OpenRead($file.FullName)
    $fileStream.CopyTo($entryStream)
    $fileStream.Close()
    $entryStream.Close()
}

$archive.Dispose()
$zipStream.Close()

# Verify all entries inside the ZIP to ensure zero backslashes (\)
$readZip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
Write-Output "=== ARQUIVOS DENTRO DE financon-deploy.zip ==="
$hasBackslash = $false
foreach ($e in $readZip.Entries) {
    Write-Output (" - " + $e.FullName + " (" + $e.Length + " bytes)")
    if ($e.FullName.Contains('\')) {
        $hasBackslash = $true
    }
}
$readZip.Dispose()

if ($hasBackslash) {
    Write-Error "ERRO: Foi encontrada barra invertida (\) em entradas do ZIP!"
    exit 1
} else {
    Write-Output "VERIFICACAO_POSIX_OK: 0 barras invertidas (\) encontradas. 100% compativel com Linux/Hostinger."
}

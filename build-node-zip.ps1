Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectDir = (Get-Location).Path.TrimEnd('\', '/')
$zipPath = Join-Path $projectDir "financon-nodejs-hostinger.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zipStream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

# Grab git-tracked files so node_modules, dist, .git, and raw briefing folders are excluded
$gitFiles = git ls-files

foreach ($relPath in $gitFiles) {
    # Ensure POSIX forward slashes
    $posixPath = $relPath.Replace('\', '/')
    # Skip build-zip scripts
    if ($posixPath -like "*.ps1") { continue }
    
    $fullPath = Join-Path $projectDir $relPath
    if (Test-Path $fullPath) {
        $entry = $archive.CreateEntry($posixPath, [System.IO.Compression.CompressionLevel]::Optimal)
        $entryStream = $entry.Open()
        $fileStream = [System.IO.File]::OpenRead($fullPath)
        $fileStream.CopyTo($entryStream)
        $fileStream.Close()
        $entryStream.Close()
    }
}

$archive.Dispose()
$zipStream.Close()

$readZip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
Write-Output "=== ARQUIVOS DENTRO DE financon-nodejs-hostinger.zip ==="
foreach ($e in $readZip.Entries) {
    Write-Output (" - " + $e.FullName + " (" + $e.Length + " bytes)")
}
$readZip.Dispose()
Write-Output "NODEJS_SOURCE_ZIP_OK"

$files = Get-ChildItem -Path . -Recurse -Include *.html,*.css,*.js
foreach ($file in $files) {
    if ($file.Name -match "^replace") { continue }
    
    $content = Get-Content -Path $file.FullName -Raw
    $newContent = $content -replace "href='/", "href='"
    $newContent = $newContent -replace "src='/", "src='"
    
    if ($content -cne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Updated $($file.FullName)"
    }
}
Write-Host "Done"

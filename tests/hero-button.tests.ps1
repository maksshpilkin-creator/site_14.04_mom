$ErrorActionPreference = "Stop"

$stylesPath = Join-Path $PSScriptRoot "..\assets\css\styles.css"
$styles = Get-Content -Raw -Encoding utf8 -LiteralPath $stylesPath
$selectorPattern = '(?s)\.hero\.hero--split \.btn-secondary\s*\{(?<rules>[^}]*)\}'
$match = [regex]::Match($styles, $selectorPattern)

if (-not $match.Success) {
  throw "Hero secondary button selector was not found."
}

$rules = $match.Groups["rules"].Value

if ($rules -notmatch 'align-items\s*:\s*center\s*;') {
  throw "Hero secondary button content is not vertically centered."
}

if ($rules -notmatch 'text-align\s*:\s*center\s*;') {
  throw "Hero secondary button text is not horizontally centered."
}

Write-Host "Hero secondary button text is centered."

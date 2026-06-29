$ErrorActionPreference = "Stop"

$stylesPath = Join-Path $PSScriptRoot "..\assets\css\styles.css"
$styles = Get-Content -Raw -Encoding utf8 -LiteralPath $stylesPath

$requiredRules = @(
  'aspect-ratio\s*:\s*656\s*/\s*1280\s*;',
  'object-fit\s*:\s*contain\s*;',
  '(?s)@media\s*\(max-width:\s*899px\).*body\[data-page="home"\]\s+\.hero\.hero--split\s+\.hero-visual\s*\{[^}]*display\s*:\s*flex\s*;'
)

foreach ($rule in $requiredRules) {
  if ($styles -notmatch $rule) {
    throw "Missing responsive hero portrait rule: $rule"
  }
}

Write-Host "Hero portrait preserves its ratio and remains visible on small screens."

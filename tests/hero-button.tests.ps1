$ErrorActionPreference = "Stop"

$stylesPath = Join-Path $PSScriptRoot "..\assets\css\styles.css"
$homepagePath = Join-Path $PSScriptRoot "..\index.html"
$styles = Get-Content -Raw -Encoding utf8 -LiteralPath $stylesPath
$homepageHtml = Get-Content -Raw -Encoding utf8 -LiteralPath $homepagePath
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

$heroActionsMatch = [regex]::Match($homepageHtml, '(?s)<div class="hero-actions">(?<content>.*?)</div>')
if (-not $heroActionsMatch.Success) {
  throw "Hero actions block was not found."
}

$heroLinks = [regex]::Matches($heroActionsMatch.Groups["content"].Value, '<a\s')
if ($heroLinks.Count -ne 1) {
  throw "Expected one primary hero CTA, found $($heroLinks.Count)."
}

if ($heroActionsMatch.Groups["content"].Value -notmatch 'class="btn"\s+href="#hero-quiz"') {
  throw "Primary hero CTA is missing."
}

if ($heroActionsMatch.Groups["content"].Value -match 'class="btn-secondary"') {
  throw "Duplicate hero CTA is still present."
}

Write-Host "Homepage hero contains one primary CTA."

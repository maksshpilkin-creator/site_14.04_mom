$ErrorActionPreference = "Stop"

$stylesPath = Join-Path $PSScriptRoot "..\assets\css\styles.css"
$styles = Get-Content -Raw -Encoding utf8 -LiteralPath $stylesPath

$unusedSelectors = @(
  ".hero-trust",
  ".hero-trust__label",
  ".hero-trust__logos",
  ".hero-trust__more",
  ".quiz-result-grid--spaced",
  ".quiz-result-hidden",
  ".quiz-result-visible",
  ".step-number",
  ".review-photo-download",
  ".footer-note",
  ".service-offer-card__docs"
)

$remaining = $unusedSelectors | Where-Object { $styles.Contains($_) }

if ($remaining) {
  throw "Unused CSS selectors remain:`n$($remaining -join "`n")"
}

$fieldSelector = @"
.field input,
.field select,
.field textarea {
"@

$fieldSelectorCount = ([regex]::Matches($styles, [regex]::Escape($fieldSelector))).Count

if ($fieldSelectorCount -ne 1) {
  throw "Expected one shared field selector block, found $fieldSelectorCount."
}

Write-Host "Dead CSS rules are absent and the shared field selector is consolidated."

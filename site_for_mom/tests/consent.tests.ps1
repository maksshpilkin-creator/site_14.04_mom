$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

function Assert-Matches {
  param(
    [string]$Text,
    [string]$Pattern,
    [string]$Message
  )

  if ($Text -notmatch $Pattern) {
    throw "Assertion failed: $Message (pattern: $Pattern)"
  }
}

function Assert-DoesNotMatch {
  param(
    [string]$Text,
    [string]$Pattern,
    [string]$Message
  )

  if ($Text -match $Pattern) {
    throw "Assertion failed: $Message (pattern: $Pattern)"
  }
}

$formPages = @(
  "index.html",
  "contacts/index.html",
  "services/business-valuation/index.html",
  "services/commercial-property/index.html",
  "services/court-valuation/index.html",
  "services/damage-valuation/index.html",
  "services/equipment-transport/index.html",
  "services/notary-inheritance/index.html",
  "services/real-estate/index.html"
)

$formCount = 0
foreach ($page in $formPages) {
  $html = Get-Content -Raw -Encoding utf8 (Join-Path $root $page)
  $forms = [regex]::Matches($html, '<form\b[^>]*data-lead-form[\s\S]*?</form>')
  $formCount += $forms.Count

  foreach ($formMatch in $forms) {
    $form = $formMatch.Value
    Assert-Matches $form 'name="personalDataConsent"[\s\S]*?required' "${page}: required personal-data consent is missing"
    Assert-Matches $form 'href="/personal-data-consent"' "${page}: personal-data consent link is missing"
    Assert-Matches $form 'href="/privacy-policy"' "${page}: privacy-policy link is missing"
    Assert-Matches $form 'name="marketingConsent"' "${page}: optional marketing consent is missing"
    Assert-DoesNotMatch $form 'name="marketingConsent"[\s\S]{0,120}\brequired\b' "${page}: marketing consent must remain optional"
    Assert-Matches $form 'href="/marketing-consent"' "${page}: marketing-consent link is missing"
  }
}

if ($formCount -ne 10) {
  throw "Expected 10 lead forms, found $formCount"
}

$script = Get-Content -Raw -Encoding utf8 (Join-Path $root "assets/js/site.js")
Assert-Matches $script 'form\.noValidate\s*=\s*true' "Custom consent validation must bypass native browser messages"
Assert-Matches $script 'personalDataConsent\s*=\s*Boolean' "Payload must include personalDataConsent boolean"
Assert-Matches $script 'marketingConsent\s*=\s*Boolean' "Payload must include marketingConsent boolean"
Assert-Matches $script 'consentTimestamp\s*=\s*new Date\(\)\.toISOString\(\)' "Payload must include consentTimestamp"
Assert-Matches $script 'consentSource\s*=\s*window\.location\.href' "Payload must include consentSource"
Assert-Matches $script 'privacyPolicy:\s*"/privacy-policy"' "Payload must identify privacy policy"
Assert-Matches $script 'personalDataConsent:\s*"/personal-data-consent"' "Payload must identify personal-data consent"
Assert-Matches $script 'marketingConsent:\s*"/marketing-consent"' "Payload must identify marketing consent"

foreach ($page in @(
  "privacy-policy/index.html",
  "personal-data-consent/index.html",
  "marketing-consent/index.html"
)) {
  $html = Get-Content -Raw -Encoding utf8 (Join-Path $root $page)
  Assert-Matches $html 'TODO: replace legal placeholders before publication' "${page}: placeholder TODO is missing"
  Assert-Matches $html '\[OPERATOR_NAME\]' "${page}: operator placeholder is missing"
  Assert-Matches $html '\[CONTACT_EMAIL\]' "${page}: contact placeholder is missing"
  Assert-Matches $html '\[WEBSITE_DOMAIN\]' "${page}: domain placeholder is missing"
}

Write-Output "Consent checks passed for $formCount lead forms and 3 legal pages."

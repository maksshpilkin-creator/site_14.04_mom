$ErrorActionPreference = "Stop"

$siteScriptPath = Join-Path $PSScriptRoot "..\assets\js\site.js"
$siteScript = Get-Content -Raw -Encoding utf8 -LiteralPath $siteScriptPath

if ($siteScript -notmatch 'email:\s*"akn@ocenka-group\.ru"') {
  throw "Footer email is not configured as akn@ocenka-group.ru."
}

if ($siteScript.Contains('info@ocenka-group.ru')) {
  throw "Old footer email is still present in the shared site script."
}

Write-Host "Shared footer email is correct."

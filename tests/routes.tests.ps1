$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:3000"
$routes = @(
  "/services/",
  "/services/real-estate/",
  "/services/business-valuation/",
  "/services/commercial-property/",
  "/services/court-valuation/",
  "/services/damage-valuation/",
  "/reviews/",
  "/personal-data-consent",
  "/privacy-policy",
  "/privacy/",
  "/terms/",
  "/review/11234824.jpg",
  "/review/45093367.jpg",
  "/review/9122550.jpg",
  "/review/11360531.jpg",
  "/review/11234891_1150_q60.png",
  "/review/17650571.jpg",
  "/team/2.png",
  "/team/3.jpg",
  "/team/4.jpg",
  "/team/5.jpg"
)

$failures = foreach ($route in $routes) {
  try {
    $response = Invoke-WebRequest -Uri "$baseUrl$route" -UseBasicParsing -ErrorAction Stop
    if ([int]$response.StatusCode -ne 200) {
      "$route returned $([int]$response.StatusCode)"
    }
  }
  catch {
    $status = if ($_.Exception.Response) {
      [int]$_.Exception.Response.StatusCode.value__
    }
    else {
      "request error"
    }

    "$route returned $status"
  }
}

if ($failures) {
  throw "Broken site routes:`n$($failures -join "`n")"
}

Write-Host "All $($routes.Count) site routes returned HTTP 200."

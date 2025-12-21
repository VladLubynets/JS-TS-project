param(
    [string]$ApiKey = $env:RP_API_KEY
)

if (-not $ApiKey) {
    $ApiKey = "super_cLMJTpatQgK8-T_TzvCt1qt0nE_CNMthDvRbWzPvwJO6w4JYpfcIFeRbfpeRsES-"
}

$ErrorActionPreference = "Stop"

Write-Host "Running tests..." -ForegroundColor Cyan
$env:JEST_JUNIT = "true"
& npm test -- --watchAll=false --runInBand

if ($LASTEXITCODE -ne 0) {
    Write-Host "Tests failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Tests passed! Importing to ReportPortal..." -ForegroundColor Green

& curl.exe -s -X POST "http://localhost:8080/api/v1/superadmin_personal/launch/import" `
    -H "Authorization: Bearer $ApiKey" `
    -F "file=@test-results/junit.xml;type=application/xml"

Write-Host "`nDone! Check results at: http://localhost:8080" -ForegroundColor Green

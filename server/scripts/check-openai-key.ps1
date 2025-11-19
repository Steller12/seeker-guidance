<#
Simple PowerShell script to verify OPENAI_API_KEY.
Usage:
  cd server
  .\scripts\check-openai-key.ps1
#>

try {
  $envFile = Join-Path (Get-Location) '.env'
  if (Test-Path $envFile) {
    Get-Content $envFile | Where-Object { $_ -match 'OPENAI_API_KEY' } | ForEach-Object {
      $val = ($_ -replace 'OPENAI_API_KEY\s*=\s*','').Trim()
      if ($val) { [Environment]::SetEnvironmentVariable('OPENAI_API_KEY',$val) }
    }
  }

  if (-not $env:OPENAI_API_KEY -or $env:OPENAI_API_KEY -eq '') {
    Write-Host 'OPENAI_API_KEY is not set in environment or .env' -ForegroundColor Yellow
    exit 2
  }

  Write-Host 'Testing OpenAI key by calling /v1/models...' -ForegroundColor Cyan
  $resp = Invoke-RestMethod -Uri 'https://api.openai.com/v1/models' -Headers @{ Authorization = "Bearer $env:OPENAI_API_KEY" } -Method Get -ErrorAction Stop
  Write-Host 'Success: OpenAI key is valid. Sample models:' -ForegroundColor Green
  $resp.data | Select-Object -First 5 | Format-Table -AutoSize
} catch {
  Write-Host 'OpenAI API request failed:' -ForegroundColor Red
  Write-Host $_.Exception.Message
  exit 1
}

<#
PowerShell helper to create a GitHub repo (requires `gh` CLI) and push the current folder.
Usage:
  1. Install Git and GitHub CLI `gh` and authenticate with `gh auth login`.
  2. Run this script from the repo root: `.	ools\create_github_repo.ps1 -Name "repo-name" -Private:$false`
#>

param(
  [string]$Name = (Split-Path -Leaf (Get-Location)),
  [switch]$Private
)

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI 'gh' not found. Install from https://cli.github.com/ and run 'gh auth login' first."
  exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git not found. Install Git and try again."
  exit 1
}

Write-Host "Creating GitHub repo '$Name' (Private: $($Private.IsPresent)) and pushing current folder..."

# Initialize git if needed
if (-not (Test-Path .git)) {
  git init
  git add --all
  git commit -m "chore: initial commit"
}

$visibility = if ($Private.IsPresent) { 'private' } else { 'public' }

# Use gh to create repo and push
gh repo create $Name --$visibility --source . --remote origin --push

if ($LASTEXITCODE -ne 0) {
  Write-Error "gh repo create failed. Check 'gh' output above."
  exit 1
}

Write-Host "Repository created and pushed. Remote 'origin' set."

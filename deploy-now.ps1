# Deploy Now - Quick GitHub Deployment
# Run this script to deploy your website

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [string]$RepoName = "us-china-milk-comparison"
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Deployment Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check directory
if (-not (Test-Path "index.html")) {
    Write-Host "Error: Please run this script from milk-comparison directory" -ForegroundColor Red
    exit 1
}

# Ensure all files are committed
Write-Host "Checking Git status..." -ForegroundColor Yellow
git add .
$status = git status --porcelain
if ($status) {
    git commit -m "Update: Prepare for deployment"
    Write-Host "Files committed" -ForegroundColor Green
}

# Configure remote
$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"
$remoteExists = git remote | Select-String -Pattern "origin"

if ($remoteExists) {
    git remote set-url origin $repoUrl
    Write-Host "Remote updated" -ForegroundColor Green
} else {
    git remote add origin $repoUrl
    Write-Host "Remote added" -ForegroundColor Green
}

Write-Host ""
Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
Write-Host ""

# Open GitHub to create repo
Write-Host "Opening GitHub to create repository..." -ForegroundColor Yellow
Write-Host "Please create the repository with name: $RepoName" -ForegroundColor Yellow
Start-Process "https://github.com/new"

Write-Host ""
Write-Host "Press any key after creating the repository..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  SUCCESS! Code pushed to GitHub" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/$GitHubUsername/$RepoName/settings/pages" -ForegroundColor White
    Write-Host "2. Select: Deploy from a branch" -ForegroundColor White
    Write-Host "3. Branch: main, Folder: / (root)" -ForegroundColor White
    Write-Host "4. Click Save" -ForegroundColor White
    Write-Host ""
    Write-Host "Your site will be available at:" -ForegroundColor Cyan
    Write-Host "https://$GitHubUsername.github.io/$RepoName/" -ForegroundColor Green
    Write-Host ""
    
    # Open settings page
    Start-Process "https://github.com/$GitHubUsername/$RepoName/settings/pages"
} else {
    Write-Host ""
    Write-Host "Push failed. Please check:" -ForegroundColor Red
    Write-Host "1. Repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "2. You have access token configured" -ForegroundColor Yellow
    Write-Host "3. Repository name is correct" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

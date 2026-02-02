# GitHub部署脚本
# 使用方法：在PowerShell中运行此脚本

Write-Host "🚀 GitHub部署脚本" -ForegroundColor Green
Write-Host ""

# 检查是否在正确的目录
if (-not (Test-Path "index.html")) {
    Write-Host "❌ 错误：请在milk-comparison目录中运行此脚本" -ForegroundColor Red
    exit 1
}

# 检查Git是否初始化
if (-not (Test-Path ".git")) {
    Write-Host "📦 初始化Git仓库..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# 检查是否有未提交的更改
$status = git status --porcelain
if ($status) {
    Write-Host "📝 添加文件到Git..." -ForegroundColor Yellow
    git add .
    
    Write-Host "💾 提交更改..." -ForegroundColor Yellow
    git commit -m "Initial commit: 创建交互式牛奶对比科普网站"
} else {
    Write-Host "✅ 所有文件已提交" -ForegroundColor Green
}

# 获取GitHub用户名和仓库名
Write-Host ""
Write-Host "请提供以下信息：" -ForegroundColor Cyan
$githubUsername = Read-Host "GitHub用户名"
$repoName = Read-Host "仓库名称（例如：us-china-milk-comparison）"

if ([string]::IsNullOrWhiteSpace($githubUsername) -or [string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "❌ 错误：用户名和仓库名不能为空" -ForegroundColor Red
    exit 1
}

# 检查远程仓库是否已存在
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    Write-Host "⚠️  远程仓库已存在，更新URL..." -ForegroundColor Yellow
    git remote set-url origin "https://github.com/$githubUsername/$repoName.git"
} else {
    Write-Host "🔗 添加远程仓库..." -ForegroundColor Yellow
    git remote add origin "https://github.com/$githubUsername/$repoName.git"
}

Write-Host ""
Write-Host "📤 准备推送到GitHub..." -ForegroundColor Yellow
Write-Host "仓库URL: https://github.com/$githubUsername/$repoName.git" -ForegroundColor Cyan
Write-Host ""

# 确认
$confirm = Read-Host "是否现在推送？(Y/N)"
if ($confirm -eq "Y" -or $confirm -eq "y") {
    Write-Host "🚀 推送到GitHub..." -ForegroundColor Green
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ 推送成功！" -ForegroundColor Green
        Write-Host ""
        Write-Host "下一步：" -ForegroundColor Cyan
        Write-Host "1. 访问 https://github.com/$githubUsername/$repoName" -ForegroundColor White
        Write-Host "2. 点击 Settings → Pages" -ForegroundColor White
        Write-Host "3. 选择 Source: Deploy from a branch" -ForegroundColor White
        Write-Host "4. 选择 Branch: main, Folder: / (root)" -ForegroundColor White
        Write-Host "5. 点击 Save" -ForegroundColor White
        Write-Host ""
        Write-Host "你的网站将在以下地址可用：" -ForegroundColor Cyan
        Write-Host "https://$githubUsername.github.io/$repoName/" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ 推送失败" -ForegroundColor Red
        Write-Host "可能的原因：" -ForegroundColor Yellow
        Write-Host "1. GitHub仓库尚未创建，请先访问 https://github.com/new 创建仓库" -ForegroundColor White
        Write-Host "2. 认证失败，需要使用Personal Access Token" -ForegroundColor White
        Write-Host "3. 网络连接问题" -ForegroundColor White
    }
} else {
    Write-Host "已取消推送" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "手动推送命令：" -ForegroundColor Cyan
    Write-Host "git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

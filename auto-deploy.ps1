# 自动化GitHub部署脚本
# 此脚本将引导你完成GitHub部署的每一步

param(
    [string]$GitHubUsername = "",
    [string]$RepoName = "us-china-milk-comparison"
)

Write-Host ""
Write-Host "🚀 GitHub自动部署脚本" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# 检查是否在正确的目录
if (-not (Test-Path "index.html")) {
    Write-Host "❌ 错误：请在milk-comparison目录中运行此脚本" -ForegroundColor Red
    exit 1
}

# 检查Git状态
Write-Host "📦 检查Git仓库状态..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
$hasCommits = git log --oneline -1 2>$null

if (-not $hasCommits) {
    Write-Host "⚠️  还没有提交，正在提交文件..." -ForegroundColor Yellow
    git add .
    git commit -m "Initial commit: 交互式牛奶对比科普网站"
    Write-Host "✅ 文件已提交" -ForegroundColor Green
}

# 获取GitHub用户名
if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
    Write-Host ""
    Write-Host "请输入你的GitHub用户名：" -ForegroundColor Cyan
    $GitHubUsername = Read-Host
}

if ([string]::IsNullOrWhiteSpace($GitHubUsername)) {
    Write-Host "❌ 错误：GitHub用户名不能为空" -ForegroundColor Red
    exit 1
}

# 确认仓库名
Write-Host ""
Write-Host "仓库名称（直接回车使用默认名称：$RepoName）：" -ForegroundColor Cyan
$inputRepoName = Read-Host
if (-not [string]::IsNullOrWhiteSpace($inputRepoName)) {
    $RepoName = $inputRepoName
}

$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"
$pagesUrl = "https://$GitHubUsername.github.io/$RepoName/"

Write-Host ""
Write-Host "📋 部署信息：" -ForegroundColor Cyan
Write-Host "  GitHub用户名: $GitHubUsername" -ForegroundColor White
Write-Host "  仓库名称: $RepoName" -ForegroundColor White
Write-Host "  仓库URL: $repoUrl" -ForegroundColor White
Write-Host "  网站URL: $pagesUrl" -ForegroundColor White
Write-Host ""

# 检查远程仓库
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    $currentRemote = git remote get-url origin 2>$null
    if ($currentRemote -ne $repoUrl) {
        Write-Host "⚠️  远程仓库已存在，但URL不同" -ForegroundColor Yellow
        Write-Host "  当前: $currentRemote" -ForegroundColor White
        Write-Host "  新URL: $repoUrl" -ForegroundColor White
        $update = Read-Host "是否更新？(Y/N)"
        if ($update -eq "Y" -or $update -eq "y") {
            git remote set-url origin $repoUrl
            Write-Host "✅ 远程仓库URL已更新" -ForegroundColor Green
        }
    } else {
        Write-Host "✅ 远程仓库已配置" -ForegroundColor Green
    }
} else {
    Write-Host "🔗 添加远程仓库..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "✅ 远程仓库已添加" -ForegroundColor Green
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "⚠️  重要：在继续之前，请确保：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 你已经在GitHub上创建了仓库：$RepoName" -ForegroundColor White
Write-Host "   如果没有，请访问：https://github.com/new" -ForegroundColor White
Write-Host ""
Write-Host "2. 你已经准备好GitHub认证" -ForegroundColor White
Write-Host "   - 如果使用HTTPS，需要Personal Access Token" -ForegroundColor White
Write-Host "   - 如果使用SSH，需要配置SSH密钥" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

$ready = Read-Host "是否已准备好？(Y/N)"
if ($ready -ne "Y" -and $ready -ne "y") {
    Write-Host ""
    Write-Host "请先完成准备工作，然后重新运行此脚本" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "创建仓库链接：https://github.com/new" -ForegroundColor Cyan
    Write-Host "创建Token链接：https://github.com/settings/tokens" -ForegroundColor Cyan
    exit 0
}

# 推送代码
Write-Host ""
Write-Host "📤 正在推送到GitHub..." -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main 2>&1 | Tee-Object -Variable pushOutput
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ 推送成功！" -ForegroundColor Green
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "🎉 代码已成功推送到GitHub！" -ForegroundColor Green
        Write-Host ""
        Write-Host "下一步：启用GitHub Pages" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. 访问仓库：$repoUrl" -ForegroundColor White
        Write-Host "2. 点击 'Settings' 标签" -ForegroundColor White
        Write-Host "3. 在左侧菜单找到 'Pages'" -ForegroundColor White
        Write-Host "4. 设置：" -ForegroundColor White
        Write-Host "   - Source: Deploy from a branch" -ForegroundColor White
        Write-Host "   - Branch: main" -ForegroundColor White
        Write-Host "   - Folder: / (root)" -ForegroundColor White
        Write-Host "5. 点击 'Save'" -ForegroundColor White
        Write-Host ""
        Write-Host "等待2-3分钟后，你的网站将在以下地址可用：" -ForegroundColor Cyan
        Write-Host "$pagesUrl" -ForegroundColor Green -BackgroundColor Black
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "❌ 推送失败" -ForegroundColor Red
        Write-Host ""
        Write-Host "可能的原因：" -ForegroundColor Yellow
        Write-Host "1. GitHub仓库尚未创建" -ForegroundColor White
        Write-Host "   请先访问 https://github.com/new 创建仓库" -ForegroundColor White
        Write-Host ""
        Write-Host "2. 认证失败" -ForegroundColor White
        Write-Host "   需要创建Personal Access Token：" -ForegroundColor White
        Write-Host "   https://github.com/settings/tokens" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "3. 仓库名称或用户名错误" -ForegroundColor White
        Write-Host ""
        Write-Host "推送输出：" -ForegroundColor Yellow
        Write-Host $pushOutput -ForegroundColor White
    }
} catch {
    Write-Host ""
    Write-Host "❌ 发生错误：" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor White
}

Write-Host ""
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

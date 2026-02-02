# 🚀 部署指南 - 快速发布到GitHub Pages

## ✅ 本地Git仓库已准备就绪

你的本地Git仓库已经初始化并提交了所有文件。现在只需要在GitHub上创建仓库并推送代码。

## 📝 步骤1：在GitHub上创建新仓库

### 方法一：通过GitHub网站（推荐）

1. **访问GitHub**
   - 打开浏览器，访问：https://github.com/new
   - 确保你已经登录GitHub账号

2. **填写仓库信息**
   ```
   Repository name: us-china-milk-comparison
   （或你喜欢的其他名称，如：milk-quality-comparison）
   
   Description: 交互式科普网站：为什么美国的奶比中国的奶好喝？
   
   Visibility: ✅ Public（公开）
   
   ⚠️ 重要：不要勾选以下选项：
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
   （因为我们已经有了这些文件）
   ```

3. **创建仓库**
   - 点击绿色的 **"Create repository"** 按钮

## 📤 步骤2：连接本地仓库并推送

创建GitHub仓库后，GitHub会显示推送现有仓库的命令。使用以下命令：

### 在PowerShell中执行（复制粘贴以下命令）：

```powershell
# 确保在milk-comparison目录中
cd C:\Users\fsong1\Downloads\RollNDeal_Website_SVG_SEO_Cart_Analytics_ROLLFIX\milk-comparison

# 添加远程仓库（将 YOUR_USERNAME 替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/us-china-milk-comparison.git

# 推送到GitHub
git push -u origin main
```

### 如果遇到认证问题：

如果提示输入用户名和密码，你需要使用 **Personal Access Token**：

1. **创建Personal Access Token**
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"
   - 填写说明：`milk-comparison project`
   - 选择权限：勾选 `repo`（完整仓库访问权限）
   - 点击 "Generate token"
   - **重要**：复制生成的token（只显示一次）

2. **使用Token推送**
   - 用户名：你的GitHub用户名
   - 密码：粘贴刚才复制的token

## 🌐 步骤3：启用GitHub Pages

1. **进入仓库设置**
   - 在GitHub仓库页面，点击 **"Settings"** 标签（在仓库顶部导航栏）

2. **找到Pages设置**
   - 在左侧菜单中，向下滚动找到 **"Pages"** 选项

3. **配置Pages**
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

4. **保存设置**
   - 点击 **"Save"** 按钮

5. **等待部署**
   - GitHub会在几分钟内构建和部署你的网站
   - 你会看到一条消息："Your site is live at..."
   - 网站地址格式：`https://YOUR_USERNAME.github.io/us-china-milk-comparison/`

## ✨ 完成！

你的网站现在应该可以通过GitHub Pages访问了！

### 访问你的网站：
```
https://YOUR_USERNAME.github.io/us-china-milk-comparison/
```

## 🔄 后续更新

每次修改代码后，使用以下命令更新网站：

```powershell
cd C:\Users\fsong1\Downloads\RollNDeal_Website_SVG_SEO_Cart_Analytics_ROLLFIX\milk-comparison

git add .
git commit -m "描述你的更改"
git push
```

GitHub Pages会自动更新（通常需要1-2分钟）。

## ⚠️ 常见问题

### 问题1：推送时提示"remote origin already exists"
**解决方案：**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/us-china-milk-comparison.git
git push -u origin main
```

### 问题2：分支名称不匹配
如果GitHub默认分支是 `master` 而不是 `main`：
```powershell
git branch -M master
git push -u origin master
```

### 问题3：Pages显示404
- 确保在Settings → Pages中选择了正确的分支
- 等待几分钟让GitHub完成部署
- 检查仓库中是否有 `index.html` 文件

### 问题4：需要更新仓库URL
```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/us-china-milk-comparison.git
```

## 📞 需要帮助？

如果遇到任何问题，可以：
1. 查看GitHub官方文档：https://docs.github.com
2. 在GitHub仓库中提交Issue
3. 检查本项目的 `GITHUB_SETUP.md` 文件

---

**提示**：首次部署可能需要5-10分钟。之后每次更新通常只需要1-2分钟。

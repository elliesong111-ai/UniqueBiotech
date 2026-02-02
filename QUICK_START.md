# ⚡ 快速开始 - 5分钟部署到GitHub Pages

## ✅ 本地准备已完成！

你的代码已经提交到本地Git仓库。现在只需要3步就能发布网站：

---

## 📝 第1步：在GitHub上创建仓库（2分钟）

1. **打开浏览器，访问：** https://github.com/new

2. **填写信息：**
   - **Repository name**: `us-china-milk-comparison` （或你喜欢的名字）
   - **Description**: `交互式科普网站：为什么美国的奶比中国的奶好喝？`
   - **Visibility**: 选择 ✅ **Public**
   - ⚠️ **不要勾选** "Add a README file"、"Add .gitignore"、"Choose a license"

3. **点击** "Create repository" 按钮

---

## 📤 第2步：推送代码到GitHub（1分钟）

在PowerShell中执行以下命令（在 `milk-comparison` 目录中）：

```powershell
# 添加远程仓库（替换 YOUR_USERNAME 为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/us-china-milk-comparison.git

# 推送到GitHub
git push -u origin main
```

### 🔐 如果提示输入密码：

GitHub不再支持密码登录，你需要使用 **Personal Access Token**：

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写说明，勾选 `repo` 权限
4. 生成后复制token（只显示一次！）
5. 推送时：
   - 用户名：你的GitHub用户名
   - 密码：粘贴token

---

## 🌐 第3步：启用GitHub Pages（1分钟）

1. 在GitHub仓库页面，点击 **"Settings"** 标签
2. 左侧菜单找到 **"Pages"**
3. 设置：
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. 点击 **"Save"**

5. **等待2-3分钟**，然后访问：
   ```
   https://YOUR_USERNAME.github.io/us-china-milk-comparison/
   ```

---

## 🎉 完成！

你的网站现在应该可以访问了！

---

## 🚀 或者使用自动化脚本

我已经为你创建了一个自动化脚本，运行：

```powershell
cd C:\Users\fsong1\Downloads\RollNDeal_Website_SVG_SEO_Cart_Analytics_ROLLFIX\milk-comparison
.\deploy.ps1
```

脚本会引导你完成整个过程！

---

## 📋 完整命令清单（复制粘贴版）

```powershell
# 1. 进入项目目录
cd C:\Users\fsong1\Downloads\RollNDeal_Website_SVG_SEO_Cart_Analytics_ROLLFIX\milk-comparison

# 2. 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/us-china-milk-comparison.git

# 3. 推送到GitHub
git push -u origin main
```

然后按照第3步启用GitHub Pages即可！

---

## ❓ 遇到问题？

查看 `DEPLOY.md` 文件获取详细的故障排除指南。

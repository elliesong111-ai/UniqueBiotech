# GitHub 仓库设置指南

## 📝 在GitHub上创建新仓库的步骤

### 方法一：通过GitHub网站创建

1. **访问GitHub**
   - 登录你的GitHub账号
   - 访问 https://github.com/new

2. **填写仓库信息**
   - **Repository name（仓库名称）**: 建议使用 `us-china-milk-comparison` 或 `milk-quality-comparison`
   - **Description（描述）**: 例如："交互式科普网站：为什么美国的奶比中国的奶好喝？"
   - **Visibility（可见性）**: 选择 **Public**（公开）以便分享
   - **不要勾选** "Add a README file"（我们已经有了）
   - **不要勾选** "Add .gitignore"（我们已经有了）
   - **不要选择** License（可选）

3. **创建仓库**
   - 点击绿色的 "Create repository" 按钮

### 方法二：使用GitHub CLI（如果已安装）

```bash
gh repo create us-china-milk-comparison --public --description "交互式科普网站：为什么美国的奶比中国的奶好喝？"
```

## 🚀 将本地项目推送到GitHub

### 第一次推送

1. **打开终端/命令行**
   - 进入项目目录：
   ```bash
   cd milk-comparison
   ```

2. **初始化Git仓库**
   ```bash
   git init
   ```

3. **添加所有文件**
   ```bash
   git add .
   ```

4. **提交文件**
   ```bash
   git commit -m "Initial commit: 创建交互式牛奶对比科普网站"
   ```

5. **连接到GitHub仓库**
   ```bash
   git remote add origin https://github.com/你的用户名/仓库名.git
   ```
   例如：
   ```bash
   git remote add origin https://github.com/yourusername/us-china-milk-comparison.git
   ```

6. **推送到GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### 后续更新

每次修改后，使用以下命令更新：

```bash
git add .
git commit -m "描述你的更改"
git push
```

## 🌐 启用GitHub Pages

1. **进入仓库设置**
   - 在GitHub仓库页面，点击 "Settings"（设置）标签

2. **找到Pages设置**
   - 在左侧菜单中找到 "Pages"

3. **配置Pages**
   - **Source（源）**: 选择 "Deploy from a branch"
   - **Branch**: 选择 "main" 或 "master"
   - **Folder**: 选择 "/ (root)"
   - 点击 "Save"

4. **访问你的网站**
   - 等待几分钟后，你的网站将在以下地址可用：
   - `https://你的用户名.github.io/仓库名/`
   - 例如：`https://yourusername.github.io/us-china-milk-comparison/`

## 📋 完整的命令序列（复制粘贴版）

```bash
# 进入项目目录
cd milk-comparison

# 初始化Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 创建交互式牛奶对比科普网站"

# 添加远程仓库（替换为你的实际仓库URL）
git remote add origin https://github.com/你的用户名/仓库名.git

# 重命名分支为main（如果需要）
git branch -M main

# 推送到GitHub
git push -u origin main
```

## ⚠️ 注意事项

1. **如果仓库已存在README**
   - 如果创建仓库时勾选了README，需要先拉取：
   ```bash
   git pull origin main --allow-unrelated-histories
   ```

2. **认证问题**
   - 如果遇到认证问题，可能需要使用Personal Access Token
   - 或者使用SSH方式连接

3. **分支名称**
   - 如果GitHub默认分支是 `master`，使用 `git branch -M master`

## 🎉 完成！

设置完成后，你的网站就可以通过GitHub Pages访问了！

---

**提示**：如果遇到任何问题，可以查看GitHub的官方文档或提交Issue。

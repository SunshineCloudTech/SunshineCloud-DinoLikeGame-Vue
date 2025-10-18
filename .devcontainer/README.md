# Vue3 Chrome Dino Game - Development Container

这个devcontainer专为Vue3 TypeScript Chrome Dino游戏项目配置，提供完整的开发环境。

## 🚀 特性

### 基础环境
- **基础镜像**: Microsoft官方TypeScript-Node容器 (Node.js 20 + TypeScript)
- **操作系统**: Debian Bookworm (安全稳定)
- **用户**: 非root用户 (node)

### 开发工具
- **Vue 3** - Progressive JavaScript框架
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速构建工具
- **Node.js 20** - LTS版本

### VS Code扩展
- **Vue Language Features (Volar)** - Vue3官方语言支持
- **TypeScript Vue Plugin** - Vue中的TypeScript支持  
- **Prettier** - 代码格式化
- **ESLint** - 代码质量检查
- **Auto Rename Tag** - HTML标签自动重命名
- **Path Intellisense** - 路径智能提示
- **Better Comments** - 增强注释显示
- **Error Lens** - 错误内联显示

## 🔧 配置亮点

### 端口转发
- **5173** - Vite开发服务器
- **4173** - Vite预览服务器

### 自动化设置
- 容器创建后自动运行 `npm install`
- 自动配置代码格式化和语法检查
- 预配置Vue3开发环境

### 代码风格
- 自动保存时格式化
- ESLint自动修复
- TypeScript严格模式
- Vue3 Composition API支持

## 🎮 项目特性

### 游戏特性
- Canvas渲染引擎
- 像素艺术风格
- 响应式设计
- 移动端支持
- 60fps优化

### 架构特点  
- Vue3 Composition API
- TypeScript严格类型检查
- 模块化设计
- 性能优化

## 📦 快速开始

1. 在VS Code中打开项目
2. 选择 "Reopen in Container"
3. 等待容器构建完成
4. 运行 `npm run dev` 开始开发

## 🛠️ 可用命令

```bash
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本  
npm run preview    # 预览生产构建
npm run type-check # TypeScript类型检查
```

## 📁 项目结构

```
src/
├── components/     # Vue组件
├── composables/    # 组合式API逻辑
├── assets/         # 静态资源
├── types/          # TypeScript类型定义
├── utils/          # 工具函数
└── config/         # 配置文件
```

## 🎯 开发指南

1. **游戏逻辑**: 使用Vue3 Composition API管理游戏状态
2. **渲染**: HTML5 Canvas进行高性能渲染
3. **类型安全**: TypeScript提供完整类型支持
4. **组件化**: 模块化设计，易于维护和扩展

Happy coding! 🎮✨
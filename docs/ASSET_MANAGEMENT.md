# 游戏资源管理配置说明

本文档说明如何使用 `game.ts` 中新增的资源管理配置系统。

## 📁 配置结构

### 基本配置 (`src/config/game.ts`)

```typescript
export const GAME_ASSETS = {
  images: {
    logo: '/src/assets/vue.svg',
    favicon: '/favicon.ico'
  },
  sounds: {
    jump: '/sounds/jump.mp3',
    crash: '/sounds/crash.mp3',
    score: '/sounds/score.mp3'
  },
  sprites: {
    useBase64: true, // 切换base64或文件模式
    baseUrl: '/assets/sprites/',
    files: { /* sprite文件名映射 */ }
  },
  fonts: {
    main: '"Courier New", Monaco, "Lucida Console", monospace',
    fallback: 'monospace'
  }
}
```

## 🎯 使用方法

### 1. 获取资源URL

```typescript
import { getAssetUrl } from '@/config/game'

// 获取图像资源
const logoUrl = getAssetUrl('images', 'logo')

// 获取音频资源  
const jumpSound = getAssetUrl('sounds', 'jump')

// 获取sprite资源
const trexSprite = getAssetUrl('sprites', 'trex')
```

### 2. 预加载资源

```typescript
import { preloadAsset, globalAssetPreloader } from '@/utils/assetManager'

// 预加载单个资源
const logoImg = await preloadAsset('images', 'logo')

// 预加载音频
const jumpAudio = await preloadAsset('sounds', 'jump')

// 获取已加载的资源
const cachedImage = globalAssetPreloader.getLoadedAsset('/path/to/image.png')
```

### 3. 批量预加载

```typescript
import { getPreloadAssets, preloadAllAssets } from '@/utils/assetManager'

// 获取所有需要预加载的资源列表
const assets = getPreloadAssets()

// 预加载所有资源
await preloadAllAssets()
```

## 🔄 切换资源模式

### Base64模式（默认）
当前游戏使用base64编码的图像数据，所有sprites嵌入在JavaScript中：

```typescript
GAME_ASSETS.sprites.useBase64 = true
```

**优点：**
- 无需额外HTTP请求
- 资源打包在代码中
- 加载速度快

**缺点：**
- 增加JavaScript文件大小
- 难以单独更新资源

### 文件模式
切换到使用独立的图像文件：

```typescript
GAME_ASSETS.sprites.useBase64 = false
```

**优点：**
- 可以单独更新资源文件
- JavaScript文件更小
- 支持图像压缩优化

**缺点：**
- 需要额外的HTTP请求
- 需要管理资源文件

## 📂 文件结构建议

如果使用文件模式，建议的目录结构：

```
public/
├── assets/
│   ├── sprites/
│   │   ├── trex.png
│   │   ├── cactus-small.png
│   │   ├── cactus-large.png
│   │   ├── pterodactyl.png
│   │   ├── cloud.png
│   │   ├── horizon.png
│   │   ├── restart.png
│   │   └── text-sprite.png
│   └── sounds/
│       ├── jump.mp3
│       ├── crash.mp3
│       └── score.mp3
└── favicon.ico
```

## 🎵 音频资源管理

### 添加音频资源

```typescript
// 在 game.ts 中添加
sounds: {
  jump: '/sounds/jump.mp3',
  crash: '/sounds/crash.mp3',
  powerup: '/sounds/powerup.wav'
}
```

### 使用音频资源

```typescript
import { getAssetUrl } from '@/config/game'

const audio = new Audio(getAssetUrl('sounds', 'jump'))
audio.play()
```

## 🎨 字体配置

### 设置字体

```typescript
// 在CSS中使用
.game-text {
  font-family: var(--game-font-main);
}

// 在JavaScript中使用
import { GAME_ASSETS } from '@/config/game'
ctx.font = `16px ${GAME_ASSETS.fonts.main}`
```

## 🔧 高级配置

### CDN资源

```typescript
GAME_ASSETS.images.logo = 'https://cdn.example.com/logo.png'
GAME_ASSETS.sounds.jump = 'https://cdn.example.com/sounds/jump.mp3'
```

### 环境特定配置

```typescript
// 开发环境
const isDev = import.meta.env.DEV
GAME_ASSETS.sprites.baseUrl = isDev 
  ? '/dev-assets/sprites/' 
  : '/assets/sprites/'
```

### 响应式资源

```typescript
// 根据设备像素比选择资源
const getResponsiveAsset = (baseName: string) => {
  const ratio = window.devicePixelRatio
  return ratio > 1 
    ? `${baseName}@2x.png` 
    : `${baseName}.png`
}
```

## 📊 性能优化建议

1. **预加载关键资源**：在游戏开始前预加载必要的sprites和音频
2. **懒加载非关键资源**：延迟加载装饰性元素
3. **资源压缩**：使用WebP等现代图像格式
4. **缓存策略**：利用浏览器缓存和Service Worker

## 🐛 故障排除

### 常见问题

1. **资源加载失败**
   ```typescript
   // 检查资源配置
   import { validateAssetConfig } from '@/utils/assetManager'
   validateAssetConfig()
   ```

2. **Base64资源过大**
   ```typescript
   // 切换到文件模式
   GAME_ASSETS.sprites.useBase64 = false
   ```

3. **音频无法播放**
   ```typescript
   // 检查音频格式支持
   const audio = new Audio()
   console.log('Can play MP3:', audio.canPlayType('audio/mpeg'))
   ```

## 🔄 迁移指南

### 从硬编码路径迁移

**之前：**
```typescript
const img = new Image()
img.src = '/assets/trex.png'
```

**之后：**
```typescript
import { getAssetUrl } from '@/config/game'
const img = new Image()
img.src = getAssetUrl('sprites', 'trex')
```

这样做的好处是所有资源路径都在一个地方管理，便于维护和部署。
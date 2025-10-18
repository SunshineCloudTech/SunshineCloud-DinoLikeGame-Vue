// 使用游戏资源配置的示例代码

import { GAME_ASSETS, getAssetUrl, getPreloadAssets } from '@/config/game'

// 示例1: 获取资源URL
export const loadGameAssets = () => {
  // 获取图像资源
  const logoUrl = getAssetUrl('images', 'logo')
  console.log('Logo URL:', logoUrl)
  
  // 获取音频资源
  const jumpSoundUrl = getAssetUrl('sounds', 'jump')
  console.log('Jump sound URL:', jumpSoundUrl)
  
  // 获取sprite资源
  const trexSpriteUrl = getAssetUrl('sprites', 'trex')
  console.log('T-Rex sprite URL:', trexSpriteUrl)
}

// 示例2: 预加载所有资源
export const preloadAllAssets = async () => {
  const assets = getPreloadAssets()
  console.log('Assets to preload:', assets)
  
  const loadPromises = assets.map(asset => {
    return new Promise((resolve, reject) => {
      if (asset.type === 'image') {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = asset.url
      } else if (asset.type === 'audio') {
        const audio = new Audio()
        audio.oncanplaythrough = () => resolve(audio)
        audio.onerror = reject
        audio.src = asset.url
      }
    })
  })
  
  try {
    await Promise.all(loadPromises)
    console.log('All assets loaded successfully!')
  } catch (error) {
    console.error('Failed to load some assets:', error)
  }
}

// 示例3: 动态切换资源模式
export const switchToFileMode = () => {
  // 注意：这需要在应用启动前配置，或者重新初始化相关组件
  console.log('Switching to file-based sprites...')
  console.log('Base URL for sprites:', GAME_ASSETS.sprites.baseUrl)
  console.log('Available sprite files:', GAME_ASSETS.sprites.files)
}

// 示例4: 获取字体配置
export const getFontConfig = () => {
  return {
    primary: GAME_ASSETS.fonts.main,
    fallback: GAME_ASSETS.fonts.fallback
  }
}

// 示例5: 检查资源配置
export const validateAssetConfig = () => {
  const config = {
    usingBase64Sprites: GAME_ASSETS.sprites.useBase64,
    spriteBaseUrl: GAME_ASSETS.sprites.baseUrl,
    availableImages: Object.keys(GAME_ASSETS.images),
    availableSounds: Object.keys(GAME_ASSETS.sounds),
    availableSprites: Object.keys(GAME_ASSETS.sprites.files)
  }
  
  console.log('Current asset configuration:', config)
  return config
}

// 实用函数：创建图像预加载器
export class AssetPreloader {
  private loadedAssets: Map<string, HTMLImageElement | HTMLAudioElement> = new Map()
  private loadingPromises: Map<string, Promise<HTMLImageElement | HTMLAudioElement>> = new Map()

  async preloadImage(url: string): Promise<HTMLImageElement> {
    if (this.loadedAssets.has(url)) {
      return this.loadedAssets.get(url) as HTMLImageElement
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url) as Promise<HTMLImageElement>
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.loadedAssets.set(url, img)
        resolve(img)
      }
      img.onerror = reject
      img.src = url
    })

    this.loadingPromises.set(url, promise)
    return promise
  }

  async preloadAudio(url: string): Promise<HTMLAudioElement> {
    if (this.loadedAssets.has(url)) {
      return this.loadedAssets.get(url) as HTMLAudioElement
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url) as Promise<HTMLAudioElement>
    }

    const promise = new Promise<HTMLAudioElement>((resolve, reject) => {
      const audio = new Audio()
      audio.oncanplaythrough = () => {
        this.loadedAssets.set(url, audio)
        resolve(audio)
      }
      audio.onerror = reject
      audio.src = url
    })

    this.loadingPromises.set(url, promise)
    return promise
  }

  getLoadedAsset(url: string): HTMLImageElement | HTMLAudioElement | null {
    return this.loadedAssets.get(url) || null
  }

  clearCache(): void {
    this.loadedAssets.clear()
    this.loadingPromises.clear()
  }
}

// 创建全局资源预加载器实例
export const globalAssetPreloader = new AssetPreloader()

// 便利函数：根据资源类型自动选择预加载方法
export const preloadAsset = async (category: keyof typeof GAME_ASSETS, assetName: string) => {
  const url = getAssetUrl(category, assetName)
  if (!url) {
    throw new Error(`Asset not found: ${category}.${assetName}`)
  }

  switch (category) {
    case 'images':
    case 'sprites':
      return globalAssetPreloader.preloadImage(url)
    case 'sounds':
      return globalAssetPreloader.preloadAudio(url)
    default:
      throw new Error(`Unsupported asset category: ${category}`)
  }
}
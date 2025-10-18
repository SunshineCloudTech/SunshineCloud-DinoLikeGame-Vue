import type { GameConfig } from '@/types/game'

export const GAME_CONFIG: GameConfig = {
  canvas: {
    width: 1200,
    height: 300
  },
  dino: {
    width: 80,
    height: 100,
    jumpForce: -15,
    gravity: 0.8
  },
  obstacles: {
    minDistance: 300,
    maxDistance: 600,
    speed: 5,
    speedIncrement: 0.03,
    cactus: {
      width: 25,
      height: 70
    },
    bird: {
      width: 50,
      height: 40
    }
  },
  ground: {
    speed: 5
  },
  cloud: {
    speed: 0.8,
    minDistance: 300,
    maxDistance: 600
  }
}

// 游戏常量
export const GAME_CONSTANTS = {
  GROUND_HEIGHT: 36,
  DINO_GROUND_OFFSET: 2, // 减少偏移，让小人更贴近地面
  MAX_SPEED: 10,
  SCORE_INCREMENT: 0.015,
  NIGHT_MODE_INTERVAL: 1000,
  FPS: 60
} as const

// 游戏资源路径配置
export const GAME_ASSETS = {
  // 图像资源路径
  images: {
    // 静态图像文件路径 (如果使用本地图像文件)
    logo: '/src/assets/vue.svg',
    favicon: '/favicon.ico',
    
    // 或者可以配置外部CDN资源
    // trex: 'https://cdn.example.com/trex.png',
    // cactus: 'https://cdn.example.com/cactus.png',
  },
  
  // 音频资源路径
  sounds: {
    jump: '/sounds/jump.mp3',
    crash: '/sounds/crash.mp3',
    score: '/sounds/score.mp3',
    
    // 或者使用CDN
    // jump: 'https://cdn.example.com/sounds/jump.mp3',
  },
  
  // Sprite数据 (当前使用base64编码)
  sprites: {
    useBase64: true, // 设置为false可以切换到使用图像文件
    baseUrl: '/assets/sprites/', // 当useBase64为false时的基础URL
    
    // 如果使用文件而非base64，这里可以配置文件名
    files: {
      trex: 'trex.png',
      cactusSmall: 'cactus-small.png',
      cactusLarge: 'cactus-large.png',
      pterodactyl: 'pterodactyl.png',
      cloud: 'cloud.png',
      horizon: 'horizon.png',
      restart: 'restart.png',
      textSprite: 'text-sprite.png'
    }
  },
  
  // 字体资源
  fonts: {
    main: '"Courier New", Monaco, "Lucida Console", monospace',
    fallback: 'monospace'
  }
} as const

// 资源URL生成器函数
export const getAssetUrl = (category: keyof typeof GAME_ASSETS, asset: string): string => {
  switch (category) {
    case 'images':
      return GAME_ASSETS.images[asset as keyof typeof GAME_ASSETS.images] || ''
    
    case 'sounds':
      return GAME_ASSETS.sounds[asset as keyof typeof GAME_ASSETS.sounds] || ''
    
    case 'sprites':
      if (GAME_ASSETS.sprites.useBase64) {
        // 如果使用base64，返回空字符串（由spriteLoader处理）
        return ''
      } else {
        // 如果使用文件，构造完整URL
        const fileName = GAME_ASSETS.sprites.files[asset as keyof typeof GAME_ASSETS.sprites.files]
        return fileName ? `${GAME_ASSETS.sprites.baseUrl}${fileName}` : ''
      }
    
    default:
      return ''
  }
}

// 预加载资源列表生成器
export const getPreloadAssets = () => {
  const assets: { type: string; url: string }[] = []
  
  // 添加图像资源
  Object.values(GAME_ASSETS.images).forEach(url => {
    if (url) assets.push({ type: 'image', url })
  })
  
  // 添加音频资源  
  Object.values(GAME_ASSETS.sounds).forEach(url => {
    if (url) assets.push({ type: 'audio', url })
  })
  
  // 如果不使用base64，添加sprite文件
  if (!GAME_ASSETS.sprites.useBase64) {
    Object.values(GAME_ASSETS.sprites.files).forEach(fileName => {
      if (fileName) {
        assets.push({ 
          type: 'image', 
          url: `${GAME_ASSETS.sprites.baseUrl}${fileName}` 
        })
      }
    })
  }
  
  return assets
}
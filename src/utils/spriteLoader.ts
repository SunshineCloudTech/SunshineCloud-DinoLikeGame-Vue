// Chrome恐龙游戏的sprite图像数据
import { GAME_ASSETS, getAssetUrl } from '@/config/game'

export const SPRITE_DATA = {
  // 1x 分辨率图像
  LDPI: {
    TREX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAAvAgMAAABiRrxWAAAADFBMVEX///9TU1P39/f///+TS9URAAAAAXRSTlMAQObYZgAAAPpJREFUeF7d0jFKRkEMhdGLMM307itNLALyVmHvJuzTDMjdn72E95PGFEZSmeoU4YMMgxhskvQec8YSVFX1NhGcS5ywtbmC8khcZeKq+ZWJ4F8Sr2+ZCErjkJFEfcjAc/6/BMlfcz6xHdhRthYzIZhIHMcTVY1scUUiAphK8CMSPUbieTBhvD9Lj0vyV4wklEGzHpciKGOJoBp7XDcFs4kWxxM7Ey3iZ8JbzASAvMS7XLOJHTTvEkEZSeQl7DMuwVyCasqK5+XzQRYLUJlMbPXjFcn3m8eKBSjWZMJwvGIOvViAzCbUj1VEDoqFOEQGE3SyInJQLOQMJL4B7enP1UbLXJQAAAAASUVORK5CYII=',
    
    CACTUS_SMALL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAjCAMAAABRlI+PAAAADFBMVEX////////39/dTU1PhglcSAAAAAXRSTlMAQObYZgAAAPNJREFUeF7tlkEKwzAMBLXr//+5iQhU7gRRQkyhZI+DhwH74jhmO+oIJBVwURljuAXagG5QqkSgBLqg3JnxJ1Cb8SmQ3o6gpO85owGlOB4m2BNKJ11BSd01owGlOHkcIAuHkz6UNpPKgozPM54dADHjJuNhZiJxdQCQgZJeBczgCAAy3yhPJvcnmdC9mZwBIsQMFV5AkzHBNknFgcKM+oyDIFcfCAoy03m+jSMIcmoVZkKqSjr1fghyahRmoKRUHYLiSI1SMlCq5CDgX6BXmKkfn+oQ0KEyyrzoy8GbXJ9xrM/YjhUZgl9nnsyTCe9rgSRdV15CwRcIEu8GGQAAAABJRU5ErkJggg==',
    
    CACTUS_LARGE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAMAAACJUtIoAAAACVBMVEX////39/dTU1OabbyfAAAAAXRSTlMAQObYZgAAAXhJREFUeF7t2NGqAjEMANGM///RlwvaYQndULuFPJgHUYaEI6IPhgNAOA8HZ+3U6384F5y1U6YzAZTWG+dZamnFEstBFtCKJZSHWMADLJ18z+JqpQeLdKoDC8siC5iFCQs4znIxB5B1t6F3lQWkL4N0JsF+u6GXJdbI+FKW+yWr3lhgCZ2VSag3Nlk/FnRkIRbasLCO0oulikMsvmGpeiGLZ1jOMgtIP5bODivYYUXEIVbwFCt4khVssRgsgidZwQaLd2A8m7MYLGTl4KeQQs2y4kMAMGGlmQViDIb5O6xZnnLD485dIBzqDSE1yyFdL4Iqu4XJqUUWl/NVAFSZq1P6a5aqbAUM2epQbBioWflUBxZqVr7VgYWalW91YKFm5Vsd',
    
    CLOUD: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAOCAQAAAD6HOaKAAAAU0lEQVR4XrWSsQkAQAgD3X9El/ELixQpJHCfdApnUCtXz7o49cgagaGPaq4rIwAP9s/C7R7UX3inJ0BDb6qWDC7ScOR/QWjRlFizuPwLtTLj+qkH6DjD2wLtikUAAAAASUVORK5CYII=',
    
    HORIZON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAAMAgMAAAAPCKxBAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAALJJREFUeF7t1EEKAyEMhtEvMNm7sPfJEVyY+1+ltLgYAsrQCtWhbxEhQvgxIJtSZypxa/WGshgzKdbq/UihMFMlt3o/CspEYoihIMaAb6mCvM6C+BTAeyo+wN4yykV/6pVfkdLpVyI1hh7GJ6QunUoLEQlQglNP2nkQkeF8+ei9cLxMue1qxVRfk1Ej0s6AEGWfVOk0QUtnK5Xo0Lac6wpdtnQqB6VxomPaz+dgF1PaqqmeWJlz1jYUaSIAAAAASUVORK5CYII=',
    
    RESTART: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAQAAADQmBIFAAAAZklEQVR4Xu3WMQoAIAxDUe/Y+58jYwV1CwQJWQT5o/DAoaWjV2i/LRym/A5FjEsR41LPQchByEHwIVAEC4gZpghmSDP8egXpr/hQZaAKQFQe+pBOQAblDC336qrlPpSg0MEjInbWTLFFmwc8TpTAAAAAAElFTkSuQmCC',
    
    TEXT_SPRITE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAAAYAgMAAADWncTDAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAAO1JREFUeF690TFqxUAQA1BNoRtk7jMu3E9Auv9Vgr/5A863Y9zEhVhkHmhZsEGkw4Lppmllh1tcLHx+aRj2YnEDuQFvcQW+EoZY0TQLCZbEVxRxAvY+i8ikW0C0bwFdbictG2zvu/4EcCuBF0B23IBsQHZBYgm1n86BN+BmyV5rQFyCJAiDJSTfgBV9BbjvXdzIcKchpMOYd3gO/jvCeuUGFALg95J0/SrtQlrzz+sAjDwCIQsbWAdgbqrQpKYRjmPuAfU5dMC+c0rxOTiO+T6ZlK4pbcDLI1DIRaf3GxDGALkQHnD+cGhMKeox+AEOL3mLO7TQZgAAAABJRU5ErkJggg=='
  },
  
  // 2x 分辨率图像
  HDPI: {
    TREX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAABeAgMAAAAPo8UvAAAADFBMVEX///9TU1P39/f///+TS9URAAAAAXRSTlMAQObYZgAAASdJREFUeF7t1qFOBEEQRdEyGP7vGQy/hsHc/0MPSe8ylU2vKEIqqQnviRZXdI7pyUQuONda901FGAG6j8aa+6mDEUboHP01sk5EHHWEjt/UY0dk/U+Ir/cdkXUEovV1GFF/HQMR/mLWEUYYYQRrf65XRhgB2595Y80lYRjCCG7AV/IZ0FdDabgDhiKMgE+tAX01ES+ajDBCADpHZw0tRdaZCCNEGhCdNSSlQTEVYUROQGeNxxoxH2EErXU+wohdQXONqyBorDsixiB2Be01JiOM2BXQX1MRUxFGpAL6aypiMsIIJCFBtSK98fFYKd6wFDEbYUQgEYh6hTSkonbDDTAdYQTrKNd9QPWGUFwAYYRYR7U+Xem+2BXQX1MRUxJGpAL6aypiMsIIJCFBtSK98fFYKd6wFDEbYUQgEYh6hTSkonbDDTAdYQTrKNd9QPWGUFwAYYRYR7U+XVP6S6MKQ==',
    
    CACTUS_SMALL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAABGBAMAAAByJ2Z/AAAADFBMVEX///9TU1P39/f///+TS9URAAAAAXRSTlMAQObYZgAAARZJREFUeF7t2NEJwzAQg2GtcCtoBe2/W6k5aK8qLgR6ToL9KPzzgR+NPCRRjg2ScjiQ9DKMCE4HRYQOJB2MJyXyQWPQgeSCDD8HnYHh10F6NbJk9KyMwpJ+hkEfnoSyGX1NUmAOqVjSz4zrNgwhm9FbMmEyuS7DpQw/Gf5kOGEYXMgwWBobnGHQmZKsYuyKDcZk8gdmM5uJMzKbgS7I5KENgJzxxN95PUMfAKi8gCXO6BQM4cM4ysEZwplyfxFDErAhmWniDKT3pJEpD2RDMpPEGUt6mOIQ1XFGmiXOZNLIgKUpgzH4lTgDtDIgmY0NznhSnWhk/v2ZkuONGOI2DEn0MNf7ttvMZjazmc2AJzKbgS7I5KENgJzxxN95PUMfAKi8gCXO6BQM4cM4ysEZgJ8Z',
    
    CACTUS_LARGE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABkBAMAAADOLxDzAAAACVBMVEX///9TU1P39/ea77PDAAAAAXRSTlMAQObYZgAAAa9JREFUeF7t1lFqhEAQBuG+wl6h7n/IEEgKlma2R8Vk1O4HWSh++Xzb8AKA8E4IXrlYnsXr+zgh1OdifZbBdFIApdWiWShtVhmQ+jAWMLFollCOsTzgxiyd7GcR01/YLOZf1SwsN2EBozBgAU9l4TAHkDWzCNjKApZlybO4z+GtFwu9bGKZl2TJSyxDxaoX8yyha7LGZRDqxR+ymtUsaNaWhTM+s5rl05tjNUsVz2Kxi6XqhSy4NcvbzgLSnzzvjqzgCCsiHsXSdZwVPIAVHGIhi+ABrOAAi5+Avy7HQhaycpAVpDDBsuKDAOBCrHzjQHgYhl9YsHxf+vRrsQxjVVAsDNMsF6uydBUhq+wWBq8ay85dQ==',
    
    CLOUD: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAcAgMAAACR2TCnAAAABlBMVEUAAADa2to4qB92AAAAAXRSTlMAQObYZgAAAFFJREFUeF6VzTEKAFEIxNA03m+a3P8q2wqi/E35BIdeGXq3q5hnrwBs7mC5vIZzu/nnqI319vRtqHB731blwSHjx+22+Rdn94rzQq0ugKPVlz5onyJcGdu0NgAAAABJRU5ErkJggg==',
    
    HORIZON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACWAAAAAYAQMAAABEalRSAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAAOtJREFUeF7tljEKwzAMRb/J0CWgI/QKOYAh1+pUcjQfpUfw2MFEHVyDQSQmQUNM9AYNcobnh4egU+YVqhAvZSpgsfolPnSv5d0nz3vHslgUdK81RLzyvHcsi+WBNxQh4Ln8pw4Wi7skAg9mXgHMrEACXJnbHIllsbqGAtwXhnYswzFzwPWxWEPc2CexoobkHM4ZpD6s2loWiyIEEwCChIomMiMEHqgP573C9eHkc5VLWh3XsljnGVoLWVl+31bp38piTVVuihtPOAm9kcRLbrFjEvqwamtZLK5eI8sSan9rXEK0LcNFrY5oWawf59S7YSRD7eMAAAAASUVORK5CYII=',
    
    RESTART: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABAAgMAAADE0Nm5AAAACVBMVEX////39/dTU1OabbyfAAAAAXRSTlMAQObYZgAAAGNJREFUeF7d1CEOwDAMQ9GS3q/ExPcz8Sm3gYBWVRo0afvwSQl0ax1To22JntKWupfGjriSXiLViCXCmXBHCykJTxaYEeIQGcVrHYklcoX8YYpSUggzcpBTiv5JtQWorUltmS6s4ZKtz2GgjAAAAABJRU5ErkJggg==',
    
    TEXT_SPRITE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX4AAAAwAQMAAAAsMYMXAAAABlBMVEUAAABTU1OoaSf/AAAAAXRSTlMAQObYZgAAAPdJREFUeF7tkzFqAzEQRb9RsZ11BF0jlXSlpDdYOcFeSeCLKLeYQujHwxRrtF0gUoqo+AwfPRh4DDZByKk7tkv3rNszWhLHKv7BhtObALxF3LP44vRvRoLPTa4avoS8BLA+PSNFzyqAq/wDwNZxrxKBxq5axLGRS4EkgP6A6rrhy6ZVQLoiZKpfRJ8NqCp+HbCZpAcromNNHTfoeWS7hwnA//tROIpm17lddCbFgMAylGSZANiRhL1ou2treo0/ErB5AtAwbr8e8HK28wpwP8rmpwCv23+cPZhvK8GOCUD4lMHRALiOw8O9TAAcB2C8B7zDSvPw+8A3sQJ/MSdPGzIAAAAASUVORK5CYII='
  }
}

// Sprite定义 - 由于sprite图像是完整的，我们使用整个图像
export const SPRITE_DEFINITIONS = {
  TREX: {
    // T-Rex sprite包含多个状态，我们需要根据实际的sprite sheet来定义
    STANDING: { x: 76, y: 6, width: 44, height: 47 },
    RUNNING_1: { x: 132, y: 6, width: 44, height: 47 },
    RUNNING_2: { x: 188, y: 6, width: 44, height: 47 },
    JUMPING: { x: 0, y: 6, width: 44, height: 47 },
    CRASHED: { x: 332, y: 6, width: 44, height: 47 },
    DUCKING_1: { x: 518, y: 6, width: 59, height: 47 },
    DUCKING_2: { x: 577, y: 6, width: 59, height: 47 }
  },
  
  CACTUS_SMALL: {
    // 整个仙人掌图像
    SMALL: { x: 0, y: 0, width: 102, height: 35 }
  },
  
  CACTUS_LARGE: {
    // 整个大仙人掌图像
    LARGE: { x: 0, y: 0, width: 150, height: 50 }
  },
  
  PTERODACTYL: {
    // 翼龙在T-Rex sprite中
    FLYING_1: { x: 260, y: 10, width: 46, height: 40 },
    FLYING_2: { x: 306, y: 10, width: 46, height: 40 }
  },
  
  CLOUD: {
    // 整个云朵图像
    CLOUD: { x: 0, y: 0, width: 46, height: 14 }
  },
  
  HORIZON: {
    // 整个地面图像
    HORIZON: { x: 0, y: 0, width: 1200, height: 12 }
  },
  
  RESTART: {
    // 重启按钮
    RESTART: { x: 0, y: 0, width: 36, height: 32 }
  },
  
  TEXT_SPRITE: {
    GAME_OVER: { x: 0, y: 15, width: 191, height: 11 },
    RESTART: { x: 0, y: 0, width: 72, height: 15 },
    HI: { x: 0, y: 26, width: 22, height: 11 }
  }
}

// 图像加载器类
export class SpriteLoader {
  private images: Map<string, HTMLImageElement> = new Map()
  private loadedCount = 0
  private totalCount = 0
  private onAllLoadedCallback?: () => void

  constructor() {
    this.loadAllSprites()
  }

  private async loadAllSprites() {
    // 检查是否使用base64或文件模式
    if (GAME_ASSETS.sprites.useBase64) {
      this.loadBase64Sprites()
    } else {
      this.loadFileSprites()
    }
  }

  private loadBase64Sprites() {
    const isHighDPI = window.devicePixelRatio > 1
    const spriteData = isHighDPI ? SPRITE_DATA.HDPI : SPRITE_DATA.LDPI
    
    this.totalCount = Object.keys(spriteData).length
    
    for (const [key, src] of Object.entries(spriteData)) {
      const img = new Image()
      img.onload = () => {
        this.loadedCount++
        if (this.loadedCount === this.totalCount && this.onAllLoadedCallback) {
          this.onAllLoadedCallback()
        }
      }
      img.onerror = () => {
        console.error(`Failed to load sprite: ${key}`)
        this.loadedCount++
        if (this.loadedCount === this.totalCount && this.onAllLoadedCallback) {
          this.onAllLoadedCallback()
        }
      }
      img.src = src
      this.images.set(key, img)
    }
  }

  private loadFileSprites() {
    const spriteFiles = GAME_ASSETS.sprites.files
    this.totalCount = Object.keys(spriteFiles).length
    
    for (const [key, fileName] of Object.entries(spriteFiles)) {
      const img = new Image()
      img.onload = () => {
        this.loadedCount++
        if (this.loadedCount === this.totalCount && this.onAllLoadedCallback) {
          this.onAllLoadedCallback()
        }
      }
      img.onerror = () => {
        console.error(`Failed to load sprite file: ${fileName}`)
        this.loadedCount++
        if (this.loadedCount === this.totalCount && this.onAllLoadedCallback) {
          this.onAllLoadedCallback()
        }
      }
      // 使用配置中的URL生成器
      img.src = getAssetUrl('sprites', key)
      this.images.set(key.toUpperCase(), img) // 保持与现有代码的兼容性
    }
  }

  getSprite(name: string): HTMLImageElement | null {
    return this.images.get(name) || null
  }

  onAllLoaded(callback: () => void) {
    this.onAllLoadedCallback = callback
    if (this.loadedCount === this.totalCount) {
      callback()
    }
  }

  isLoaded(): boolean {
    return this.loadedCount === this.totalCount
  }

  getLoadProgress(): number {
    return this.totalCount > 0 ? this.loadedCount / this.totalCount : 0
  }
}
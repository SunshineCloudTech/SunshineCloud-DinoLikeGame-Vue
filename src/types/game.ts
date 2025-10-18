// 游戏对象接口定义
export interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

// 恐龙状态
export enum DinoState {
  RUNNING = 'running',
  JUMPING = 'jumping',
  DUCKING = 'ducking',
  CRASHED = 'crashed'
}

// 恐龙接口
export interface Dino extends GameObject {
  velocityY: number
  jumpForce: number
  gravity: number
  groundY: number
  state: DinoState
}

// 障碍物类型
export enum ObstacleType {
  CACTUS_SMALL = 'cactus_small',
  CACTUS_LARGE = 'cactus_large',
  BIRD = 'bird'
}

// 障碍物接口
export interface Obstacle extends GameObject {
  type: ObstacleType
  speed: number
}

// 云朵接口
export interface Cloud extends GameObject {
  speed: number
}

// 地面接口
export interface Ground {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

// 游戏状态
export enum GameState {
  WAITING = 'waiting',
  PLAYING = 'playing',
  GAME_OVER = 'game_over'
}

// 游戏配置
export interface GameConfig {
  canvas: {
    width: number
    height: number
  }
  dino: {
    width: number
    height: number
    jumpForce: number
    gravity: number
  }
  obstacles: {
    minDistance: number
    maxDistance: number
    speed: number
    speedIncrement: number
    cactus: {
      width: number
      height: number
    }
    bird: {
      width: number
      height: number
    }
  }
  ground: {
    speed: number
  }
  cloud: {
    speed: number
    minDistance: number
    maxDistance: number
  }
}

// 游戏数据接口
export interface GameData {
  state: GameState
  score: number
  highScore: number
  speed: number
  dino: Dino
  obstacles: Obstacle[]
  clouds: Cloud[]
  ground: Ground
  isNightMode: boolean
}
import { reactive, onMounted, onUnmounted } from 'vue'
import type { GameData, Dino, Obstacle, Cloud, Ground } from '@/types/game'
import { GameState, DinoState, ObstacleType } from '@/types/game'
import { GAME_CONFIG, GAME_CONSTANTS } from '@/config/game'
import { checkCollision, getRandomFloat, getRandomInt, getHighScore, saveHighScore } from '@/utils/gameUtils'

export function useGame() {
  // 游戏数据
  const gameData = reactive<GameData>({
    state: GameState.WAITING,
    score: 0,
    highScore: getHighScore(),
    speed: GAME_CONFIG.obstacles.speed,
    dino: {
      x: 75,
      y: 0,
      width: GAME_CONFIG.dino.width,
      height: GAME_CONFIG.dino.height,
      velocityY: 0,
      jumpForce: GAME_CONFIG.dino.jumpForce,
      gravity: GAME_CONFIG.dino.gravity,
      groundY: 0,
      state: DinoState.RUNNING
    } as Dino,
    obstacles: [] as Obstacle[],
    clouds: [] as Cloud[],
    ground: {
      x: 0,
      y: 0,
      width: GAME_CONFIG.canvas.width * 2,
      height: GAME_CONSTANTS.GROUND_HEIGHT,
      speed: GAME_CONFIG.ground.speed
    } as Ground,
    isNightMode: false
  })

  let animationId: number = 0

  // 初始化游戏
  const initGame = () => {
    // 设置地面和恐龙位置
    gameData.ground.y = GAME_CONFIG.canvas.height - GAME_CONSTANTS.GROUND_HEIGHT
    gameData.dino.groundY = gameData.ground.y - gameData.dino.height - GAME_CONSTANTS.DINO_GROUND_OFFSET
    gameData.dino.y = gameData.dino.groundY
  }

  // 开始游戏
  const startGame = () => {
    if (gameData.state === GameState.GAME_OVER) {
      resetGame()
    }
    gameData.state = GameState.PLAYING
    
    // 确保游戏开始时很快就有障碍物出现
    if (gameData.obstacles.length === 0) {
      setTimeout(() => {
        if (gameData.state === GameState.PLAYING && gameData.obstacles.length === 0) {
          generateObstacle()
        }
      }, 1000) // 1秒后生成第一个障碍物
    }
    
    gameLoop()
  }

  // 重置游戏
  const resetGame = () => {
    gameData.score = 0
    gameData.speed = GAME_CONFIG.obstacles.speed
    gameData.dino.y = gameData.dino.groundY
    gameData.dino.velocityY = 0
    gameData.dino.state = DinoState.RUNNING
    gameData.obstacles = []
    gameData.clouds = []
    gameData.ground.x = 0
    gameData.isNightMode = false
  }

  // 恐龙跳跃
  const jump = () => {
    if (gameData.state === GameState.WAITING) {
      startGame()
      return
    }
    
    if (gameData.state === GameState.PLAYING && gameData.dino.y === gameData.dino.groundY) {
      gameData.dino.velocityY = gameData.dino.jumpForce
      gameData.dino.state = DinoState.JUMPING
    }
    
    if (gameData.state === GameState.GAME_OVER) {
      startGame()
    }
  }

  // 恐龙蹲下
  const duck = () => {
    if (gameData.state === GameState.PLAYING && gameData.dino.y === gameData.dino.groundY) {
      gameData.dino.state = DinoState.DUCKING
    }
  }

  // 恐龙停止蹲下
  const stopDucking = () => {
    if (gameData.dino.state === DinoState.DUCKING) {
      gameData.dino.state = DinoState.RUNNING
    }
  }

  // 更新恐龙
  const updateDino = () => {
    // 重力
    gameData.dino.velocityY += gameData.dino.gravity
    gameData.dino.y += gameData.dino.velocityY

    // 地面碰撞
    if (gameData.dino.y >= gameData.dino.groundY) {
      gameData.dino.y = gameData.dino.groundY
      gameData.dino.velocityY = 0
      if (gameData.dino.state === DinoState.JUMPING) {
        gameData.dino.state = DinoState.RUNNING
      }
    }
  }

  // 生成障碍物
  const generateObstacle = () => {
    // 计算最后一个障碍物的右边缘位置
    const lastObstacleRight = gameData.obstacles.length > 0 
      ? Math.max(...gameData.obstacles.map(o => o.x + o.width))
      : 0
    
    // 计算距离屏幕右边缘的距离
    const distanceFromEdge = GAME_CONFIG.canvas.width - lastObstacleRight
    
    // 根据分数调整难度 - 分数越高，障碍物间距越小
    const difficultyMultiplier = Math.max(0.5, 1 - gameData.score / 1000)
    const adjustedMinDistance = GAME_CONFIG.obstacles.minDistance * difficultyMultiplier
    const adjustedMaxDistance = GAME_CONFIG.obstacles.maxDistance * difficultyMultiplier
    const minDistance = getRandomFloat(adjustedMinDistance, adjustedMaxDistance)
    
    // 如果距离足够，生成新障碍物
    if (distanceFromEdge >= minDistance || gameData.obstacles.length === 0) {
      // 早期游戏降低飞鸟出现概率
      let obstacleTypes = [ObstacleType.CACTUS_SMALL, ObstacleType.CACTUS_LARGE]
      if (gameData.score > 50) {
        obstacleTypes.push(ObstacleType.BIRD)
      }
      
      const type = obstacleTypes[getRandomInt(0, obstacleTypes.length - 1)]
      
      let obstacle: Obstacle
      
      switch (type) {
        case ObstacleType.CACTUS_SMALL:
          obstacle = {
            x: GAME_CONFIG.canvas.width,
            y: gameData.ground.y - GAME_CONFIG.obstacles.cactus.height,
            width: GAME_CONFIG.obstacles.cactus.width,
            height: GAME_CONFIG.obstacles.cactus.height,
            type,
            speed: gameData.speed
          }
          break
        case ObstacleType.CACTUS_LARGE:
          obstacle = {
            x: GAME_CONFIG.canvas.width,
            y: gameData.ground.y - GAME_CONFIG.obstacles.cactus.height,
            width: GAME_CONFIG.obstacles.cactus.width,
            height: GAME_CONFIG.obstacles.cactus.height,
            type,
            speed: gameData.speed
          }
          break
        case ObstacleType.BIRD:
          // 更合理的飞鸟高度设置
          const birdHeights = [
            gameData.dino.groundY - 40,  // 低飞 - 需要蹲下
            gameData.dino.groundY - 80,  // 中等高度 - 需要跳跃
            gameData.dino.groundY - 120  // 高飞 - 可以通过
          ]
          const randomIndex = getRandomInt(0, birdHeights.length - 1)
          const birdY = birdHeights[randomIndex] || gameData.dino.groundY - 80
          obstacle = {
            x: GAME_CONFIG.canvas.width,
            y: Math.max(30, birdY), // 确保不会太高
            width: GAME_CONFIG.obstacles.bird.width,
            height: GAME_CONFIG.obstacles.bird.height,
            type,
            speed: gameData.speed
          }
          break
        default:
          return
      }
      
      gameData.obstacles.push(obstacle)
    }
  }

  // 生成云朵
  const generateCloud = () => {
    // 计算最后一个云朵的右边缘位置
    const lastCloudRight = gameData.clouds.length > 0 
      ? Math.max(...gameData.clouds.map(c => c.x + c.width))
      : 0
    
    // 计算距离屏幕右边缘的距离
    const distanceFromEdge = GAME_CONFIG.canvas.width - lastCloudRight
    const minDistance = getRandomFloat(GAME_CONFIG.cloud.minDistance, GAME_CONFIG.cloud.maxDistance)
    
    // 如果距离足够，生成新云朵
    if (distanceFromEdge >= minDistance || gameData.clouds.length === 0) {
      const cloud: Cloud = {
        x: GAME_CONFIG.canvas.width,
        y: getRandomInt(20, 80),
        width: 46,
        height: 14,
        speed: GAME_CONFIG.cloud.speed
      }
      
      gameData.clouds.push(cloud)
    }
  }

  // 更新障碍物
  const updateObstacles = () => {
    gameData.obstacles = gameData.obstacles.filter((obstacle) => {
      obstacle.x -= obstacle.speed
      return obstacle.x + obstacle.width > 0
    })
  }

  // 更新云朵
  const updateClouds = () => {
    gameData.clouds = gameData.clouds.filter((cloud) => {
      cloud.x -= cloud.speed
      return cloud.x + cloud.width > 0
    })
  }

  // 更新地面
  const updateGround = () => {
    gameData.ground.x -= gameData.speed
    if (gameData.ground.x <= -GAME_CONFIG.canvas.width) {
      gameData.ground.x = 0
    }
  }

  // 碰撞检测
  const checkCollisions = () => {
    for (const obstacle of gameData.obstacles) {
      if (checkCollision(gameData.dino, obstacle)) {
        gameOver()
        return
      }
    }
  }

  // 更新分数和速度
  const updateScore = () => {
    gameData.score += GAME_CONSTANTS.SCORE_INCREMENT
    
    // 每100分增加速度
    const newSpeed = GAME_CONFIG.obstacles.speed + Math.floor(gameData.score / 100) * GAME_CONFIG.obstacles.speedIncrement
    gameData.speed = Math.min(newSpeed, GAME_CONSTANTS.MAX_SPEED)
    
    // 夜间模式切换
    const cyclePosition = Math.floor(gameData.score / GAME_CONSTANTS.NIGHT_MODE_INTERVAL) % 2
    gameData.isNightMode = cyclePosition === 1
  }

  // 游戏结束
  const gameOver = () => {
    gameData.state = GameState.GAME_OVER
    gameData.dino.state = DinoState.CRASHED
    
    if (gameData.score > gameData.highScore) {
      gameData.highScore = gameData.score
      saveHighScore(gameData.highScore)
    }
    
    cancelAnimationFrame(animationId)
  }

  // 游戏循环
  const gameLoop = () => {
    if (gameData.state !== GameState.PLAYING) return
    
    // 更新
    updateDino()
    generateObstacle()
    generateCloud()
    updateObstacles()
    updateClouds()
    updateGround()
    checkCollisions()
    updateScore()
    
    // 继续循环
    animationId = requestAnimationFrame(gameLoop)
  }

  // 键盘事件处理
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      event.preventDefault()
      jump()
    }
    if (event.code === 'ArrowDown') {
      event.preventDefault()
      duck()
    }
  }

  // 键盘抬起事件处理
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'ArrowDown') {
      event.preventDefault()
      stopDucking()
    }
  }

  // 触摸事件处理
  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault()
    jump()
  }

  // 组件挂载
  onMounted(() => {
    initGame()
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('touchstart', handleTouchStart)
  })

  // 组件卸载
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('keyup', handleKeyUp)
    document.removeEventListener('touchstart', handleTouchStart)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  })

  return {
    gameData,
    jump,
    startGame,
    resetGame,
    initGame
  }
}
import { ref } from 'vue'
import type { GameData, Dino, Obstacle, Cloud, Ground } from '@/types/game'
import { GameState, DinoState, ObstacleType } from '@/types/game'
import { GAME_CONFIG } from '@/config/game'
import { formatScore } from '@/utils/gameUtils'

export function useGameRenderer(gameData: GameData) {
  const canvas = ref<HTMLCanvasElement>()
  let ctx: CanvasRenderingContext2D | null = null
  let animationId: number = 0

  // 初始化渲染器
  const initRenderer = (canvasElement: HTMLCanvasElement) => {
    canvas.value = canvasElement
    ctx = canvasElement.getContext('2d')
    if (ctx) {
      ctx.imageSmoothingEnabled = false
    }
    startRenderLoop()
  }

  // 清空画布
  const clearCanvas = () => {
    if (!ctx) return
    ctx.fillStyle = gameData.isNightMode ? '#222' : '#f7f7f7'
    ctx.fillRect(0, 0, GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height)
  }

  // 绘制像素风格小人
  const drawDino = (dino: Dino) => {
    if (!ctx) return

    // 像素风格颜色定义
    const colors = {
      skin: '#FFDBAC',      // 肤色
      hair: '#8B4513',      // 棕色头发
      shirt: '#0066FF',     // 蓝色衬衫
      overalls: '#00AA00',  // 绿色背带裤
      pants: '#000080',     // 深蓝裤子
      shoes: '#8B0000',     // 深红鞋子
      black: '#000000',     // 黑色（眼睛、轮廓）
      white: '#FFFFFF'      // 白色
    }

    // 状态颜色调整
    if (dino.state === DinoState.CRASHED) {
      colors.shirt = '#FF4444'
      colors.overalls = '#FF8888'
    } else if (dino.state === DinoState.JUMPING) {
      colors.shirt = '#44FF44'
      colors.overalls = '#88FFAA'
    } else if (dino.state === DinoState.DUCKING) {
      colors.shirt = '#FFFF44'
      colors.overalls = '#FFFFAA'
    }

    const pixelSize = 4 // 像素块大小
    const startX = dino.x
    const startY = dino.y

    // 像素绘制辅助函数
    const drawPixel = (x: number, y: number, color: string, width = 1, height = 1) => {
      ctx!.fillStyle = color
      ctx!.fillRect(startX + x * pixelSize, startY + y * pixelSize, width * pixelSize, height * pixelSize)
    }

    if (dino.state === DinoState.CRASHED) {
      // 倒下状态的像素小人
      ctx.save()
      ctx.translate(startX + 24, startY + 40)
      ctx.rotate(Math.PI / 4)
      
      // 绘制倒下的小人
      drawPixel(-6, -8, colors.hair, 8, 2)
      drawPixel(-5, -6, colors.skin, 6, 4)
      drawPixel(-4, -4, colors.black, 1, 1) // 叉叉眼
      drawPixel(-1, -4, colors.black, 1, 1)
      drawPixel(-3, -2, colors.shirt, 6, 4)
      drawPixel(-2, 2, colors.overalls, 4, 4)
      drawPixel(-4, 6, colors.pants, 2, 4)
      drawPixel(2, 6, colors.pants, 2, 4)
      drawPixel(-5, 10, colors.shoes, 3, 2)
      drawPixel(2, 10, colors.shoes, 3, 2)
      
      ctx.restore()
      
    } else if (dino.state === DinoState.DUCKING) {
      // 蹲下状态的像素小人
      // 帽子
      drawPixel(2, 0, colors.hair, 8, 2)
      drawPixel(1, 2, colors.hair, 10, 2)
      
      // 头部
      drawPixel(3, 4, colors.skin, 6, 3)
      
      // 眼睛
      drawPixel(4, 5, colors.black, 1, 1)
      drawPixel(7, 5, colors.black, 1, 1)
      
      // 身体（蹲下状态）
      drawPixel(2, 7, colors.shirt, 8, 4)
      drawPixel(3, 11, colors.overalls, 6, 3)
      
      // 手臂
      drawPixel(0, 8, colors.skin, 2, 2)
      drawPixel(10, 8, colors.skin, 2, 2)
      
      // 腿部（蹲下）
      drawPixel(3, 14, colors.pants, 2, 4)
      drawPixel(7, 14, colors.pants, 2, 4)
      
      // 鞋子
      drawPixel(2, 18, colors.shoes, 3, 2)
      drawPixel(7, 18, colors.shoes, 3, 2)

    } else if (dino.state === DinoState.JUMPING) {
      // 跳跃状态的像素小人
      // 帽子
      drawPixel(2, 0, colors.hair, 8, 2)
      drawPixel(1, 2, colors.hair, 10, 2)
      
      // 头部
      drawPixel(3, 4, colors.skin, 6, 4)
      
      // 眼睛
      drawPixel(4, 5, colors.black, 1, 1)
      drawPixel(7, 5, colors.black, 1, 1)
      
      // 嘴巴（开心表情）
      drawPixel(5, 7, colors.black, 2, 1)
      
      // 身体
      drawPixel(3, 8, colors.shirt, 6, 4)
      drawPixel(4, 12, colors.overalls, 4, 4)
      
      // 手臂（向上伸展）
      drawPixel(0, 6, colors.skin, 2, 3)
      drawPixel(10, 6, colors.skin, 2, 3)
      
      // 腿部（弯曲跳跃姿势）
      drawPixel(3, 16, colors.pants, 2, 3)
      drawPixel(7, 16, colors.pants, 2, 3)
      
      // 鞋子
      drawPixel(2, 19, colors.shoes, 3, 2)
      drawPixel(7, 19, colors.shoes, 3, 2)

    } else {
      // 正常跑步状态的像素小人
      // 帽子
      drawPixel(2, 0, colors.hair, 8, 2)
      drawPixel(1, 2, colors.hair, 10, 2)
      
      // 头部
      drawPixel(3, 4, colors.skin, 6, 4)
      
      // 眼睛
      drawPixel(4, 5, colors.black, 1, 1)
      drawPixel(7, 5, colors.black, 1, 1)
      
      // 鼻子
      drawPixel(6, 6, colors.skin, 1, 1)
      
      // 身体
      drawPixel(3, 8, colors.shirt, 6, 4)
      drawPixel(4, 12, colors.overalls, 4, 4)
      
      // 跑步手臂动画
      if (dino.state === DinoState.RUNNING) {
        const armFrame = Math.floor(Date.now() / 150) % 2
        if (armFrame === 0) {
          // 左臂向前，右臂向后
          drawPixel(1, 9, colors.skin, 2, 2)
          drawPixel(9, 10, colors.skin, 2, 2)
        } else {
          // 右臂向前，左臂向后
          drawPixel(1, 10, colors.skin, 2, 2)
          drawPixel(9, 9, colors.skin, 2, 2)
        }
      } else {
        // 静止手臂
        drawPixel(1, 9, colors.skin, 2, 2)
        drawPixel(9, 9, colors.skin, 2, 2)
      }
      
      // 腿部跑步动画
      if (dino.state === DinoState.RUNNING) {
        const legFrame = Math.floor(Date.now() / 120) % 2
        if (legFrame === 0) {
          // 左脚前，右脚后
          drawPixel(3, 16, colors.pants, 2, 4)
          drawPixel(7, 17, colors.pants, 2, 3)
        } else {
          // 右脚前，左脚后
          drawPixel(3, 17, colors.pants, 2, 3)
          drawPixel(7, 16, colors.pants, 2, 4)
        }
      } else {
        // 静止腿部
        drawPixel(3, 16, colors.pants, 2, 4)
        drawPixel(7, 16, colors.pants, 2, 4)
      }
      
      // 鞋子
      drawPixel(2, 20, colors.shoes, 3, 2)
      drawPixel(7, 20, colors.shoes, 3, 2)
    }

    // 添加像素风格特效
    if (dino.state === DinoState.JUMPING) {
      // 跳跃光环特效（像素化）
      ctx.strokeStyle = colors.white
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.arc(startX + 24, startY + 40, 30, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
    }
    
    if (dino.state === DinoState.RUNNING) {
      // 跑步汗珠特效（像素化）
      const sweatFrame = Math.floor(Date.now() / 200) % 3
      if (sweatFrame === 0) {
        drawPixel(10, 3, colors.white, 1, 1)
        drawPixel(11, 4, colors.white, 1, 1)
      }
    }
  }

  // 绘制障碍物
  const drawObstacle = (obstacle: Obstacle) => {
    if (!ctx) return
    
    switch (obstacle.type) {
      case ObstacleType.CACTUS_SMALL:
        // 小路障/垃圾桶
        ctx.fillStyle = '#ff6b35' // 橙色垃圾桶
        ctx.fillRect(obstacle.x + 4, obstacle.y, obstacle.width - 8, obstacle.height) // 主体
        
        // 垃圾桶盖子
        ctx.fillStyle = '#e55a2b'
        ctx.fillRect(obstacle.x + 2, obstacle.y, obstacle.width - 4, 8)
        
        // 垃圾桶手柄
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(obstacle.x + 2, obstacle.y + 5, 3, 0, Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(obstacle.x + obstacle.width - 2, obstacle.y + 5, 3, 0, Math.PI)
        ctx.stroke()
        
        // 垃圾桶标志
        ctx.fillStyle = '#fff'
        ctx.fillRect(obstacle.x + 8, obstacle.y + 15, 8, 2)
        ctx.fillRect(obstacle.x + 8, obstacle.y + 20, 8, 2)
        ctx.fillRect(obstacle.x + 8, obstacle.y + 25, 8, 2)
        break
        
      case ObstacleType.CACTUS_LARGE:
        // 大路障/交通锥
        ctx.fillStyle = '#ff4444' // 红色交通锥
        
        // 锥形主体
        ctx.beginPath()
        ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y)
        ctx.lineTo(obstacle.x, obstacle.y + obstacle.height)
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height)
        ctx.closePath()
        ctx.fill()
        
        // 白色反光条
        ctx.fillStyle = '#fff'
        ctx.fillRect(obstacle.x + 4, obstacle.y + 15, obstacle.width - 8, 4)
        ctx.fillRect(obstacle.x + 6, obstacle.y + 25, obstacle.width - 12, 4)
        ctx.fillRect(obstacle.x + 8, obstacle.y + 35, obstacle.width - 16, 4)
        
        // 底座
        ctx.fillStyle = '#333'
        ctx.fillRect(obstacle.x - 2, obstacle.y + obstacle.height - 5, obstacle.width + 4, 5)
        break
        
      case ObstacleType.BIRD:
        // 飞行无人机
        const propellerPhase = Math.floor(Date.now() / 100) % 4 // 螺旋桨旋转
        
        // 机身
        ctx.fillStyle = '#4285f4' // 蓝色机身
        ctx.fillRect(obstacle.x + 15, obstacle.y + 15, 20, 10)
        
        // 机头
        ctx.fillStyle = '#34a853'
        ctx.fillRect(obstacle.x + 35, obstacle.y + 16, 8, 8)
        
        // 螺旋桨（旋转动画）
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 3
        const centerX = obstacle.x + 25
        const centerY = obstacle.y + 10
        
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(propellerPhase * Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(-8, 0)
        ctx.lineTo(8, 0)
        ctx.moveTo(0, -8)
        ctx.lineTo(0, 8)
        ctx.stroke()
        ctx.restore()
        
        // 起落架
        ctx.fillStyle = '#333'
        ctx.fillRect(obstacle.x + 18, obstacle.y + 25, 3, 8)
        ctx.fillRect(obstacle.x + 29, obstacle.y + 25, 3, 8)
        
        // LED灯效果
        const ledFrame = Math.floor(Date.now() / 300) % 2
        if (ledFrame === 0) {
          ctx.fillStyle = '#ff0000'
          ctx.beginPath()
          ctx.arc(obstacle.x + 20, obstacle.y + 18, 2, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.fillStyle = '#00ff00'
          ctx.beginPath()
          ctx.arc(obstacle.x + 30, obstacle.y + 18, 2, 0, Math.PI * 2)
          ctx.fill()
        }
        break
    }
  }

  // 绘制云朵
  const drawCloud = (cloud: Cloud) => {
    if (!ctx) return

    ctx.fillStyle = gameData.isNightMode ? '#555' : '#ddd'
    
    // 更真实的云朵形状
    const x = cloud.x
    const y = cloud.y
    
    // 云朵底部
    ctx.fillRect(x + 6, y + 8, 34, 6)
    
    // 云朵顶部圆形部分
    ctx.fillRect(x + 2, y + 4, 8, 8)
    ctx.fillRect(x + 10, y + 2, 8, 8)
    ctx.fillRect(x + 18, y + 4, 8, 8)
    ctx.fillRect(x + 26, y + 6, 8, 8)
    ctx.fillRect(x + 34, y + 8, 8, 6)
    
    // 连接部分
    ctx.fillRect(x + 4, y + 6, 36, 4)
  }

  // 绘制地面
  const drawGround = (ground: Ground) => {
    if (!ctx) return

    ctx.fillStyle = gameData.isNightMode ? '#444' : '#535353'
    
    // 地面虚线
    for (let x = ground.x; x < GAME_CONFIG.canvas.width + 50; x += 20) {
      ctx.fillRect(x, ground.y, 10, 2)
    }
    
    // 地面底部
    ctx.fillRect(0, ground.y + 2, GAME_CONFIG.canvas.width, ground.height - 2)
  }

  // 绘制分数
  const drawScore = () => {
    if (!ctx) return

    ctx.fillStyle = gameData.isNightMode ? '#fff' : '#535353'
    ctx.font = '16px monospace'
    ctx.textAlign = 'right'
    
    const scoreText = `HI ${formatScore(gameData.highScore)} ${formatScore(gameData.score)}`
    ctx.fillText(scoreText, GAME_CONFIG.canvas.width - 20, 30)
  }

  // 绘制游戏开始提示
  const drawStartMessage = () => {
    if (!ctx || gameData.state !== GameState.WAITING) return

    ctx.fillStyle = gameData.isNightMode ? '#fff' : '#535353'
    ctx.font = '20px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('Press SPACE to start', GAME_CONFIG.canvas.width / 2, GAME_CONFIG.canvas.height / 2)
  }

  // 绘制游戏结束界面
  const drawGameOver = () => {
    if (!ctx || gameData.state !== GameState.GAME_OVER) return

    ctx.fillStyle = gameData.isNightMode ? '#fff' : '#535353'
    ctx.font = '24px monospace'
    ctx.textAlign = 'center'
    
    ctx.fillText('GAME OVER', GAME_CONFIG.canvas.width / 2, GAME_CONFIG.canvas.height / 2 - 20)
    
    ctx.font = '16px monospace'
    ctx.fillText('Press SPACE to restart', GAME_CONFIG.canvas.width / 2, GAME_CONFIG.canvas.height / 2 + 20)
  }

  // 主渲染函数
  const render = () => {
    clearCanvas()
    
    // 绘制云朵
    gameData.clouds.forEach(drawCloud)
    
    // 绘制地面
    drawGround(gameData.ground)
    
    // 绘制恐龙
    drawDino(gameData.dino)
    
    // 绘制障碍物
    gameData.obstacles.forEach(drawObstacle)
    
    // 绘制UI
    drawScore()
    drawStartMessage()
    drawGameOver()
  }

  // 渲染循环
  const renderLoop = () => {
    render()
    animationId = requestAnimationFrame(renderLoop)
  }

  // 开始渲染循环
  const startRenderLoop = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    renderLoop()
  }

  // 停止渲染循环
  const stopRenderLoop = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = 0
    }
  }

  return {
    initRenderer,
    render,
    startRenderLoop,
    stopRenderLoop
  }
}
// 碰撞检测
export function checkCollision(
  dino: { x: number; y: number; width: number; height: number; state?: string }, 
  obstacle: { x: number; y: number; width: number; height: number }
): boolean {
  // 蹲下时调整恐龙的碰撞盒
  let dinoCollisionBox = {
    x: dino.x + 6,
    y: dino.state === 'ducking' ? dino.y + 20 : dino.y + 5,
    width: dino.state === 'ducking' ? 30 : 32,
    height: dino.state === 'ducking' ? 15 : 35
  }
  
  // 障碍物碰撞盒稍微收缩以提供更好的游戏体验
  let obstacleCollisionBox = {
    x: obstacle.x + 2,
    y: obstacle.y + 2,
    width: obstacle.width - 4,
    height: obstacle.height - 4
  }
  
  return dinoCollisionBox.x < obstacleCollisionBox.x + obstacleCollisionBox.width &&
         dinoCollisionBox.x + dinoCollisionBox.width > obstacleCollisionBox.x &&
         dinoCollisionBox.y < obstacleCollisionBox.y + obstacleCollisionBox.height &&
         dinoCollisionBox.y + dinoCollisionBox.height > obstacleCollisionBox.y
}

// 获取随机数
export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 本地存储
export function saveHighScore(score: number): void {
  localStorage.setItem('dino-high-score', score.toString())
}

export function getHighScore(): number {
  const stored = localStorage.getItem('dino-high-score')
  return stored ? parseInt(stored, 10) : 0
}

// 格式化分数
export function formatScore(score: number): string {
  return Math.floor(score).toString().padStart(5, '0')
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
  let timeoutId: number
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}
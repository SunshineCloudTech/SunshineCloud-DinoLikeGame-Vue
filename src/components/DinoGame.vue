<template>
  <div class="dino-game" :class="{ 'night-mode': gameData.isNightMode }">
    <div class="game-container">
      <canvas
        ref="gameCanvas"
        class="game-canvas"
        @click="handleClick"
        @touchstart="handleTouchStart"
      ></canvas>
      
      <div v-if="gameData.state === 'waiting'" class="game-instructions">
        <p>按 <kbd>空格键</kbd> 或 <kbd>↑</kbd> 键让小人跳跃</p>
        <p>按 <kbd>↓</kbd> 键让小人蹲下躲避</p>
        <p>手机端点击屏幕跳跃</p>
      </div>
      
      <div v-if="gameData.state === 'game_over'" class="game-over-screen">
        <h2>游戏结束</h2>
        <p>得分: {{ formatScore(gameData.score) }}</p>
        <p v-if="gameData.score === gameData.highScore" class="new-record">新纪录！</p>
        <button @click="restart" class="restart-button">
          重新开始
        </button>
      </div>
    </div>
    
    <div class="game-info">
      <div class="score-board">
        <div class="high-score">HI: {{ formatScore(gameData.highScore) }}</div>
        <div class="current-score">{{ formatScore(gameData.score) }}</div>
      </div>
      
      <div class="game-controls">
        <div class="control-hint">
          <span class="key">空格</span> / <span class="key">↑</span> 跳跃 · <span class="key">↓</span> 蹲下
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useGame } from '@/composables/useGame'
import { useGameRenderer } from '@/composables/useGameRenderer'
import { formatScore } from '@/utils/gameUtils'
import { GAME_CONFIG } from '@/config/game'

const gameCanvas = ref<HTMLCanvasElement>()

// 游戏逻辑
const { gameData, jump, startGame, resetGame, initGame } = useGame()

// 渲染系统
const { initRenderer } = useGameRenderer(gameData)

// 点击处理
const handleClick = () => {
  jump()
}

// 触摸处理
const handleTouchStart = (event: TouchEvent) => {
  event.preventDefault()
  jump()
}

// 重新开始游戏
const restart = () => {
  resetGame()
  startGame()
}

// 组件挂载后初始化
onMounted(async () => {
  await nextTick()
  if (gameCanvas.value) {
    // 设置画布 - 使用配置文件中的尺寸
    gameCanvas.value.width = GAME_CONFIG.canvas.width
    gameCanvas.value.height = GAME_CONFIG.canvas.height
    
    // 初始化游戏数据
    initGame()
    
    // 初始化渲染器
    initRenderer(gameCanvas.value)
  }
})
</script>

<style scoped>
.dino-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%);
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
  padding: 20px;
}

.dino-game.night-mode {
  background: linear-gradient(to bottom, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
}

.game-container {
  position: relative;
  margin: 20px 0;
  border: 3px solid #333;
  border-radius: 8px;
  background: #f7f7f7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
}

.night-mode .game-container {
  border-color: #555;
  background: #222;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

.game-canvas {
  display: block;
  cursor: pointer;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  width: 100%;
  height: auto;
}

.game-instructions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #333;
  font-size: 14px;
  line-height: 1.6;
}

.night-mode .game-instructions {
  background: rgba(34, 34, 34, 0.95);
  border-color: #555;
  color: #ecf0f1;
}

.game-over-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 12px;
  border: 3px solid #333;
  min-width: 250px;
}

.night-mode .game-over-screen {
  background: rgba(34, 34, 34, 0.95);
  border-color: #555;
  color: #ecf0f1;
}

.game-over-screen h2 {
  margin: 0 0 15px 0;
  font-size: 24px;
  color: #e74c3c;
}

.night-mode .game-over-screen h2 {
  color: #ff6b6b;
}

.new-record {
  color: #27ae60;
  font-weight: bold;
  animation: pulse 1s infinite;
}

.night-mode .new-record {
  color: #2ecc71;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.restart-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 15px;
}

.restart-button:hover {
  background: #2980b9;
}

.restart-button:active {
  transform: translateY(1px);
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  max-width: 100%;
  margin-top: 20px;
  padding: 0 20px;
}

.score-board {
  display: flex;
  gap: 20px;
  font-size: 18px;
  font-weight: bold;
}

.high-score {
  color: #7f8c8d;
}

.current-score {
  color: #2c3e50;
}

.night-mode .current-score {
  color: #ecf0f1;
}

.game-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-hint {
  font-size: 14px;
  color: #7f8c8d;
}

.night-mode .control-hint {
  color: #bdc3c7;
}

.key {
  background: #ecf0f1;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  color: #2c3e50;
}

.night-mode .key {
  background: #34495e;
  border-color: #7f8c8d;
  color: #ecf0f1;
}

kbd {
  background: #ecf0f1;
  border: 2px solid #bdc3c7;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 12px;
  font-weight: bold;
  color: #2c3e50;
}

.night-mode kbd {
  background: #34495e;
  border-color: #7f8c8d;
  color: #ecf0f1;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .game-info {
    width: 100%;
    flex-direction: column;
    gap: 15px;
  }
  
  .game-container {
    width: 100%;
    max-width: 1200px;
  }
  
  .game-canvas {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 500px) {
  .dino-game {
    padding: 10px;
  }
  
  .game-instructions,
  .game-over-screen {
    padding: 15px;
    font-size: 12px;
  }
  
  .score-board {
    font-size: 16px;
  }
  
  .control-hint {
    font-size: 12px;
  }
}
</style>
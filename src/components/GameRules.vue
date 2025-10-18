<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)

const toggleRules = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="game-rules">
    <div class="rules-header" @click="toggleRules">
      <h3>🎮 游戏玩法说明</h3>
      <span class="toggle-icon" :class="{ expanded: isExpanded }">▼</span>
    </div>
    
    <div class="rules-content" :class="{ expanded: isExpanded }">
      <div class="rules-grid">
        <div class="rule-section">
          <div class="rule-icon">🏃‍♂️</div>
          <h4>角色控制</h4>
          <ul>
            <li><kbd>空格键</kbd> 或 <kbd>↑</kbd> - 跳跃</li>
            <li><kbd>↓</kbd> - 蹲下躲避</li>
            <li>移动端：点击屏幕跳跃</li>
          </ul>
        </div>

        <div class="rule-section">
          <div class="rule-icon">🎯</div>
          <h4>游戏目标</h4>
          <ul>
            <li>避开所有障碍物</li>
            <li>坚持得越久得分越高</li>
            <li>挑战自己的最高纪录</li>
          </ul>
        </div>

        <div class="rule-section">
          <div class="rule-icon">🚧</div>
          <h4>障碍物类型</h4>
          <ul>
            <li>🗑️ 垃圾桶 - 需要跳跃避开</li>
            <li>🚧 交通锥 - 可蹲下通过</li>
            <li>🚁 无人机 - 飞行障碍物</li>
          </ul>
        </div>

        <div class="rule-section">
          <div class="rule-icon">⚡</div>
          <h4>游戏特色</h4>
          <ul>
            <li>🌙 自动日夜模式切换</li>
            <li>🎨 精美像素风格画面</li>
            <li>🏆 本地最高分记录</li>
            <li>📱 完美支持移动设备</li>
          </ul>
        </div>
      </div>

      <div class="tips-section">
        <h4>💡 游戏技巧</h4>
        <div class="tips-list">
          <div class="tip">观察障碍物的高度，选择跳跃或蹲下</div>
          <div class="tip">保持节奏感，不要急于操作</div>
          <div class="tip">练习时机掌握，提前做出反应</div>
          <div class="tip">利用连续障碍物之间的空隙</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-rules {
  max-width: 800px;
  margin: 2rem auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
}

.rules-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(102, 126, 234, 0.1);
  cursor: pointer;
  user-select: none;
  transition: background 0.3s ease;
}

.rules-header:hover {
  background: rgba(102, 126, 234, 0.15);
}

.rules-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
}

.toggle-icon {
  font-size: 1rem;
  color: #667eea;
  transition: transform 0.3s ease;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.rules-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.rules-content.expanded {
  max-height: 1000px;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.rule-section {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rule-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.rule-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.rule-section h4 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.rule-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rule-section li {
  padding: 0.5rem 0;
  color: #555;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rule-section li::before {
  content: "•";
  color: #667eea;
  font-weight: bold;
  font-size: 1.2rem;
}

kbd {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 4px;
  padding: 2px 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: bold;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tips-section {
  padding: 0 2rem 2rem 2rem;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
  margin-top: 1rem;
}

.tips-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.8rem;
}

.tip {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: transform 0.2s ease;
}

.tip:hover {
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .game-rules {
    margin: 1rem;
    border-radius: 8px;
  }
  
  .rules-header {
    padding: 1rem 1.5rem;
  }
  
  .rules-header h3 {
    font-size: 1.1rem;
  }
  
  .rules-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .rule-section {
    padding: 1rem;
  }
  
  .tips-section {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  
  .tips-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .rules-header {
    padding: 0.8rem 1rem;
  }
  
  .rules-grid {
    padding: 1rem;
  }
  
  .rule-section {
    padding: 0.8rem;
  }
  
  .rule-icon {
    font-size: 1.5rem;
  }
  
  .tips-section {
    padding: 0 1rem 1rem 1rem;
  }
}
</style>

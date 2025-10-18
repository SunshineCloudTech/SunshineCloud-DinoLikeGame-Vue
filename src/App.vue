<script setup lang="ts">
import DinoGame from './components/DinoGame.vue'
import GameRules from './components/GameRules.vue'
</script>

<template>
  <div id="app">
    <header class="app-header">
      <h1>Vue3 跑酷小人游戏</h1>
      <p>经典Chrome离线游戏的Vue 3 & TypeScript重制版，现在换成了可爱的小人角色！</p>
    </header>
    <DinoGame />
    <GameRules />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-header p {
  font-size: 1.1rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  .app-header p {
    font-size: 1rem;
  }
}
</style>

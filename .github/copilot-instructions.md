<!-- Vue3 Chrome Dino Game Project -->

This is a Vue3 project that recreates the Chrome Dino game with the following specifications:

## Project Overview
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: CSS with responsive design
- **Game Engine**: HTML5 Canvas
- **Build Tool**: Vite

## Game Features to Implement
- Dinosaur character with running and jumping animations
- Obstacle generation (cacti and birds)
- Ground scrolling effect
- Collision detection
- Score tracking and high score storage
- Game over screen with restart functionality
- Day/night mode toggle
- Responsive controls (spacebar, up arrow, touch)

## Architecture Guidelines
- Use Vue 3 Composition API for game logic
- Implement game loop using requestAnimationFrame
- Separate concerns: game engine, rendering, input handling
- Use TypeScript interfaces for game objects
- Implement proper component lifecycle management

## Development Standards
- Follow Vue 3 best practices
- Use TypeScript strict mode
- Implement proper error handling
- Ensure mobile responsiveness
- Optimize for 60fps performance
- Include comprehensive comments

## File Structure
- `/src/components/` - Vue components
- `/src/composables/` - Game logic composables
- `/src/assets/` - Game sprites and sounds
- `/src/types/` - TypeScript type definitions
- `/src/utils/` - Utility functions
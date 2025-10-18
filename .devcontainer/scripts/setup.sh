#!/bin/bash

# Vue3 Dino Game Development Setup Script
echo "🎮 Setting up Vue3 Chrome Dino Game development environment..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing project dependencies..."
    npm install
fi

# Check if all required dependencies are installed
echo "🔍 Checking project dependencies..."
npm list --depth=0

echo "✅ Development environment is ready!"
echo ""
echo "Available commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run preview - Preview production build"
echo "  npm run type-check - Check TypeScript types"
echo ""
echo "🎯 Ready to build the Chrome Dino game with Vue3!"
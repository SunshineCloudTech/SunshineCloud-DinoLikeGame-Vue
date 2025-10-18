#!/bin/bash

# Vue3 Dino Game Development Setup Script
echo "🎮 Setting up Vue3 Chrome Dino Game development environment..."

# Set error handling
set -e

# Show current directory and environment info
echo "📍 Current directory: $(pwd)"
echo "🐧 Environment: $(uname -a)"
echo "📦 Node.js: $(node --version)"
echo "🛠️ npm: $(npm --version)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in current directory"
    echo "📁 Directory contents:"
    ls -la
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing project dependencies..."
    
    # Use npm ci if package-lock.json exists, otherwise npm install
    if [ -f "package-lock.json" ]; then
        echo "🔒 Using npm ci (with lock file)..."
        npm ci
    else
        echo "🆓 Using npm install (no lock file)..."
        npm install
    fi
else
    echo "✅ node_modules already exists, skipping installation"
fi

# Verify installation
echo "🔍 Verifying project dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    echo "✅ All dependencies are properly installed"
else
    echo "⚠️ Some dependency issues detected, but continuing..."
fi

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🚀 Available commands:"
echo "  npm run dev        - Start development server (Vite)"
echo "  npm run build      - Build for production"
echo "  npm run preview    - Preview production build"
echo "  npm run type-check - TypeScript type checking"
echo ""
echo "🌐 Port forwarding configured:"
echo "  • 5173 - Vite development server"
echo "  • 4173 - Vite preview server"
echo ""
echo "🎯 Ready to build the Chrome Dino game with Vue3! 🦕✨"
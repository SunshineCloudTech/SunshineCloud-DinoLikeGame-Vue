# Vue3 TypeScript Chrome Dino Game Development Environment
FROM node:20-bookworm-slim

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=development

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    build-essential \
    python3 \
    python3-pip \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

# Set the working directory
WORKDIR /workspace

# Change ownership of the workspace to the node user
RUN chown -R node:node /workspace

# Switch to the non-root user
USER node

# Install global npm packages that are useful for Vue development
RUN npm install -g \
    @vue/cli \
    typescript \
    ts-node \
    prettier \
    eslint \
    vite

# Default command
CMD ["/bin/bash"]
# Production Dockerfile for 11X AI Career Launchpad
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency configs
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build Vite frontend for production
RUN npm run build

# Expose port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start Express full-stack API server
CMD ["node", "server/index.js"]

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the backend app
RUN npm run build --workspace=apps/backend

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package*.json ./
COPY --from=builder /app/apps/backend/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"] 
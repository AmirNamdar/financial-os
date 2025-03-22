# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY apps/mcp-server/package*.json ./apps/mcp-server/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the MCP server app
RUN npm run build --workspace=apps/mcp-server

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/apps/mcp-server/dist ./dist
COPY --from=builder /app/apps/mcp-server/package*.json ./
COPY --from=builder /app/apps/mcp-server/node_modules ./node_modules

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"] 
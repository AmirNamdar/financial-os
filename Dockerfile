# Use the official Node.js 18 Alpine image as a base for the build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"] 
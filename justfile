# This is a justfile for task automation
# Run 'just --list' to see all available commands

# Build the application for production
build:
    @npm run build

# Start the application in development mode with hot-reload
dev:
    @npm run start:dev

# Start the application in production mode
start:
    @npm run start:prod

# Run all tests
test:
    @npm run test

# Lint the code using ESLint
lint:
    @npm run lint

# Format the code using Prettier
format:
    @npm run format

# Compile TypeScript files
compile:
    @npm run compile

# Run a TypeScript script with ES module support
# Example: just script src/myfile.ts
script file:
    @NODE_OPTIONS="--loader ts-node/esm --no-warnings" npx ts-node-esm {{file}}

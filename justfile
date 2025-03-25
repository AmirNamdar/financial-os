# This is a justfile for task automation
# Run 'just --list' to see all available commands

# List all recipes
default:
    @just --list

# Build application
build:
    npm run build

# Run dev mode
dev:
    npm run start:dev

# Run prod mode
start:
    npm run start:prod

# Run tests
test:
    npm run test

# Run linter
lint:
    npm run lint

# Format code
format:
    npm run format

# Compile code
compile:
    npm run compile

# Run TypeScript script
# Example: just script src/myfile.ts
script PATH:
    npx ts-node {{PATH}}

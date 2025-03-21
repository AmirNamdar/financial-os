# Justfile for task automation

# Task to build the application
build:
    npm run build

# Task to start the application in development mode with hot-reload
dev:
    npm run start:dev

# Task to start the application in production mode
start:
    npm run start:prod

# Task to run tests
test:
    npm run test

# Task to lint the code
lint:
    npm run lint

# Task to format the code
format:
    npm run format

# Task to compile TypeScript
compile:
    npm run compile 
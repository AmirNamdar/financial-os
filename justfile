# This is a justfile for task automation
# Run 'just --list' to see all available commands

# Build applications for production
# Usage: just build [app]
# If app is not provided, builds all applications
build app="":
  #!/usr/bin/env sh
  if [ "{{app}}" = "" ]; then \
  npm run build; \
  else \
  npm run build --workspace=apps/{{app}}; \
  fi

# Start an application in development mode with hot-reload
# Usage: just dev [app]
# If app is not provided, starts the backend
dev app="backend":
  #!/usr/bin/env sh
  npm run start:dev --workspace=apps/{{app}}

# Start an application in production mode
# Usage: just start [app]
# If app is not provided, starts the backend
start app="backend":
  #!/usr/bin/env sh
  npm run start:prod --workspace=apps/{{app}}

# Run tests
# Usage: just test [app]
# If app is not provided, runs tests for all applications
test app="":
  #!/usr/bin/env sh
  if [ "{{app}}" = "" ]; then \
  npm run test; \
  else \
  npm run test --workspace=apps/{{app}}; \
  fi

# Lint the code using ESLint
# Usage: just lint [app]
# If app is not provided, lints all applications
lint app="":
  #!/usr/bin/env sh
  if [ "{{app}}" = "" ]; then \
  npm run lint; \
  else \
  npm run lint --workspace=apps/{{app}}; \
  fi

# Format the code using Prettier
# Usage: just format [app]
# If app is not provided, formats all applications
format app="":
  #!/usr/bin/env sh
  if [ "{{app}}" = "" ]; then \
  npm run format; \
  else \
  npm run format --workspace=apps/{{app}}; \
  fi

# Compile TypeScript files
# Usage: just compile [app]
# If app is not provided, compiles all applications
compile app="":
  #!/usr/bin/env sh
  if [ "{{app}}" = "" ]; then \
  npm run compile; \
  else \
  npm run compile --workspace=apps/{{app}}; \
  fi

# Run a TypeScript script with ES module support
# Example: just script src/myfile.ts
script file:
  #!/usr/bin/env sh
  NODE_OPTIONS="--loader ts-node/esm --no-warnings" npx ts-node-esm {{file}}

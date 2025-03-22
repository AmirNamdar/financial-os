# Tech Tooling Documentation

This document explains the technical decisions behind the tools we use in this project, including why we chose them and how they are configured.

## Runtime Environment Management - fnm (Fast Node Manager)

### Why

- **Performance**: fnm is significantly faster than nvm (Node Version Manager) due to its Rust implementation
- **Cross-Platform**: Works seamlessly across different operating systems
- **Shell Integration**: Provides automatic Node.js version switching when entering project directories
- **Project-Specific Versions**: Allows different projects to use different Node.js versions without conflicts
- **Modern Features**: Supports the latest Node.js features and has better TypeScript support
- **Project Standardization**: Ensures all developers use the same Node.js version for consistency

### Configuration

- Installed via Homebrew on macOS: `brew install fnm`
- Shell integration added to `.zshrc`: `eval "$(fnm env --use-on-cd)"`
- Project-specific Node.js version defined in `.node-version` file (version 20)
- Automatic version switching when entering project directory
- Version management is handled through the `.node-version` file, making it easy to update across the team

## Runtime - Node.js

### Why

- **TypeScript Support**: Native support for TypeScript through ts-node and TypeScript compiler
- **NestJS Framework**: Built on top of Node.js, providing robust server-side capabilities
- **Large Ecosystem**: Access to npm's extensive package ecosystem
- **Performance**: V8 engine provides excellent runtime performance
- **Async/Await**: Native support for asynchronous programming patterns

### Configuration

- Version: 20.x LTS (managed by fnm)
- TypeScript configuration in `tsconfig.json`
- Build and runtime scripts defined in `package.json`

## Testing - Jest

### Why

- **NestJS Integration**: Official testing framework for NestJS applications
- **TypeScript Support**: Native TypeScript support without additional configuration
- **Snapshot Testing**: Built-in support for snapshot testing
- **Parallel Execution**: Runs tests in parallel for faster execution
- **Code Coverage**: Built-in code coverage reporting

### Configuration

- Configuration in `jest.config.js`
- Test files located in `test/` directory
- Coverage reports generated with `npm run test:cov`

## Linting - ESLint

### Why

- **TypeScript Support**: Excellent TypeScript linting capabilities
- **Code Quality**: Enforces consistent code style and catches potential errors
- **Extensible**: Large ecosystem of plugins and configurations
- **Integration**: Works well with modern IDEs and CI/CD pipelines

### Configuration

- Configuration in `.eslintrc.json`
- TypeScript-specific rules in `eslint.config.js`
- Pre-commit hooks for automatic linting

## Code Formatting - Prettier

### Why

- **Consistency**: Enforces a consistent code style across the project
- **Integration**: Works well with ESLint and TypeScript
- **Zero Configuration**: Opinionated defaults that work well for most projects
- **IDE Support**: Wide range of IDE integrations

### Configuration

- Configuration in `.prettierrc`
- Integration with ESLint through `eslint-config-prettier`
- Format on save enabled in recommended IDE settings

## Framework - NestJS

### Why

- Enterprise-ready framework that provides a robust architecture out of the box
- Built with and heavily supports TypeScript
- Modular design that encourages clean code architecture and dependency injection
- Strong ecosystem for building scalable server-side applications
- Built-in support for OpenAPI (Swagger) documentation
- Active community and regular updates

### Configuration

- Using latest version for improved features and security
- Configured with TypeScript for type safety
- Uses dependency injection for better testability and maintainability

## Language - TypeScript

### Why

- Static typing for better code quality and developer experience
- Enhanced IDE support with better autocompletion and refactoring capabilities
- Catch errors at compile time rather than runtime
- Better documentation through type definitions
- Improved maintainability for large codebases

### Configuration

- Strict mode enabled for maximum type safety
- Path aliases configured for cleaner imports
- Configured to work with ESM modules
- Compilation targets ES2022 for modern JavaScript features

## CI/CD - GitHub Actions

### Why

- Native integration with GitHub
- Free for public repositories
- Extensive marketplace of pre-built actions
- Easy to configure and maintain
- Supports parallel job execution

### Configuration

- Runs on every push and pull request to main branch
- Sequential steps:
  1. Install dependencies
  2. Build application
  3. TypeScript compilation
  4. Run tests
  5. Lint code
- Uses Node.js 20 environment
- Caches dependencies for faster builds

## Package Management

- **npm**: Primary package manager
- **npm Workspaces**: Used for monorepo management

  - Enables managing multiple packages/applications in a single repository
  - Provides shared dependencies and consistent versioning
  - Allows running commands across all workspaces or targeting specific ones
  - Configuration in root `package.json`:
    ```json
    {
      "workspaces": ["apps/*"]
    }
    ```
  - Benefits:
    - Shared `node_modules` at the root level
    - Consistent dependency versions across all apps
    - Ability to use workspace references in package.json
    - Simplified dependency management
  - Common commands:

    ```bash
    # Install dependencies for all workspaces
    npm install

    # Run a command in a specific workspace
    npm run build --workspace=apps/backend

    # Run a command in all workspaces
    npm run build --workspaces

    # Add a dependency to a specific workspace
    npm install @nestjs/common --workspace=apps/backend

    # Add a shared dependency to root
    npm install typescript -w

    # Run tests in a specific workspace
    npm run test --workspace=apps/backend

    # Start development server for a specific app
    npm run start:dev --workspace=apps/backend
    ```
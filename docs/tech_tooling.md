# Tech Tooling Decisions

This document outlines the key technical tools used in our project and the reasoning behind their selection.

## Runtime - Node.js

### Why

- Using Node.js 20 for its improved performance, better ES modules support, and latest ECMAScript features
- LTS version that provides long-term stability and security updates
- Strong ecosystem compatibility with our chosen frameworks and tools

### Configuration

- Set in CI pipeline via `actions/setup-node@v4` with Node.js 20
- Local development requires Node.js 20+ for compatibility with dependencies

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

## Linting - ESLint

### Why

- Industry standard for static code analysis
- Helps maintain consistent code style
- Catches potential errors and bad practices
- Integrates well with TypeScript
- Customizable to match team preferences

### Configuration

- Using modern flat config format
- TypeScript-specific rules enabled
- Configured to auto-fix on save
- Integrated with CI pipeline for automated checks
- Custom rules for enforcing best practices

## Testing - Jest

### Why

- De facto standard for JavaScript/TypeScript testing
- Excellent TypeScript support
- Built-in code coverage reporting
- Snapshot testing capabilities
- Fast parallel test execution

### Configuration

- Configured for TypeScript support
- ES modules support enabled
- Integrated with CI pipeline
- Test files pattern: `*.spec.ts`

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

## Dependencies - NPM

### Why

- Using npm as it's the default package manager for Node.js
- Lock file ensures dependency consistency across environments
- Built-in security auditing

### Configuration

- Strict version management with package-lock.json
- Scripts defined for common operations
- Configured for ES modules with `"type": "module"`

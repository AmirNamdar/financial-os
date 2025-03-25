<p align="center">
  <h1> Financial OS <h1>
</p>

## Description

## Building and Running the Project

### Development Environment

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Development Server with Hot-Reload**:
   ```bash
   just dev
   ```

### Production Environment

1. **Build the Docker Image**:

   ```bash
   docker build -t financial-os .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 financial-os
   ```

This will start the application on port 3000, accessible at `http://localhost:3000`. The production build is optimized for performance and includes only the necessary runtime dependencies.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Project Structure

```
financial-os/
├── apps/
│   ├── backend/      # Main backend application
│   └── mcp-server/   # Mission Control Protocol server
├── libs/             # Shared libraries (if needed)
├── package.json      # Root package.json with workspaces
└── justfile         # Task automation
```

## Prerequisites

- Node.js (version specified in .node-version)
- npm
- just (task runner)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
# Start backend
just dev

# Start MCP server
just dev mcp-server
```

## Available Commands

### Build Commands

```bash
# Build all applications
just build

# Build specific application
just build backend
just build mcp-server
```

### Development Commands

```bash
# Start backend in development mode (default)
just dev

# Start specific application in development mode
just dev backend
just dev mcp-server

# Start in production mode
just start
just start backend
just start mcp-server
```

### Testing Commands

```bash
# Run tests for all applications
just test

# Run tests for specific application
just test backend
just test mcp-server
```

### Code Quality Commands

```bash
# Lint all applications
just lint

# Lint specific application
just lint backend
just lint mcp-server

# Format all applications
just format

# Format specific application
just format backend
just format mcp-server
```

### Compilation Commands

```bash
# Compile all applications
just compile

# Compile specific application
just compile backend
just compile mcp-server
```

### Utility Commands

```bash
# Run a TypeScript script
just script path/to/script.ts
```

## Development Guidelines

1. Each application in the `apps/` directory should have its own:

   - package.json
   - tsconfig.json
   - src/ directory
   - test/ directory

2. Shared code should be placed in the `libs/` directory

3. Use the provided commands to maintain code quality:
   - Run `just lint` before committing
   - Run `just test` to ensure tests pass
   - Run `just format` to format code

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

ISC

## Running TypeScript Scripts

This project is configured to use ES modules by default in package.json with `"type": "module"`. However, some legacy code may still use CommonJS patterns.

When running TypeScript scripts, you have a few options:

1. For scripts that work with ES modules (recommended for new code):

   ```
   NODE_OPTIONS="--loader ts-node/esm --no-warnings" npx ts-node-esm path/to/script.ts
   ```

2. For scripts that need CommonJS compatibility:

   ```
   npx ts-node path/to/script.ts
   ```

3. For optimal compatibility in mixed module environments, add a local `package.json` file in the directory containing your script:
   ```json
   {
     "type": "commonjs"
   }
   ```
   This allows you to run scripts with `npx ts-node` even if the main project uses ES modules.

# @financial-os/config

A flexible configuration module for Financial OS applications that supports YAML-based configuration files with environment-specific settings.

## Features

- 🔄 Environment-based configuration loading
- 📁 YAML file support
- 🔍 Dot notation for accessing nested values
- 🌐 Global module availability
- 🔒 Type-safe configuration access
- 📦 Easy integration with NestJS applications

## Installation

```bash
npm install @financial-os/libs
```

## Configuration Structure

Create a `config` directory in your application root with the following structure:

```
config/
├── app.local.yml
├── app.development.yml
├── app.production.yml
├── app.test.yml
├── database.local.yml
├── database.development.yml
└── ...
```

Each YAML file should follow the pattern: `<theme_name>.<env>.yml`

### Example YAML Files

```yaml
# app.local.yml
app:
  port: 3000
  host: localhost
  name: my-app

# database.local.yml
database:
  host: localhost
  port: 5432
  name: my-db
  credentials:
    username: admin
    password: secret
```

## Usage

### 1. Import the Module

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@financial-os/config';

@Module({
  imports: [ConfigModule],
})
export class AppModule {}
```

### 2. Use the ConfigService

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@financial-os/config';

@Injectable()
export class YourService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    // Get a specific value
    const port = this.configService.get<number>('app.port');

    // Get a value with default
    const timeout = this.configService.get<number>('app.timeout', 5000);

    // Get a nested value
    const dbUsername = this.configService.get<string>('database.credentials.username');

    // Get an entire section
    const dbConfig = this.configService.getSection('database');

    // Get all configuration
    const allConfig = this.configService.getAll();
  }
}
```

## Environment Detection

The module automatically detects the environment based on the `NODE_ENV` environment variable:

- `NODE_ENV=local` → loads `*.local.yml` files
- `NODE_ENV=development` → loads `*.development.yml` files
- `NODE_ENV=production` → loads `*.production.yml` files
- `NODE_ENV=test` → loads `*.test.yml` files

If `NODE_ENV` is not set, it defaults to `local`.

## API Reference

### ConfigService

#### `get<T>(key: string, defaultValue?: T): T`

Get a configuration value using dot notation.

```typescript
const port = configService.get<number>('app.port');
const timeout = configService.get<number>('app.timeout', 5000);
```

#### `getSection(section: string): Record<string, any>`

Get an entire configuration section.

```typescript
const dbConfig = configService.getSection('database');
```

#### `getAll(): Record<string, any>`

Get the entire configuration object.

```typescript
const allConfig = configService.getAll();
```

## Error Handling

The module will throw an error if:

- The `config` directory is not found
- A YAML file is malformed
- A required configuration value is missing (when no default is provided)

## Best Practices

1. **Type Safety**: Always specify the type when using `get<T>()`:

   ```typescript
   const port = configService.get<number>('app.port');
   ```

2. **Default Values**: Provide default values for optional configurations:

   ```typescript
   const timeout = configService.get<number>('app.timeout', 5000);
   ```

3. **Environment Variables**: Use environment-specific files for different environments:

   - `local.yml` for local development
   - `development.yml` for development environment
   - `production.yml` for production environment
   - `test.yml` for testing

4. **Configuration Organization**: Split configurations by theme into separate files:
   - `app.yml` for application settings
   - `database.yml` for database settings
   - etc.

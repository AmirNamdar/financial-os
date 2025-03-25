import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

const loadConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  const configDir = path.join(process.cwd(), 'config', env);
  let configs: Record<string, any> = {};

  console.log('Loading config from:', configDir);

  if (!fs.existsSync(configDir)) {
    throw new Error(`Config directory not found: ${configDir}`);
  }

  const configFiles = fs.readdirSync(configDir);
  const yamlFiles = configFiles.filter((file) => file.endsWith('.yml'));

  console.log('Found YAML files:', yamlFiles);

  yamlFiles.forEach((file) => {
    const filePath = path.join(configDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const yamlConfig = yaml.load(content) as Record<string, any>;
    console.log('Loaded config from', file, ':', yamlConfig);
    configs = { ...configs, ...yamlConfig };
  });

  console.log('Final config:', configs);
  return configs;
};

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [loadConfig],
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
      global: true,
    };
  }
}

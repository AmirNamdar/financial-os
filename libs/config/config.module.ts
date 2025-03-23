import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

const loadConfig = () => {
  const env = process.env.NODE_ENV || 'local';
  const configDir = path.join(process.cwd(), 'config');
  let config: Record<string, any> = {};

  console.log('Loading config from:', configDir);
  console.log('Current working directory:', process.cwd());

  if (fs.existsSync(configDir)) {
    const files = fs.readdirSync(configDir);
    const yamlFiles = files.filter((file) => file.endsWith(`.${env}.yml`));

    console.log('Found YAML files:', yamlFiles);

    yamlFiles.sort((a, b) => {
      // Sort files so that override files come last
      const aIsOverride = a.includes('.override.');
      const bIsOverride = b.includes('.override.');
      return aIsOverride ? 1 : bIsOverride ? -1 : 0;
    });

    yamlFiles.forEach((file) => {
      const filePath = path.join(configDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const yamlConfig = yaml.load(content) as Record<string, any>;
      console.log('Loaded config from', file, ':', yamlConfig);
      config = { ...config, ...yamlConfig };
    });
  }

  console.log('Final config:', config);
  return config;
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

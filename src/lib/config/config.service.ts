import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get<T = any>(key: string, defaultValue?: T): T {
    const value = this.nestConfigService.get<T>(key);
    if (value === undefined && defaultValue !== undefined) {
      return defaultValue;
    }
    if (value === undefined) {
      throw new Error(`Configuration key "${key}" not found`);
    }
    return value;
  }

  getAll(): Record<string, any> {
    return this.nestConfigService.get<Record<string, any>>('');
  }
}

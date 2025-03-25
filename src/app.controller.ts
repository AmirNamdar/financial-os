import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from './lib/config/config.service';

@ApiTags('Core')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Returns a greeting message' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get application configuration' })
  @ApiResponse({ status: 200, description: 'Returns the application configuration' })
  @Get('config')
  getConfig(): Record<string, any> {
    return this.configService.getAll();
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '../../../libs/config/config.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

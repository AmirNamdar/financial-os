import { Test, TestingModule } from '@nestjs/testing';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config.module';
import { ConfigService } from '../config.service';
import { TestHelper } from './test-helper';

describe('ConfigModule', () => {
  let module: TestingModule;
  let testHelper: TestHelper;
  let originalCwd: string;

  beforeEach(() => {
    testHelper = new TestHelper();
    originalCwd = process.cwd();
    process.chdir(testHelper.getTempDir());
  });

  afterEach(() => {
    process.chdir(originalCwd);
    testHelper.cleanup();
  });

  it('should be defined', async () => {
    // Create config file before initializing module
    testHelper.createConfigFile(
      'app.local.yml',
      `
app:
  port: 3000
    `,
    );

    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();
    expect(module).toBeDefined();
  });

  it('should provide ConfigService globally', async () => {
    // Create config file before initializing module
    testHelper.createConfigFile(
      'app.local.yml',
      `
app:
  port: 3000
    `,
    );

    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();

    const configService = module.get<ConfigService>(ConfigService);
    expect(configService).toBeDefined();
    expect(configService.get('app.port')).toBe(3000);
  });

  it('should make ConfigService available in child modules', async () => {
    // Create config file before initializing module
    testHelper.createConfigFile(
      'app.local.yml',
      `
app:
  port: 3000
    `,
    );

    @Module({
      imports: [ConfigModule.forRoot()],
    })
    class ChildModule {
      constructor(private configService: ConfigService) {}

      getPort() {
        return this.configService.get('app.port');
      }
    }

    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), ChildModule],
    }).compile();

    const childModule = module.get<ChildModule>(ChildModule);
    expect(childModule.getPort()).toBe(3000);
  });
});

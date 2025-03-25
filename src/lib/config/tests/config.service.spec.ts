import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config.module';
import { ConfigService } from '../config.service';
import { TestHelper } from './test-helper';

describe('ConfigService', () => {
  let service: ConfigService;
  let module: TestingModule;
  let testHelper: TestHelper;
  let originalCwd: string;

  beforeEach(async () => {
    testHelper = new TestHelper();
    originalCwd = process.cwd();
    process.chdir(testHelper.getTempDir());

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

    service = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    testHelper.cleanup();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load configuration from yaml file', () => {
    expect(service.get('app.port')).toBe(3000);
  });

  it('should throw error when key not found', () => {
    expect(() => service.get('nonexistent.key')).toThrow(
      'Configuration key "nonexistent.key" not found',
    );
  });

  it('should return default value when key not found and default provided', () => {
    expect(service.get('nonexistent.key', 'default')).toBe('default');
  });

  it('should merge multiple config files', async () => {
    testHelper.createConfigFile(
      'database.local.yml',
      `
database:
  host: localhost
  port: 5432
    `,
    );

    // Re-initialize module to load new config
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<ConfigService>(ConfigService);

    expect(service.get('app.port')).toBe(3000);
    expect(service.get('app.host')).toBeUndefined();
    expect(service.get('database.host')).toBe('localhost');
    expect(service.get('database.port')).toBe(5432);
  });

  it('should override values from multiple files', async () => {
    testHelper.createConfigFile(
      'app.override.local.yml',
      `
app:
  port: 4000
    `,
    );

    // Re-initialize module to load new config
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<ConfigService>(ConfigService);

    expect(service.get('app.port')).toBe(4000);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;
  let _appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    _appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Welcome to Financial OS!"', () => {
      expect(appController.getHello()).toBe('Welcome to Financial OS!');
    });
  });
});

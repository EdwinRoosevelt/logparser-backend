import { Test, TestingModule } from '@nestjs/testing';
import { LogParserController } from './logparser.controller';
import { LogParserService } from './logparser.service';

describe('LogParserController', () => {
  let logParserController: LogParserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogParserController],
      providers: [LogParserService],
    }).compile();

    logParserController = app.get<LogParserController>(LogParserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(logParserController.getHello()).toBe('Hello World!');
    });
  });
});

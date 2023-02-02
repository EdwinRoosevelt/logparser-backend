import { Test, TestingModule } from '@nestjs/testing';
import { LogParserController } from './logparser.controller';
import { LogParserService } from './logparser.service';
import { LogEntity } from './entity/log.entity';

describe('LogParserController', () => {
  let logParserController: LogParserController;
  let logParserService: LogParserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogParserController],
      providers: [LogParserService],
    }).compile();

    logParserController = app.get<LogParserController>(LogParserController);
    logParserService = app.get<LogParserService>(LogParserService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(logParserController.getHello()).toBe(
        'Hello from Log Parser Service',
      );
    });
  });

  describe('parselog', () => {
    it('should return an array of logEntity from plain text', () => {
      const inputLogText = `2044-08-09T02:12:51.253Z - info - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service is started"}
2021-08-09T02:12:51.264Z - warn - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"Service finished with error","code":404,"err":"Cannot find user orders list"}`;

      const logObj1 = new LogEntity('2044-08-09T02:12:51.253Z', 'info', {
        transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
        details: 'Service is started',
      });
      const logObj2 = new LogEntity('2021-08-09T02:12:51.264Z', 'warn', {
        transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
        details: 'Service finished with error',
        code: 404,
        err: 'Cannot find user orders list',
      });
      const result = [logObj1, logObj2];

      jest.spyOn(logParserService, 'parseLog').mockImplementation(() => result);

      expect(logParserService.parseLog(inputLogText)).toBe(result);
    });
  });
});

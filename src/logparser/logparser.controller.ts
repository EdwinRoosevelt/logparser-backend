import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LogParserService } from './logparser.service';
import { Request, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogEntityResponse } from './dto/LogEntityResponse';

@Controller('/logparser')
export class LogParserController {
  constructor(private readonly appService: LogParserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/parse/upload')
  @UseInterceptors(FileInterceptor('file'))
  parseLog(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): LogEntityResponse[] {
    const allLogsArray = this.appService.parseLog(file.buffer.toString());
    if (allLogsArray.length === 0)
      throw new HttpException(
        'No logs found | Logs Parse Error',
        HttpStatus.BAD_REQUEST,
      );

    let filteredLogs = this.appService.getWarnAndErrorLogs(allLogsArray);

    return filteredLogs.map((log) => {
      return {
        timestamp: log.getTimeStampInEpoch(),
        loglevel: log.getLoglevel(),
        transactionId: log.getTransactionId(),
        err: log.getErr(),
      };
    });
  }
}

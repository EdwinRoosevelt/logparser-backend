import { Injectable } from '@nestjs/common';
import { LogEntity } from './entity/log.entity';

@Injectable()
export class LogParserService {
  getHello(): string {
    return 'Hello from Log Parser Service';
  }

  parseLog(allLogsInString: string): LogEntity[] {
    const allLogsInArray = allLogsInString.split(/\r?\n/);
    console.log(allLogsInArray, allLogsInArray.length);
    if (allLogsInArray.length === 1 && allLogsInArray[0] === '') return [];

    return allLogsInArray.map((logs) => {
      const singleLog = logs.split(' - ');
      return new LogEntity(
        singleLog[0],
        singleLog[1],
        JSON.parse(singleLog[2]),
      );
    });
  }

  getWarnAndErrorLogs(logInString: LogEntity[]): LogEntity[] {
    return logInString.filter(
      (log) => log.getLoglevel() === 'error' || log.getLoglevel() === 'warn',
    );
  }
}

import { Module } from '@nestjs/common';
import { LogParserController } from './logparser/logparser.controller';
import { LogParserService } from './logparser/logparser.service';

@Module({
  imports: [],
  controllers: [LogParserController],
  providers: [LogParserService],
})
export class AppModule {}

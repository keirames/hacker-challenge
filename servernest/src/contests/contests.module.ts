import { Module } from '@nestjs/common';
import { ContestsController } from './contests.controller';
import { ContestsService } from './contests.service';

@Module({
  controllers: [ContestsController],
  providers: [ContestsService]
})
export class ContestsModule {}

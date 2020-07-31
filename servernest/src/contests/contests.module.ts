import { Module } from '@nestjs/common';
import { ContestsController } from './contests.controller';
import { ContestsService } from './contests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './contest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contest])],
  controllers: [ContestsController],
  providers: [ContestsService],
  exports: [ContestsService],
})
export class ContestsModule {}

import { Module, forwardRef } from '@nestjs/common';
import { ContestsController } from './contests.controller';
import { ContestsService } from './contests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './contest.entity';
import { ChallengesModule } from '../challenges/challenges.module';
import { ContestsResolver } from './contests.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest]),
    forwardRef(() => ChallengesModule),
  ],
  controllers: [ContestsController],
  providers: [ContestsService, ContestsResolver],
  exports: [ContestsService],
})
export class ContestsModule {}

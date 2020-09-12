import { Module, forwardRef } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './contest.entity';
import { ChallengesModule } from '../challenges/challenges.module';
import { ContestsResolver } from './contests.resolver';
import { Challenge } from '../challenges/challenge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest, Challenge]),
    forwardRef(() => ChallengesModule),
  ],
  controllers: [],
  providers: [ContestsService, ContestsResolver],
  exports: [ContestsService],
})
export class ContestsModule {}

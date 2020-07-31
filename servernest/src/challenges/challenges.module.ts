import { Module, forwardRef } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { ChallengesResolver } from './challenges.resolver';
import { ContestsModule } from '../contests/contests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge]),
    forwardRef(() => ContestsModule),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesResolver],
  exports: [ChallengesService],
})
export class ChallengesModule {}

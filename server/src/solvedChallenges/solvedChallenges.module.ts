import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolvedChallenge } from './solvedChallenge.entity';
import { SolvedChallengesService } from './solvedChallenges.service';

@Module({
  imports: [TypeOrmModule.forFeature([SolvedChallenge])],
  providers: [SolvedChallengesService],
  exports: [SolvedChallengesService],
})
export class SolvedChallengesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolvedChallenge } from './solvedChallenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolvedChallenge])],
  providers: [],
  exports: [],
})
export class SolvedChallengesModule {}

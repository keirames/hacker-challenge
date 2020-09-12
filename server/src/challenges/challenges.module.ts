import { Module, forwardRef } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { ChallengesResolver } from './challenges.resolver';
import { ContestsModule } from '../contests/contests.module';
import { UsersModule } from '../users/users.module';
import { Contest } from '../contests/contest.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, Contest, User]),
    forwardRef(() => ContestsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [ChallengesService, ChallengesResolver],
  exports: [ChallengesService],
})
export class ChallengesModule {}

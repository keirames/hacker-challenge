import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SubmissionDto } from './dto/submission.dto';
import { SubmissionsService } from './submissions.service';
import { Submission } from './submission.entity';
import { ChallengesService } from '../challenges/challenges.service';
import { Challenge } from '../challenges/challenge.entity';
import { ChallengeDto } from '../challenges/dto/challenge.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Resolver(() => SubmissionDto)
export class SubmissionsResolver {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly challengesService: ChallengesService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [SubmissionDto])
  getSubmissions(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ): Promise<Submission[]> {
    return this.submissionsService.findByUserIdAndChallengeId(
      userId,
      challengeId,
    );
  }

  @ResolveField('user', () => UserDto)
  getUser(@Parent() submission: Submission): Promise<User | undefined> {
    return this.usersService.findById(submission.userId);
  }

  @ResolveField('challenge', () => ChallengeDto)
  getChallenge(
    @Parent() submission: Submission,
  ): Promise<Challenge | undefined> {
    return this.challengesService.findById(submission.challengeId, {
      isDeleted: false,
    });
  }
}

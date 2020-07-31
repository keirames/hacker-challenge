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

@Resolver(() => SubmissionDto)
export class SubmissionsResolver {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly challengesService: ChallengesService,
  ) {}

  @Query(() => [SubmissionDto])
  getSubmissions(
    @Args('challengeId', { type: () => Int }) challengeId: number,
  ): Promise<Submission[]> {
    return this.submissionsService.findByUserIdAndChallengeId(challengeId);
  }

  @ResolveField('challenge', () => ChallengeDto)
  getChallenge(@Parent() submission: Submission): Promise<Challenge> {
    return this.challengesService.findById(submission.challengeId);
  }
}

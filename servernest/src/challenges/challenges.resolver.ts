import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge.entity';
import { ChallengeDto } from './dto/challenge.dto';
import { ContestsService } from '../contests/contests.service';
import { ContestDto } from '../contests/dto/contest.dto';
import { Contest } from '../contests/contest.entity';

@Resolver(() => ChallengeDto)
export class ChallengesResolver {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly contestsService: ContestsService,
  ) {}

  @Query(() => [ChallengeDto])
  getChallenges(): Promise<Challenge[]> {
    return this.challengesService.findAll();
  }

  @Query(() => ChallengeDto, { nullable: true })
  async getChallenge(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Challenge> {
    return this.challengesService.findBySlug(slug);
  }

  @ResolveField('contest', () => ContestDto)
  getContest(@Parent() challenge: Challenge): Promise<Contest> {
    return this.contestsService.findById(challenge.contestId);
  }
}

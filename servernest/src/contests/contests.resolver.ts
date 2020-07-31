import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ContestsService } from './contests.service';
import { ContestDto } from './dto/contest.dto';
import { Contest } from './contest.entity';
import { ChallengeDto } from '../challenges/dto/challenge.dto';
import { ChallengesService } from '../challenges/challenges.service';
import { Challenge } from '../challenges/challenge.entity';

@Resolver(() => ContestDto)
export class ContestsResolver {
  constructor(
    private readonly contestsService: ContestsService,
    private readonly challengesService: ChallengesService,
  ) {}

  @Query(() => [ContestDto])
  getContests(): Promise<Contest[]> {
    return this.contestsService.findAll();
  }

  @Query(() => ContestDto, { nullable: true })
  getContest(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Contest> {
    return this.contestsService.findBySlug(slug);
  }

  @ResolveField('challenges', () => [ChallengeDto])
  async getChallenges(@Parent() contest: Contest): Promise<Challenge[]> {
    return this.challengesService.findByContestId(contest.id);
  }
}

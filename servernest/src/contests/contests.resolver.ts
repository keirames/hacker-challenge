import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { ContestsService } from './contests.service';
import { ContestDto } from './dto/contest.dto';
import { Contest } from './contest.entity';
import { ChallengeDto } from '../challenges/dto/challenge.dto';
import { ChallengesService } from '../challenges/challenges.service';
import { Challenge } from '../challenges/challenge.entity';
import { AddContestInput } from './input/addContestInput.input';
import { EditContestInput } from './input/editContestInput.input';

@Resolver(() => ContestDto)
export class ContestsResolver {
  constructor(
    private readonly contestsService: ContestsService,
    private readonly challengesService: ChallengesService,
  ) {}

  @Query(() => [ContestDto])
  getContests(): Promise<Contest[]> {
    return this.contestsService.findAll({ isDeleted: false });
  }

  @Query(() => ContestDto, { nullable: true })
  getContest(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Contest | undefined> {
    return this.contestsService.findBySlug(slug, { isDeleted: false });
  }

  @ResolveField('challenges', () => [ChallengeDto])
  async getChallenges(@Parent() contest: Contest): Promise<Challenge[]> {
    return this.challengesService.findByContestId(contest.id, {
      isDeleted: false,
    });
  }

  @Mutation(() => ContestDto)
  async addContest(
    @Args('contest') contestInput: AddContestInput,
  ): Promise<Contest> {
    return this.contestsService.addContest(contestInput);
  }

  @Mutation(() => ContestDto)
  async editContest(
    @Args('contest') contestInput: EditContestInput,
  ): Promise<Contest> {
    return this.contestsService.editContest(contestInput);
  }
}

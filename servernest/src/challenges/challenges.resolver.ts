import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge.entity';
import { ChallengeDto } from './dto/challenge.dto';
import { ContestsService } from '../contests/contests.service';
import { ContestDto } from '../contests/dto/contest.dto';
import { Contest } from '../contests/contest.entity';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => ChallengeDto)
export class ChallengesResolver {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly contestsService: ContestsService,
    private readonly usersService: UsersService,
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

  @ResolveField('passedUsers', () => [UserDto])
  getPassedUsers(@Parent() challenge: Challenge): Promise<User[]> {
    return this.usersService.findPassedUsersByChallengeId(challenge.id);
  }

  @ResolveField('likedUsers', () => [UserDto])
  getLikedUsers(@Parent() challenge: Challenge): Promise<User[]> {
    return this.usersService.findLikedUsersByChallengeId(challenge.id);
  }
}

import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { ChallengesService } from './challenges.service';
import { Challenge } from './challenge.entity';
import { ChallengeDto } from './dto/challenge.dto';
import { ContestsService } from '../contests/contests.service';
import { ContestDto } from '../contests/dto/contest.dto';
import { Contest } from '../contests/contest.entity';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AddChallengeInput } from './input/addChallengeInput.input';
import { EditChallengeInput } from './input/editChallengeInput.input';
import { MarkLikeChallengeInput } from './input/markLikeChallengeInput';

@Resolver(() => ChallengeDto)
export class ChallengesResolver {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly contestsService: ContestsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => [ChallengeDto])
  getChallenges(): Promise<Challenge[]> {
    return this.challengesService.findAll({ isDeleted: false });
  }

  @Query(() => ChallengeDto, { nullable: true })
  async getChallenge(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Challenge | undefined> {
    return this.challengesService.findBySlug(slug, { isDeleted: false });
  }

  @ResolveField('contest', () => ContestDto)
  getContest(@Parent() challenge: Challenge): Promise<Contest | undefined> {
    return this.contestsService.findById(challenge.contestId, {
      isDeleted: false,
    });
  }

  @ResolveField('passedUsers', () => [UserDto])
  getPassedUsers(@Parent() challenge: Challenge): Promise<User[]> {
    return this.usersService.findPassedUsersByChallengeId(challenge.id);
  }

  @ResolveField('likedUsers', () => [UserDto])
  getLikedUsers(@Parent() challenge: Challenge): Promise<User[]> {
    return this.usersService.findLikedUsersByChallengeId(challenge.id);
  }

  @Mutation(() => ChallengeDto)
  addChallenge(
    @Args('challenge') challenge: AddChallengeInput,
  ): Promise<Challenge> {
    return this.challengesService.addChallenge(challenge);
  }

  @Mutation(() => ChallengeDto)
  editChallenge(
    @Args('challenge') challenge: EditChallengeInput,
  ): Promise<Challenge> {
    return this.challengesService.editChallenge(challenge);
  }

  @Mutation(() => ChallengeDto)
  likeOrUnlikeChallenge(
    @Args('markLikeInput') markLikeInput: MarkLikeChallengeInput,
  ): Promise<Challenge> {
    return this.challengesService.likeOrUnlikeChallenge(markLikeInput);
  }
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserAccountDto } from '../../userAccounts/dto/userAccount.dto';
import { UserAccount } from '../../userAccounts/userAccount.entity';
import { UserExternalLogin } from '../../userExternalLogins/userExternalLogin.entity';
import { UserExternalLoginDto } from '../../userExternalLogins/dto/userExternalLogin.dto';
import { SolvedChallenge } from '../../solvedChallenges/solvedChallenge.entity';
import { SolvedChallengeDto } from '../../solvedChallenges/dto/solvedChallenge.dto';
import { ChallengeDto } from '../../challenges/dto/challenge.dto';
import { Challenge } from '../../challenges/challenge.entity';
import { Subscription } from '../../subscriptions/subscription.entity';
import { SubscriptionDto } from '../../subscriptions/dto/subscription.dto';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  totalPoints: number;

  @Field(() => [SolvedChallengeDto])
  solvedChallenges: SolvedChallenge[];

  @Field(() => [ChallengeDto])
  likedChallenges: Challenge[];

  @Field(() => UserAccountDto, { nullable: true })
  userAccount: UserAccount;

  @Field(() => [UserExternalLoginDto])
  userExternalLogins: UserExternalLogin[];

  @Field(() => [SubscriptionDto])
  subscriptionPlans: Subscription;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Challenge } from '../../challenges/challenge.entity';
import { ChallengeDto } from '../../challenges/dto/challenge.dto';
import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/user.entity';

@ObjectType()
export class SubmissionDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  answer: string;

  @Field(() => Boolean)
  isPassed: boolean;

  @Field(() => String)
  createdAt: Date;

  @Field(() => UserDto)
  user: User;

  @Field(() => ChallengeDto)
  challenge: Challenge;
}

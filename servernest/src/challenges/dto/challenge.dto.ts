import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { ContestDto } from '../../contests/dto/contest.dto';
import { Contest } from '../../contests/contest.entity';
import { TestCase } from '../../testCases/testCase.entity';
import { TestCaseDto } from '../../testCases/dto/testCase.dto';
import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/user.entity';
import { Level } from '../challenge.entity';
import { TestInputDto } from '../../testInputs/dto/testInput.dto';
import { TestInput } from '../../testInputs/testInput.entity';

registerEnumType(Level, { name: 'Level' });

@ObjectType()
export class ChallengeDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  problem: string;

  @Field(() => String)
  inputFormat: string;

  @Field(() => String)
  outputFormat: string;

  @Field(() => String)
  challengeSeed: string;

  @Field(() => [TestInputDto])
  testInputs: TestInput[];

  @Field(() => Level)
  level: Level;

  @Field(() => Int)
  points: number;

  @Field(() => [TestCaseDto])
  testCases: TestCase[];

  @Field(() => ContestDto)
  contest: Contest;

  @Field(() => [UserDto])
  passedUsers: User[];

  @Field(() => [UserDto])
  likedUsers: User[];
}

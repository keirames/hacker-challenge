import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ContestDto } from '../../contests/dto/contest.dto';
import { Contest } from '../../contests/contest.entity';
import { TestCase } from '../../testCases/testCase.entity';
import { TestCaseDto } from '../../testCases/dto/testCase.dto';
import { UserDto } from '../../users/dto/user.dto';

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

  @Field(() => String)
  level: string;

  @Field(() => Int)
  points: number;

  @Field(() => ContestDto)
  contest: Contest;

  @Field(() => [TestCaseDto], { nullable: true })
  testCases: TestCase[];

  // @Field(() => [UserDto])
  // passedBy
}

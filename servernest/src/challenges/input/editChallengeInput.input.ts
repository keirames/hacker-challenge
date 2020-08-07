import { Field, Int, InputType } from '@nestjs/graphql';
import { TestCase } from '../../testCases/testCase.entity';
import { Level } from '../challenge.entity';
import { TestCaseInput } from '../../testCases/input/testCaseInput.input';

@InputType()
export class EditChallengeInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  problem: string;

  @Field(() => String)
  inputFormat: string;

  @Field(() => String)
  outputFormat: string;

  @Field(() => String)
  challengeSeed: string;

  @Field(() => Level)
  level: Level;

  @Field(() => Int)
  points: number;

  @Field(() => Int)
  contestId: number;

  @Field(() => [TestCaseInput])
  testCases: TestCase[];
}

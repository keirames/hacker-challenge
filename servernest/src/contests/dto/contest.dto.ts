import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ChallengeDto } from '../../challenges/dto/challenge.dto';
import { Challenge } from '../../challenges/challenge.entity';

@ObjectType()
export class ContestDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => [ChallengeDto])
  challenges: Challenge[];
}

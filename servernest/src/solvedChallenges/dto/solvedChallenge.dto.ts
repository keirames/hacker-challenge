import { ObjectType, Field } from '@nestjs/graphql';
import { ChallengeDto } from '../../challenges/dto/challenge.dto';
import { Challenge } from '../../challenges/challenge.entity';

@ObjectType()
export class SolvedChallengeDto {
  @Field(() => ChallengeDto)
  challenge: Challenge;

  @Field(() => String, { nullable: true })
  createdAt: Date;
}

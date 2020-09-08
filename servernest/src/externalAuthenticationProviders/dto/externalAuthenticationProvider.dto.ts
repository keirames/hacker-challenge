import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class ExternalAuthenticationProviderDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}

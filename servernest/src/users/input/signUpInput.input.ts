import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

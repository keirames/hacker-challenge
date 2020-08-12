import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SignInInput } from '../users/input/signInInput.input';
import { SignUpInput } from '../users/input/signUpInput.input';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signIn(@Args('account') account: SignInInput): Promise<string> {
    return this.authService.signIn(account);
  }

  @Mutation(() => String)
  async signUp(
    @Args('accountDetails') accountDetails: SignUpInput,
  ): Promise<string> {
    return this.authService.signUp(accountDetails);
  }
}

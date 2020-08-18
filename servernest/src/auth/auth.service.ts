import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserAccountsService } from '../userAccounts/userAccounts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { JwtService } from '@nestjs/jwt';
import { UserExternalLogin } from '../userExternalLogins/userExternalLogin.entity';
import { ExternalAuthenticationProvidersService } from '../externalAuthenticationProviders/externalAuthenticationProviders.service';
import { AuthProvider } from '../externalAuthenticationProviders/externalAuthenticationProvider.entity';
import { SignUpDto } from './dto/signUpDto.dto';
import { SignInDto } from './dto/signInDto.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,

    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly userAccountsService: UserAccountsService,
    private readonly externalAuthenticationProvidersService: ExternalAuthenticationProvidersService,
  ) {}

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.id };
    console.log(`Bearer ${this.jwtService.sign(payload)}`);
    return {
      accessToken: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  async validateUser(account: SignInDto): Promise<User> {
    const { email, password } = account;

    const user = await this.usersService.findUserAccountByEmail(email);
    if (!user || !user.userAccount)
      throw new BadRequestException('Invalid email or password');

    const isValidPassword = await bcrypt.compare(
      password,
      user.userAccount.password,
    );
    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password');

    return user;
  }

  /**
   *
   * @param externalId
   * *Return exist account with social'id
   * *Or return new account with social'id
   */
  async signInWithExternalProvider(
    externalId: string,
    providerName: AuthProvider,
    payload?: { email: string; name: string },
  ): Promise<User> {
    let user = await this.usersService.findUserBySocialId(
      externalId,
      providerName,
    );

    if (!user) {
      const provider = await this.externalAuthenticationProvidersService.findByName(
        providerName,
      );
      if (!provider)
        throw new NotFoundException(
          `External provider(${providerName}) not found`,
        );

      user = new User({ totalPoints: 0, firstName: payload?.name });
      user.userExternalLogins = [
        new UserExternalLogin({
          externalUserId: externalId,
          externalAuthenticationProviderId: provider.id,
          email: payload?.email,
          firstName: payload?.name,
        }),
      ];
      user = await this.usersRepository.save(user);
    }

    return user;
  }

  // async signIn(account: SignInInput): Promise<string> {
  //   const { email, password } = account;

  //   const user = await this.usersService.findUserAccountByEmail(email);
  //   console.log(user);
  //   if (!user || !user.userAccount)
  //     throw new HttpException(
  //       'Invalid email or password',
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   const isValidPassword = await bcrypt.compare(
  //     password,
  //     user.userAccount.password,
  //   );
  //   if (!isValidPassword)
  //     throw new HttpException(
  //       'Invalid email or password',
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   const token = user.generateAuthToken();
  //   return token;
  // }

  async signUp(accountDetails: SignUpDto): Promise<User> {
    const { email, firstName, lastName, password } = accountDetails;

    let userAccount = await this.userAccountsService.findByEmail(email);
    if (userAccount) throw new BadRequestException('Email is already exist');

    const hashedPassword = await bcrypt.hash(password, 10);
    userAccount = new UserAccount({
      email,
      password: hashedPassword,
    });

    const user = new User({ totalPoints: 0, firstName, lastName, userAccount });
    return this.usersRepository.save(user);
  }
}

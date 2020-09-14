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
import { Challenge } from '../challenges/challenge.entity';
import { TestCase } from '../testCases/testCase.entity';
import { MailService } from '../mail/mail.service';
import { bcryptSaltRound, clientUrl } from '../config/vars';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,
    @InjectRepository(TestCase)
    private readonly testCasesRepository: Repository<TestCase>,

    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly userAccountsService: UserAccountsService,
    private readonly externalAuthenticationProvidersService: ExternalAuthenticationProvidersService,
    private readonly mailService: MailService,
  ) {}

  async generateToken(user: User): Promise<{ accessToken: string }> {
    const payload = {
      sub: user.id,
      totalPoints: user.totalPoints,
      firstName: user.firstName,
      lastName: user.lastName,
    };
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
    payload?: { email: string | undefined; name: string | undefined },
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

      user = new User({
        totalPoints: 0,
        firstName: payload?.name,
        isActivated: true,
      });
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

  async mergeExternalProvider(
    currentUserId: number,
    mergeUserId: number,
  ): Promise<void> {
    const currentUser = await this.usersRepository.findOne({
      where: { id: currentUserId },
      relations: ['userExternalLogins', 'likedChallenges'],
    });
    if (!currentUser) throw new NotFoundException(`Invalid current user id`);

    const mergeUser = await this.usersRepository.findOne({
      where: { id: mergeUserId },
      relations: ['userExternalLogins', 'likedChallenges'],
    });
    if (!mergeUser) throw new NotFoundException(`Invalid merge user id`);

    // If mergeUser is currentUser (malicious request)
    if (mergeUser === currentUser)
      throw new BadRequestException('Invalid userId & provider');

    const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;
    const combinedChallenges = [
      ...currentUser.likedChallenges,
      ...mergeUser.likedChallenges,
    ];
    const combinedUniqueChallenges = combinedChallenges
      .map(c => c.id)
      .filter(
        (challengeId, index, arrChallengeId) =>
          arrChallengeId.indexOf(challengeId) === index,
      )
      .map(challengeId => combinedChallenges.find(c => c.id === challengeId))
      .filter(notUndefined);

    // Already use guard to ensure that account dont have multiple provider
    const [provider] = mergeUser.userExternalLogins;

    currentUser.likedChallenges = combinedUniqueChallenges;
    currentUser.userExternalLogins.push(provider);

    // await this.usersRepository.remove(mergeUser);
    await this.usersService.completelyRemoveUserById(mergeUser.id);
    await this.usersRepository.save(currentUser);
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

  async signUp(accountDetails: SignUpDto, serverUrl: string): Promise<User> {
    const { email, firstName, lastName, password } = accountDetails;

    let userAccount = await this.userAccountsService.findByEmail(email);
    if (userAccount) throw new BadRequestException('Email is already exist');

    const hashedPassword = await bcrypt.hash(password, bcryptSaltRound);
    userAccount = new UserAccount({
      email,
      password: hashedPassword,
    });

    let user = new User({
      totalPoints: 0,
      firstName,
      lastName,
      isActivated: false,
      userAccount,
    });
    user = await this.usersRepository.save(user);

    await this.mailService.sendActivateEmail(serverUrl, {
      userId: user.id,
      email,
      name: `${user.firstName} ${user.lastName}`,
    });

    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    // const user = await this.usersService.findUserAccountByEmail(email);
    // if (!user || !user.userAccount)
    //   throw new BadRequestException('Email is not valid');
    // await this.mailService.sendRecoverPasswordEmail(clientUrl, {
    //   email: user.userAccount.email,
    //   name: `${user.firstName} ${user.lastName}`,
    //   userId: user.id,
    // });
    await this.mailService.sendRecoverPasswordEmail(clientUrl, {
      email,
      name: 'test',
      userId: 1,
    });
  }
}

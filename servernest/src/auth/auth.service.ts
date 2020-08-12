import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignInInput } from '../users/input/signInInput.input';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpInput } from '../users/input/signUpInput.input';
import { UserAccountsService } from '../userAccounts/userAccounts.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserAccount } from '../userAccounts/userAccount.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,

    private readonly usersService: UsersService,
    private readonly userAccountsService: UserAccountsService,
  ) {}

  async signIn(account: SignInInput): Promise<string> {
    const { email, password } = account;

    const user = await this.usersService.findUserAccountByEmail(email);
    console.log(user);
    if (!user || !user.userAccount)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );

    const isValidPassword = await bcrypt.compare(
      password,
      user.userAccount.password,
    );
    if (!isValidPassword)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );

    const token = user.generateAuthToken();
    return token;
  }

  async signUp(accountDetails: SignUpInput): Promise<string> {
    const { email, firstName, lastName, password } = accountDetails;

    let userAccount = await this.userAccountsService.findByEmail(email);
    console.log(userAccount);
    if (userAccount)
      throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST);

    const hashedPassword = await bcrypt.hash(password, 10);
    userAccount = new UserAccount({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    let user = new User({ totalPoints: 0, userAccount });
    user = await this.usersRepository.save(user);

    const token = user.generateAuthToken();
    return token;
  }
}

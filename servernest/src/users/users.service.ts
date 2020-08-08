import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenge.entity';
import { Challenge } from '../challenges/challenge.entity';
import { SignInInput } from './input/signInInput.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  async findPassedUsersByChallengeId(challengeId: number): Promise<User[]> {
    const result = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.solvedChallenges',
        'solvedChallenge',
        'solvedChallenge.challenge.id = :challengeId',
        { challengeId },
      )
      .getMany();
    return result;
  }

  async findLikedUsersByChallengeId(challengeId: number): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.likedChallenges',
        'likedChallenge',
        'likedChallenge.id = :challengeId',
        { challengeId },
      )
      .getMany();
  }

  async findSolvedChallengesByUserId(
    userId: number,
  ): Promise<SolvedChallenge[]> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.solvedChallenges',
        'solvedChallenge',
        'user.id = :userId',
        { userId },
      )
      .innerJoinAndSelect('solvedChallenge.challenge', 'challenge')
      .getOne();

    // const user = await this.usersService.find({
    //   where: { id: userId },
    //   relations: ['solvedChallenges', 'solvedChallenges.challenge'],
    // });

    return user ? user.solvedChallenges : [];
  }

  async findLikedChallengesByUserId(userId: number): Promise<Challenge[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['likedChallenges'],
    });

    return user ? user.likedChallenges : [];
  }

  async findUserAccountByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userAccount', 'account')
      .where('account.email = :email', { email })
      .getOne();
  }

  async signIn(account: SignInInput): Promise<string> {
    const { email, password } = account;

    const user = await this.findUserAccountByEmail(email);
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
}

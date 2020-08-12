import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenge.entity';
import { Challenge } from '../challenges/challenge.entity';
import { UserAccountsService } from '../userAccounts/userAccounts.service';
import { SubmitAnswerInput } from './input/submitAnswerInput.input';
import { ChallengesService } from '../challenges/challenges.service';
import { executeSolution, TestedResult } from '../codeExecutor/codeExecutor';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,

    private readonly userAccountsService: UserAccountsService,
    private readonly challengesService: ChallengesService,
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

  async submitAnswer(
    submitAnswerInput: SubmitAnswerInput,
  ): Promise<TestedResult[] | Error> {
    const { userId, answer, challengeId } = submitAnswerInput;

    const user = await this.findById(userId);
    if (!user)
      throw new HttpException(`Invalid user's id`, HttpStatus.NOT_FOUND);

    const challenge = await this.challengesService.findById(challengeId);
    if (!challenge)
      throw new HttpException(`Invalid challenge's id`, HttpStatus.NOT_FOUND);

    const { inputFormat, testCases } = challenge;
    const testInputs = inputFormat.split(' ');
    const testAssertions = testCases.map(testCase => testCase.testString);
    const executeResult = await executeSolution(userId, {
      answer,
      testAssertions,
      testInputs,
    });

    // If error occur
    if (executeResult instanceof Error) return executeResult;

    // If successfully solve challenge
    const solvedChallenges = await this.findSolvedChallengesByUserId(userId);
    if (solvedChallenges.map(sc => sc.challenge.id).includes(challengeId)) {
      const isPassed =
        executeResult.filter(r => r.passed).length === testCases.length;

      if (isPassed) {
        const solvedChallenge = new SolvedChallenge({ challenge });
        user.solvedChallenges.push(solvedChallenge);
        await this.usersRepository.save(user);
      }
    }

    return executeResult;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersService: Repository<User>,
  ) {}

  async findPassedUsersByChallengeId(challengeId: number): Promise<User[]> {
    const result = await this.usersService
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
}

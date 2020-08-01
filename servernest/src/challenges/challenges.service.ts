import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesService: Repository<Challenge>,
  ) // private readonly usersService: Repository<User>,
  {}

  findAll(): Promise<Challenge[]> {
    return this.challengesService.find({ isDeleted: false });
  }

  findBySlug(slug: string): Promise<Challenge> {
    return this.challengesService.findOne({ slug, isDeleted: false });
  }

  findByContestId(contestId: number): Promise<Challenge[]> {
    return this.challengesService.find({ contestId, isDeleted: false });
  }

  async findPassedUsersByChallengeId(challengeId: number): Promise<User[]> {
    const result = await this.challengesService
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.solvedChallenges',
        'solvedChallenge',
        'solvedChallenge.challenge.id = :challengeId',
        { challengeId },
      )
      .getMany();
    console.log(result);
    return [];
  }
}

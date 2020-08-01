import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenge.entity';
import { Challenge } from '../challenges/challenge.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersService: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersService.find({});
  }

  findById(id: number): Promise<User> {
    return this.usersService.findOne({ id });
  }

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

  async findLikedUsersByChallengeId(challengeId: number): Promise<User[]> {
    return this.usersService
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
    const user = await this.usersService
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
    const { likedChallenges } = await this.usersService.findOne({
      where: { id: userId },
      relations: ['likedChallenges'],
    });

    return likedChallenges;
  }
}

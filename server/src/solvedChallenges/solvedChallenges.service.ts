import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolvedChallenge } from './solvedChallenge.entity';

@Injectable()
export class SolvedChallengesService {
  constructor(
    @InjectRepository(SolvedChallenge)
    private readonly solvedChallengesService: Repository<SolvedChallenge>,
  ) {}

  async isUserPassedChallenge(
    userId: number,
    challengeId: number,
  ): Promise<boolean> {
    const solvedChallenge = await this.solvedChallengesService.findOne({
      where: {
        user: {
          id: userId,
        },
        challenge: {
          id: challengeId,
        },
      },
    });

    return solvedChallenge ? true : false;
  }
}

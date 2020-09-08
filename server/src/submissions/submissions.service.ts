import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './submission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
  ) {}

  findByUserId(userId: number): Promise<Submission[]> {
    return this.submissionsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  findByChallengeId(challengeId: number): Promise<Submission[]> {
    return this.submissionsRepository.find({
      where: { challengeId },
      order: { createdAt: 'DESC' },
    });
  }

  findByUserIdAndChallengeId(
    userId: number,
    challengeId: number,
  ): Promise<Submission[]> {
    return this.submissionsRepository.find({
      where: { userId, challengeId },
      order: { createdAt: 'DESC' },
    });
  }
}

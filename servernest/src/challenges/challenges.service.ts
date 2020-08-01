import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesRepository: Repository<Challenge>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengesRepository.find({ isDeleted: false });
  }

  findBySlug(slug: string): Promise<Challenge> {
    return this.challengesRepository.findOne({ slug, isDeleted: false });
  }

  findByContestId(contestId: number): Promise<Challenge[]> {
    return this.challengesRepository.find({ contestId, isDeleted: false });
  }
}

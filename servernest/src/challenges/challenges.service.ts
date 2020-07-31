import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengesService: Repository<Challenge>,
  ) {}

  findAll(): Promise<Challenge[]> {
    return this.challengesService.find({ isDeleted: false });
  }

  findBySlug(slug: string): Promise<Challenge> {
    return this.challengesService.findOne({ slug, isDeleted: false });
  }
}

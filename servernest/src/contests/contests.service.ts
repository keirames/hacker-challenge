import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contest } from './contest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContestsService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestsService: Repository<Contest>,
  ) {}

  findAll(): Promise<Contest[]> {
    return this.contestsService.find({ isDeleted: false });
  }

  findBySlug(slug: string): Promise<Contest> {
    return this.contestsService.findOne({ slug, isDeleted: false });
  }

  findById(id: number): Promise<Contest> {
    return this.contestsService.findOne({ id, isDeleted: false });
  }
}

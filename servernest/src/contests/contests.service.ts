import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contest } from './contest.entity';
import { Repository } from 'typeorm';

interface Options {
  isDeleted?: boolean;
}

@Injectable()
export class ContestsService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestsService: Repository<Contest>,
  ) {}

  findAll(options: Options = {}): Promise<Contest[]> {
    return this.contestsService.find({ ...options });
  }

  findBySlug(
    slug: string,
    options: Options = {},
  ): Promise<Contest | undefined> {
    return this.contestsService.findOne({ slug, ...options });
  }

  findById(id: number, options: Options = {}): Promise<Contest | undefined> {
    return this.contestsService.findOne({ id, ...options });
  }
}

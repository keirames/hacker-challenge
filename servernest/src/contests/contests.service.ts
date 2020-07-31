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

  findById(id: number): Promise<Contest> {
    return this.contestsService.findOne({ id });
  }
}

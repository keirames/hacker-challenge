import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private readonly plansRepository: Repository<Plan>,
  ) {}

  findById(planId: number): Promise<Plan> {
    return this.plansRepository.findOne({ id: planId });
  }
}

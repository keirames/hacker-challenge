import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
  ) {}

  findByUserId(userId: number): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
      where: {
        userId,
      },
      order: { startTime: 'ASC' },
    });
  }
}

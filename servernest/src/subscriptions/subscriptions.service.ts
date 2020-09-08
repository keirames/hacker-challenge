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

  async removeByUserId(userId: number): Promise<void> {
    const subscriptions = await this.findByUserId(userId);
    await this.subscriptionsRepository.remove(subscriptions);
  }

  async isInSubscriptionTime(userId: number): Promise<boolean> {
    const subscriptions = await this.findByUserId(userId);
    const [lastSubscription] = subscriptions;

    if (lastSubscription && lastSubscription.endTime > new Date()) return true;

    return false;
  }
}

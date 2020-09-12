import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column({ name: 'price_per_month' })
  @Check('price_per_month >= 0')
  pricePerMonth: number;

  @OneToMany(
    () => Subscription,
    subcription => subcription.plan,
  )
  subscribers: Subscription[];

  constructor(params: { name: string; pricePerMonth: number }) {
    if (params !== undefined) {
      this.name = params.name;
      this.pricePerMonth = params.pricePerMonth;
    }
  }
}

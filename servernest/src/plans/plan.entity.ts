import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Check,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column({ name: 'price_per_month' })
  @Check('price_per_month >= 0')
  pricePerMonth: number;

  @ManyToMany(
    () => User,
    user => user.plans,
  )
  users: User[];
}

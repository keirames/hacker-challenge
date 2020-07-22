import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'price_per_month' })
  pricePerMonth: number;

  @ManyToMany(
    () => User,
    user => user.plans,
  )
  users: User[];
}

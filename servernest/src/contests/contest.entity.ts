import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Challenge } from '../challenges/challenge.entity';

@Entity('contests')
export class Contest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  slug: string;

  @OneToMany(
    () => Challenge,
    challenge => challenge.contest,
  )
  challenges: Challenge[];
}

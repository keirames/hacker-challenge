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

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @OneToMany(
    () => Challenge,
    challenge => challenge.contest,
  )
  challenges: Challenge[];

  constructor(params?: { name: string; slug: string }) {
    if (params !== undefined) {
      this.name = params.name;
      this.slug = params.slug;
    }
  }
}

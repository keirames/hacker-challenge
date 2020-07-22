import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from '../challenges/challenge.entity';

@Entity()
export class TestCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ name: 'test_string', length: 50 })
  testString: string;

  @ManyToOne(
    () => Challenge,
    challenge => challenge.testCases,
  )
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;
}

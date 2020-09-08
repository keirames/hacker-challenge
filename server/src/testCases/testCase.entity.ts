import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from '../challenges/challenge.entity';

@Entity('test_cases')
export class TestCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  text: string;

  @Column({ name: 'test_string', length: 255 })
  testString: string;

  @ManyToOne(
    () => Challenge,
    challenge => challenge.testCases,
  )
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  constructor(params: {
    text: string;
    testString: string;
    challenge: Challenge;
  }) {
    if (params !== undefined) {
      this.text = params.text;
      this.testString = params.testString;
      this.challenge = params.challenge;
    }
  }
}

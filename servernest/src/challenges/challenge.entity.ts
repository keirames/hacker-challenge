import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Check,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenges.entity';
import { Contest } from '../contests/contest.entity';
import { Submission } from '../submissions/submission.entity';
import { TestCase } from '../testCases/testCase.entity';

export enum Level {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: true })
  title: string;

  @Column({ length: 50, unique: true })
  slug: string;

  @Column({ type: 'text', default: '' })
  problem: string;

  @Column({ name: 'input_format', type: 'text', default: '' })
  inputFormat: string;

  @Column({ name: 'output_format', type: 'text', default: '' })
  outputFormat: string;

  @Column({ name: 'challenge_seed', type: 'text', default: '' })
  challengeSeed: string;

  @Column({ type: 'enum', enum: Level, default: Level.EASY })
  level: Level;

  @Column({ default: 0 })
  @Check('points >= 0')
  points: number;

  @ManyToMany(
    () => User,
    user => user.likedChallenges,
  )
  likedUsers: User[];

  @OneToMany(
    () => SolvedChallenge,
    solvedChallenge => solvedChallenge.challenge,
  )
  solvedChallenges: SolvedChallenge[];

  @ManyToOne(
    () => Contest,
    contest => contest.challenges,
  )
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;

  @OneToMany(
    () => Submission,
    sumission => sumission.challenge,
  )
  submissions: Submission[];

  @OneToMany(
    () => TestCase,
    testCase => testCase.challenge,
  )
  testCases: TestCase[];
}

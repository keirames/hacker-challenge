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
import { Contest } from '../contests/contest.entity';
import { Submission } from '../submissions/submission.entity';
import { TestCase } from '../testCases/testCase.entity';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenge.entity';
import { TestInput } from '../testInputs/testInput.entity';

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
  points?: number;

  @Column({ name: 'contest_id' })
  contestId: number;

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

  @ManyToMany(
    () => User,
    user => user.likedChallenges,
  )
  likedUsers: User[];

  @OneToMany(
    () => SolvedChallenge,
    solvedChallenge => solvedChallenge.challenge,
  )
  passedUsers: SolvedChallenge[];

  @ManyToOne(
    () => Contest,
    contest => contest.challenges,
    { nullable: false },
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
    { eager: true, cascade: true },
  )
  testCases: TestCase[];

  @OneToMany(
    () => TestInput,
    testInput => testInput.challenge,
    { eager: true, cascade: true },
  )
  testInputs: TestInput[];

  constructor(params?: {
    title: string;
    slug: string;
    problem: string;
    inputFormat: string;
    outputFormat: string;
    challengeSeed: string;
    level: Level;
    points?: number;
    contest: Contest;
    testCases: TestCase[];
    testInputs: TestInput[];
  }) {
    if (params !== undefined) {
      this.title = params.title;
      this.slug = params.slug;
      this.problem = params.problem;
      this.inputFormat = params.inputFormat;
      this.outputFormat = params.outputFormat;
      this.challengeSeed = params.challengeSeed;
      this.level = params.level;
      this.points = params.points;
      this.contest = params.contest;
      this.testCases = params.testCases;
      this.testInputs = params.testInputs;
    }
  }
}

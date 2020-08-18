import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Challenge } from '../challenges/challenge.entity';

@Entity('solved_challenges')
export class SolvedChallenge {
  @ManyToOne(
    () => User,
    user => user.solvedChallenges,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Challenge,
    challenge => challenge.passedUsers,
    { primary: true },
  )
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  constructor(params?: { challenge: Challenge }) {
    if (params !== undefined) {
      this.challenge = params.challenge;
    }
  }
}

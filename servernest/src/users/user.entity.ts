import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Check,
} from 'typeorm';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { UserExternalLogin } from '../userExternalLogins/userExternalLogin.entity';
import { Challenge } from '../challenges/challenge.entity';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenge.entity';
import { Submission } from '../submissions/submission.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import * as jwt from 'jsonwebtoken';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_points', default: 0 })
  @Check('total_points >= 0')
  totalPoints: number;

  @Column({ name: 'user_account_id', nullable: true })
  userAccountId: number;

  @OneToOne(() => UserAccount, { nullable: true, cascade: true })
  @JoinColumn({ name: 'user_account_id' })
  userAccount?: UserAccount;

  @OneToMany(
    () => UserExternalLogin,
    userExternalLogin => userExternalLogin.user,
  )
  userExternalLogins: UserExternalLogin[];

  @OneToMany(
    () => Submission,
    submission => submission.user,
  )
  submissions: Submission[];

  @OneToMany(
    () => Subscription,
    subscriptions => subscriptions.user,
  )
  subscriptionPlans: Subscription[];

  @ManyToMany(
    () => Challenge,
    challenge => challenge.likedUsers,
  )
  @JoinTable({
    name: 'liked_challenges',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'challenge_id', referencedColumnName: 'id' },
  })
  likedChallenges: Challenge[];

  @OneToMany(
    () => SolvedChallenge,
    solvedChallenge => solvedChallenge.user,
  )
  solvedChallenges: SolvedChallenge[];

  constructor(params: { totalPoints: number; userAccount?: UserAccount }) {
    if (params !== undefined) {
      this.totalPoints = params.totalPoints;
      this.userAccount = params.userAccount;
    }
  }

  public generateAuthToken(): string {
    const token = jwt.sign({ id: this.id }, 'secret', { expiresIn: '2d' });
    return token;
  }
}

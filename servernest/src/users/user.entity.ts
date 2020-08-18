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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_points', default: 0 })
  @Check('total_points >= 0')
  totalPoints: number;

  @Column({ name: 'first_name', length: 25, default: '' })
  firstName?: string;

  @Column({ name: 'last_name', length: 25, default: '' })
  lastName?: string;

  @Column({ name: 'user_account_id', nullable: true })
  userAccountId: number;

  @OneToOne(() => UserAccount, { nullable: true, cascade: true })
  @JoinColumn({ name: 'user_account_id' })
  userAccount?: UserAccount;

  @OneToMany(
    () => UserExternalLogin,
    userExternalLogin => userExternalLogin.user,
    { cascade: true },
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

  constructor(params: {
    totalPoints: number;
    firstName?: string;
    lastName?: string;
    userAccount?: UserAccount;
  }) {
    if (params !== undefined) {
      this.totalPoints = params.totalPoints;
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.userAccount = params.userAccount;
    }
  }
}

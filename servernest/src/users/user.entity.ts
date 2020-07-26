import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { UserExternalLogin } from '../userExternalLogins/userExternalLogin.entity';
import { Plan } from '../plans/plan.entity';
import { Challenge } from '../challenges/challenge.entity';
import { SolvedChallenge } from '../solvedChallenges/solvedChallenges.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'total_points', default: 0 })
  totalPoints: number;

  @OneToOne(() => UserAccount)
  @JoinColumn({ name: 'user_account_id' })
  userAccount: UserAccount;

  @OneToMany(
    () => UserExternalLogin,
    userExternalLogin => userExternalLogin.user,
  )
  userExternalLogins: UserExternalLogin[];

  @ManyToMany(
    () => Plan,
    plan => plan.users,
  )
  @JoinTable({ name: 'subcriptions' })
  plans: Plan[];

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
}

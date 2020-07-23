import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExternalAuthenticationProvider } from '../externalAuthenticationProviders/externalAuthenticationProvider.entity';
import { User } from '../users/user.entity';

@Entity('user_external_logins')
export class UserExternalLogin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'external_user_id' })
  externalUserId: number;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'first_name', length: 25 })
  firstName: string;

  @Column({ name: 'last_name', length: 25 })
  lastName: string;

  @ManyToOne(
    () => User,
    user => user.userExternalLogins,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => ExternalAuthenticationProvider,
    externalAuthenticationProvider =>
      externalAuthenticationProvider.userExternalLogins,
  )
  @JoinColumn({ name: 'external_authentication_provider_id' })
  externalAuthenticationProvider: ExternalAuthenticationProvider;
}

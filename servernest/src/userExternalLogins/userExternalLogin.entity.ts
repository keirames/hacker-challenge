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

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ name: 'first_name', length: 255, nullable: true })
  firstName: string;

  @Column({ name: 'last_name', length: 255, nullable: true })
  lastName: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'external_authentication_provider_id' })
  externalAuthenticationProviderId: number;

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

  constructor(params: {
    externalUserId: number;
    email: string;
    firstName: string;
    lastName: string;
    user: User;
    externalAuthenticationProvider: ExternalAuthenticationProvider;
  }) {
    if (params !== undefined) {
      this.externalUserId = params.externalUserId;
      this.email = params.email;
      this.firstName = params.firstName;
      this.lastName = params.lastName;
      this.user = params.user;
      this.externalAuthenticationProvider =
        params.externalAuthenticationProvider;
    }
  }
}

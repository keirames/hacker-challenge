import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserExternalLogin } from '../userExternalLogins/userExternalLogin.entity';

@Entity('external_authentication_providers')
export class ExternalAuthenticationProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => UserExternalLogin,
    userExternalLogin => userExternalLogin.externalAuthenticationProvider,
  )
  userExternalLogins: UserExternalLogin[];
}

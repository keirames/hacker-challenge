import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserExternalLogin } from '../userExternalLogins/userExternalLogin.entity';

@Entity('external_authentication_providers')
export class ExternalAuthenticationProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @OneToMany(
    () => UserExternalLogin,
    userExternalLogin => userExternalLogin.externalAuthenticationProvider,
  )
  userExternalLogins: UserExternalLogin[];

  constructor(params: { name: string }) {
    if (params !== undefined) this.name = params.name;
  }
}

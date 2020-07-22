import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'registration_time' })
  registrationTime: Date;

  @Column({ name: 'email_confirmation_token' })
  emailConfirmationToken: string;

  @Column({ name: 'password_reminder_token' })
  passwordReminderToken: string;

  @Column({ name: 'password_reminder_exprie' })
  passwordReminderExpire: Date;
}

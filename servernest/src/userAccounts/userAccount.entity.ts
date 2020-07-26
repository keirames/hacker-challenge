import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ name: 'first_name', length: 25 })
  firstName: string;

  @Column({ name: 'last_name', length: 25 })
  lastName: string;

  @Column({
    name: 'registration_time',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registrationTime: Date;

  @Column({ name: 'email_confirmation_token', length: 255 })
  emailConfirmationToken: string;

  @Column({ name: 'password_reminder_token', length: 255 })
  passwordReminderToken: string;

  @Column({
    name: 'password_reminder_exprie',
    type: 'timestamp with time zone',
  })
  passwordReminderExpire: Date;
}
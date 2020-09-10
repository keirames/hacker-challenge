import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    name: 'registration_time',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  registrationTime?: Date;

  // @Column({ name: 'password_reminder_token', length: 255, nullable: true })
  // passwordReminderToken: string;

  // @Column({
  //   name: 'password_reminder_exprie',
  //   type: 'timestamp with time zone',
  //   nullable: true,
  // })
  // passwordReminderExpire: Date;

  constructor(params: {
    email: string;
    password: string;
    registrationTime?: Date;
  }) {
    if (params !== undefined) {
      this.email = params.email;
      this.password = params.password;
      this.registrationTime = params.registrationTime;
    }
  }
}

import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsNotEmpty()
  @Length(5, 255)
  password: string;

  @IsNotEmpty()
  @Length(2, 25)
  firstName: string;

  @IsNotEmpty()
  @Length(2, 25)
  lastName: string;
}

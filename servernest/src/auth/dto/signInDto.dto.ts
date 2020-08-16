import { IsEmail, Length, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsNotEmpty()
  @Length(5, 255)
  password: string;
}

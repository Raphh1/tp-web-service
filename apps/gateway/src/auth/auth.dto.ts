import { IsEmail, IsString, Length, MinLength } from 'class-validator';

// Validated by the ValidationPipe before the controller runs: a wrong body
// never reaches the user service
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(2, 50)
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

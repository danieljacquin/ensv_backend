import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class AuthRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  readonly password!: string;
}

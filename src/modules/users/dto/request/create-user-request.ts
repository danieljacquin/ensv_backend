import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly name!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  readonly password!: string;
}

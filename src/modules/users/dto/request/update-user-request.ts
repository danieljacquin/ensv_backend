import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly password?: string;
}

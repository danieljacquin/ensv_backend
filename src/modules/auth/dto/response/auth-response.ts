import { IsString } from "class-validator";

export class AuthResponse {
  @IsString()
  readonly token!: string;
}

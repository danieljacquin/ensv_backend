import { IsNotEmpty, IsNumberString } from "class-validator";

export class FindOneUserRequest {
  @IsNotEmpty()
  @IsNumberString()
  readonly id!: number;
}

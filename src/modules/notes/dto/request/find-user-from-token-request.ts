import { IsNotEmpty, IsNumber } from "class-validator";

export class FindUserFromTokenRequest {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;
}

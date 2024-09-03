import { IsNotEmpty, IsNumberString } from "class-validator";

export class FindOneCategoryRequest {
  @IsNotEmpty()
  @IsNumberString()
  readonly id!: number;
}

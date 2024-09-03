import { Expose } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CategoryResponse {
  @Expose()
  @IsNumber()
  readonly id?: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @Expose()
  @IsDate()
  createdAt?: Date;

  @Expose()
  @IsDate()
  updatedAt?: Date;
}

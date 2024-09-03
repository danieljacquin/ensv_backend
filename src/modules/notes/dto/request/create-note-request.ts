import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNoteRequest {
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @IsNotEmpty()
  @IsString()
  readonly content!: string;

  @IsArray()
  readonly categories!: Array<number>;

  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

}


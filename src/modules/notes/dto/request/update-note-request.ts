import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateNoteRequest {
  @IsString()
  readonly title!: string;

  @IsString()
  readonly content!: string;

  @IsArray()
  readonly categories!: Array<number>;

  @IsNumber()
  readonly userId!: number;
}


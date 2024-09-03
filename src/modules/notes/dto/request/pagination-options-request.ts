import { IsNumberString, IsOptional, IsString } from "class-validator";
import { State } from "../../../../enum/stateEnum";

export class PaginationOptionsRequest {
  @IsOptional()
  @IsNumberString()
  readonly page?: number;

  @IsOptional()
  @IsNumberString()
  readonly perPage?: number;

  @IsOptional()
  @IsString()
  readonly state?: State
}

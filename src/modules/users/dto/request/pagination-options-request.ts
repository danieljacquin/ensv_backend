import { IsNumberString, IsOptional } from "class-validator";

export class PaginationOptionsRequest {
  @IsOptional()
  @IsNumberString()
  readonly page?: number;

  @IsOptional()
  @IsNumberString()
  readonly rowsPerPage?: number;
}

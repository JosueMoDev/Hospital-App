import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Min, validateSync } from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../utils";

export enum By {
  all = 'all',
  doctor = 'doctor',
  patient = 'patient'
}

interface PaginationDtoArgs {
  limit?: number;
  offset?: number;
  by?: string;
}

export class PaginationDto {


  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1, { message: 'Page should be greater than 0' })
  public readonly offset!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1, { message: 'Limit should be greater than 0' })
  public readonly limit!: number;


  @IsOptional()
  @IsString()
  @IsEnum(By)
  public readonly by!: string | undefined;

  private constructor(args: PaginationDtoArgs) {

    const by = args.by ? (By[args.by as By] ?? args.by) : By.all;

    this.by = args.by ? by : undefined;
    this.limit = args.limit ? +args.limit : 1
    this.offset = args.offset ? +args.offset : 10
  }

  static create(object: PaginationDtoArgs): [CustomErrors[]?, PaginationDto?] {

    const paginationDto = new PaginationDto(object);

    const [errors, updatedDto] = CustomValidationErrors.validateDto<PaginationDto>(paginationDto);

    if (errors) return [errors];

    return [undefined, updatedDto];

  }

}
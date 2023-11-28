import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../utils";
interface PaginationDtoArgs {
  pageSize?: number;
  page?: number;
}

export class PaginationDto {


  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1, { message: 'Page should be greater than 0' })
  public readonly page!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(5, { message: 'Limit should be greater than 5' })
  public readonly pageSize!: number;


  private constructor(args: PaginationDtoArgs) {
    this.page = args.page ? +args.page : 1;
    this.pageSize = args.pageSize ? +args.pageSize : 5;
  }

  static create(object: PaginationDtoArgs): [CustomErrors[]?, PaginationDto?] {

    const paginationDto = new PaginationDto(object);

    const [errors, updatedDto] = CustomValidationErrors.validateDto<PaginationDto>(paginationDto);

    if (errors) return [errors];

    return [undefined, updatedDto];

  }

}
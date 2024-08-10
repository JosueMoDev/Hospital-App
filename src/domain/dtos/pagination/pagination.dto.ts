import { CustomErrors, CustomValidationErrors } from '@handler-errors';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
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

  @IsString()
  @IsNotEmpty()
  public readonly path!: string;

  private constructor(args: PaginationDtoArgs, path: string) {
    this.page = args.page ? +args.page : 1;
    this.pageSize = args.pageSize ? +args.pageSize : 5;
    this.path = path.split('?')[0].replace(/^\/api/, '');
  }

  static create(
    object: PaginationDtoArgs,
    path: string,
  ): [CustomErrors[]?, PaginationDto?] {
    const paginationDto = new PaginationDto(object, path);

    const [errors, updatedDto] =
      CustomValidationErrors.validateDto<PaginationDto>(paginationDto);

    if (errors) return [errors];

    return [undefined, updatedDto];
  }
}

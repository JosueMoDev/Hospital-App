import { IsInt, IsPositive, Min, validateSync } from "class-validator";

export class PaginationDto {
    @IsInt()
    @IsPositive()
    @Min(1, { message: 'Page should be greater than 0' })
    public readonly page: number;
    @IsInt()
    @IsPositive()
    @Min(1, {message: 'Limit should be greater than 0'})
    public readonly limit: number;
  
  private constructor(page: number, limit: number) {
    this.page = page,
    this.limit = limit
    
  }

  static create( page: number = 1, limit: number = 10 ): [string?, PaginationDto?] {

    const paginationDto = new PaginationDto(page, limit);

    const errors = validateSync(paginationDto);

    if (errors.length > 0) {
    return [errors[0].toString()];
    }

    return [undefined, paginationDto];

  }

}
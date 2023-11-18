import { Type } from "class-transformer";
import {
  IsDate,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../shared";

interface UpdateRecordDtoArgs {
  id: string;
  doctor?: string;
  patient?: string;
  title?: string;
  body?: string;
  lastEditedBy: LastEditedBy | any;
}

class LastEditedBy {
  @IsNotEmpty({ message: "Doctor is required" })
  @IsMongoId()
  public readonly doctor!: string;


  @IsNotEmpty({ message: "Date is required" })
  @IsISO8601({ strict: true })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: 'Start Date should be YYYY-MM-DD format .',
  })
  public date!: string;

  constructor(object: LastEditedBy) {
    Object.assign(this, object);
  }
}
export class UpdateRecordDto {

  @IsNotEmpty({ message: 'Record Id is required' })
  @IsMongoId()
  public readonly id!: string;

  @IsOptional()
  @IsMongoId()
  public readonly doctor!: string;

  @IsOptional()
  @IsMongoId()
  public readonly patient!: string;

  @IsOptional()
  @IsString({ message: "Title should be a string" })
  public title!: string;

  @IsOptional()
  @IsString({ message: "Body should be a string" })
  public body!: string;

  @IsNotEmpty({ message: "Las edited By is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastEditedBy)
  public lastEditedBy!: LastEditedBy;

  constructor(args: UpdateRecordDtoArgs) {
    Object.assign(this, args);
    this.lastEditedBy = new LastEditedBy(args.lastEditedBy);

  }

  static update(
    object: UpdateRecordDtoArgs
  ): [undefined | CustomErrors[], UpdateRecordDto?] {
    const recordDto = new UpdateRecordDto(object);
    const [errors, updatedDto] =
      CustomValidationErrors.validateDto<UpdateRecordDto>(recordDto);
    if (errors) return [errors];
    return [undefined, updatedDto];
  }
}

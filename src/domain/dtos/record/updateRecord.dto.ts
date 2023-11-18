import { Type } from "class-transformer";
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../shared";

interface UpdateRecordDtoArgs {
  id: string;
  doctor: string;
  patient: string;
  title: string;
  body: string;
  lastEditedBy: LastEditedBy;
}

class LastEditedBy {
  @IsMongoId()
  @IsNotEmpty({ message: "Doctor is required" })
  public readonly doctor: string;
  @IsDate({ message: "Date not valid" })
  @IsNotEmpty({ message: "Date is required" })
  public date: Date;

  constructor(doctor: string, date: Date) {
    (this.date = new Date(date)), (this.doctor = doctor);
  }
}
export class UpdateRecordDto {

  @IsMongoId()
  @IsNotEmpty({message:'Record Id is required'})
  public readonly id!: string;

  @IsMongoId()
  @IsOptional()
  public readonly doctor!: string;

  @IsMongoId()
  @IsOptional()
  public readonly patient!: string;

  @IsString({ message: "Title should be a string" })
  @IsOptional()
  public title!: string;

  @IsString({ message: "Body should be a string" })
  @IsOptional()
  public body!: string;

  @IsObject()
  @ValidateNested()
  @IsNotEmpty({ message: "Las edited By is required" })
  @Type(() => LastEditedBy)
  public lastEditedBy: LastEditedBy;

  constructor(args: UpdateRecordDtoArgs) {
    Object.assign(this, args);
    this.lastEditedBy = new LastEditedBy(
      args.lastEditedBy.doctor,
      args.lastEditedBy.date
    );
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

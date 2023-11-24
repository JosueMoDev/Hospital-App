import { Type } from "class-transformer";
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";

interface UpdateRecordDtoArgs {
  id: string;
  doctorId?: string;
  patientId?: string;
  title?: string;
  pdf?: string;
  lastUpdate: LastUpdate;
}


export class UpdateRecordDto {

  @IsNotEmpty({ message: 'Record Id is required' })
  @IsMongoId()
  public readonly id!: string;

  @IsOptional()
  @IsMongoId()
  public readonly doctorId!: string;

  @IsOptional()
  @IsMongoId()
  public readonly patientId!: string;

  @IsOptional()
  @IsString({ message: "Title should be a string" })
  public title!: string;

  @IsOptional()
  @IsString({ message: "Body should be a string" })
  public pdf!: string;

  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate!: LastUpdate;

  constructor(args: UpdateRecordDtoArgs) {
    Object.assign(this, args);
    this.lastUpdate = new LastUpdate(args.lastUpdate);

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

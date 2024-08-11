import { CustomValidatorErrors } from '@handler-errors';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface UpdateRecordDtoArgs {
  id: string;
  doctorId?: string;
  patientId?: string;
  title?: string;
  updatedBy: string;
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
  @IsString({ message: 'Title should be a string' })
  public title!: string;

  @IsNotEmpty({ message: 'Record Id is required' })
  @IsMongoId()
  public readonly updatedBy!: string;

  constructor(args: UpdateRecordDtoArgs) {
    this.id = args.id;
    if (args.doctorId) this.doctorId = args.doctorId;
    if (args.patientId) this.patientId = args.patientId;
    if (args.title) this.title = args.title;
    this.updatedBy = this.updatedBy;
  }

  static update(
    object: UpdateRecordDtoArgs,
  ): [undefined | string[], UpdateRecordDto?] {
    const recordDto = new UpdateRecordDto(object);
    const [errors, updatedDto] =
      CustomValidatorErrors.validateDto<UpdateRecordDto>(recordDto);
    if (errors) return [errors];
    return [undefined, updatedDto];
  }
}

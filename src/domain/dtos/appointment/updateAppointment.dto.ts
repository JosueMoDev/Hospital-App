import { CustomValidatorErrors } from '@handler-errors';
import { IsMongoId, IsOptional, IsNotEmpty, IsISO8601 } from 'class-validator';

interface UpdateAppointmentDtArgs {
  id: string;
  startDate?: string;
  endDate?: string;
  doctorId?: string;
  patientId?: string;
  clinicId?: string;
  updatedBy: string;
}
export class UpdateAppointmentDto {
  @IsNotEmpty({ message: 'Appointment ID is required' })
  @IsMongoId()
  public id!: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  public startDate?: string | undefined;

  @IsOptional()
  @IsISO8601({ strict: true })
  public endDate?: string | undefined;

  @IsOptional()
  @IsMongoId()
  public readonly doctorId?: string;

  @IsOptional()
  @IsMongoId()
  public readonly clinicId?: string;

  @IsOptional()
  @IsMongoId()
  public readonly patientId?: string;

  @IsNotEmpty({ message: 'Appointment ID is required' })
  @IsMongoId()
  public updatedBy!: string;

  constructor(args: UpdateAppointmentDtArgs) {
    this.id = args.id;
    if (args.startDate)
      this.startDate =
        typeof args.startDate === 'string' ? args.startDate : undefined;
    if (args.endDate)
      this.endDate =
        typeof args.endDate === 'string' ? args.endDate : undefined;
    if (args.doctorId) this.doctorId = args.doctorId;
    if (args.patientId) this.patientId = args.patientId;
    if (args.clinicId) this.clinicId = args.clinicId;
    this.updatedBy = args.updatedBy;
  }

  static update(
    object: UpdateAppointmentDto,
  ): [undefined | string[], UpdateAppointmentDto?] {
    const updateAccountDto = new UpdateAppointmentDto(object);
    const [errors, validatedDto] =
      CustomValidatorErrors.validateDto<UpdateAppointmentDto>(
        updateAccountDto,
      );

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}

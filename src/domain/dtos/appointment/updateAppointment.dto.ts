import { IsDate, IsMongoId, IsOptional, IsNotEmpty } from "class-validator";
import { AppointmentDtoArgs } from "./appointmentDto.interface";
import { CustomErrors, CustomValidationErrors } from "../shared";

interface UpdateAppointmentDtArgs extends AppointmentDtoArgs {
  id: string;
}
export class UpdateAppointmentDto {
  @IsNotEmpty({ message: "Appointment ID is required" })
  @IsMongoId()
  public id!: string;
  @IsOptional()
  @IsDate({ message: "Date is invalid" })
  public startDate!: Date;

  @IsOptional()
  @IsDate({ message: "Date is invalid" })
  public endDate!: Date ;

  @IsOptional()
  @IsMongoId()
  public readonly doctor!: string;

  @IsOptional()
  @IsMongoId()
  public readonly patient!: string;

  constructor(args: UpdateAppointmentDtArgs) {
    Object.assign(this, args);
    this.startDate = args.startDate ? new Date(args.startDate) : args.startDate;
    this.endDate =  args.endDate ? new Date(args.endDate) : args.endDate;
  }

  static update(
    object: UpdateAppointmentDto
  ): [undefined | CustomErrors[], UpdateAppointmentDto?] {
    const updateAccountDto = new UpdateAppointmentDto(object);
    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdateAppointmentDto>(
        updateAccountDto
      );
    if (errors) {
      return [errors];
    }

    return [undefined, validatedDto];
  }
}

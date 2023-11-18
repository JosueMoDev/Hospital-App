import { IsDate, IsMongoId, IsNotEmpty} from "class-validator";
import { AppointmentDtoArgs } from "./appointmentDto.interface";
import { CustomErrors, CustomValidationErrors } from "../shared";

export class CreateAppointmentDto  {
  @IsDate({ message: "Date is invalid" })
  @IsNotEmpty({ message: "Start Date is required" })
  public startDate!: Date;

  @IsDate({ message: "Date is invalid" })
  @IsNotEmpty({ message: "End Date is required" })
  public endDate!: Date;

  @IsMongoId()
  public readonly doctor!: string;

  @IsMongoId()
  public readonly patient!: string;

  constructor(args: AppointmentDtoArgs) {
    Object.assign(this, args);
    this.startDate = new Date(args.startDate);
    this.endDate = new Date(args.endDate);
  }

  static create(
    object: CreateAppointmentDto
  ): [undefined | CustomErrors[], CreateAppointmentDto?] {
    const updateAccountDto = new CreateAppointmentDto(object);
    const [errors, validatedDto] = CustomValidationErrors.validateDto<CreateAppointmentDto>(updateAccountDto);
    if (errors) {
      return [errors];
    }

    return [undefined, validatedDto];
  }

}
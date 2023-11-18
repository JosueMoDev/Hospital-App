import { IsISO8601, IsMongoId, IsNotEmpty, Matches } from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../shared";

interface CreateAppointmentDtoArgs {
  startDate: string;
  endDate: string;
  doctor: string;
  patient: string;
}
export class CreateAppointmentDto {


  @IsNotEmpty({ message: "Start Date is required" })
  @IsISO8601({ strict: true })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: 'Start Date should be YYYY-MM-DD format .',
  })
  public startDate!: string;

  @IsNotEmpty({ message: "End Date is required" })
  @IsISO8601({ strict: true })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: 'Start Date should be YYYY-MM-DD format .',
  })
  public endDate!: string;

  @IsMongoId()
  public readonly doctor!: string;

  @IsMongoId()
  public readonly patient!: string;

  constructor(args: CreateAppointmentDtoArgs) {
    Object.assign(this, args);
  }

  static create(
    object: CreateAppointmentDto
  ): [undefined | CustomErrors[], CreateAppointmentDto?] {

    const updateAccountDto = new CreateAppointmentDto(object);

    const [errors, validatedDto] = CustomValidationErrors.validateDto<CreateAppointmentDto>(updateAccountDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }

}
import { IsMongoId, IsOptional, IsNotEmpty, IsISO8601, Matches, IsObject, ValidateNested } from "class-validator";
import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";
import { Type } from "class-transformer";

interface UpdateAppointmentDtArgs {
  id: string;
  startDate?: string;
  endDate?: string;
  doctor?: string;
  patient?: string;
  lastUpdate: LastUpdate;
}
export class UpdateAppointmentDto {
  @IsNotEmpty({ message: "Appointment ID is required" })
  @IsMongoId()
  public id!: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: "Start Date should be YYYY-MM-DD format .",
  })
  public startDate!: string | undefined;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: "Start Date should be YYYY-MM-DD format .",
  })
  public endDate!: string | undefined;

  @IsOptional()
  @IsMongoId()
  public readonly doctor!: string;

  @IsOptional()
  @IsMongoId()
  public readonly patient!: string;

  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate!: LastUpdate;

  constructor(args: UpdateAppointmentDtArgs) {
    Object.assign(this, args);
    this.startDate =
      typeof args.startDate === "string" ? args.startDate : undefined;
    this.endDate = typeof args.endDate === "string" ? args.endDate : undefined;
  }

  static update(
    object: UpdateAppointmentDto
  ): [undefined | CustomErrors[], UpdateAppointmentDto?] {
    const updateAccountDto = new UpdateAppointmentDto(object);
    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UpdateAppointmentDto>(
        updateAccountDto
      );

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}

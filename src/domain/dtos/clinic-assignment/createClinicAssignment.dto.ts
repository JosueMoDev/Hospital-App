import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { CustomErrors, CustomValidationErrors } from "../shared";

interface AssignmentDtoArgs {
  clinic: string;
  doctors: string[];
}

class Doctors {
  @IsNotEmpty()
  @IsMongoId()
  public readonly doctor: string;

  constructor(doctor: string) {
    this.doctor = doctor;
  }
}

export class CreateClinicAssignmentDto {
  @IsMongoId()
  @IsNotEmpty({ message: "Clinic ID is required" })
  public readonly clinic: string;

  @IsNotEmpty({ message: "Assignment is required" })
  @IsArray()
  @ArrayMinSize(1, { message: "An Assignment should have at least one doctor" })
  @Type(() => Doctors)
  @ValidateNested({ each: true })
  public doctors: Doctors[];

  constructor(args: AssignmentDtoArgs) {
    const { clinic, doctors } = args;
    (this.clinic = clinic),
      (this.doctors = doctors.map((doctor) => new Doctors(doctor)));
  }

  static create(
    object: AssignmentDtoArgs
  ): [undefined | CustomErrors[], CreateClinicAssignmentDto?] {
    const assignmentDto = new CreateClinicAssignmentDto(object);
    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<CreateClinicAssignmentDto>(
        assignmentDto
      );

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}

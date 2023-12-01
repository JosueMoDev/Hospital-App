import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from "class-validator";
import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";

interface AssignmentDtoArgs {
  id: string;
  doctors: string[];
  lastUpdate: LastUpdate
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
  @IsNotEmpty({ message: "Assignment ID is required" })
  public readonly id!: string;

  @IsNotEmpty({ message: "Assignment is required" })
  @IsArray()
  @ArrayMinSize(1, { message: "An Assignment should have at least one doctor" })
  @Type(() => Doctors)
  @ValidateNested({ each: true })
  public doctors: Doctors[];

  constructor(args: AssignmentDtoArgs) {
    Object.assign(this, args);
    this.doctors = args.doctors.map((doctor) => new Doctors(doctor));
  }

  @IsNotEmpty({ message: "Last Update is required" })
  @IsObject()
  @ValidateNested()
  @Type(() => LastUpdate)
  public lastUpdate!: LastUpdate;

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

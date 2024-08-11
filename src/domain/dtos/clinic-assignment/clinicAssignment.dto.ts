import { CustomValidatorErrors } from '@handler-errors';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

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

export class ClinicAssignmentDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'Clinic ID is required' })
  public readonly clinic: string;

  @IsNotEmpty({ message: 'You should provide some doctors to assign' })
  @IsArray({ message: 'incorrect type' })
  @ArrayMinSize(1, { message: 'An Assignment should have at least one doctor' })
  @Type(() => Doctors)
  public doctors: Doctors[];

  constructor(args: AssignmentDtoArgs) {
    const { clinic, doctors } = args;
    this.clinic = clinic;
    this.doctors =
      typeof doctors !== 'object'
        ? []
        : doctors.map((doctor: string) => new Doctors(doctor));
  }

  static create(
    object: AssignmentDtoArgs,
  ): [undefined | string[], ClinicAssignmentDto?] {
    const assignmentDto = new ClinicAssignmentDto(object);
    const [errors, validatedDto] =
      CustomValidatorErrors.validateDto<ClinicAssignmentDto>(assignmentDto);

    if (errors) return [errors];

    return [undefined, validatedDto];
  }
}

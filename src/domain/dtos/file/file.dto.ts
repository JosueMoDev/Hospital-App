import { CustomErrors, CustomValidationErrors } from '@handler-errors';
import { IsMongoId, IsNotEmpty } from 'class-validator';


interface UploadDtoArgs {
  id: string;
  updatedBy: string;
}

export class UploadDto {
  @IsMongoId()
  @IsNotEmpty({ message: 'ID is required' })
  public id: string;

  @IsMongoId()
  @IsNotEmpty({ message: 'Account ID is required for update' })
  public updatedBy: string;

  constructor(args: UploadDtoArgs) {
    const { id, updatedBy } = args;
    this.id = id;
    this.updatedBy = updatedBy;
  }
  static update(
    object: UploadDtoArgs,
  ): [undefined | CustomErrors[], UploadDto?] {
    const uploadDto = new UploadDto(object);

    const [errors, validatedDto] =
      CustomValidationErrors.validateDto<UploadDto>(uploadDto);

    if (errors) return [errors];

    const dto = Object.fromEntries(
      Object.entries(validatedDto!).filter(([_, value]) => value !== undefined),
    ) as UploadDto;

    return [undefined, dto];
  }
}

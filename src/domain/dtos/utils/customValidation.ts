import { ValidationError, validateSync } from "class-validator";
import { CustomErrors } from "./customErrors.interface";

export class CustomValidationErrors {

  static setErroMessages(error: ValidationError): any {
    if (error.constraints!) return error.constraints!;

    if (error.children![0].constraints) return error.children!.map(({ constraints }) => constraints)!;

    if (error.children!.length > 0)
      return error.children!.map(
        ({ children }): CustomErrors => ({
          errorMessages: children![0].constraints!,
          errorOnProperty: children![0].property!,
        })
      )

  }
  static validateDto<T>(dto: T): [undefined | CustomErrors[], T?] {
    const errors = validateSync(dto as object);
    if (errors !== undefined && errors.length > 0) {
      const errorsMapped = errors.map(
        (error: ValidationError): CustomErrors => ({
          errorOnProperty: error.property,
          errorMessages: this.setErroMessages(error)

        })
      );
      return [errorsMapped];
    }
    return [undefined, dto];
  }

}
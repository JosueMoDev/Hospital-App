import { IsISO8601, IsMongoId, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class LastUpdate {
  @IsNotEmpty({ message: "Account is required" })
  @IsMongoId()
  public readonly account!: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: "Start Date should be YYYY-MM-DD format .",
  })
  public date!: string;

  constructor(object: LastUpdate) {
    Object.assign(this, object);
  }
}

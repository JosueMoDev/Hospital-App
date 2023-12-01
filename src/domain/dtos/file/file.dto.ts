import { Type } from "class-transformer";
import {
    IsMongoId,
    IsNotEmpty,
    IsObject,
    IsOptional,
    ValidateNested,
} from "class-validator";

import { CustomErrors, CustomValidationErrors, LastUpdate } from "../utils";

interface UploadDtoArgs {
    id: string;
    lastUpdate: LastUpdate,

}

export class UploadDto {
    @IsMongoId()
    @IsNotEmpty({ message: "ID is required" })
    public id: string;


    // @IsNotEmpty({ message: "Last Update is required" })
    @IsOptional()
    // @IsObject()
    // @ValidateNested()
    @Type(() => LastUpdate)
    public lastUpdate: LastUpdate;

    constructor(args: UploadDtoArgs) {
        const { id, lastUpdate } = args;
        this.id = id;
        this.lastUpdate = new LastUpdate(lastUpdate);
    }
    static update(
        object: UploadDtoArgs
    ): [undefined | CustomErrors[], UploadDto?] {

        const uploadDto = new UploadDto(object);

        const [errors, validatedDto] =
            CustomValidationErrors.validateDto<UploadDto>(uploadDto);

        if (errors) return [errors];

        const dto = Object.fromEntries(
            Object.entries(validatedDto!).filter(([_, value]) => value !== undefined)
        ) as UploadDto;


        return [undefined, dto];
    }
}
